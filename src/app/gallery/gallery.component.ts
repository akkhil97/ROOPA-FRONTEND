import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  galleryItems = [
    {
      title: 'Annual Day Celebration',
      description: 'Students showcasing their talents in our grand annual celebration',
      image: 'https://images.pexels.com/photos/5427659/pexels-photo-5427659.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      title: 'Morning Assembly',
      description: 'Daily morning assembly fostering discipline and unity',
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      title: 'Science Exhibition',
      description: 'Young scientists presenting their innovative projects',
      image: 'https://images.pexels.com/photos/5427659/pexels-photo-5427659.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      title: 'Sports Day',
      description: 'Athletic competitions promoting physical fitness and teamwork',
      image: 'https://images.pexels.com/photos/5427659/pexels-photo-5427659.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      title: 'Cultural Program',
      description: 'Traditional and modern performances celebrating our heritage',
      image: 'https://images.pexels.com/photos/1181539/pexels-photo-1181539.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      title: 'Kindergarten Activities',
      description: 'Our little busy bees engaged in fun learning activities',
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      title: 'Library Session',
      description: 'Students exploring the world of knowledge through reading',
      image: 'https://images.pexels.com/photos/8471779/pexels-photo-8471779.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      title: 'Art & Craft Workshop',
      description: 'Creative workshops nurturing artistic talents',
      image: 'https://images.pexels.com/photos/8613097/pexels-photo-8613097.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },

  ];
}