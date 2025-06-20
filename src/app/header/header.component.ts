import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

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

  constructor(public authService: AuthService, public router: Router) {}

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

    this.authService.sendOtp(this.email).subscribe({
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
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{6,}$/;

    if (!regex.test(this.newPassword)) {
      this.passwordError =
        'Password must include at least 1 uppercase letter, 1 special character, 1 number, and be at least 6 characters.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'Passwords do not match.';
      return;
    }

    if (!this.otp) {
      this.passwordError = 'Please enter OTP.';
      return;
    }

    this.passwordError = '';

    this.authService
      .resetPassword(this.email, this.otp, this.newPassword)
      .subscribe({
        next: (response: string) => {
          alert(response);
          if (response.includes('successful')) {
            this.authService.setCurrentUsername(this.email);
          }
          this.toggleSettingsPopup();
        },
        error: (err) => {
          console.error('Failed to change password', err);
          alert('Failed to change password.');
        },
      });
  }


  // No change to nav items
  menuItems = [
    { name: 'Home', link: '#home' },
    { name: 'About', link: '#about' },
    { name: 'Notice Board', link: '#notice-board' },
    { name: 'Kindergarten', link: '#kindergarten' },
    { name: 'Gallery', link: '#gallery' },
    { name: 'Contact', link: '#contact' },
  ];

  loginItem = { name: 'Admin Login', route: '/login' };

  isLoggedPage(): boolean {
    return this.router.url.startsWith('/logged');
  }
}

