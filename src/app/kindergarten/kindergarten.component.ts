import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-kindergarten',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './kindergarten.component.html',
  styleUrls: ['./kindergarten.component.css']
})
export class KindergartenComponent {
  selectedProgram: any = null;

  features = [
    {
      icon: '🎨',
      title: 'Creative Arts',
      description: 'Fostering creativity through art, music, and imaginative play'
    },
    {
      icon: '📚',
      title: 'Early Learning',
      description: 'Age-appropriate curriculum designed for young learners'
    },
    {
      icon: '🤝',
      title: 'Social Skills',
      description: 'Building friendships and communication skills'
    },
    {
      icon: '🏃',
      title: 'Physical Development',
      description: 'Outdoor activities and motor skill development'
    },
    {
      icon: '🧠',
      title: 'Cognitive Growth',
      description: 'Problem-solving and critical thinking activities'
    },
    {
      icon: '❤️',
      title: 'Emotional Care',
      description: 'Nurturing emotional intelligence and self-confidence'
    }
  ];

  programs = [
    {
      title: 'Nursery (2-3 years)',
      description: 'Introduction to structured learning through play',
      fullDescription: `In our Nursery program (2-3 years), children are introduced to a fun, structured learning environment. Activities include sensory play, basic motor skills, art & craft, music, and social interaction to stimulate their early development.`,
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      title: 'LKG (3-4 years)',
      description: 'Building foundation skills in reading and writing',
      fullDescription: `Our LKG (3-4 years) program focuses on building foundational skills in reading, writing, and numeracy. Children engage in phonics-based literacy, number games, creative storytelling, music & movement, and group activities to foster teamwork.`,
      image: 'https://images.pexels.com/photos/8471779/pexels-photo-8471779.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      title: 'UKG (4-5 years)',
      description: 'Preparing for primary school with advanced concepts',
      fullDescription: `Our UKG (4-5 years) program prepares children for a smooth transition to primary school. They explore advanced literacy, numeracy, early science concepts, problem-solving, public speaking, leadership activities, and creative expression.`,
      image: 'https://images.pexels.com/photos/8613097/pexels-photo-8613097.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ];

  openOverlay(program: any) {
    this.selectedProgram = program;
  }

  closeOverlay() {
    this.selectedProgram = null;
  }
}