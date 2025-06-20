import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotEmail: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onForgotPassword() {
    if (!this.forgotEmail) {
      alert('Please enter your email.');
      return;
    }

    this.authService.sendOtp(this.forgotEmail).subscribe({
      next: (response) => {
        alert(response);   // shows "OTP sent successfully"
        this.forgotEmail = '';
        
        // Navigate to Reset Password page and pass email (optional)
        this.router.navigate(['/reset-password'], { queryParams: { email: this.forgotEmail } });
      },
      error: (error) => {
        alert('Error sending reset email. Please try again.');
        console.error('Forgot Password Error:', error);
      },
    });
  }

  goBackToLogin() {
    this.router.navigate(['/login']);
  }
}
