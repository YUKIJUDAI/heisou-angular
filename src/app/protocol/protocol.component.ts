import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";

@Component({
    templateUrl: "./protocol.component.html",
    styleUrls: ["./protocol.component.less"],
})
export class ProtocolComponent implements OnInit {
    serviceInfo: { [propName: string]: any };

    constructor(private store: Store<any>) {
        store.pipe(select("serviceCode")).subscribe((res) => {
            this.serviceInfo = res;
        });
    }

    ngOnInit(): void {}
}
