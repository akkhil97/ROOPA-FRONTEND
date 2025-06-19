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

  newUsername = '';
  newPassword = '';
  confirmPassword = '';
  passwordError = '';

  constructor(public authService: AuthService, public router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // navigate to home after logout
  }

  toggleSettingsPopup() {
    this.isSettingsOpen = !this.isSettingsOpen;
    if (this.isSettingsOpen) {
      // Pre-fill with current username when opening
      this.newUsername = this.authService.getCurrentUsername();
      this.newPassword = '';
      this.confirmPassword = '';
      this.passwordError = '';
    }
  }

  saveCredentials() {
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

    this.passwordError = '';

    this.authService
      .updateCredentials(this.newUsername, this.newPassword)
      .subscribe({
        next: (response: string) => {
          alert(response); // show response popup
          if (response.includes('success')) {
            this.authService.setCurrentUsername(this.newUsername);
          }
          this.toggleSettingsPopup(); // close popup
        },
        error: (err) => {
          console.error('Update failed', err);
          alert('Failed to update credentials.');
        },
      });
  }

  // Your original nav items — untouched
  menuItems = [
    { name: 'Home', link: '#home' },
    { name: 'About', link: '#about' },
    { name: 'Notice Board', link: '#notice-board' },
    { name: 'Kindergarten', link: '#kindergarten' },
    { name: 'Gallery', link: '#gallery' },
    { name: 'Contact', link: '#contact' },
  ];

  // Separate route-based item — untouched
  loginItem = { name: 'Admin Login', route: '/login' };

  // Helper → check if on logged page
  isLoggedPage(): boolean {
    return this.router.url.startsWith('/logged');
  }
}
