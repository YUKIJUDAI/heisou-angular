import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";

@Component({
    selector: "app-introduction",
    templateUrl: "./introduction.component.html",
    styleUrls: ["./introduction.component.less"],
})
export class IntroductionComponent implements OnInit {
    serviceInfo: { [propName: string]: any };
    constructor(private store: Store<any>) {
        store.pipe(select("serviceCode")).subscribe((res) => {
            this.serviceInfo = res;
        });
    }

    ngOnInit() {}
}
