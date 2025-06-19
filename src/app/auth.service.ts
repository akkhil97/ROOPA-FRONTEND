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

  updateCredentials(username: string, password: string): Observable<any> {
    const userData = { username, password };
    return this.http.put('http://localhost:8080/api/admin/update', userData, {
      responseType: 'text',
    });
  }
}
