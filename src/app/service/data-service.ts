import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

@Injectable()
export class DataService {
    private serviceCode: object = {};
    constructor(private http: HttpClient) {
        var subject = new Subject();
        // http.post("/index/getServiceCode", null).subscribe((res: any) => {
        //     0 === res.code && (this.serviceCode = res.data);
        // });
    }

    public get() {
        return this.serviceCode;
    }

    public set(obj) {
        this.serviceCode = obj;
    }
}
