package com.mappls.sdk.maps.rctmgl.utils;


import com.mappls.sdk.geoanalytics.MapplsGeoAnalyticsType;

public class GeoAnalyticsUtils {

    public static MapplsGeoAnalyticsType geoAnalyticsType(int type){
        switch (type){
            case 0:
                return MapplsGeoAnalyticsType.STATE;
            case 1:
                 return MapplsGeoAnalyticsType.DISTRICT;
            case 2:
                return MapplsGeoAnalyticsType.SUB_DISTRICT;
            case 3:
                return MapplsGeoAnalyticsType.TOWN;
            case 4:
                return MapplsGeoAnalyticsType.CITY;
            case 5:
                return MapplsGeoAnalyticsType.PINCODE;
            case 6:
                return MapplsGeoAnalyticsType.WARD;
            case 7:
                return MapplsGeoAnalyticsType.LOCALITY;
            case 8:
                return MapplsGeoAnalyticsType.PANCHAYAT;
            case 9:
                return MapplsGeoAnalyticsType.BLOCK;
            case 10:
                return MapplsGeoAnalyticsType.VILLAGE;
            case 11:
                return MapplsGeoAnalyticsType.SUB_LOCALITY;
            case 12:
                return MapplsGeoAnalyticsType.SUB_SUB_LOCALITY;
            default:
                return MapplsGeoAnalyticsType.STATE;
        }
    }
}
