import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: '../auth.css'
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isDarkMode = false;
  loading = false;
  errorMessage = '';
  successMessage = '';
  loginData = { email: '', password: '' };

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark' || (savedTheme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  login(): void {
    this.errorMessage = '';
    this.loading = true;
    this.authService.login(this.loginData).subscribe({
      next: () => { this.loading = false; this.successMessage = 'Login successful!'; },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error?.error?.message || 'Email or password is incorrect.';
      }
    });
  }

  goToRegister(): void { this.router.navigate(['/register']); }
}