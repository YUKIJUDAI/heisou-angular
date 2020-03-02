import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MnFullpageModule } from "ngx-fullpage";
import { NgwWowModule } from "ngx-wow";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgwWowModule,
        MnFullpageModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
