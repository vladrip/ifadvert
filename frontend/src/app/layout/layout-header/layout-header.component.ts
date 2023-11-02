import { Component } from '@angular/core';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent {
  menuItems: MenuItem[] = [
    {
      label: 'My ad orders',
      icon: 'fa fa-briefcase'
    },
    {
      label: 'Logout',
      icon: 'fa fa-right-from-bracket'
    }
  ]
}
