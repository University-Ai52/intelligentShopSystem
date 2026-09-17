import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: '../auth.css'
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  loading = false;
  errorMessage = '';
  successMessage = '';
  registerData = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

  async register(): Promise<void> {
    this.errorMessage = '';
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.loading = true;
    const { firstName, lastName, email, password } = this.registerData;

    try {
      await this.authService.register({ firstName, lastName, email, password });
      this.successMessage = 'Account created successfully!';
      this.router.navigate(['/home']);
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  goToLogin(): void { this.router.navigate(['/login']); }
}