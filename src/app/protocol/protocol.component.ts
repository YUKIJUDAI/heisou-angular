import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
    templateUrl: "./protocol.component.html",
    styleUrls: ["./protocol.component.less"],
})
export class ProtocolComponent implements OnInit {
    content: string;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.getInfo();
    }

    getInfo(): void {
        this.http.post("/index/getServiceCode", null).subscribe((res: any) => {
            if (0 === res.code) {
                this.content = res.data.server_pact;
            }
        });
    }
}
