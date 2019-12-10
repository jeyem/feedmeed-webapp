import { NgModule } from "@angular/core";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule
} from "@nebular/theme";

import { ThemeModule } from "../../@theme/theme.module";
import { DashboardComponent } from "./dashboard.component";
import { StatusCardComponent } from "./status-card/status-card.component";

import { FormsModule } from "@angular/forms";
import { InfiniteListPlaceholdersComponent } from "./post-plasholder/InfiniteListPlaceholdersComponent";
import { NewsPostPlaceholderComponent } from "./post-plasholder/NewsPostPlaceholderComponent";
import { NewsPostComponent } from "./post-plasholder/NewsPostComponent";

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NbListModule
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    InfiniteListPlaceholdersComponent,
    NewsPostPlaceholderComponent,
    NewsPostComponent
  ]
})
export class DashboardModule {}
