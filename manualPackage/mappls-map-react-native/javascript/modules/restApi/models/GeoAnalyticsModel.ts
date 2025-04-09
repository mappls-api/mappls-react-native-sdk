export interface GeoAnalyticsListResponse {
    responseCode: number;
    version:string;
    total_feature_count:number;
    results:GeoAnalyticsListResult;
}


export interface  GeoAnalyticsListResult {
    api_name:string;
    attribute:string;
    get_attr_values?: Array<GeoAnalyticsValue>;
    }

 export interface GeoAnalyticsValue {
    geo_bound: string;
    get_attr_values?: Array<any>
 }   