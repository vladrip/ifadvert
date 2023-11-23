import { Direction } from './enums/direction';
import { VehicleType } from './enums/vehicle-type';

export interface Placement {
  description: string;
}

export interface BillboardPlacement extends Placement {
  boardId: number;
  latitude: number;
  longitude: number;
  direction: Direction;
  picture: string;
}

export interface TransportPlacement extends Placement {
  vehicleId: string;
  type: VehicleType;
  picture: string;
}

export interface BroadcastPlacement extends Placement {
  channel: String;
  isRadio: boolean;
  nextBroadcast: Date;
  durationSec: number;
}
