import { DirectionsRoute } from "./DirectionModel";

export interface TripOptimisationModel {
    code: string,
    trips: Array<DirectionsRoute>,
    waypoints: Array<TripsWaypoint>
}

export interface TripsWaypoint {
    location:Array<number>;
    distance: number,
    hint: string,
    waypoint_index: number,
    trips_index: number
}