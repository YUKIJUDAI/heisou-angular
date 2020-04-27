import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MnFullpageModule } from "ngx-fullpage";
import { NgwWowModule } from "ngx-wow";
import { ElModule } from "element-angular";

import { Http } from "@app/service/http-service";

import { AppRoutingModule } from "@app/routers/app-routing.module";
import { MainComponent } from "@app/main.component";
import { AppComponent } from "@app/home/home.component";
import { ProtocolComponent } from "@app/protocol/protocol.component";
import { IntroductionComponent } from "./introduction/introduction.component";
import { RegisteredComponent } from "./registered/registered.component";
import { HelpCenterComponent } from "./help-center/help-center.component";

@NgModule({
    declarations: [
        MainComponent,
        AppComponent,
        ProtocolComponent,
        IntroductionComponent,
        RegisteredComponent,
        HelpCenterComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        NgwWowModule,
        MnFullpageModule.forRoot(),
        ElModule.forRoot(),
        AppRoutingModule,
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: Http, multi: true }],
    bootstrap: [MainComponent],
})
export class AppModule {}
