export interface TransitPlannerModel {
    responseCode: number,
    results: Array<TransitPlannerResult>    
}

export interface TransitPlannerResult {
    plan: TransitPlan
}

export interface TransitPlan {
    date: number,
    itineraries: Array<TransitItinerary>
    from: TransitVertex,
    to: TransitVertex
}

export interface TransitItinerary {
    fare: TransitFare,
    walkDistance: number,
    transitTime: number,
    walkTime: number,
    waitingTime: number,
    duration: number,
    transfers: number,
    legs: Array<TransitRouteLeg>,
    startTime: number,
    endTime: number
}

export interface TransitVertex {
    vertexType: string,
    name: string,
    lon: number,
    lat: number,
    stopIndex: number,
    stopSequence: number,
    arrival: number,
    stopId: number,
    departure: number
}

export interface TransitFare {
    currency: TransitCurrency,
    rupees: number
}

export interface TransitRouteLeg {
    legGeometry: TransitLegGeometry,
    transitLeg: boolean,
    distance: number,
    arrivalDelay: number,
    departureDelay: number,
    steps: Array<TransitLegStep>,
    realTime: boolean,
    mode: string,
    duration: number,
    route: string,
    startTime: number,
    from: TransitVertex,
    endTime: number,
    to: TransitVertex,
    interlineWithPreviousLeg: boolean
}

export interface TransitCurrency {
    symbol: string,
    currency: string,
    defaultFractionDigits: number,
    currencyCode: string
}

export interface TransitLegGeometry {
    length: number,
    points: string
}

export interface TransitLegStep {
    streetName: string,
    distance: number,
    stayOn: boolean,
    lon: number,
    lat: number,
    absoluteDirection: string,
    relativeDirection: string
}