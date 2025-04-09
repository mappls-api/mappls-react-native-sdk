import { DirectionsWaypoint } from "./DirectionModel";

export interface DistanceResponse {
    version:string;
    responseCode:number;
    results:DistanceResults;
}

export interface DistanceResults {
    code:string;
    destinations?:Array<DirectionsWaypoint>;
    sources?:Array<DirectionsWaypoint>;
    durations:Array<Array<number>>;
    distances:Array<Array<number>>;
}


