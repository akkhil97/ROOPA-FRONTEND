import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotEmail: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  onForgotPassword() {
    if (!this.forgotEmail) {
      alert('Please enter your email.');
      return;
    }

    this.adminService.sendOtp(this.forgotEmail).subscribe({
      next: (response) => {
        alert(response);
        this.router.navigate(['/reset-password'], {
          queryParams: { email: this.forgotEmail },
        });
        this.forgotEmail = '';
      },
      error: (error) => {
        if (error.status === 404) {
          alert(
            'No user is registered with this email. Please check and try again.'
          );
        } else {
          alert('Something went wrong. Please try again later.');
        }
        console.error('Forgot Password Error:', error);
      },
    });
  }

  goBackToLogin() {
    this.router.navigate(['/login']);
  }
}
