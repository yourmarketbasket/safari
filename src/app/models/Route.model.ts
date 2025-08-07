import { FareAdjustment } from "./FareAdjustment.model";

export type RouteStatus = "draft" | "finalized" | "locked";

export interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
}
// force

export interface Route {
  id: string;
  name: string;
  stops: Stop[];
  distance: number;
  baseFare: number;
  fareAdjustments: FareAdjustment[];
  status: RouteStatus;
}
// force