import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdOrderHttpService } from '@apiServices/ad-order-http.service';
import { finalize } from 'rxjs';
import { AdType } from '@models/enums/AdType';
import { getAdTypeIcon } from '@utils/IconMappings';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { FormAdOrder } from '@models/FormAdOrder';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-ad-order-item',
  templateUrl: './ad-order-item.component.html',
  styleUrls: ['./ad-order-item.component.scss']
})
export class AdOrderItemComponent implements OnInit {
  protected readonly getAdTypeIcon = getAdTypeIcon;
  item: FormAdOrder = new FormAdOrder();
  itemId?: number;
  isEdit = false;
  loading = true;
  saving = false;
  adTypes = Object.values(AdType);
  returnToView: boolean = false;

  constructor(private route: ActivatedRoute,
              private dataService: AdOrderHttpService,
              private router: Router,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      if (this.itemId) {
        this.isEdit = true;
        this.getItem(this.itemId);
      } else this.loading = false;
    });
    this.route.queryParams.subscribe(params => this.returnToView = params['back'] === 'view');
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
    this.isEdit ? this.updateAdOrder() : this.createAdOrder();
  }

  createAdOrder() {
    this.dataService.create(this.item)
      .pipe(finalize(() => this.saving = false))
      .subscribe({
        next: () => {
          this.toastService.success('You successfully created an advertisement order!\nWait until our agent contacts you');
          return this.navigateBack();
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
          this.toastService.success('Updated the order successfully');
          return this.navigateBack();
        },
        error: this.toastService.handleHttpError
      });
  }

  navigateBack() {
    const route = this.returnToView ? `app/ad-orders/view/${this.itemId}` : 'app/ad-orders';
    return this.router.navigate([route]);
  }

  //FIXME: bug when using browser form autofill (onInput doesn't get called)
  onBudgetInput(event: InputNumberInputEvent) {
    this.item.budgetCents = Number(event.value) * 100;
  }
}
