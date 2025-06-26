import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  showRegister: boolean = false;
  passwordError: string = '';
  isRegisterAllowed: boolean = false;
  showPassword: boolean = false;
  showRegisterPassword: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/loggedpage']);
    } else {
      this.getUsers();
    }
  }

  toggleForm() {
    this.showRegister = !this.showRegister;
    this.passwordError = '';
    this.registerEmail = '';
    this.registerPassword = '';
  }

  getUsers(): void {
    this.adminService.getUsers().subscribe({
      next: (users) => {
        console.log('Users fetched:', users);
        this.isRegisterAllowed = users.length < 3;
        console.log('isRegisterAllowed:', this.isRegisterAllowed);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.isRegisterAllowed = false;
      },
    });
  }

  onSubmit() {
    const payload = { username: this.email, password: this.password };
    this.adminService.login(payload.username, payload.password).subscribe({
      next: (response) => {
        alert(response);
        if (response === 'Login successful!') {
          this.authService.login();
          this.router.navigate(['/loggedpage']);
        }
      },
      error: (error) => {
        alert('Login failed. Please try again.');
        console.error('Login Error:', error);
      },
    });
  }

  onRegister() {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/;
    if (!regex.test(this.registerPassword)) {
      this.passwordError =
        'Password must include 1 uppercase letter, 1 special character, and 1 number.';
      return;
    }
    this.adminService.register(this.registerEmail, this.registerPassword).subscribe({
      next: (response) => {
        alert(response);
        this.toggleForm();
      },
      error: (error) => {
        alert('Registration failed. Please try again.');
        console.error('Register Error:', error);
      },
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleRegisterPasswordVisibility() {
    this.showRegisterPassword = !this.showRegisterPassword;
  }

  onForgotPassword(event: Event) {
    event.preventDefault();
    this.router.navigate(['/forgot-password']);
  }
}
