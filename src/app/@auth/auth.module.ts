import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { NgxAuthRoutingModule } from "./auth-routing.module";
import { NbAuthModule } from "@nebular/auth";
import {
  NbSpinnerModule,
  NbCardModule,
  NbAlertModule,
  NbCheckboxModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule
} from "@nebular/theme";
import { NgxLoginComponent } from "./NgxLoginComponent";
import { NgxRegisterComponent } from "./NgxRegisterComponent";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbSpinnerModule,
    NbCardModule,
    NgxAuthRoutingModule,
    NbAuthModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbIconModule
  ],
  declarations: [
    NgxLoginComponent, // <---,
    NgxRegisterComponent
  ]
})
export class NgxAuthModule {}
