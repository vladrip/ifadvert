import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AdOrderHttpService } from '@apiServices/ad-order-http.service';
import { AdOrder } from '@models/AdOrder';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdType } from '@models/enums/AdType';
import { Status } from '@models/enums/Status';
import { FilterMatchMode, MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { getAdTypeIcon } from '@utils/IconMappings';

@Component({
  selector: 'app-order-list',
  templateUrl: './ad-orders.component.html',
  styleUrls: ['./ad-orders.component.scss']
})
export class AdOrdersComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  protected readonly getAdTypeIcon = getAdTypeIcon;
  protected readonly FilterMatchMode = FilterMatchMode;

  adOrders: AdOrder[] = [];
  loading = true;
  adTypes = Object.values(AdType);
  statuses = Object.values(Status);
  selected?: AdOrder;
  contextMenuItems: MenuItem[] = [];

  constructor(private adOrderHttpService: AdOrderHttpService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.adOrderHttpService.getAll()
      .pipe(
        finalize(() => this.loading = false),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: adOrders => this.adOrders = adOrders,
        error: error => console.error(error)
      });

    this.initContextMenu();
  }

  initContextMenu() {
    this.contextMenuItems = [
      {
        label: 'Edit',
        icon: 'fa fa-pencil',
        command: () => this.router.navigate(['item', this.selected?.id], {relativeTo: this.route})
      },
      {
        label: 'View',
        icon: 'fa fa-eye',
        command: () => this.router.navigate(['view', this.selected?.id], {relativeTo: this.route})
      }
    ];
  }
}
