import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdOrderHttpService } from '@apiServices/ad-order-http.service';
import { finalize } from 'rxjs';
import { AdType } from '@models/enums/ad-type';
import { getAdTypeIcon } from '@utils/IconMappings';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { FormAdOrder } from '@models/form-ad-order';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-ad-order-item',
  templateUrl: './ad-order-item.component.html',
  styleUrls: ['./ad-order-item.component.scss']
})
export class AdOrderItemComponent implements OnInit {
  item: FormAdOrder = new FormAdOrder();
  itemId?: number;
  isEdit = false;
  loading = true;
  saving = false;
  adTypes = Object.values(AdType);

  constructor(private route: ActivatedRoute,
              private dataService: AdOrderHttpService,
              private router: Router,
              private toastService: ToastService) {
  }

  protected readonly getAdTypeIcon = getAdTypeIcon;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      if (this.itemId) {
        this.isEdit = true;
        this.getItem(this.itemId);
      } else this.loading = false;
    });
  }

  getItem(id: number) {
    this.dataService.get(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: adOrder => this.item = adOrder,
        error: this.toastService.handleHttpError
      });
  }

  onSubmit() {
    this.saving = true;
    if (this.isEdit) this.updateAdOrder();
    else this.createAdOrder();

    this.router.createUrlTree(['/app/ad-orders']);
  }

  createAdOrder() {
    this.dataService.create(this.item)
      .pipe(finalize(() => this.saving = false))
      .subscribe({
        next: () => {
          this.router.navigate(["/app/ad-orders"])
          this.toastService.success("You successfully created an advertisement order!\nWait until our agent contacts you");
        },
        error: this.toastService.handleHttpError
      });
  }

  updateAdOrder() {
    this.dataService.update(this.itemId!, this.item)
      .pipe(finalize(() => this.saving = false))
      .subscribe({
        next: formAdOrder => {
          this.item = formAdOrder;
          this.toastService.success("Updated the order successfully");
        },
        error: this.toastService.handleHttpError
      });
  }

  onBudgetInput(event: InputNumberInputEvent) {
    this.item.budgetCents = Number(event.value) * 100;
  }
}
