export interface PlaceDetailResponse {
     mapplsPin: string;
     latitude: number;
     longitude:number;
     placeName:string;
     address:string;
     type:string;
     houseNumber:string;
     houseName:string;
     poi:string;
     street:string;
     subSubLocality:string;
     subLocality:string;
     locality:string;
     village:string;
     district:string;
     subDistrict:string;
     city:string;
     state:string;
     pincode:string;
     richInfo?:any;

}
