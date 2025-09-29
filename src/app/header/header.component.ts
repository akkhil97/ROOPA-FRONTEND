import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isMenuOpen = false;
  isSettingsOpen = false;

  email = '';
  otp = '';
  newPassword = '';
  confirmPassword = '';
  passwordError = '';

  constructor(public adminService: AdminService, public router: Router, public authService: AuthService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleSettingsPopup() {
    this.isSettingsOpen = !this.isSettingsOpen;
    if (this.isSettingsOpen) {
      this.email = this.authService.getCurrentUsername(); // pre-fill email
      this.otp = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.passwordError = '';
    }
  }

  sendOtp() {
    if (!this.email) {
      alert('Please enter your email.');
      return;
    }

    this.adminService.sendOtp(this.email).subscribe({
      next: (response: string) => {
        alert(response);
      },
      error: (err) => {
        console.error('Failed to send OTP', err);
        alert('Failed to send OTP.');
      },
    });
  }

changePassword() {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{6,}$/;

  // 1. Validate password format
  if (!passwordRegex.test(this.newPassword)) {
    this.passwordError =
      'Password must include at least 1 uppercase letter, 1 special character, 1 number, and be at least 6 characters.';
    return;
  }

  // 2. Match confirm password
  if (this.newPassword !== this.confirmPassword) {
    this.passwordError = 'Passwords do not match.';
    return;
  }

  // 3. OTP required
  if (!this.otp) {
    this.passwordError = 'Please enter the OTP sent to your email.';
    return;
  }

  // 4. Clear errors before API call
  this.passwordError = '';

  // 5. Call backend API
  this.adminService.changePassword(this.email, this.otp, this.newPassword).subscribe({
    next: (response: string) => {
      alert(response);
      if (response.includes('successfully')) {
        this.authService.setCurrentUsername(this.email); // Optional
        this.toggleSettingsPopup(); // Close modal
      } else {
        this.passwordError = response; // Show backend errors like "same password"
      }
    },
    error: (err) => {
      console.error('Failed to change password', err);
      this.passwordError = err.error || 'Failed to change password.';
    },
  });
}



  // No change to nav items
  menuItems = [
    { name: 'Home', link: '#home' },
    { name: 'About', link: '#about' },
    { name: 'Notice Board', link: '#notice-board' },
    { name: 'Kindergarten', link: '#kindergarten' },
    // { name: 'Gallery', link: '#gallery' },
    { name: 'Contact', link: '#contact' },
  ];

  loginItem = { name: 'Admin Login', route: '/login' };

  isLoggedPage(): boolean {
    return this.router.url.startsWith('/logged');
  }
}

