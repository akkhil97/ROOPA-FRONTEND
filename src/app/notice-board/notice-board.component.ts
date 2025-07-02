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
      this.notices = data.map((notice) => {
        // Convert UTC string to Date
        const utcDate = new Date(notice.postedDateTime);
 
        // Convert to IST (Indian Standard Time)
        const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
        const istDate = new Date(utcDate.getTime() + istOffset);
 
        return {
          date: istDate.toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          title: notice.title,
          content: notice.description,
        };
      });
    },
    error: (err) => {
      console.error('Error fetching notices:', err);
    },
  });
}
}
