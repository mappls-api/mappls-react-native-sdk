import { AddressTokens } from "./AdressTokenModel";

export interface NearbyAtlasResponse {
    suggestedLocations?: Array<NearbyAtlasResult>;
    explanation: AtlasExplaination;
    pageInfo:PageInfo;
}

export interface NearbyAtlasResult {
    distance:number;
    mapplsPin:string;
    email:string;
    entryLatitude:number;
    entryLongitude:number;
    keywords?: Array<string>;
    landlineNo: string;
    latitude:number;
    longitude:number;
    mobileNo: string;
    orderIndex: string;
    placeAddress: string;
    placeName: string;
    type:string;
    categoryCode:string;
    city:string;
    state:string;
    pincode:string;
    hourOfOperation:string;
    addressTokens: AddressTokens;
    richInfo: any;
}

export interface AtlasExplaination {
    isKeyword:boolean;
    keyword: string;
    refLocation:string;
}


export interface PageInfo {
    pageCount:number;
    totalHits:number;
    totalPages:number;
    pageSize:number;
}