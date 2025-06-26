import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  galleryItems: any[] = [];
  showModal = false;
  selectedItem: any = null;
  currentPhotoIndex = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadGalleryItems();
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

  formatPostedDate(postedDate: string): string {
    if (!postedDate) return 'Date unknown';
    const postDate = new Date(postedDate);
    const today = new Date();
    const diffTime = today.getTime() - postDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 3) {
      return '✨ NEW';
    } else if (diffDays <= 10) {
      return `Posted ${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      const dd = String(postDate.getDate()).padStart(2, '0');
      const mm = String(postDate.getMonth() + 1).padStart(2, '0');
      const yyyy = postDate.getFullYear();
      return `Posted on ${dd}/${mm}/${yyyy}`;
    }
  }
}
