import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AdOrderHttpService } from "../../api/services/ad-order-http.service";
import { AdOrderDto, AdType, Status } from "../../api/models/ad-order-dto";
import { finalize } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-order-list',
  templateUrl: './ad-order-list.component.html',
  styleUrls: ['./ad-order-list.component.scss']
})
export class AdOrderListComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  adOrders!: AdOrderDto[];
  isLoading = true;
  adTypes = Object.values(AdType);
  statuses = Object.values(Status);

  constructor(private adOrderHttpService: AdOrderHttpService) {
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
  }

  getAdTypeIcon(type: string) {
    switch (type) {
      case AdType.BILLBOARD: return 'fa fa-rectangle-ad'
      case AdType.BROADCAST: return 'fa fa-tv'
      case AdType.TRANSPORT: return 'fa fa-bus'
      default: return 'fa fa-question-mark'
    }
  }
}
