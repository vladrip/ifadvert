import { RouterModule, Routes } from '@angular/router';
import { AdOrdersComponent } from './components/ad-orders/ad-orders.component';
import { AdOrderItemComponent } from './components/ad-orders/ad-order-item/ad-order-item.component';
import { LayoutComponent } from './layout/layout.component';
import { authenticatedGuard } from './guards/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/common/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/common/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'app',
    component: LayoutComponent,
    canMatch: [authenticatedGuard],
    children: [
      {path: 'ad-orders', component: AdOrdersComponent},
      {path: 'ad-orders/item', component: AdOrderItemComponent},
      {path: 'ad-orders/item/:id', component: AdOrderItemComponent},
    ]
  }
];

export const routing = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: false, scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled'});