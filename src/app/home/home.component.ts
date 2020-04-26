import { Component, Input, OnInit, AfterViewInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { MnFullpageService, MnFullpageOptions } from "ngx-fullpage";
import { NgwWowService } from "ngx-wow";

import { environment } from "@env/environment";

@Component({
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.less"],
})
export class AppComponent implements OnInit, AfterViewInit {
    downloadUrl: String; // 下载路径
    baseUrl: string = environment.baseUrl;

    httpOptions = {
        // http head
        headers: new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
            proxyid: environment.proxyid.toString(),
        }),
    };

    @Input() public options: MnFullpageOptions = MnFullpageOptions.create({
        controlArrows: false,
        css3: true,
    });

    constructor(
        private http: HttpClient,
        private router: Router,
        private fullpageService: MnFullpageService,
        private wowService: NgwWowService
    ) {
        this.wowService.init();
    }

    ngOnInit(): void {
        this.getAppVersion();
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
    redirectToIntroduction(index: number): void {
        this.fullpageService.moveTo(1, 1);
        this.router.navigate(["/introduction"]);
    }

    // 跳转到注册页
    redirectToRegistered(index: number): void {
        this.fullpageService.moveTo(1, 1);
        this.router.navigate(["/registered"]);
    }

    // 获取下载链接
    getAppVersion(): void {
        this.http
            .post(this.baseUrl + "/index/getAppVersion", this.httpOptions)
            .subscribe((res: any) => {
                0 === res.code && (this.downloadUrl = res.data);
            });
    }
}
