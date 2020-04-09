import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { MainComponent } from "./main.component";
import { AppComponent } from "./app.component";
import { ProtocolComponent } from "./protocol.component";

const routes: Routes = [
    {
        path: "",
        component: MainComponent,
        children: [
            {
                path: "",
                component: AppComponent,
            },
            {
                path: "protocol",
                component: ProtocolComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
