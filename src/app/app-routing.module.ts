import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent
} from "@nebular/auth";

const routes: Routes = [
  {
    path: "pages",
    loadChildren: () =>
      import("src/app/pages/pages.module").then(m => m.PagesModule)
  },
  {
    path: "auth",
    loadChildren: () =>
      import("src/app/@auth/auth.module").then(m => m.NgxAuthModule)
  },
  { path: "", redirectTo: "auth/login", pathMatch: "full" },
  { path: "**", redirectTo: "auth/login" }
];

const config: ExtraOptions = {
  useHash: false
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
