import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notice-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.css']
})
export class NoticeBoardComponent implements OnInit {
  notices: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchNotices();
  }

  fetchNotices(): void {
    this.http.get<any[]>('http://localhost:8080/api/notices/getall').subscribe({
      next: (data) => {
        // Transforming backend response to UI structure
        this.notices = data.map(notice => ({
          date: new Date(notice.postedDateTime).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
          }),
          title: notice.title,
          content: notice.description,
        }));
      },
      error: (err) => {
        console.error('Error fetching notices:', err);
      }
    });
  }
}
