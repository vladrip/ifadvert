import { Status } from './enums/Status';
import { BillboardPlacement, BroadcastPlacement, TransportPlacement } from './Placement';
import { FormAdOrder } from '@models/FormAdOrder';

export class AdOrder extends FormAdOrder {
  id?: number;
  status: Status = Status.NEW;
  costCents?: number;
  designs: string[] = [];
  placements: PlacementType[] = [];
}

type PlacementType = BillboardPlacement & TransportPlacement & BroadcastPlacement;
