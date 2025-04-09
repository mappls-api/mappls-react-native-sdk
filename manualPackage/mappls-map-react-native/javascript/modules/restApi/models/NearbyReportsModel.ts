export interface NearbyReportResponse {
    pagination: Pagination;
    reports:Array<NearbyReport>;
}

export interface Pagination {
    totalItems: number;
}

export interface NearbyReport {
    category:string;
    iconBaseUrl:string;
    nearbyReport_description:string;
    usersCount:number;
    expiry:number
    createdOn:number;
    addedBy:string;
    addedByName:string;
    userProfileIcon:string;
    reportIcon:string;
    bearing:number;
    status:string;
    longitude:number;
    latitude:number;
    address:string;
    childCategory:string;
    parentCategory:string;
    id:string;
}