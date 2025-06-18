import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-loggedpage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loggedpage.component.html',
  styleUrl: './loggedpage.component.css'
})
export class LoggedpageComponent implements OnInit {
  notices: any[] = [];
  form = {
    id: null,
    title: '',
    description: '',
    postedDate: ''  // <-- Use plain date string here
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchNotices();
  }

  fetchNotices() {
    this.http.get<any[]>('http://localhost:8080/api/notices/getall')
      .subscribe(data => this.notices = data);
  }

  saveNotice() {
    const date = this.form.postedDate;
    const payload = {
      title: this.form.title,
      description: this.form.description,
      postedDateTime: new Date(`${date}T00:00:00`)  // set time to midnight
    };

    if (this.form.id) {
      this.http.put(`http://localhost:8080/api/notices/put/${this.form.id}`, payload)
        .subscribe(() => {
          this.resetForm();
          this.fetchNotices();
        });
    } else {
      this.http.post('http://localhost:8080/api/notices/post', payload)
        .subscribe(() => {
          this.resetForm();
          this.fetchNotices();
        });
    }
  }

  editNotice(notice: any) {
    this.form = {
      id: notice.id,
      title: notice.title,
      description: notice.description,
      postedDate: notice.postedDateTime?.substring(0, 10) // YYYY-MM-DD
    };
  }

  deleteNotice(id: number) {
    this.http.delete(`http://localhost:8080/api/notices/${id}`)
      .subscribe(() => this.fetchNotices());
  }

  resetForm() {
    this.form = {
      id: null,
      title: '',
      description: '',
      postedDate: ''
    };
  }
}

