import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AdOrderHttpService } from '../../api/services/ad-order-http.service';
import { AdOrder } from '../../api/models/ad-order';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdType } from '../../api/models/enums/ad-type';
import { Status } from '../../api/models/enums/status';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { TableContextMenuSelectEvent } from 'primeng/table';
import { getAdTypeIcon } from '../../utils/Mappings';

@Component({
  selector: 'app-order-list',
  templateUrl: './ad-orders.component.html',
  styleUrls: ['./ad-orders.component.scss']
})
export class AdOrdersComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef)
  adOrders: AdOrder[] = []
  isLoading = true
  adTypes = Object.values(AdType)
  statuses = Object.values(Status)
  selected?: AdOrder
  contextMenuItems: MenuItem[] = []

  constructor(private adOrderHttpService: AdOrderHttpService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.adOrderHttpService.getAll()
      .pipe(
        finalize(() => this.isLoading = false),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: adOrders => this.adOrders = adOrders,
        error: error => console.error(error)
      });

    this.initContextMenu();
  }

  initContextMenu(event?: TableContextMenuSelectEvent) {
    this.contextMenuItems = [
      {
        label: 'Edit',
        icon: 'fa fa-pencil',
        command: () => this.router.navigate(['item', this.selected?.id], {relativeTo: this.route})
      }
    ];
  }

  protected readonly getAdTypeIcon = getAdTypeIcon
}
