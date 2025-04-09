import { AddressTokens } from "./AdressTokenModel";

export interface AutoSuggestAtlasResponse {
    suggestedLocations?: Array<ELocation>;
    userAddedLocations?: Array<ELocation>;
    suggestedSearches?:Array<SuggestedSearchAtlas>;
    explaination: AtlasExplaination;

}


export interface ELocation {
    mapplsPin:string;
    placeAddress:string;
    latitude:number;
    longitude:number;
    type:string;
    typeX:number;
    placeName:string;
    entryLatitude:number;
    entryLongitude:number;
    keywords:Array<string>;
    addressTokens: AddressTokens;
    orderIndex:number;
    distance:number;
}


export interface SuggestedSearchAtlas {
    keyword:string;
    identifier:string;
    location:string;
    hyperLink:string;
    orderIndex:number;

}

export interface AtlasExplaination {
    isKeyword: boolean;
    keyword:string;
    refLocation:string;
}