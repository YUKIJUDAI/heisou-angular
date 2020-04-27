import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Params, ActivatedRoute } from "@angular/router";
import { environment } from "@env/environment";
import { ElMessageService } from "element-angular";
import { interval } from "rxjs";
import { take } from "rxjs/operators";

interface formData {
    phone: string | number; // 手机号
    password: string | number; // 密码
    verify: string | number; //图形验证码
    code: string | number; //短信验证码
    invite_code: string; // 邀请码
}

@Component({
    selector: "app-registered",
    templateUrl: "./registered.component.html",
    styleUrls: ["./registered.component.less"],
})
export class RegisteredComponent implements OnInit {
    queryParams: Params; // 参数
    key: number | string = ""; // 短信随机值
    baseUrl: string = environment.baseUrl;
    downloadUrl: String; // 下载路径
    phoneCodeFlag: boolean = false; // 短信flag
    submitFlag: boolean = false; // 注册提交flag
    protocolFlag: boolean = true; // 协议勾选flag
    countdown: number = 60; // 倒计时
    formData: formData = {
        // 表单数据
        phone: "",
        password: "",
        verify: "",
        code: "",
        invite_code: "",
    };

    constructor(
        private http: HttpClient,
        private activatedRoute: ActivatedRoute,
        private message: ElMessageService
    ) {}

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params) => {
            this.queryParams =
                params || JSON.parse(localStorage.getItem("params"));
            this.queryParams &&
                this.queryParams.invite_code &&
                (this.formData.invite_code = this.queryParams.invite_code);
            localStorage.setItem("params", JSON.stringify(params));
        });
        this.getKey();
        this.getAppVersion();
    }

    // 获取随机key
    getKey(): void {
        this.key =
            new Date().getTime() +
            "" +
            (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
    }

    // 获取下载链接
    getAppVersion(): void {
        this.http.post("/index/getAppVersion", null).subscribe((res: any) => {
            0 === res.code && (this.downloadUrl = res.data);
        });
    }

    // 获取短信
    getPhoneCode(): void {
        const body = {
            type: 1,
            phone: this.formData.phone,
            verify_key: this.key,
            verify: this.formData.verify,
        };

        this.http.post("/index/sendSms", body).subscribe((res: any) => {
            if (0 === res.code) {
                this.message.success(res.msg);
                this.phoneCodeFlag = true;
                interval(1000)
                    .pipe(take(60))
                    .subscribe((res) => {
                        let a = res + 1;
                        a === 60
                            ? (this.phoneCodeFlag = false)
                            : (this.countdown = 60 - a);
                    });
            } else {
                this.message.error(res.msg);
            }
        });
    }

    //提交注册
    onSubmit(): void {
        if (this.submitFlag) return;
        // 勾选协议
        if (!this.protocolFlag) {
            this.message.info("请先同意协议");
            return;
        }
        this.submitFlag = true;

        this.http
            .post(
                "/index/register",
                Object.assign(this.formData, this.queryParams)
            )
            .subscribe((res: any) => {
                this.submitFlag = false;
                if (0 === res.code) {
                    this.message.success(res.msg);
                } else {
                    this.getKey();
                    this.message.error(res.msg);
                }
            });
    }
}
