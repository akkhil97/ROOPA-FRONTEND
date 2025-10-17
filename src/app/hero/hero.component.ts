import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
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


 showDiwaliEffects: boolean = false;
festivalMessages: string[] = [];
 showDiwaliPopup = false;
 showDiwaliGreeting = false;
  showFireworks = false;
  
  fireworks = Array(150); // number of firework animations
   @ViewChild('fireworksCanvas') fireworksCanvas!: ElementRef<HTMLCanvasElement>;
 

ngOnInit(): void {
  const currentMonth = new Date().getMonth(); // 0 = Jan
  this.showAdmissionBanner = currentMonth >= 4 && currentMonth <= 6;
  const month = new Date().getMonth();
  // Show in October (9) or November (10)
  if (month === 9 || month === 10) {
    this.showDiwaliGreeting = true;
    // Hide after 6 seconds (matches animation)
    setTimeout(() => {
      this.showDiwaliGreeting = false;
    }, 6000);
  }
}

  

  ngAfterViewInit(): void {
    if (this.showFireworks) {
      this.startFireworks();
    }
  }



  startFireworks() {
    const canvas = this.fireworksCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const particles: any[] = [];

    function random(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    class Firework {
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
        this.radius = 2;
        const angle = Math.random() * 2 * Math.PI;
        const speed = random(2, 6);
        this.velocityX = Math.cos(angle) * speed;
        this.velocityY = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = random(0.01, 0.02);
      }

      update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.velocityY += 0.05; // gravity
        this.alpha -= this.decay;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 5);
        gradient.addColorStop(0, '#fff6cc');
        gradient.addColorStop(0.3, this.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      }
    }

    function createFirework() {
      const x = random(w * 0.1, w * 0.9);
      const y = random(h * 0.1, h * 0.5);
      const colors = ['#fd1f0aff', '#ff2a00ff', '#ff4800ff', '#e3491eff'];
      for (let i = 0; i < 80; i++) {
        particles.push(new Firework(x, y, colors[Math.floor(Math.random() * colors.length)]));
      }
    }

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // very light fade
ctx.fillRect(0, 0, w, h);


      particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(i, 1);
      });

      if (Math.random() < 0.05) createFirework();
      requestAnimationFrame(animate);
    }

    animate();
  }

    showPopup = false;



  closePopup(): void {
    this.showPopup = false;
  }
}
