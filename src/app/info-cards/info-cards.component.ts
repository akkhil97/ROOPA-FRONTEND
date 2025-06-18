import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-info-cards',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.css']
})
export class InfoCardsComponent {
  cards = [
    {
      title: "From Principal's Desk",
      content: "Education is the mind is just as important as educating the hand. We make better humans.",
      image: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      buttonText: "Read More"
    },
    {
      title: "School History",
      content: "Since 1963, Roopa School has been a place where students discover their potential.",
      image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      buttonText: "Read More"
    },
    {
      title: "Mission & Vision",
      content: "To nurture students with values, intellect, and character for tomorrow's challenges.",
      image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      buttonText: "Read More"
    }
  ];
}