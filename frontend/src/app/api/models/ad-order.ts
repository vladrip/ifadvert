import { AdType } from './enums/ad-type';
import { Status } from './enums/status';
import { Placement } from './placement';

export class AdOrder {
  id?: number;
  name: string = '';
  type: AdType = AdType.BILLBOARD;
  status: Status = Status.NEW;
  onlyDesign: boolean = false;
  costCents: number = 0;
  budgetCents: number = 0;
  designs: string[] = [];
  placements: Placement[] = [];
}
