import { VehicleClass } from "./Vehicle.model";

export type FareAdjustmentFactor = "fuel_price" | "time_of_day" | "other";

export interface FareAdjustment {
  id: string;
  routeId: string;
  factor: FareAdjustmentFactor;
  multiplier: number;
  class: VehicleClass;
  timestamp: Date;
}
