import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "../environments/environment";

@Component({
    templateUrl: "./protocol.component.html",
    styleUrls: ["./protocol.component.less"],
})
export class ProtocolComponent implements OnInit {
    baseUrl: string = environment.baseUrl;
    content: string;
    httpOptions = {
        // http head
        headers: new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
            proxyid: environment.proxyid.toString(),
        }),
    };

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.getInfo();
    }

    getInfo(): void {
        this.http
            .post(this.baseUrl + "/index/getServiceCode", "", this.httpOptions)
            .subscribe((res: any) => {
                if (0 === res.code) {
                    this.content = res.data.server_pact;
                }
            });
    }
}
