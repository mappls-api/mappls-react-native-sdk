import {NativeModules} from 'react-native';

const Api = NativeModules.MGLRestApiModule; 

const RestApi = {

    autoSuggest: async function(params) {
       const autoSuggestResponse = await Api.autoSuggest(params);
       return  JSON.parse(autoSuggestResponse);
    },

    reverseGeocode: async function(params) {
      const revGeoCoderesponse  = await Api.reverseGeocode(params);
        return  JSON.parse(revGeoCoderesponse);
    },

    geocode: async function(params) {
        const geoCodeResponse = await Api.geocode(params);
        return  JSON.parse(geoCodeResponse);
    },

    textSearch: async function(params) {
       const textSearchResponse = await Api.textSearch(params);
       return JSON.parse(textSearchResponse);
    },

    placeDetail: async function(params) {
       const placeDetailResponse = await Api.placeDetail(params);
       return JSON.parse(placeDetailResponse);
    },
    
    placeDetailLegacy :async function(params) {
       const placeDetailLegacyResponse = await Api.placeDetailLegacy(params);
       return  JSON.parse(placeDetailLegacyResponse);
    },
    nearby: async function(params) {
       const nearbyResponse = await Api.nearby(params);
        return  JSON.parse(nearbyResponse);
    },

    direction: async function(params) {
       const directionResponse = await Api.direction(params);
       return  JSON.parse(directionResponse);
    },

    directionRefresh: async function(params) {
       const directionResponse = await Api.directionRefresh(params);
       return  JSON.parse(directionResponse);
    },

    distance: async function(params) {
       const distanceResponse = await Api.distance(params);
        return  JSON.parse(distanceResponse);
    },
    POIAlongRoute : async function(params) {
       const poiRouteResponse = await Api.POIAlongRoute(params);
       return JSON.parse(poiRouteResponse);
    },
    feedback: async function(params) {
         const feedbackResponse = await Api.feedback(params);
         return JSON.parse(feedbackResponse);
    },
    
    clusterLinkedDevices: async function(params) {
       const clusterResponse = await Api.clusterLinkedDevices(params);
       return JSON.parse(clusterResponse);
    },

   deleteClusterLinkedDevice: async function(params) {
      const deleteClusterResponse  = await Api.deleteClusterLinkedDevice(params);
      return JSON.parse(deleteClusterResponse);
   },
  
   endSession: async function(params){
    const endSessionResponse = await Api.endSession(params);
    return JSON.parse(endSessionResponse);
   },

   geoAnalyticsList: async function(params) {
    const geoAnalyticsResponse = await Api.geoAnalyticsList(params);
    return JSON.parse(geoAnalyticsResponse);

   },

   hateosnearby : async function(params) {
      const hateosNearby = await Api.hateosnearby(params);
      return JSON.parse(hateosNearby);
   },

   roadTrafficDetail : async function(params){
      const hateosNearby = await Api.roadTrafficDetail(params);
      return JSON.parse(hateosNearby);
   },

   generateOtp: async function(userHandle){
      return await Api.generateOtp(userHandle); 
   },

   whiteList: async function(params){
      const whiteListResponse = await Api.whiteList(params);
      return;
   },

   nearbyReports : async function(params){
      const nearbyReportsResponse = await Api.nearbyReports(params);
      return JSON.parse(nearbyReportsResponse)
   },

   weather : async function(params){
      const weatherResponse = await Api.weather(params);
      return JSON.parse(weatherResponse)
   },

   tripCostEstimation : async function(params) {
      const estimationResponse = await Api.tripCostEstimation(params);
      return JSON.parse(estimationResponse)
   },

   eventCategoryMaster: async function(params) {
      const categoryMasterResponse = await Api.eventCategoryMaster(params);
      return JSON.parse(categoryMasterResponse)
   },

   routeReportSummary: async function(params) {
      const routeReportSummaryResponse = await Api.routeReportSummary(params);
      return JSON.parse(routeReportSummaryResponse)
   },

   fuelCost: async function(params) {
      const routeReportSummaryResponse = await Api.fuelCost(params);
      return JSON.parse(routeReportSummaryResponse)
   }

};
RestApi.AutoSuggestCriteria = {};
RestApi.AutoSuggestCriteria.POD_CITY = Api.AutoSuggestCriteria.POD_CITY;
RestApi.AutoSuggestCriteria.POD_DISTRICT = Api.AutoSuggestCriteria.POD_DISTRICT;
RestApi.AutoSuggestCriteria.POD_LOCALITY = Api.AutoSuggestCriteria.POD_LOCALITY;
RestApi.AutoSuggestCriteria.POD_STATE = Api.AutoSuggestCriteria.POD_STATE;
RestApi.AutoSuggestCriteria.POD_SUB_DISTRICT = Api.AutoSuggestCriteria.POD_SUB_DISTRICT;
RestApi.AutoSuggestCriteria.POD_SUB_LOCALITY = Api.AutoSuggestCriteria.POD_SUB_LOCALITY;
RestApi.AutoSuggestCriteria.POD_SUB_SUB_LOCALITY = Api.AutoSuggestCriteria.POD_SUB_SUB_LOCALITY;
RestApi.AutoSuggestCriteria.POD_VILLAGE = Api.AutoSuggestCriteria.POD_VILLAGE;
RestApi.AutoSuggestCriteria.POD_POI = Api.AutoSuggestCriteria.POD_POI;

//GeoCoding Constants only for ANDORID
RestApi.GeoCodingCriteria = {};
RestApi.GeoCodingCriteria.BIAS_DEFAULT = Api.GeoCodingCriteria.BIAS_DEFAULT;
RestApi.GeoCodingCriteria.BIAS_RURAL = Api.GeoCodingCriteria.BIAS_RURAL;
RestApi.GeoCodingCriteria.BIAS_URBAN = Api.GeoCodingCriteria.BIAS_URBAN;

RestApi.GeoCodingCriteria.POD_CITY = Api.GeoCodingCriteria.POD_CITY;
RestApi.GeoCodingCriteria.POD_DISTRICT = Api.GeoCodingCriteria.POD_DISTRICT;
RestApi.GeoCodingCriteria.POD_HOUSE_NAME = Api.GeoCodingCriteria.POD_HOUSE_NAME;
RestApi.GeoCodingCriteria.POD_HOUSE_NUMBER = Api.GeoCodingCriteria.POD_HOUSE_NUMBER;
RestApi.GeoCodingCriteria.POD_LOCALITY = Api.GeoCodingCriteria.POD_LOCALITY;
RestApi.GeoCodingCriteria.POD_PINCODE = Api.GeoCodingCriteria.POD_PINCODE;
RestApi.GeoCodingCriteria.POD_POI = Api.GeoCodingCriteria.POD_POI;
RestApi.GeoCodingCriteria.POD_STATE = Api.GeoCodingCriteria.POD_STATE;
RestApi.GeoCodingCriteria.POD_STREET = Api.GeoCodingCriteria.POD_STREET;
RestApi.GeoCodingCriteria.POD_SUB_DISTRICT = Api.GeoCodingCriteria.POD_SUB_DISTRICT;
RestApi.GeoCodingCriteria.POD_SUB_LOCALITY = Api.GeoCodingCriteria.POD_SUB_LOCALITY;
RestApi.GeoCodingCriteria.POD_SUB_SUB_LOCALITY = Api.GeoCodingCriteria.POD_SUB_SUB_LOCALITY;
RestApi.GeoCodingCriteria.POD_VILLAGE = Api.GeoCodingCriteria.POD_VILLAGE;

RestApi.NearbyCriteria ={};
RestApi.NearbyCriteria.DISTANCE_ASCENDING = Api.NearbyCriteria.DISTANCE_ASCENDING;
RestApi.NearbyCriteria.DISTANCE_DESCENDING = Api.NearbyCriteria.DISTANCE_DESCENDING;

//Name options only for ANDROID
RestApi.NearbyCriteria.NAME_ASCENDING = Api.NearbyCriteria.NAME_ASCENDING;
RestApi.NearbyCriteria.NAME_DESCENDING = Api.NearbyCriteria.NAME_DESCENDING;

RestApi.NearbyCriteria.DISTANCE = Api.NearbyCriteria.DISTANCE;
RestApi.NearbyCriteria.IMPORTANCE = Api.NearbyCriteria.IMPORTANCE;

 RestApi.DirectionsCriteria ={};
// RestApi.DirectionsCriteria.EXCLUDE_TUNNEL = Api.DirectionsCriteria.EXCLUDE_TUNNEL;
// RestApi.DirectionsCriteria.EXCLUDE_RESTRICTED = Api.DirectionsCriteria.EXCLUDE_RESTRICTED;
RestApi.DirectionsCriteria.EXCLUDE_MOTORWAY = Api.DirectionsCriteria.EXCLUDE_MOTORWAY;
RestApi.DirectionsCriteria.EXCLUDE_FERRY = Api.DirectionsCriteria.EXCLUDE_FERRY;
RestApi.DirectionsCriteria.EXCLUDE_TOLL = Api.DirectionsCriteria.EXCLUDE_TOLL;
 
RestApi.DirectionsCriteria.ANNOTATION_SPEED = Api.DirectionsCriteria.ANNOTATION_SPEED;
RestApi.DirectionsCriteria.ANNOTATION_NODES = Api.DirectionsCriteria.ANNOTATION_NODES;
// RestApi.DirectionsCriteria.ANNOTATION_MAXSPEED = Api.DirectionsCriteria.ANNOTATION_MAXSPEED;
RestApi.DirectionsCriteria.ANNOTATION_DURATION = Api.DirectionsCriteria.ANNOTATION_DURATION;
RestApi.DirectionsCriteria.ANNOTATION_DISTANCE = Api.DirectionsCriteria.ANNOTATION_DISTANCE;
RestApi.DirectionsCriteria.ANNOTATION_BASE_DURATION = Api.DirectionsCriteria.ANNOTATION_BASE_DURATION;
RestApi.DirectionsCriteria.ANNOTATION_CONGESTION = Api.DirectionsCriteria.ANNOTATION_CONGESTION;
RestApi.DirectionsCriteria.ANNOTATION_SPEED_LIMIT = Api.DirectionsCriteria.ANNOTATION_SPEED_LIMIT;
RestApi.DirectionsCriteria.ANNOTATION_TOLL_ROAD = Api.DirectionsCriteria.ANNOTATION_TOLL_ROAD;

RestApi.DirectionsCriteria.OVERVIEW_FALSE = Api.DirectionsCriteria.OVERVIEW_FALSE;
RestApi.DirectionsCriteria.OVERVIEW_SIMPLIFIED = Api.DirectionsCriteria.OVERVIEW_SIMPLIFIED;
RestApi.DirectionsCriteria.OVERVIEW_FULL = Api.DirectionsCriteria.OVERVIEW_FULL;

RestApi.DirectionsCriteria.PROFILE_WALKING = Api.DirectionsCriteria.PROFILE_WALKING;
RestApi.DirectionsCriteria.PROFILE_TRUCKING = Api.DirectionsCriteria.PROFILE_TRUCKING;
RestApi.DirectionsCriteria.PROFILE_BIKING = Api.DirectionsCriteria.PROFILE_BIKING;
RestApi.DirectionsCriteria.PROFILE_DRIVING = Api.DirectionsCriteria.PROFILE_DRIVING;

RestApi.DirectionsCriteria.RESOURCE_ROUTE_TRAFFIC = Api.DirectionsCriteria.RESOURCE_ROUTE_TRAFFIC;
RestApi.DirectionsCriteria.RESOURCE_ROUTE = Api.DirectionsCriteria.RESOURCE_ROUTE;
RestApi.DirectionsCriteria.RESOURCE_ROUTE_ETA = Api.DirectionsCriteria.RESOURCE_ROUTE_ETA;
RestApi.DirectionsCriteria.RESOURCE_DISTANCE = Api.DirectionsCriteria.RESOURCE_DISTANCE;
RestApi.DirectionsCriteria.RESOURCE_DISTANCE_ETA = Api.DirectionsCriteria.RESOURCE_DISTANCE_ETA;
RestApi.DirectionsCriteria.RESOURCE_DISTANCE_TRAFFIC = Api.DirectionsCriteria.RESOURCE_DISTANCE_TRAFFIC;
RestApi.DirectionsCriteria.RESOURCE_ROUTE_PREDICTIVE = Api.DirectionsCriteria.RESOURCE_ROUTE_PREDICTIVE;
RestApi.DirectionsCriteria.RESOURCE_DISTANCE_PREDICTIVE = Api.DirectionsCriteria.RESOURCE_DISTANCE_PREDICTIVE;

// RestApi.DirectionsCriteria.APPROACH_CURB = Api.DirectionsCriteria.APPROACH_CURB;
// RestApi.DirectionsCriteria.APPROACH_UNRESTRICTED = Api.DirectionsCriteria.APPROACH_UNRESTRICTED;

// RestApi.DirectionsCriteria.DESTINATION_ANY = Api.DirectionsCriteria.DESTINATION_ANY;
// RestApi.DirectionsCriteria.DESTINATION_LAST = Api.DirectionsCriteria.DESTINATION_LAST;

RestApi.DirectionsCriteria.GEOMETRY_POLYLINE = Api.DirectionsCriteria.GEOMETRY_POLYLINE;
RestApi.DirectionsCriteria.GEOMETRY_POLYLINE6 = Api.DirectionsCriteria.GEOMETRY_POLYLINE6;
RestApi.DirectionsCriteria.GEOMETRY_COORDINATES = Api.DirectionsCriteria.GEOMETRY_COORDINATES;

RestApi.DirectionsCriteria.IMPERIAL = Api.DirectionsCriteria.IMPERIAL;
RestApi.DirectionsCriteria.METRIC = Api.DirectionsCriteria.METRIC;

// RestApi.DirectionsCriteria.SOURCE_ANY = Api.DirectionsCriteria.SOURCE_ANY;
// RestApi.DirectionsCriteria.SOURCE_FIRST = Api.DirectionsCriteria.SOURCE_FIRST;

RestApi.DirectionsCriteria.ROUTE_TYPE_OPTIMAL = Api.DirectionsCriteria.ROUTE_TYPE_OPTIMAL;
RestApi.DirectionsCriteria.ROUTE_TYPE_SHORTEST = Api.DirectionsCriteria.ROUTE_TYPE_SHORTEST;

RestApi.DirectionsCriteria.DISTANCE_ROUTE_TYPE_OPTIMAL = Api.DirectionsCriteria.DISTANCE_ROUTE_TYPE_OPTIMAL;
RestApi.DirectionsCriteria.DISTANCE_ROUTE_TYPE_SHORTEST = Api.DirectionsCriteria.DISTANCE_ROUTE_TYPE_SHORTEST;

RestApi.DirectionsCriteria.SPECIFIED_ARRIVAL = Api.DirectionsCriteria.SPECIFIED_ARRIVAL;
RestApi.DirectionsCriteria.SPECIFIED_DEPARTURE = Api.DirectionsCriteria.SPECIFIED_DEPARTURE;

RestApi.DirectionsCriteria.DATE_TIME_SPECIFIED = Api.DirectionsCriteria.DATE_TIME_SPECIFIED;
RestApi.DirectionsCriteria.DATE_TIME_CURRENT = Api.DirectionsCriteria.DATE_TIME_CURRENT;

RestApi.POICriteria ={};

RestApi.POICriteria.GEOMETRY_BASE64 = Api.POICriteria.GEOMETRY_BASE64;
RestApi.POICriteria.GEOMETRY_POLYLINE5 = Api.POICriteria.GEOMETRY_POLYLINE5;
RestApi.POICriteria.GEOMETRY_POLYLINE6 = Api.POICriteria.GEOMETRY_POLYLINE6;
RestApi.POICriteria.GEOMETRY_COORDINATES = Api.POICriteria.GEOMETRY_COORDINATES;

RestApi.SessionCriteria ={};
RestApi.SessionCriteria.SESSION_TYPE_GLOBAL = Api.SessionCriteria.SESSION_TYPE_GLOBAL;
RestApi.SessionCriteria.SESSION_TYPE_NAVIGATION = Api.SessionCriteria.SESSION_TYPE_NAVIGATION;

RestApi.GeoAnalyticsType ={};
RestApi.GeoAnalyticsType.STATE = Api.GeoAnalyticsType.STATE;
RestApi.GeoAnalyticsType.DISTRICT = Api.GeoAnalyticsType.DISTRICT;
RestApi.GeoAnalyticsType.SUB_DISTRICT = Api.GeoAnalyticsType.SUB_DISTRICT;
RestApi.GeoAnalyticsType.WARD = Api.GeoAnalyticsType.WARD;
RestApi.GeoAnalyticsType.LOCALITY = Api.GeoAnalyticsType.LOCALITY;
RestApi.GeoAnalyticsType.PANCHAYAT = Api.GeoAnalyticsType.PANCHAYAT;
RestApi.GeoAnalyticsType.BLOCK = Api.GeoAnalyticsType.BLOCK;
RestApi.GeoAnalyticsType.PINCODE = Api.GeoAnalyticsType.PINCODE;
RestApi.GeoAnalyticsType.TOWN = Api.GeoAnalyticsType.TOWN;
RestApi.GeoAnalyticsType.CITY = Api.GeoAnalyticsType.CITY;
RestApi.GeoAnalyticsType.VILLAGE = Api.GeoAnalyticsType.VILLAGE;
RestApi.GeoAnalyticsType.SUB_LOCALITY = Api.GeoAnalyticsType.SUB_LOCALITY;
RestApi.GeoAnalyticsType.SUB_SUB_LOCALITY = Api.GeoAnalyticsType.SUB_SUB_LOCALITY;
export default RestApi 
