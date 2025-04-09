export interface POIAlongRouteResponse {
    suggestedPOIs?: Array<SuggestedPOI>;
}

export interface SuggestedPOI {
    distance: number;
    place_id: string;
    poi:string;
    subSubLocality: string;
    subLocality: string;
    locality: string;
    city: string;
    subDistrict:string;
    district:string;
    state:string;
    poplrName: string;
    address:string;
    tel: string;
    email: string;
    website: string;
    longitude: string;
    latitude: string;
    e_lng: number;
    e_lat: number;
    brand_code: string;
    category: string;
}