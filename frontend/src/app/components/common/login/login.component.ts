import { Component, DestroyRef, inject } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Credentials } from '../../../models/Credentials';
import { AuthService } from '../../../services/AuthService';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    PasswordModule,
    CheckboxModule,
    RouterLink,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RippleModule
  ]
})
export class LoginComponent {
  private readonly destroyRef = inject(DestroyRef)
  credentials: Credentials = {
    email: '',
    password: ''
  }
  isLoading: boolean = false

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    this.isLoading = true;
    this.authService.login(this.credentials)
      .pipe(
        finalize(() => this.isLoading = false),
        takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigate(['/app/ad-orders']),
        error: console.error
      });
  }
}