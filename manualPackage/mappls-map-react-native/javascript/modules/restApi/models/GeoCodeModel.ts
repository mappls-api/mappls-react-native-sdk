export interface GeoCodeResponse {
    results?: Array<GeoCode>;
}

export interface GeoCode {
     houseNumber: string;
     houseName: string;
     poi: string;
     street: string;
     subSubLocality: string;
     subLocality: string;
     locality:string;
     village:string;
     subDistrict:string;
     district: string;
     city: string;
     state:string;
     pincode: string;
     formattedAddress: string;
     mapplsPin:string;
     latitude:number;
     longitude:number;
     geocodeLevel: string;
}