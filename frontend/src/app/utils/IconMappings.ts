import { AdType } from '@models/enums/ad-type';
import { VehicleType } from '@models/enums/vehicle-type';
import { Direction } from '@models/enums/direction';

export function getAdTypeIcon(type: AdType | string) {
  switch (type) {
    case AdType.BILLBOARD: return 'fa fa-rectangle-ad';
    case AdType.BROADCAST: return 'fa fa-tv';
    case AdType.TRANSPORT: return 'fa fa-bus';
    default: return 'fa fa-question-mark';
  }
}

export function getVehicleTypeIcon(type: VehicleType | string) {
  switch (type) {
    case VehicleType.BUS: return 'fa fa-bus';
    case VehicleType.METRO: return 'fa fa-train-subway';
    case VehicleType.TRUCK: return 'fa fa-truck';
    default: return 'fa fa-question-mark';
  }
}

export function getDirectionIcon(direction: Direction | string) {
  switch (direction) {
    case Direction.NORTH: return 'fa fa-arrow-up';
    case Direction.EAST: return 'fa fa-arrow-right';
    case Direction.SOUTH: return 'fa fa-arrow-down';
    case Direction.WEST: return 'fa fa-arrow-left';
    default: return 'fa fa-question-mark';
  }
}
