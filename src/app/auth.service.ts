import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UserLog {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;
  private currentUsername = 'ROOPASCHOOLADMIN';

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return sessionStorage.getItem('loggedIn') === 'true';
  }

  login() {
    sessionStorage.setItem('loggedIn', 'true');
  }

  logout() {
    sessionStorage.removeItem('loggedIn');
  }

  getCurrentUsername(): string {
    return sessionStorage.getItem('username') || '';
  }

  setCurrentUsername(username: string) {
    sessionStorage.setItem('username', username);
  }

  private baseUrl = 'http://localhost:8080/api/admin';

sendOtp(email: string): Observable<string> {
  return this.http.post(
    this.baseUrl + '/send-otp',
    { email: email }, // ✅ match the backend
    { responseType: 'text' }
  );
}

  resetPassword(
    email: string,
    otp: string,
    newPassword: string
  ): Observable<string> {
    return this.http.post(
      `${this.baseUrl}/reset-password?email=${encodeURIComponent(
        email
      )}&otp=${encodeURIComponent(otp)}&newPassword=${encodeURIComponent(
        newPassword
      )}`,
      {},
      { responseType: 'text' }
    );
  }
}
