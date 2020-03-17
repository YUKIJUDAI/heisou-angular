import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MnFullpageModule } from "ngx-fullpage";
import { NgwWowModule } from "ngx-wow";
import { ElModule } from "element-angular";

import { AppComponent } from "./app.component";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        NgwWowModule,
        MnFullpageModule.forRoot(),
        ElModule.forRoot(),
        RouterModule.forRoot([{ path: "", component: AppComponent }])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
