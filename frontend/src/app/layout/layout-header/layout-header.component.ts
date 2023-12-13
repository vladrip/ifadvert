import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent {
  menuItems: MenuItem[] = [
    {
      label: 'My ad orders',
      icon: 'fa fa-briefcase',
      command: () => this.router.navigate(['/app/ad-orders']),
    },
    {
      label: 'Logout',
      icon: 'fa fa-right-from-bracket',
      command: () => {
        this.authService.logout();
        return this.router.navigate(['/app/login'])
      },
    }
  ]

  constructor(private router: Router, private authService: AuthService) {
  }
}
