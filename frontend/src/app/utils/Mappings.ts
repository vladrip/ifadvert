import { AdType } from '../api/models/enums/ad-type';

export function getAdTypeIcon(type: string) {
  switch (type) {
    case AdType.BILLBOARD:
      return 'fa fa-rectangle-ad';
    case AdType.BROADCAST:
      return 'fa fa-tv';
    case AdType.TRANSPORT:
      return 'fa fa-bus';
    default:
      return 'fa fa-question-mark';
  }
}
