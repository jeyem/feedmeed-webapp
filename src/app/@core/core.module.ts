import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NbAuthModule,
  NbPasswordAuthStrategy,
  NbAuthJWTToken,
  NbAuthJWTInterceptor,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER
} from "@nebular/auth";
import { NbSecurityModule, NbRoleProvider } from "@nebular/security";

import { throwIfAlreadyLoaded } from "./module-import-guard";
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService
} from "./utils";
import { VisitorsAnalyticsData } from "./data/visitors-analytics";
import { VisitorsAnalyticsService } from "./mock/visitors-analytics.service";
import { UserActivityData } from "./data/user-activity";
import { UserActivityService } from "./mock/user-activity.service";
import { BaseService } from "./BaseService";
import { HandleError } from "./handle-error.serivce";
import { RoleProvider } from "./RoleProvider";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { UserData } from "./data/users";
import { UserService } from "./mock/users.service";
import { NewsService } from "./utils/NewsService";

const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
  { provide: UserActivityData, useClass: UserActivityService },
  { provide: VisitorsAnalyticsData, useClass: VisitorsAnalyticsService },
  NewsService
];

export const NB_CORE_PROVIDERS = [
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: "feedmeed",
        baseEndpoint: "http://localhost:5000/api/v1",
        login: {
          endpoint: "/auth/login",
          redirect: {
            success: "/pages/dashboard",
            failure: "/auth/login"
          }
        },
        register: {
          endpoint: "/auth/register"
        },
        logout: {
          endpoint: "/auth/sign-out"
        },
        requestPass: {
          endpoint: "/auth/request-pass"
        },
        resetPass: {
          endpoint: "/auth/reset-pass"
        },
        token: {
          key: "token",
          class: NbAuthJWTToken
        }
      })
    ],
    forms: {}
  }).providers,

  ...NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: "*"
      },
      agent: {
        parent: "guest",
        access: "agent"
      },
      admin: {
        parent: "agent",
        access: "admin"
      }
    }
  }).providers,

  {
    provide: NbRoleProvider,
    useClass: RoleProvider
  },
  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService,
  BaseService,
  HandleError,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NbAuthJWTInterceptor,
    multi: true
  },
  {
    provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
    useValue: req => {
      return false;
    }
  }
];

@NgModule({
  imports: [CommonModule],
  exports: [NbAuthModule],
  declarations: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [...NB_CORE_PROVIDERS]
    };
  }
}
