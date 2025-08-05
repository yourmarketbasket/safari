export interface LoyaltyTransaction {
  id: string;
  loyaltyId: string;
  type: "earned" | "redeemed";
  points: number;
  ticketId?: string;
  timestamp: Date;
}

export interface Loyalty {
  id: string;
  userId: string;
  points: number;
  transactions: LoyaltyTransaction[];
}
