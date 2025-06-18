import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactComponent } from "./contact/contact.component";
import { HeaderComponent } from "./header/header.component";
import { HeroComponent } from "./hero/hero.component";
import { NoticeBoardComponent } from "./notice-board/notice-board.component";
import { AboutComponent } from "./about/about.component";
import { InfoCardsComponent } from "./info-cards/info-cards.component";
import { KindergartenComponent } from "./kindergarten/kindergarten.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { StaffComponent } from "./staff/staff.component";
import { FooterComponent } from "./footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ROOPA-FRONTEND';
    showScrollTop = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTop = window.pageYOffset > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
