import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AuthService } from '@services/auth.service';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  standalone: true,
  imports: [
    RippleModule,
    StyleClassModule,
    ButtonModule,
    RouterLink,
    NgOptimizedImage,
    CardModule,
    NgIf,
    AsyncPipe,
    AvatarModule,
  ]
})
export class LandingComponent {

  constructor(public router: Router, protected authService: AuthService) {
  }
}
