import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MnFullpageModule } from "ngx-fullpage";
import { NgwWowModule } from "ngx-wow";
import { ElModule } from "element-angular";

import { AppRoutingModule } from "./app-routing.module";
import { MainComponent } from "./main.component";
import { AppComponent } from "./app.component";
import { ProtocolComponent } from "./protocol.component";

@NgModule({
    declarations: [MainComponent, AppComponent, ProtocolComponent],
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
    providers: [],
    bootstrap: [MainComponent],
})
export class AppModule {}
