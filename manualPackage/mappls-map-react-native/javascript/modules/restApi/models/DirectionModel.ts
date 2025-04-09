export interface DirectionsResponse {
    code:string;
    message:string;
    waypoints?:Array<DirectionsWaypoint>;
    routes:Array<DirectionsRoute>;
    routeId:string;
    sessionId:string;
}


export interface DirectionsWaypoint {
    name:string;
    location:Array<number>;
}

export interface DirectionsRoute {
    distance:number;
    duration:number;
    geometry:string;
    weight:number;
    weight_name:string;
    legs:Array<RouteLeg>;
    routeOptions:RouteOptions;
    routeIndex:number;
    voiceLocale:string;
}


export interface RouteLeg {
    distance:number;
    duration:number;
    summary:string;
    steps:Array<LegStep>;
    annotation:LegAnnotation;
}

export interface LegStep {
    distance:number;
    duration:number;
    geometry:string;
    name:string;
    destinations:string;
    mode:string;
    pronunciation:string;
    rotary_name:string;
    rotary_pronunciation:string;
    maneuver:StepManeuver;
    voiceInstructions:Array<VoiceInstructions>;
    bannerInstructions:Array<BannerInstructions>;
    driving_side:string;
    weight:number;
    intersections:Array<StepIntersection>;
    exits:string;
    ref:string;
}

export interface StepManeuver {
    degree:number;
    location:Array<number>;
    bearing_before:number;
    bearing_after:number;
    instruction:string;
    type:string;
    modifier:string;
    exit:number;
}

export interface VoiceInstructions {
    distanceAlongGeometry:number;
    announcement:string;
    ssmlAnnouncement:string;
}

export interface BannerInstructions {
    distanceAlongGeometry:number;
    secondary:BannerText;
    primary:BannerText;
    sub:BannerText;
}

export interface BannerText {
    components:Array<BannerComponents>;
    text:string;
    modifier:string;
    degrees:number;
    driving_side:string;
    type:string;
}

export interface BannerComponents {
    text:string;
    abbr:string;
    abbr_priority:number;
    imageBaseURL:string;
    type:string;
    directions:Array<string>;
    active:boolean; 
}

export interface StepIntersection {

    location:Array<number>;
    bearings:Array<number>;
    classes:Array<string>;
    entry:Array<boolean>;
    in:number;
    out:number;
    lanes:Array<IntersectionLanes>;
}


export interface IntersectionLanes {
    valid:boolean;
    indications:Array<string>;
}

export interface LegAnnotation {
    distance:Array<number>;
    duration:Array<number>;
    speed:Array<number>;
    maxspeed:Array<MaxSpeed>;
    congestion:Array<string>;
    nodes:Array<number>;
    baseDuration:Array<number>;
    spdlmt:Array<number>;
    toll_road:Array<number>;
}

export interface MaxSpeed {
    speed:number;
    unit:string;
    unknown:boolean;
    none:boolean;
}

export interface RouteOptions {
    baseUrl:string;
    deviceID:string;
    user:string;
    profile:string;
    resource:string;
    coordinates:Array<string>;
    alternatives:boolean;
    language:string;
    radiuses:string;
    bearings:string;
    lessverbose:boolean;
    geometries:string;
    overview:string;
    steps:boolean;
    annotations:string;
    exclude:string;
    roundabout_exits:boolean;
    voice_instructions:boolean;
    banner_instructions:boolean;
    voice_units:string;
    access_token:string;
    uuid:string;
    sessionId:string;
    approaches:string;
    waypoints:string;
    waypoint_names:string;
    waypoint_targets:string;
    walkingOptions:WalkingOptions;
    routeType:number;
    isSort:boolean;
    routeRefresh:boolean;   
}

export interface WalkingOptions {
    walking_speed:number;
    walkway_bias:number;
    alley_bias:number;
}