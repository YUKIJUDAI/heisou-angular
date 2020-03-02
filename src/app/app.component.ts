import { Component, Input, OnInit } from "@angular/core";
import { MnFullpageService, MnFullpageOptions } from "ngx-fullpage";
import { NgwWowService } from "ngx-wow";
import { Subscription } from "rxjs";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.less"]
})
export class AppComponent implements OnInit {
    isIntroduction: boolean = true; // 是否是介绍页

    private wowSubscription: Subscription;

    @Input() public options: MnFullpageOptions = MnFullpageOptions.create({
        controlArrows: false,
        css3: true
    });

    constructor(
        private fullpageService: MnFullpageService,
        private wowService: NgwWowService
    ) {
        this.wowService.init();
    }

    ngOnInit(): void {}

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
}
