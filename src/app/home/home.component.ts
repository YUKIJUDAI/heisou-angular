import { Component, Input, OnInit, AfterViewInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { MnFullpageService, MnFullpageOptions } from "ngx-fullpage";
import { NgwWowService } from "ngx-wow";

import { getServiceCode } from "@app/reducers/index";

@Component({
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.less"],
})
export class AppComponent implements OnInit, AfterViewInit {
    downloadUrl: String; // 下载路径
    serviceInfo: any;

    @Input() public options: MnFullpageOptions = MnFullpageOptions.create({
        controlArrows: false,
        css3: true,
    });

    constructor(
        private http: HttpClient,
        private router: Router,
        private fullpageService: MnFullpageService,
        private wowService: NgwWowService,
        private store: Store<any>
    ) {
        this.wowService.init();
        this.serviceInfo = store.select(getServiceCode);
    }

    ngOnInit(): void {
        this.getAppVersion();
        this.getServiceCode();
    }

    ngAfterViewInit(): void {
        this.router.url !== "/" && this.fullpageService.moveTo(1, 1);
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
        this.http.post("/index/getAppVersion", null).subscribe((res: any) => {
            0 === res.code && this.store.dispatch({"resetServiceCode":res.data});
        });
    }
}
