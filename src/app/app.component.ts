import { Component, Input, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MnFullpageService, MnFullpageOptions } from "ngx-fullpage";
import { NgwWowService } from "ngx-wow";
import { interval } from "rxjs";
import { take } from "rxjs/operators";
import { ElMessageService } from 'element-angular';

var qs = require("qs");

import { environment } from "../environments/environment";

interface formData {
    phone: string | number; // 手机号
    password: string | number; // 密码
    verify: string | number; //图形验证码
    code: string | number; //短信验证码
}

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.less"]
})
export class AppComponent implements OnInit {
    isIntroduction: boolean = false; // 是否是介绍页
    key: number | string = ""; // 短信随机值
    baseUrl: string = environment.baseUrl;
    phoneCodeFlag: boolean = false; // 短信flag
    submitFlag: boolean = false; // 注册提交flag
    protocolFlag: boolean = true; // 协议勾选flag
    countdown: number = 60; // 倒计时
    formData: formData = {
        // 表单数据
        phone: "",
        password: "",
        verify: "",
        code: ""
    };

    httpOptions = {  // http head
        headers: new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" })
    }

    @Input() public options: MnFullpageOptions = MnFullpageOptions.create({
        controlArrows: false,
        css3: true
    });

    constructor(
        private http: HttpClient,
        private fullpageService: MnFullpageService,
        private wowService: NgwWowService,
        private message: ElMessageService
    ) {
        this.wowService.init();
    }

    ngOnInit(): void {
        this.getKey();
    }

    // 跳转到介绍页
    redirectToIntroduction(index: number): void {
        this.fullpageService.moveTo(1, index);
        0 === index && this.wowService.init();
    }

    // 跳转到注册页
    redirectToRegistered(index: number): void {
        this.redirectToIntroduction(1);
        this.changeSlide(false);
    }

    // 切换介绍页和注册页
    changeSlide(b: boolean): void {
        this.isIntroduction = b;
    }

    // 获取随机key
    getKey(): void {
        this.key = new Date().getTime() + "" + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
    }

    // 获取短信
    getPhoneCode(): void {
        const body = { type: 2, phone: this.formData.phone, verify_key: this.key, verify: this.formData.verify };

        this.http.post(this.baseUrl + "/index/sendSms", qs.stringify(body), this.httpOptions).subscribe((res:any) => {
            if (0 === res.code) {
                this.message.success(res.msg);
                this.phoneCodeFlag = true;
                interval(1000).pipe(take(60)).subscribe((res) => {
                    let a = (res + 1);
                    a === 60 ? (this.phoneCodeFlag = false) : this.countdown = (60 - a);
                });
            } else {
                this.message.error(res.msg);
            }
        });
    }

    //提交注册
    onSubmit():void{
        if (this.submitFlag) return;
        // 勾选协议
        if (!this.protocolFlag) {
            this.message.info("请先同意协议");
            return;
        }
        this.submitFlag = true;

        this.http.post(this.baseUrl + "/index/register", qs.stringify(this.formData), this.httpOptions).subscribe((res:any) => {
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
