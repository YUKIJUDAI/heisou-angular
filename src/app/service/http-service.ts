import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpEvent } from "@angular/common/http";
import { environment } from "@env/environment";
import { retry, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
var qs = require("qs");

@Injectable()
export class Http implements HttpInterceptor {
    constructor() {}
    intercept(req, next: HttpHandler): Observable<HttpEvent<any>> {
        let newReq = req.clone({
            url: environment.baseUrl + req.url,
            body: req.body ? qs.stringify(req.body) : null,
            setHeaders: {
                "Content-Type": "application/x-www-form-urlencoded",
                proxyid: environment.proxyid.toString(),
            },
        });
        return next.handle(newReq).pipe(
            retry(2),
            catchError((err) => {
                throw new Error(err.toString());
            })
        );
    }
}
