import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { NbLoginComponent } from "@nebular/auth";
import { take } from "rxjs/operators";
@Component({
  selector: "ngx-login",
  template: `
    <h1 id="title" class="title">Sign In</h1>

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

    <form (ngSubmit)="login()" #form="ngForm" aria-labelledby="title">
      <div class="form-control-group">
        <label class="label" for="input-email">Email address:</label>
        <input
          nbInput
          fullWidth
          [(ngModel)]="user.identifier"
          #email="ngModel"
          name="email"
          id="input-email"
          pattern=".+@.+..+"
          placeholder="Email address"
          autofocus
          [status]="email.dirty ? (email.invalid ? 'danger' : 'success') : ''"
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
          fullWidth
          [(ngModel)]="user.password"
          #password="ngModel"
          name="password"
          type="password"
          id="input-password"
          placeholder="Password"
          [status]="
            password.dirty ? (password.invalid ? 'danger' : 'success') : ''
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
            Password should contains from
            {{ getConfigValue("forms.validation.password.minLength") }} to
            {{ getConfigValue("forms.validation.password.maxLength") }}
            characters
          </p>
        </ng-container>
      </div>

      <div class="form-control-group accept-group">
        <nb-checkbox
          name="rememberMe"
          [(ngModel)]="user.rememberMe"
          *ngIf="rememberMe"
          >Remember me</nb-checkbox
        >
        <a class="forgot-password" routerLink="../request-password"
          >Forgot Password?</a
        >
      </div>

      <button
        nbButton
        fullWidth
        status="success"
        [disabled]="submitted || !form.valid"
        [class.btn-pulse]="submitted"
      >
        Sign In
      </button>
    </form>

    <section
      *ngIf="socialLinks && socialLinks.length > 0"
      class="links"
      aria-label="Social sign in"
    >
      Or connect with:
      <div class="socials">
        <ng-container *ngFor="let socialLink of socialLinks">
          <a
            *ngIf="socialLink.link"
            [routerLink]="socialLink.link"
            [attr.target]="socialLink.target"
            [attr.class]="socialLink.icon"
            [class.with-icon]="socialLink.icon"
            >{{ socialLink.title }}</a
          >
          <a
            *ngIf="socialLink.url"
            [attr.href]="socialLink.url"
            [attr.target]="socialLink.target"
            [attr.class]="socialLink.icon"
            [class.with-icon]="socialLink.icon"
            >{{ socialLink.title }}</a
          >
        </ng-container>
      </div>
    </section>

    <section class="another-action" aria-label="Register">
      Don't have an account?
      <a class="text-link" routerLink="../register">Sign Up</a>
    </section>
  `
})
export class NgxLoginComponent extends NbLoginComponent implements OnInit {
  ngOnInit() {}
  login() {
    this.service
      .authenticate("feedmeed", {
        identifier: this.user.identifier,
        password: this.user.password,
        nikname: "jeyem"
      })
      .pipe(take(1))
      .subscribe(res => {
        this.router.navigateByUrl(res.getRedirect());
      });
  }
}
