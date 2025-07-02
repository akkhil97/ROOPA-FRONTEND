import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-loggedpage',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './loggedpage.component.html',
  styleUrls: ['./loggedpage.component.css'],
})
export class LoggedPageComponent implements OnInit {
  activeTab: string = 'notices';
  notices: any[] = [];
  galleryItems: any[] = [];

  // Notices form
  form = {
    id: null as number | null,
    title: '',
    description: '',
    postedDate: '',
  };

  // Photos form
  photos: any[] = [];
  selectedFiles: File[] = [];
  photoForm = {
    id: null as number | null,
    title: '',
    postedDate: '',
  };

  // Gallery modal
  showModal = false;
  selectedItem: any = null;
  currentPhotoIndex = 0;
  isLoggedOut = false;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('LoggedIn:', this.authService.isLoggedIn());
    if (!this.authService.isLoggedIn()) {
      this.isLoggedOut = true;
      console.log('User is logged out.');
      setTimeout(() => this.router.navigate(['/login']), 100000);
      return;
    }

    window.onbeforeunload = () => {
      sessionStorage.removeItem('loggedIn');
      sessionStorage.removeItem('username');
    };

    this.fetchNotices();
    this.loadGalleryItems();
  }

  // Notices methods
fetchNotices() {
  this.adminService.getNotices().subscribe((data) => {
    this.notices = data.map((notice) => {
      const utcDate = new Date(notice.postedDateTime);
 
      // Convert UTC date to local date (IST)
      const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in ms
      const localDate = new Date(utcDate.getTime() + istOffset);
 
      return {
        ...notice,
        postedDateTime: localDate, // override with local date
      };
    });
  });
}

  saveNotice() {
    const date = this.form.postedDate;
    const payload = {
      title: this.form.title,
      description: this.form.description,
      postedDateTime: new Date(`${date}T00:00:00`),
    };

    if (this.form.id) {
      this.adminService.saveNotice({ ...payload, id: this.form.id }).subscribe({
        next: () => {
          alert('Notice updated successfully.');
          this.resetForm();
          this.fetchNotices();
        },
        error: () => alert('Failed to update notice.')
      });
    } else {
      this.adminService.saveNotice(payload).subscribe({
        next: () => {
          alert('Notice saved successfully.');
          this.resetForm();
          this.fetchNotices();
        },
        error: () => alert('Failed to save notice.')
      });
    }
  }

  editNotice(notice: any) {
    this.form = {
      id: notice.id,
      title: notice.title,
      description: notice.description,
      postedDate: notice.postedDateTime?.substring(0, 10),
    };
  }

  deleteNotice(id: number) {
    this.adminService.deleteNotice(id).subscribe({
      next: () => {
        alert('Notice deleted.');
        this.fetchNotices();
      },
      error: () => alert('Failed to delete notice.')
    });
  }

  resetForm() {
    this.form = {
      id: null,
      title: '',
      description: '',
      postedDate: '',
    };
  }

  // Gallery methods
  onFileSelected(event: any) {
    const fileList: FileList = event.target.files;
    this.selectedFiles = Array.from(fileList).slice(0, 20);
  }

  uploadPhotos() {
    if (this.selectedFiles.length === 0) return;

    const formData = new FormData();
    this.selectedFiles.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('title', this.photoForm.title);

    this.adminService.uploadPhotos(formData).subscribe({
      next: () => {
        alert('Photos uploaded.');
        this.selectedFiles = [];
        this.resetPhotoForm();
        this.loadGalleryItems();
      },
      error: () => alert('Photo upload failed.')
    });
  }

  updatePhoto() {
    if (this.selectedFiles.length === 0 || this.photoForm.id === null) return;

    const formData = new FormData();
    this.selectedFiles.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('title', this.photoForm.title);

    this.adminService.updatePhoto(this.photoForm.id, formData).subscribe({
      next: () => {
        alert('Photo updated.');
        this.selectedFiles = [];
        this.resetPhotoForm();
        this.loadGalleryItems();
      },
      error: () => alert('Failed to update photo.')
    });
  }

  editPhoto(photo: any) {
    this.photoForm.id = photo.id;
    this.photoForm.title = photo.title;
  }

  deletePhoto(id: number) {
    this.adminService.deletePhoto(id).subscribe({
      next: () => {
        alert('Photo deleted.');
        this.loadGalleryItems();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete photo.');
      }
    });
  }

  resetPhotoForm() {
    this.photoForm = {
      id: null,
      title: '',
      postedDate: '',
    };
  }

  loadGalleryItems(): void {
    this.adminService.getGalleryItems().subscribe({
      next: (response) => {
        this.galleryItems = response.map((media) => {
          const photos: string[] = [];
          for (let i = 1; i <= 20; i++) {
            const photoKey = `photo${i}`;
            if (media[photoKey]) {
              photos.push(`data:image/jpeg;base64,${media[photoKey]}`);
            }
          }
          return {
            id: media.id,
            title: media.title,
            postedDate: media.postedDate,
            image: photos[0],
            photos: photos,
          };
        });
      },
      error: (error) => {
        console.error('Error loading gallery items:', error);
        alert('Failed to load gallery.');
      },
    });
  }

  openGallery(item: any): void {
    this.selectedItem = item;
    this.currentPhotoIndex = 0;
    this.showModal = true;
  }

  closeGallery(): void {
    this.showModal = false;
    this.selectedItem = null;
    this.currentPhotoIndex = 0;
  }

  nextImage(event: Event): void {
    event.stopPropagation();
    if (this.selectedItem) {
      this.currentPhotoIndex =
        (this.currentPhotoIndex + 1) % this.selectedItem.photos.length;
    }
  }

  prevImage(event: Event): void {
    event.stopPropagation();
    if (this.selectedItem) {
      this.currentPhotoIndex =
        (this.currentPhotoIndex - 1 + this.selectedItem.photos.length) %
        this.selectedItem.photos.length;
    }
  }

  downloadImage(imageUrl: string): void {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = 'gallery-photo.jpg';
    a.click();
  }
}
