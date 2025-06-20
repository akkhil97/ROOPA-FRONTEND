import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  otp: string = '';
  newPassword: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  onResetPassword() {
    if (!this.email || !this.otp || !this.newPassword) {
      alert('Please fill all fields.');
      return;
    }

    this.authService.resetPassword(this.email, this.otp, this.newPassword).subscribe({
      next: (response) => {
        alert(response);
        if (response.includes('successful')) {
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        alert('Error resetting password. Please try again.');
        console.error('Reset Password Error:', error);
      },
    });
  }

  goBackToLogin() {
    this.router.navigate(['/login']);
  }
}
