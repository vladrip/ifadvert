import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { CardModule } from 'primeng/card';

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
  ]
})
export class LandingComponent {

  constructor(public router: Router) {
  }
}
