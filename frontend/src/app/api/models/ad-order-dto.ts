export interface AdOrderDto {
  id?: number,
  name: string,
  type: AdType,
  status: Status,
  onlyDesign: boolean,
  costCents: number,
  designs: string[],
}

export enum AdType {
  BILLBOARD = "BILLBOARD",
  BROADCAST = "BROADCAST",
  TRANSPORT = "TRANSPORT",
}

export enum Status {
  CREATED = "CREATED",
  UNDER_REVIEW = "UNDER_REVIEW",
  AWAITING_PAYMENT = "AWAITING_PAYMENT",
  DESIGNING = "DESIGNING",
  AWAITING_CONFIRMATION = "AWAITING_CONFIRMATION",
  COMPLETED = "COMPLETED",
  EXECUTING = "EXECUTING",
  IN_ACTION = "IN_ACTION",
  DISCONTINUED = "DISCONTINUED",
  CANCELED = "CANCELED",
}
