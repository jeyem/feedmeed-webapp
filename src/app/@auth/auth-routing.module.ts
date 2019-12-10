import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgxLoginComponent } from "./NgxLoginComponent";
import {
  NbAuthComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent
} from "@nebular/auth";
import { NgxRegisterComponent } from "./NgxRegisterComponent";

export const routes: Routes = [
  // .. here goes our components routes
  {
    path: "",
    component: NbAuthComponent,
    children: [
      {
        path: "login",
        component: NgxLoginComponent // <---
      },
      {
        path: "register",
        component: NgxRegisterComponent
      },
      {
        path: "logout",
        component: NbLogoutComponent
      },
      {
        path: "request-password",
        component: NbRequestPasswordComponent
      },
      {
        path: "reset-password",
        component: NbResetPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgxAuthRoutingModule {}
