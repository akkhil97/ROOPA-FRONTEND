import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
  showAdmissionBanner = false;
  showDiwaliPopup = false;
  showFireworks = false;

  @ViewChild('fireworksCanvas', { static: false })
  fireworksCanvas!: ElementRef<HTMLCanvasElement>;

  /** Scroll button visibility */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showScrollTop = window.pageYOffset > 300;
  }

  /** Smooth scroll to top */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /** On component init */
  ngOnInit(): void {
    const currentMonth = new Date().getMonth();
    this.showAdmissionBanner = currentMonth >= 4 && currentMonth <= 6;

    // 🎆 Show Diwali popup and fireworks
    this.showDiwaliPopup = true;
    this.showFireworks = true;

    // Stop fireworks after 60 seconds
    setTimeout(() => (this.showFireworks = false), 60000);
  }

  /** After view init: start fireworks if active */
  ngAfterViewInit(): void {
    if (this.showFireworks) {
      this.startFireworks();
    }
  }

  /** Close popup & stop fireworks */
  closePopup(): void {
    this.showDiwaliPopup = false;
    this.showFireworks = false;
  }

  /** Main fireworks animation logic */
  startFireworks(): void {
    const canvas = this.fireworksCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const particles: FireworkParticle[] = [];

    /** Random number helper */
    const random = (min: number, max: number): number => Math.random() * (max - min) + min;

    /** Particle class */
    class FireworkParticle {
      x: number;
      y: number;
      color: string;
      radius: number;
      velocityX: number;
      velocityY: number;
      alpha: number;
      decay: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = random(1.5, 3);
        const angle = Math.random() * 2 * Math.PI;
        const speed = random(3, 8);
        this.velocityX = Math.cos(angle) * speed;
        this.velocityY = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = random(0.008, 0.015);
      }

      update(): void {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.velocityY += 0.06; // gravity
        this.alpha -= this.decay;
      }

      draw(): void {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 8);
        gradient.addColorStop(0, '#fff6cc');
        gradient.addColorStop(0.3, this.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      }
    }

    /** Create a new explosion */
    const createFirework = (): void => {
      const x = random(0, w);
      const y = random(h * 0.2, h * 0.7);
      const colors = [
        '#e8e1dcff', '#3300ff', '#ff2a00', 'rgba(255, 0, 128, 1)',
        '#ff1493', '#0011ffaf', '#ff4500', '#0ece37ff',
        '#14ff18', '#080719', '#93b923ff', '#0d0b10'
      ];

      for (let i = 0; i < 50; i++) {
        particles.push(new FireworkParticle(x, y, colors[Math.floor(Math.random() * colors.length)]));
      }
    };

    /** Animation loop */
    const animate = (): void => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // light fade trail
      ctx.fillRect(0, 0, w, h);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(i, 1);
      }

      // Spawn more fireworks
      if (Math.random() < 0.15) createFirework();

      requestAnimationFrame(animate);
    };

    animate();

    // Update canvas size on resize
    window.addEventListener('resize', () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    });
  }
}
