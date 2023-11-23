import { AdType } from '@models/enums/ad-type';

export class FormAdOrder {
  name: string = '';
  type: AdType = AdType.BILLBOARD;
  onlyDesign: boolean = false;
  budgetCents?: number;
}
