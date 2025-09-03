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
fallbackGalleryItems = [
  {
    title: '🪔 Sankranthi 2025',
    postedDate: '2025-01-14',
    image: 'assets/UGADHI/img_17_1756883650774.jpg',
    photos: ['assets/UGADHI/img_17_1756883650774.jpg','assets/UGADHI/img_16_1756883610880.jpg']
  },
  {
    title: '👨‍⚕️ Doctors Day 2025',
    postedDate: '2025-07-01',
    image: 'assets/DOCTORS/img_14_1756883567093.jpg',
    photos: ['assets/DOCTORS/img_14_1756883567093.jpg','assets/DOCTORS/img_5_1756883400755.jpg','assets/DOCTORS/img_6_1756883415331.jpg']
  },
  {
    title: '🕉️ Krishna Janmastami',
    postedDate: '2025-08-24',
    image: 'assets/JANAMASTAMI/img_9_1756883452635.jpg',
    photos: ['assets/JANAMASTAMI/img_9_1756883452635.jpg','assets/JANAMASTAMI/img_10_1756883465104.jpg','assets/JANAMASTAMI/img_11_1756883479486.jpg','assets/JANAMASTAMI/img_12_1756883488951.jpg','assets/JANAMASTAMI/img_13_1756883503135.jpg','assets/JANAMASTAMI/img_18_1756883706959.jpg']
  },
];

loadGalleryItems(): void {
  this.adminService.getGalleryItems().subscribe({
    next: (response) => {
      const mappedItems = response.map((media) => {
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

      this.galleryItems = mappedItems.length > 0 ? mappedItems : this.fallbackGalleryItems;
    },
    error: (error) => {
      console.error('Error loading gallery items:', error);
      this.galleryItems = this.fallbackGalleryItems;
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
