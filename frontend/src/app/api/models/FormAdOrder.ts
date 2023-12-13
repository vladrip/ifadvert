import { AdType } from '@models/enums/AdType';

export class FormAdOrder {
  name: string = '';
  type: AdType = AdType.BILLBOARD;
  onlyDesign: boolean = false;
  budgetCents?: number;
}
