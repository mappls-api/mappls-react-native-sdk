export interface RoadTrafficDetailsResponse {
    responseCode: number;
    creationTime: number;
    result: TrafficRoadDetailResult;
}

export interface TrafficRoadDetailResult {
    name: string;
    routeNo: string;
    oneway:boolean;
    avg_spd:number;
    spd_lmt:number;
    formOfWay:number;
    roadClass:number;
    multi_cw:boolean;
    divider:boolean;
    numOfLanes: number;
    shoulder: boolean;
    owner:string;
    distance:number;
    city:string;
    district:string;
    state:string;
    geometry:string;
    trafficStatus:string;
    trafficType:number;

}