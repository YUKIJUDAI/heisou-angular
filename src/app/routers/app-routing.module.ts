import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MainComponent } from "@app/main.component";
import { AppComponent } from "@app/home/home.component";
import { ProtocolComponent } from "@app/protocol/protocol.component";
import { IntroductionComponent } from "@app/introduction/introduction.component";
import { RegisteredComponent } from "@app/registered/registered.component";

const routes: Routes = [
    {
        path: "",
        component: MainComponent,
        children: [
            {
                path: "",
                component: AppComponent,
                children: [
                    {
                        path: "",
                        component: IntroductionComponent,
                    },
                    {
                        path: "registered",
                        component: RegisteredComponent,
                    },
                ],
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
