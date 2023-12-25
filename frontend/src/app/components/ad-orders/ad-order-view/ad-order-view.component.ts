import { Component, OnInit } from '@angular/core';
import { AdOrder } from '@models/AdOrder';
import { ActivatedRoute, Router } from '@angular/router';
import { AdOrderHttpService } from '@apiServices/ad-order-http.service';
import { finalize } from 'rxjs';
import { getAdTypeIcon, getDirectionIcon, getVehicleTypeIcon } from '@utils/IconMappings';
import { AdType } from '@models/enums/AdType';
import { FilterMatchMode } from 'primeng/api';
import { VehicleType } from '@models/enums/VehicleType';
import { Direction } from '@models/enums/Direction';

@Component({
  selector: 'app-ad-order-view',
  templateUrl: './ad-order-view.component.html',
  styleUrls: ['./ad-order-view.component.scss']
})
export class AdOrderViewComponent implements OnInit {
  protected readonly getAdTypeIcon = getAdTypeIcon;
  protected readonly getVehicleTypeIcon = getVehicleTypeIcon;
  protected readonly getDirectionIcon = getDirectionIcon;
  protected readonly AdType = AdType;
  protected readonly FilterMatchMode = FilterMatchMode;

  item: AdOrder = new AdOrder();
  itemId?: number;
  loading = true;
  responsiveOptions = [
    {breakpoint: '1024px', numVisible: 5},
    {breakpoint: '768px', numVisible: 3},
    {breakpoint: '560px', numVisible: 1}
  ];
  directions = Object.values(Direction);
  vehicleTypes = Object.values(VehicleType);

  constructor(private route: ActivatedRoute, private dataService: AdOrderHttpService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      this.getItem(this.itemId!);
    });
  }

  getItem(id: number) {
    this.dataService.get(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: adOrder => {
          this.item = adOrder
          console.log(adOrder.designs);
        },
        error: console.error
      });
  }

  navigateToEdit() {
    return this.router.navigate(['app/ad-orders/item/', this.itemId], {queryParams: {back: 'view'}});
  }
}
