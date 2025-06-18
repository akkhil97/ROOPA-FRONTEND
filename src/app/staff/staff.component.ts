import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent {
  staffMembers = [
    {
      name: 'Dr. Priya Sharma',
      position: 'Principal',
      qualification: 'M.Ed, Ph.D in Educational Leadership',
      experience: '25+ years',
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Leading with vision and dedication to educational excellence'
    },
    {
      name: 'Mrs. Anita Reddy',
      position: 'Vice Principal',
      qualification: 'M.A, B.Ed',
      experience: '20+ years',
      image: 'https://images.pexels.com/photos/8471779/pexels-photo-8471779.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Committed to nurturing young minds with care and compassion'
    },
    {
      name: 'Mr. Rajesh Kumar',
      position: 'Academic Coordinator',
      qualification: 'M.Sc, B.Ed',
      experience: '18+ years',
      image: 'https://images.pexels.com/photos/5427659/pexels-photo-5427659.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Ensuring academic excellence through innovative teaching methods'
    },
    {
      name: 'Ms. Kavitha Nair',
      position: 'Kindergarten Head',
      qualification: 'M.A Child Psychology, B.Ed',
      experience: '15+ years',
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Specializing in early childhood development and learning'
    },
    {
      name: 'Mrs. Sunitha Rao',
      position: 'Senior Teacher',
      qualification: 'M.A English, B.Ed',
      experience: '12+ years',
      image: 'https://images.pexels.com/photos/5427659/pexels-photo-5427659.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Passionate about language arts and creative writing'
    },
    {
      name: 'Mr. Venkat Rao',
      position: 'Sports Coordinator',
      qualification: 'M.P.Ed',
      experience: '10+ years',
      image: 'https://images.pexels.com/photos/5427659/pexels-photo-5427659.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Promoting physical fitness and sportsmanship among students'
    }
  ];
}