export interface PlaceResponse {
     responseCode: Number;
     version: string;
     results? : Array<Place>;
}

export interface Place {
    houseNumber: string;
    houseName: string;
    poi: string;
    poi_dist: string;
    street: string;
    street_dist: string;
    subSubLocality: string;
    subLocality: string;
    locality: string;
    village: string;
    district: string;
    subDistrict: string;
    city: string;
    state: string;
    pincode: string;
    lat: string;
    lng: string;
    area: string;
    formatted_address: string;
    mapplsPin: string;
    areaCode: string;
    twnName: string;
    vlgCenCd: string;
    vlgLgdCd: string;
    sdbCenCd: string;
    sdbLgdCd: string;
    dstCenCd: string;
    dstLgdCd: string;
    sttCenCd: string;
    sttLgdCd: string;
    twnCenCd: string;
    twnLgdCd: string;
    isRooftop: boolean;
    richInfo: any;
}