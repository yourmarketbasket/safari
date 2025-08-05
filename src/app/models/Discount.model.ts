export type DiscountType = "percentage" | "fixed";

export interface Discount {
  id: string;
  saccoId: string;
  code: string;
  type: DiscountType;
  value: number;
  validUntil: Date;
}
