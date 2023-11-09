import { Component, OnInit } from '@angular/core';
import { AdOrder } from '../../../api/models/ad-order';
import { ActivatedRoute, Router } from '@angular/router';
import { AdOrderHttpService } from '../../../api/services/ad-order-http.service';
import { finalize } from 'rxjs';
import { AdType } from '../../../api/models/enums/ad-type';
import { getAdTypeIcon } from '../../../utils/Mappings';
import { InputNumberInputEvent } from 'primeng/inputnumber';

@Component({
  selector: 'app-ad-order-item',
  templateUrl: './ad-order-item.component.html',
  styleUrls: ['./ad-order-item.component.scss']
})
export class AdOrderItemComponent implements OnInit {
  item: AdOrder = new AdOrder()
  itemId?: number
  isEdit = false
  loading = false
  isLoaded = false
  adTypes = Object.values(AdType)

  constructor(private route: ActivatedRoute, private dataService: AdOrderHttpService, private router: Router) {
  }

  protected readonly getAdTypeIcon = getAdTypeIcon;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = params['id']
      if (this.itemId) {
        this.isEdit = true;
        this.getItem(this.itemId);
      } else this.isLoaded = true;
    });
  }

  getItem(id: number) {
    this.dataService.get(id)
      .pipe(finalize(() => this.isLoaded = true))
      .subscribe({
        next: adOrder => this.item = adOrder,
        error: console.error
      });
  }

  onSubmit() {
    if (this.isEdit) {

    } else {

    }

    this.router.navigate(['/app/ad-orders']);
  }

  onBudgetInput(event: InputNumberInputEvent) {
    this.item.budgetCents = Number(event.value) * 100;
  }
}
