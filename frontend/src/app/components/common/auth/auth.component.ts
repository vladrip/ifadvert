import { Component, DestroyRef, inject } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@services/auth.service';
import { AuthData } from '@models/AuthData';
import { ToastService } from '@services/toast.service';
import { NgIf } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgxErrorsModule } from '@ngspot/ngx-errors';
import { ValidatorsModule } from '@app/directives/validators/validators.module';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [
    PasswordModule,
    CheckboxModule,
    RouterLink,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    NgIf,
    ProgressSpinnerModule,
    NgxErrorsModule,
    ValidatorsModule,
  ]
})
export class AuthComponent {
  private readonly destroyRef = inject(DestroyRef)
  isLogin: boolean;
  authData: AuthData = {
    email: '',
    password: '',
    passwordConfirm: '',
    firstname: '',
    lastname: '',
    phone: ''
  }
  saving: boolean = false;

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {
    this.isLogin = router.url.endsWith('login');
  }

  login() {
    this.saving = true;
    this.authService.login(this.authData)
      .pipe(
        finalize(() => this.saving = false),
        takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigate(['/app/ad-orders']),
        //TODO: improve error handling, use error message from backend
        error: () => this.toastService.error("Invalid email or password")
      });
  }

  register() {
    this.saving = true;
    this.authService.register(this.authData)
      .pipe(
        finalize(() => this.saving = false),
        takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toastService.success('You registered successfully, now sign in with your email and password');
          return this.router.navigate(['/app/login']);
        },
        //TODO: improve error handling, use error message from backend
        error: () => this.toastService.error("Error while registering. Try again later")
      });
  }

  onSubmit() {
    return this.isLogin ? this.login() : this.register();
  }
}
