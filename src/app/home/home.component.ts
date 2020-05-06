import { Component, Input, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { MnFullpageService, MnFullpageOptions } from "ngx-fullpage";
import { NgwWowService } from "ngx-wow";

import { resetServiceCode } from "@app/reducers/index";

@Component({
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.less"],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    downloadUrl: String; // 下载路径
    serviceInfo: { [propName: string]: any };
    bgImg: SafeStyle;

    @Input() public options: MnFullpageOptions = MnFullpageOptions.create({
        controlArrows: false,
        css3: true,
    });

    constructor(
        private http: HttpClient,
        private router: Router,
        private fullpageService: MnFullpageService,
        private wowService: NgwWowService,
        private store: Store<any>,
        private sanitizer: DomSanitizer
    ) {
        this.wowService.init();
        store.pipe(select("serviceCode")).subscribe((res) => {
            this.serviceInfo = res;
        });
    }

    ngOnInit(): void {
        this.getAppVersion();
        this.getServiceCode();
    }

    ngAfterViewInit(): void {
        this.router.url !== "/" && this.fullpageService.moveTo(1, 1);
    }

    ngOnDestroy():void {
        this.fullpageService.destroy("all");
    }

    // 跳转到首页
    redirectToHome(): void {
        this.fullpageService.moveTo(1, 0);
        this.wowService.init();
        this.router.navigate([""]);
    }

    // 跳转到介绍页
    redirectToIntroduction(): void {
        this.fullpageService.moveTo(1, 1);
        this.router.navigate(["/introduction"]);
    }

    // 跳转到注册页
    redirectToRegistered(): void {
        this.fullpageService.moveTo(1, 1);
        this.router.navigate(["/registered"]);
    }

    // 获取下载链接
    getAppVersion(): void {
        this.http.post("/index/getAppVersion", null).subscribe((res: any) => {
            0 === res.code && (this.downloadUrl = res.data);
        });
    }

    // 获取站点信息
    getServiceCode(): void {
        this.http.post("/index/getServiceCode", null).subscribe((res: any) => {
            if (0 === res.code) {
                this.store.dispatch(resetServiceCode(res.data));
                this.bgImg = this.sanitizer.bypassSecurityTrustStyle(
                    `url(${this.serviceInfo.home_bg_image}) no-repeat 0 0`
                );
            }
        });
    }
}
