export type VehicleClass = 'economy' | 'business' | 'first_class';

export interface Vehicle {
  _id: string;
  licensePlate: string;
  capacity: number;
  routeId?: string; // Corresponds to ObjectId, represented as string
  saccoId: string; // Corresponds to ObjectId, represented as string
  ownerId: string; // Corresponds to ObjectId, represented as string
  condition: string;
  class: VehicleClass;
  createdAt: Date;
}
