import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-notice-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.css'],
})
export class NoticeBoardComponent implements OnInit {
  notices: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchNotices();
  }

  fetchNotices(): void {
    this.adminService.getNotices().subscribe({
      next: (data) => {
        this.notices = data.map((notice) => ({
          date: new Date(notice.postedDateTime).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          title: notice.title,
          content: notice.description,
        }));
      },
      error: (err) => {
        console.error('Error fetching notices:', err);
      },
    });
  }
}
