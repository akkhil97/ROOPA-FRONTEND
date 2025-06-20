import { Component } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { NoticeBoardComponent } from "../notice-board/notice-board.component";
import { AboutComponent } from "../about/about.component";
import { KindergartenComponent } from "../kindergarten/kindergarten.component";
import { InfoCardsComponent } from "../info-cards/info-cards.component";
import { GalleryComponent } from "../gallery/gallery.component";
import { StaffComponent } from "../staff/staff.component";
import { ContactComponent } from "../contact/contact.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, AboutComponent, KindergartenComponent, GalleryComponent, ContactComponent, NoticeBoardComponent, StaffComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

