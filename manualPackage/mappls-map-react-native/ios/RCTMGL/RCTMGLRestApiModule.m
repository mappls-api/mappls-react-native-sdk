#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(MGLRestApiModule, NSObject)

RCT_EXTERN_METHOD(reverseGeocode:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(geocode:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(autoSuggest:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(nearby:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(distance:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(placeDetail:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(placeDetailLegacy:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(POIAlongRoute:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(feedback:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(direction:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(directionRefresh:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(textSearch:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(hateosnearby:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(geoAnalyticsList:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(clusterLinkedDevices:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(deleteClusterLinkedDevice:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(endSession:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(geoAnalyticsList:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(roadTrafficDetail:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(generateOtp:(NSString *)userHandle withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(whiteList:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(nearbyReports:(NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(weather: (NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve 
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(tripCostEstimation: (NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve 
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(eventCategoryMaster: (NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(routeReportSummary: (NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(fuelCost: (NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(transitPlanner: (NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(tripOptimisation: (NSDictionary *)options withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject)

@end
