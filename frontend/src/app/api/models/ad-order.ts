import { Status } from './enums/status';
import { BillboardPlacement, BroadcastPlacement, TransportPlacement } from './placement';
import { FormAdOrder } from '@models/form-ad-order';

export class AdOrder extends FormAdOrder {
  id?: number;
  status: Status = Status.NEW;
  costCents?: number;
  designs: string[] = [];
  placements: PlacementType[] = [];
}

type PlacementType = BillboardPlacement & TransportPlacement & BroadcastPlacement;
