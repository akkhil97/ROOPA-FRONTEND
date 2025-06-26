import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // User methods
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/api/admin/all`);
  }

  login(username: string, password: string): Observable<string> {
    return this.http.post(
      `${this.apiBaseUrl}/api/admin/login`,
      { username, password },
      { responseType: 'text' }
    );
  }

  register(username: string, password: string): Observable<string> {
    return this.http.post(
      `${this.apiBaseUrl}/api/admin/register`,
      { username, password },
      { responseType: 'text' }
    );
  }

  // Notice methods
  getNotices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/api/notices/getall`);
  }

  saveNotice(notice: any): Observable<any> {
    if (notice.id) {
      return this.http.put(
        `${this.apiBaseUrl}/api/notices/put/${notice.id}`,
        notice
      );
    } else {
      return this.http.post(`${this.apiBaseUrl}/api/notices/post`, notice);
    }
  }

  deleteNotice(id: number): Observable<string> {
    return this.http.delete(`${this.apiBaseUrl}/api/notices/${id}`, {
      responseType: 'text',
    });
  }

  // Media methods
  uploadPhotos(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/api/media/upload`, formData);
  }

  updatePhoto(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/api/media/update/${id}`, formData);
  }

  deletePhoto(id: number): Observable<string> {
    return this.http.delete(`${this.apiBaseUrl}/api/media/${id}`, {
      responseType: 'text',
    });
  }

  getGalleryItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/api/media`);
  }

  // Forgot/Reset Password methods
  sendOtp(email: string): Observable<string> {
    return this.http.post(
      `${this.apiBaseUrl}/api/admin/send-otp`,
      { email },
      { responseType: 'text' }
    );
  }

  resetPassword(
    email: string,
    otp: string,
    newPassword: string
  ): Observable<string> {
    const params = new URLSearchParams();
    params.set('email', email);
    params.set('otp', otp);
    params.set('newPassword', newPassword);

    return this.http.post(
      `${this.apiBaseUrl}/api/admin/reset-password?${params.toString()}`,
      {},
      { responseType: 'text' }
    );
  }

changePassword(email: string, otp: string, newPassword: string): Observable<string> {
  return this.http.post(
    `${this.apiBaseUrl}/api/admin/change-password`,
    {
      email,
      otp,
      newPassword
    },
    {
      responseType: 'text' as 'text'  // ✅ explicitly cast
    }
  );
}
}
