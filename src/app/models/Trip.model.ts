import { VehicleClass } from "./Vehicle.model";

export type TripStatus = "pending" | "active" | "canceled" | "completed";

export interface Trip {
  id: string;
  vehicleId: string;
  routeId: string;
  driverId: string;
  class: VehicleClass;
  registrationTimestamp: Date;
  status: TripStatus;
}
