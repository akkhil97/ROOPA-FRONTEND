import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { NgModule } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { KindergartenComponent } from './kindergarten/kindergarten.component';
import { StaffComponent } from './staff/staff.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoggedPageComponent } from './loggedpage/loggedpage.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'hero', component: HeroComponent },
  { path: 'about', component: AboutComponent },
  { path: 'kindergarten', component: KindergartenComponent },
  // { path: 'staff', component: StaffComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'loggedpage', component: LoggedPageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollOffset: [0, 70], // Optional: offset for sticky header
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
