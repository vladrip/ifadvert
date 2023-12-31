import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LayoutComponent } from '@layout/layout.component';
import { LayoutHeaderComponent } from '@layout/layout-header/layout-header.component';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdOrdersComponent } from '@components/ad-orders/ad-orders.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BooleanIconComponent } from '@components/shared/boolean-icon/boolean-icon.component';
import { AdOrderItemComponent } from '@components/ad-orders/ad-order-item/ad-order-item.component';
import { ContextMenuModule } from 'primeng/contextmenu';
import { routing } from './app-routing';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { AdOrderViewComponent } from '@components/ad-orders/ad-order-view/ad-order-view.component';
import { TagModule } from 'primeng/tag';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { CalendarModule } from 'primeng/calendar';
import { AuthInterceptor } from '@interceptors/auth.interceptor';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgxErrorsModule } from "@ngspot/ngx-errors";
import { ValidatorsModule } from '@app/directives/validators/validators.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LayoutHeaderComponent,
    AdOrdersComponent,
    BooleanIconComponent,
    AdOrderItemComponent,
    AdOrderViewComponent,
  ],
  imports: [
    routing,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    AvatarModule,
    MenuModule,
    PasswordModule,
    CheckboxModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    RippleModule,
    TableModule,
    DropdownModule,
    HttpClientModule,
    ContextMenuModule,
    ProgressSpinnerModule,
    CardModule,
    RadioButtonModule,
    InputNumberModule,
    TagModule,
    GalleriaModule,
    NgOptimizedImage,
    ImageModule,
    CalendarModule,
    ToastModule,
    NgxErrorsModule,
    ValidatorsModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
