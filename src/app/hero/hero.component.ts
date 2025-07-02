import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
      showAdmissionBanner = false;

    ngOnInit(): void {
    const currentMonth = new Date().getMonth(); // 0 = Jan, 6 = July
    this.showAdmissionBanner = currentMonth >= 4 && currentMonth <= 6;
  }
}
