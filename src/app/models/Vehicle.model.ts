export type VehicleClass = "economy" | "business" | "first_class";

export interface Vehicle {
  id: string;
  licensePlate: string;
  capacity: number;
  routeId: string;
  saccoId: string;
  ownerId: string;
  condition: string;
  class: VehicleClass;
}
