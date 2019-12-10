import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import {
  NbLoginComponent,
  NbRegisterComponent,
  NbAuthResult
} from "@nebular/auth";
import { take } from "rxjs/operators";
@Component({
  selector: "ngx-login",
  template: `
    <h1 id="title" class="title">Register</h1>

    <nb-alert
      *ngIf="showMessages.error && errors?.length && !submitted"
      outline="danger"
      role="alert"
    >
      <p class="alert-title"><b>Oh snap!</b></p>
      <ul class="alert-message-list">
        <li *ngFor="let error of errors" class="alert-message">{{ error }}</li>
      </ul>
    </nb-alert>

    <nb-alert
      *ngIf="showMessages.success && messages?.length && !submitted"
      outline="success"
      role="alert"
    >
      <p class="alert-title"><b>Hooray!</b></p>
      <ul class="alert-message-list">
        <li *ngFor="let message of messages" class="alert-message">
          {{ message }}
        </li>
      </ul>
    </nb-alert>

    <form (ngSubmit)="register()" #form="ngForm" aria-labelledby="title">
      <div class="form-control-group">
        <label class="label" for="input-name">Nick name:</label>
        <input
          nbInput
          [(ngModel)]="user.nickname"
          #nickname="ngModel"
          id="input-name"
          name="nickname"
          placeholder="Nick name"
          autofocus
          fullWidth
          fieldSize="large"
          [status]="
            nickname.dirty ? (nickname.invalid ? 'danger' : 'success') : 'basic'
          "
          [required]="getConfigValue('forms.validation.nickname.required')"
          [minlength]="getConfigValue('forms.validation.nickname.minLength')"
          [maxlength]="getConfigValue('forms.validation.nickname.maxLength')"
          [attr.aria-invalid]="
            nickname.invalid && nickname.touched ? true : null
          "
        />
        <ng-container *ngIf="nickname.invalid && nickname.touched">
          <p class="caption status-danger" *ngIf="nickname.errors?.required">
            Nick name is required!
          </p>
          <p
            class="caption status-danger"
            *ngIf="nickname.errors?.minlength || nickname.errors?.maxlength"
          >
            Nick name should contains from
            {{ getConfigValue("forms.validation.nickname.minLength") }} to
            {{ getConfigValue("forms.validation.nickname.maxLength") }}
            characters
          </p>
        </ng-container>
      </div>

      <div class="form-control-group">
        <label class="label" for="input-email">Email address:</label>
        <input
          nbInput
          [(ngModel)]="user.username"
          #email="ngModel"
          id="input-email"
          name="email"
          pattern=".+@.+..+"
          placeholder="Email address"
          fullWidth
          fieldSize="large"
          [status]="
            email.dirty ? (email.invalid ? 'danger' : 'success') : 'basic'
          "
          [required]="getConfigValue('forms.validation.email.required')"
          [attr.aria-invalid]="email.invalid && email.touched ? true : null"
        />
        <ng-container *ngIf="email.invalid && email.touched">
          <p class="caption status-danger" *ngIf="email.errors?.required">
            Email is required!
          </p>
          <p class="caption status-danger" *ngIf="email.errors?.pattern">
            Email should be the real one!
          </p>
        </ng-container>
      </div>

      <div class="form-control-group">
        <label class="label" for="input-password">Password:</label>
        <input
          nbInput
          [(ngModel)]="user.password"
          #password="ngModel"
          type="password"
          id="input-password"
          name="password"
          placeholder="Password"
          fullWidth
          fieldSize="large"
          [status]="
            password.dirty ? (password.invalid ? 'danger' : 'success') : 'basic'
          "
          [required]="getConfigValue('forms.validation.password.required')"
          [minlength]="getConfigValue('forms.validation.password.minLength')"
          [maxlength]="getConfigValue('forms.validation.password.maxLength')"
          [attr.aria-invalid]="
            password.invalid && password.touched ? true : null
          "
        />
        <ng-container *ngIf="password.invalid && password.touched">
          <p class="caption status-danger" *ngIf="password.errors?.required">
            Password is required!
          </p>
          <p
            class="caption status-danger"
            *ngIf="password.errors?.minlength || password.errors?.maxlength"
          >
            Password should contain from
            {{ getConfigValue("forms.validation.password.minLength") }} to
            {{ getConfigValue("forms.validation.password.maxLength") }}
            characters
          </p>
        </ng-container>
      </div>

      <div class="form-control-group">
        <label class="label" for="input-re-password">Repeat password:</label>
        <input
          nbInput
          [(ngModel)]="user.confirmPassword"
          #rePass="ngModel"
          type="password"
          id="input-re-password"
          name="rePass"
          placeholder="Confirm Password"
          fullWidth
          fieldSize="large"
          [status]="
            rePass.dirty
              ? rePass.invalid || password.value != rePass.value
                ? 'danger'
                : 'success'
              : 'basic'
          "
          [required]="getConfigValue('forms.validation.password.required')"
          [attr.aria-invalid]="rePass.invalid && rePass.touched ? true : null"
        />
        <ng-container *ngIf="rePass.invalid && rePass.touched">
          <p class="caption status-danger" *ngIf="rePass.errors?.required">
            Password confirmation is required!
          </p>
          <p
            class="caption status-danger"
            *ngIf="password.value != rePass.value && !rePass.errors?.required"
          >
            Password does not match the confirm password.
          </p>
        </ng-container>
      </div>

      <div
        class="form-control-group accept-group"
        *ngIf="getConfigValue('forms.register.terms')"
      >
        <nb-checkbox
          name="terms"
          [(ngModel)]="user.terms"
          [required]="getConfigValue('forms.register.terms')"
        >
          Agree to
          <a href="#" target="_blank"><strong>Terms & Conditions</strong></a>
        </nb-checkbox>
      </div>

      <button
        nbButton
        fullWidth
        status="primary"
        size="large"
        [disabled]="submitted || !form.valid"
        [class.btn-pulse]="submitted"
      >
        Register
      </button>
    </form>

    <section
      *ngIf="socialLinks && socialLinks.length > 0"
      class="links"
      aria-label="Social sign in"
    >
      or enter with:
      <div class="socials">
        <ng-container *ngFor="let socialLink of socialLinks">
          <a
            *ngIf="socialLink.link"
            [routerLink]="socialLink.link"
            [attr.target]="socialLink.target"
            [attr.class]="socialLink.icon"
            [class.with-icon]="socialLink.icon"
          >
            <nb-icon
              *ngIf="socialLink.icon; else title"
              [icon]="socialLink.icon"
            ></nb-icon>
            <ng-template #title>{{ socialLink.title }}</ng-template>
          </a>
          <a
            *ngIf="socialLink.url"
            [attr.href]="socialLink.url"
            [attr.target]="socialLink.target"
            [attr.class]="socialLink.icon"
            [class.with-icon]="socialLink.icon"
          >
            <nb-icon
              *ngIf="socialLink.icon; else title"
              [icon]="socialLink.icon"
            ></nb-icon>
            <ng-template #title>{{ socialLink.title }}</ng-template>
          </a>
        </ng-container>
      </div>
    </section>

    <section class="another-action" aria-label="Sign in">
      Already have an account?
      <a class="text-link" routerLink="../login">Log in</a>
    </section>
  `
})
export class NgxRegisterComponent extends NbRegisterComponent {
  register(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service
      .register("feedmeed", {
        nikname: this.user.nickname,
        username: this.user.username,
        password: this.user.password
      })
      .subscribe((result: any) => {
        // { message: string, token: string, user: { displayName: string, followers: number, followings: number, id: string, username: string } }
        this.submitted = false;
        if (result.isSuccess()) {
          this.messages = result.message;
          this.service
            .authenticate("feedmeed", {
              nikname: this.user.nikname,
              password: this.user.password,
              identifier: this.user.username
            })
            .pipe(take(1))
            .subscribe(ress => {
              if (ress.isSuccess()) {
                setTimeout(function() {
                  this.router.navigateByUrl(ress.getRedirect());
                }, this.redirectDelay);
              } else {
                this.router.navigate(["/auth/login"]);
              }
            });
        } else {
          this.errors = result.getErrors();
        }
        this.cd.detectChanges();
      });
  }
}
