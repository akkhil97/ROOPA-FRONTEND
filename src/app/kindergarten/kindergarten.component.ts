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
      title: 'Nursery',
      description: 'Introduction to structured learning through play',
      fullDescription: `In our Nursery program (2-3 years), children are introduced to a fun, structured learning environment. Activities include sensory play, basic motor skills, art & craft, music, and social interaction to stimulate their early development.`,
      image: 'https://www.shutterstock.com/shutterstock/videos/1089298003/thumb/1.jpg?ip=x480'
    },
    {
      title: 'Primary School',
      description: 'Building foundation skills in reading and writing',
      fullDescription: `Our LKG (3-4 years) program focuses on building foundational skills in reading, writing, and numeracy. Children engage in phonics-based literacy, number games, creative storytelling, music & movement, and group activities to foster teamwork.`,
      image: 'https://media.istockphoto.com/id/1163980571/photo/schoolboys-and-schoolgirls-walking-of-the-school-bus.jpg?s=612x612&w=0&k=20&c=KfmKPfz-MEZQgVTKSycko4a36vimTUGBogwsBsoz1vQ='
    },
    {
      title: 'Secondary School',
      description: 'Preparing for primary school with advanced concepts',
      fullDescription: `Our UKG (4-5 years) program prepares children for a smooth transition to primary school. They explore advanced literacy, numeracy, early science concepts, problem-solving, public speaking, leadership activities, and creative expression.`,
      image: 'https://images.hindustantimes.com/img/2022/01/07/550x309/e5a0f698-68c0-11ec-8650-baa05d62cfe0_1640793984235_1641534508870.jpg'
    }
  ];

  openOverlay(program: any) {
    this.selectedProgram = program;
  }

  closeOverlay() {
    this.selectedProgram = null;
  }
}