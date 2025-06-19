import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-loggedpage',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './loggedpage.component.html',
  styleUrls: ['./loggedpage.component.css'],
})
export class LoggedPageComponent implements OnInit {
  activeTab: string = 'notices';

  // Notices
  notices: any[] = [];
  form = {
    id: null as number | null,
    title: '',
    description: '',
    postedDate: '',
  };

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

isLoggedOut = false;

ngOnInit() {
  console.log('LoggedIn:', this.authService.isLoggedIn());

  if (!this.authService.isLoggedIn()) {
    this.isLoggedOut = true;
    console.log('User is logged out.');

    setTimeout(() => this.router.navigate(['/login']), 7000);
    return;
  }

  window.onbeforeunload = () => {
  sessionStorage.removeItem('loggedIn');
  sessionStorage.removeItem('username');
};


  this.fetchNotices();
  this.loadGalleryItems();
}


  // --- Notices ---
  fetchNotices() {
    this.http
      .get<any[]>('http://localhost:8080/api/notices/getall')
      .subscribe((data) => (this.notices = data));
  }

saveNotice() {
  const date = this.form.postedDate;
  const payload = {
    title: this.form.title,
    description: this.form.description,
    postedDateTime: new Date(`${date}T00:00:00`),
  };

  if (this.form.id) {
    this.http
      .put(`http://localhost:8080/api/notices/put/${this.form.id}`, payload)
      .subscribe({
        next: () => {
          alert('Notice updated successfully.');
          this.resetForm();
          this.fetchNotices();
        },
        error: () => alert('Failed to update notice.')
      });
  } else {
    this.http
      .post('http://localhost:8080/api/notices/post', payload)
      .subscribe({
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
  this.http
    .delete(`http://localhost:8080/api/notices/${id}`, { responseType: 'text' })
    .subscribe({
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

  // --- Gallery (Media) ---

  photos: any[] = [];
  selectedFiles: File[] = [];
  photoForm = {
    id: null as number | null,
    title: '',
    postedDate: '',
  };

  onFileSelected(event: any) {
    const fileList: FileList = event.target.files;
    this.selectedFiles = Array.from(fileList).slice(0, 20); // Max 20 files
  }

uploadPhotos() {
  if (this.selectedFiles.length === 0) return;

  const formData = new FormData();
  this.selectedFiles.forEach((file) => {
    formData.append('files', file);
  });
  formData.append('title', this.photoForm.title);

  this.http
    .post('http://localhost:8080/api/media/upload', formData)
    .subscribe({
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

  this.http
    .put(
      `http://localhost:8080/api/media/update/${this.photoForm.id}`,
      formData
    )
    .subscribe({
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
    // Optionally pre-fill postedDate if you are storing it
  }


  deletePhoto(id: number) {
  this.http
    .delete(`http://localhost:8080/api/media/${id}`, { responseType: 'text' })
    .subscribe({
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

  // --- Gallery Viewer ---
  galleryItems: any[] = [];
  showModal = false;
  selectedItem: any = null;
  currentPhotoIndex = 0;
  updateMode = false;
  updatedPhotoFile: File | null = null;

loadGalleryItems(): void {
  this.http.get<any[]>('http://localhost:8080/api/media').subscribe({
    next: (response) => {
      // alert('Gallery loaded.');
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
    this.updateMode = false;
    this.updatedPhotoFile = null;
  }

  closeGallery(): void {
    this.showModal = false;
    this.selectedItem = null;
    this.currentPhotoIndex = 0;
    this.updateMode = false;
    this.updatedPhotoFile = null;
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

  toggleUpdateMode(): void {
    this.updateMode = !this.updateMode;
  }

  onUpdatePhotoSelected(event: any): void {
    this.updatedPhotoFile = event.target.files[0];
  }

updateSinglePhoto(): void {
  if (
    !this.selectedItem ||
    this.updatedPhotoFile == null ||
    this.selectedItem.id == null
  ) {
    alert('Missing photo or item for update.');
    return;
  }

  const formData = new FormData();
  formData.append('photo', this.updatedPhotoFile);

  const galleryId = this.selectedItem.id;
  const photoIndex = this.currentPhotoIndex;

  this.http
    .put(
      `http://localhost:8080/api/media/update/${galleryId}/${photoIndex}`,
      formData
    )
    .subscribe({
      next: () => {
        alert('Single photo updated.');
        this.loadGalleryItems();
        this.closeGallery();
      },
      error: () => alert('Failed to update single photo.')
    });
}

  
}
