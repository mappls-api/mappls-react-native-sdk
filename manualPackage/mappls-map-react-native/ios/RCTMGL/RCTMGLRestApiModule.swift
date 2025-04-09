import Foundation
import MapplsAPIKit
import MapplsGeoanalytics
import MapplsFeedbackKit


@objc(MGLRestApiModule)
class MGLRestApiModule : NSObject {
    
    let REQUIRED_CODE = "REQUIRED PARAMETER";
    
    @objc static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    //exporting constants
    @objc func constantsToExport() -> NSObject {
        let autosuggestConstants:NSDictionary = [
            "POD_CITY": MapplsPodType.city.rawValue,
            "POD_DISTRICT": MapplsPodType.district.rawValue,
            "POD_LOCALITY":MapplsPodType.locality.rawValue,
            "POD_STATE": MapplsPodType.state.rawValue,
            "POD_SUB_DISTRICT": MapplsPodType.subdistrict.rawValue,
            "POD_SUB_LOCALITY": MapplsPodType.sublocality.rawValue,
            "POD_SUB_SUB_LOCALITY": MapplsPodType.subSubLocality.rawValue,
            "POD_VILLAGE": MapplsPodType.village.rawValue,
            "POD_POI": MapplsPodType.POI.rawValue
        ];
        
        let geoCodeConstants:NSDictionary = [
            //Not avaialble for IOS
//                    @"BIAS_DEFAULT": MMIPodTypeIdentifierCity,
            //        @"BIAS_RURAL": MMIPodTypeIdentifierDistrict,
            //        @"BIAS_URBAN":MMIPodTypeIdentifierLocality,
            
            "POD_CITY": MapplsPodType.city.rawValue,
            "POD_DISTRICT": MapplsPodType.district.rawValue,
//            "POD_HOUSE_NUMBER":MapplsPodType.,
            "POD_LOCALITY": MapplsPodType.locality.rawValue,
            "POD_POI": MapplsPodType.POI.rawValue,
//            "POD_PINCODE": MapplsPodType.pin,
            "POD_STATE": MapplsPodType.state.rawValue,
//            "POD_STREET": MapplsPodType.street.rawValue,
            "POD_SUB_DISTRICT": MapplsPodType.subdistrict.rawValue,
            "POD_SUB_LOCALITY": MapplsPodType.sublocality.rawValue,
            "POD_SUB_SUB_LOCALITY": MapplsPodType.subSubLocality.rawValue,
            "POD_VILLAGE": MapplsPodType.village.rawValue,
        ];
        
        let  nearbyConstants:NSDictionary = [
            "DISTANCE_ASCENDING":MapplsSortByDistanceWithOrder(orderBy: .ascending).description,
            "DISTANCE_DESCENDING":MapplsSortByDistanceWithOrder(orderBy: .descending).description,
            //TODO: NEED TO CHECK
            "NAME_ASCENDING":MapplsSortByOrderType.ascending.rawValue,
            "NAME_DESCENDING": MapplsSortByOrderType.descending.rawValue,
            
            "DISTANCE": MapplsSearchByType.distance.rawValue,
            "IMPORTANCE": MapplsSearchByType.importance.rawValue,
            
            "POD_SUB_SUB_LOCALITY": MapplsPodType.subSubLocality.rawValue,
            "POD_LOCALITY": MapplsPodType.locality.rawValue,
            "POD_CITY": MapplsPodType.city.rawValue,
            "POD_STATE": MapplsPodType.state.rawValue,
        ];
        
        let directionConstants:NSDictionary = [
            //TODO: NEED TO CHECK
            //                 "EXCLUDE_TUNNEL": MapplsExcludeOptions.toll,
            //                 "EXCLUDE_RESTRICTED":MapplsExcludeOptions.toll,
            "EXCLUDE_MOTORWAY":MapplsExcludeOptions.motorway.description,
            "EXCLUDE_FERRY": MapplsExcludeOptions.ferry.description,
            "EXCLUDE_TOLL": MapplsExcludeOptions.toll.description,
            
            //TODO: NEED TO CHECK
            "ANNOTATION_SPEED": MapplsAttributeOptions.speed.description,
            "ANNOTATION_NODES": MapplsAttributeOptions.nodes.description,
//            "ANNOTATION_MAXSPEED": MapplsAttributeOptions.ma.description,
            "ANNOTATION_DURATION": MapplsAttributeOptions.expectedTravelTime.description,
            "ANNOTATION_DISTANCE": MapplsAttributeOptions.distance.description,
            "ANNOTATION_BASE_DURATION": MapplsAttributeOptions.baseDuration.description,
            "ANNOTATION_CONGESTION": MapplsAttributeOptions.congestionLevel.description,
            "ANNOTATION_SPEED_LIMIT": MapplsAttributeOptions.speedLimits.description,
            "ANNOTATION_TOLL_ROAD": MapplsAttributeOptions.tollRoad.description,
            
            
            "OVERVIEW_FALSE": RouteShapeResolution.none.description,
            "OVERVIEW_SIMPLIFIED":RouteShapeResolution.low.description,
            "OVERVIEW_FULL": RouteShapeResolution.full.description,
            
            
            "PROFILE_WALKING": MapplsDirectionsProfileIdentifier.walking.rawValue,
            "PROFILE_TRUCKING": MapplsDirectionsProfileIdentifier.trucking.rawValue,
            "PROFILE_BIKING": MapplsDirectionsProfileIdentifier.biking.rawValue,
            "PROFILE_DRIVING": MapplsDirectionsProfileIdentifier.driving.rawValue,
            
            
            "RESOURCE_ROUTE_TRAFFIC": MapplsDirectionsResourceIdentifier.routeTraffic.rawValue,
            "RESOURCE_ROUTE": MapplsDirectionsResourceIdentifier.routeAdv.rawValue,
            "RESOURCE_ROUTE_ETA": MapplsDirectionsResourceIdentifier.routeETA.rawValue,
            "RESOURCE_DISTANCE": MapplsDistanceMatrixResourceIdentifier.default.rawValue,
            "RESOURCE_DISTANCE_ETA": MapplsDistanceMatrixResourceIdentifier.eta.rawValue,
            "RESOURCE_DISTANCE_TRAFFIC": MapplsDistanceMatrixResourceIdentifier.traffic.rawValue,
            
            
            "GEOMETRY_POLYLINE": RouteShapeFormat.polyline.description,
            "GEOMETRY_POLYLINE6": RouteShapeFormat.polyline6.description,
            "GEOMETRY_COORDINATES": RouteShapeFormat.geoJSON.description,
            
            
            "IMPERIAL": MeasurementSystem.imperial.description,
            "METRIC": MeasurementSystem.metric.description,
            
            //TODO: NEED TO CHECK
            //                @"SOURCE_ANY": MMIPodTypeIdentifierVillage,
            //                @"SOURCE_FIRST": MMIPodTypeIdentifierVillage,
            
            //TODO: NEED TO CHECK
            //                @"APPROACH_CURB": MMIPodTypeIdentifierVillage,
            //                @"APPROACH_UNRESTRICTED": MMIPodTypeIdentifierVillage,
            
            //TODO: NEED TO CHECK
            //                @"DESTINATION_ANY": MMIPodTypeIdentifierVillage,
            //                @"DESTINATION_LAST": MMIPodTypeIdentifierVillage,
            
            "ROUTE_TYPE_OPTIMAL":DistanceRouteType.quickest.rawValue,
            "ROUTE_TYPE_SHORTEST": DistanceRouteType.shortest.rawValue,
            
            "DISTANCE_ROUTE_TYPE_OPTIMAL":DistanceRouteType.quickest.rawValue,
            "DISTANCE_ROUTE_TYPE_SHORTEST": DistanceRouteType.shortest.rawValue
        ];
        
        let poiConstants:NSDictionary = [
            "GEOMETRY_BASE64": MapplsPolylineGeometryType.base64.rawValue,
            "GEOMETRY_POLYLINE5": MapplsPolylineGeometryType.polyline5.rawValue,
            "GEOMETRY_POLYLINE6": MapplsPolylineGeometryType.polyline6.rawValue,
//            "GEOMETRY_COORDINATES": MapplsPolylineGeometryType.ge
        ];
        
        let sessionConstants:NSDictionary = [
            "SESSION_TYPE_GLOBAL": MapplsSessionType.global.rawValue,
            "SESSION_TYPE_NAVIGATION": MapplsSessionType.navigation.rawValue,
        ];
        
        let geoanalyticsLayerTypeConstants: NSDictionary = [
            "STATE": MapplsGeoanalyticsLayerType.state.rawValue,
            "DISTRICT": MapplsGeoanalyticsLayerType.district.rawValue,
            "SUB_DISTRICT": MapplsGeoanalyticsLayerType.subDistrict.rawValue,
            "WARD": MapplsGeoanalyticsLayerType.ward.rawValue,
            "LOCALITY": MapplsGeoanalyticsLayerType.locality.rawValue,
            "PANCHAYAT": MapplsGeoanalyticsLayerType.panchayat.rawValue,
            "BLOCK": MapplsGeoanalyticsLayerType.block.rawValue,
            "PINCODE": MapplsGeoanalyticsLayerType.pincode.rawValue,
            "TOWN": MapplsGeoanalyticsLayerType.town.rawValue,
            "CITY": MapplsGeoanalyticsLayerType.city.rawValue,
            "VILLAGE": MapplsGeoanalyticsLayerType.village.rawValue,
            "SUB_LOCALITY": MapplsGeoanalyticsLayerType.subLocality.rawValue,
            "SUB_SUB_LOCALITY": MapplsGeoanalyticsLayerType.subSubLocality.rawValue,
        ];
        
        return [
            "AutoSuggestCriteria":autosuggestConstants,
            "GeoCodingCriteria":geoCodeConstants,
            "NearbyCriteria":nearbyConstants,
            "DirectionsCriteria":directionConstants,
            "POICriteria":poiConstants,
            "SessionCriteria":sessionConstants,
            "GeoAnalyticsType":geoanalyticsLayerTypeConstants,
        ] as NSDictionary
    }
    
    
    @objc(reverseGeocode:withResolver:withRejecter:)
    func reverseGeocode(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        if(options["latitude"]==nil){
            reject(REQUIRED_CODE,"Please provide latitude parameter",nil)
            return
        }
        
        if(options["longitude"]==nil){
            reject(REQUIRED_CODE,"Please provide longitude parameter",nil)
            return
        }
        let reverseGeocodeManager: MapplsReverseGeocodeManager
        if let baseUrl = options["baseUrl"] as? String {
            let url = URL(string: baseUrl)
            reverseGeocodeManager = MapplsReverseGeocodeManager.init(host: url?.host, scheme: url?.scheme)
        } else {
            reverseGeocodeManager = MapplsReverseGeocodeManager.shared
        }
        
        if let option = RestAPIHelper.reverseGeocodeOption(argument: options) {
            reverseGeocodeManager.reverseGeocode(option) { (placemarks, attribution, error) in
                if let error = error {
                    reject(String(error.code),error.localizedDescription,nil)
                } else {
                    let theJSONText = RestAPIHelper.reverseGeocodeResponse(response: placemarks ?? [])
                    resolve("\(theJSONText ?? "")")
                }
            }
        }else {
            reject("-1","Something went wrong",nil)
        }
        
    }
    
    
    @objc(geocode:withResolver:withRejecter:)
    func geocode(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        if(options["address"]==nil){
            reject(REQUIRED_CODE,"Please provide address parameter",nil)
            return
        }
        
        let geocodeManager: MapplsAtlasGeocodeManager
        if let baseUrl = options["baseUrl"] as? String {
            let url = URL(string: baseUrl)
            geocodeManager = MapplsAtlasGeocodeManager.init(host: url?.host, scheme: url?.scheme)
        } else {
            geocodeManager = MapplsAtlasGeocodeManager.shared
        }
        
        if let option = RestAPIHelper.geocodeOption(argument: options) {
            geocodeManager.getGeocodeResults(option) {(response, error) in
                if let error = error {
                    reject(String(error.code),error.localizedDescription,nil)
                } else {
                    let theJSONText = RestAPIHelper.geocodeResponse(response: response)
                    resolve("\(theJSONText ?? "")")
                }
            }
        }else {
            reject("-1","Something went wrong",nil)
        }
        
    }
    
    @objc(autoSuggest:withResolver:withRejecter:)
    func autoSuggest(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        if(options["query"]==nil){
            reject(REQUIRED_CODE,"Please provide query parameter",nil)
            return
        }
        let autoSuggestManager: MapplsAutoSuggestManager
        if let baseUrl = options["baseUrl"] as? String {
            let url = URL(string: baseUrl)
            autoSuggestManager = MapplsAutoSuggestManager.init(host: url?.host, scheme: url?.scheme)
        } else {
            autoSuggestManager = MapplsAutoSuggestManager.shared
        }
        
        let option = RestAPIHelper.autosuggestOption(argument: options)
        if(option != nil) {
            autoSuggestManager.getAutoSuggestionResults(option!){ (suggestions, error) in
                if let error = error {
                    reject(String(error.code),error.localizedDescription,nil)
                } else {
                    let response = suggestions as? MapplsAutoSuggestLocationResults
                    let theJSONText = RestAPIHelper.autosuggestResponse(response: response)
                    resolve("\(theJSONText ?? "")")
                }
            }
        } else {
            reject("-1","Something went wrong",nil)
        }
        
    }
    
    @objc(nearby:withResolver:withRejecter:)
    func nearby(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        if(options["keyword"]==nil){
            reject(REQUIRED_CODE,"Please provide keyword parameter",nil)
            return
        }
        
        if(options["location"]==nil){
            reject(REQUIRED_CODE,"Please provide location parameter",nil)
            return
        }
        let nearByManager: MapplsNearByManager
        if let baseUrl = options["baseUrl"] as? String {
            let url = URL(string: baseUrl)
            nearByManager = MapplsNearByManager.init(host: url?.host, scheme: url?.scheme)
        } else {
            nearByManager = MapplsNearByManager.shared
        }
        if let option = RestAPIHelper.nearbyOption(argument: options) {
            nearByManager.getNearBySuggestions(option) { (nearbyResult, error) in
                if let error = error {
                    reject(String(error.code),error.localizedDescription,nil)
                }else {
                    let theJSONText = RestAPIHelper.nearbyResponse(response: nearbyResult)
                    resolve("\(theJSONText ?? "")")
                }
            }
        } else {
            reject("-1","Something went wrong",nil)
        }
        
    }
    
    
    @objc(distance:withResolver:withRejecter:)
    func distance(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        if(options["coordinates"]==nil){
            reject(REQUIRED_CODE,"Please provide coordinates parameter",nil)
            return
        }
        let coordinates = options["coordinates"] as! [String]
        
        if(coordinates.count<2){
            reject(REQUIRED_CODE,"Please provide atleast two coordinates",nil)
            return
        }
        
        let distanceManager: MapplsDrivingDistanceMatrixManager
        if let baseUrl = options["baseUrl"] as? String {
            let url = URL(string: baseUrl)
            distanceManager = MapplsDrivingDistanceMatrixManager.init(host: url?.host, scheme: url?.scheme)
        } else {
            distanceManager = MapplsDrivingDistanceMatrixManager.shared
        }
        if let option = RestAPIHelper.distanceMatrix(argument: options) {
            distanceManager.getResult(option) { (distanceResult, error) in
                if let error = error {
                    reject(String(error.code),error.localizedDescription,nil)
                }else {
                    let theJSONText = RestAPIHelper.distanceMatrixResponse(response: distanceResult)
                    resolve("\(theJSONText ?? "")")
                }
            }
        } else {
            reject("-1","Something went wrong",nil)
        }
    }
    
    
    @objc(placeDetail:withResolver:withRejecter:)
    func placeDetail(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        if(options["mapplsPin"]==nil){
            reject(REQUIRED_CODE,"Please provide mapplsPin parameter",nil)
            return
        }
        let placeDetailManager: MapplsPlaceDetailManager
        if let baseUrl = options["baseUrl"] as? String {
            let url = URL(string: baseUrl)
            placeDetailManager = MapplsPlaceDetailManager.init(clientId: nil, clientSecret: nil, grantType: nil, host: url?.host, scheme: url?.scheme)
        } else {
            placeDetailManager = MapplsPlaceDetailManager.shared
        }
        if let option = RestAPIHelper.placeDetailOption(argument: options) {
            placeDetailManager.getResults(option) { (placeDetail, error) in
                if let error = error {
                    reject(String(error.code),error.localizedDescription,nil)
                } else {
                    let theJSONText = RestAPIHelper.placeDetailResponse(response: placeDetail)
                    resolve("\(theJSONText ?? "")")
                }
            }
        } else {
            reject("-1","Something went wrong",nil)
        }
    }
    
    @objc(POIAlongRoute:withResolver:withRejecter:)
    func POIAlongRoute(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        if(options["category"]==nil){
            reject(REQUIRED_CODE,"Please provide category parameter",nil)
            return
        }
        
        if(options["path"]==nil){
            reject(REQUIRED_CODE,"Please provide path parameter",nil)
            return
        }
        
        let poiAlongRouteManager: MapplsPOIAlongTheRouteManager
        if let baseUrl = options["baseUrl"] as? String {
            let url = URL(string: baseUrl)
            poiAlongRouteManager = MapplsPOIAlongTheRouteManager.init(host: url?.host, scheme: url?.scheme)
        } else {
            poiAlongRouteManager = MapplsPOIAlongTheRouteManager.shared
        }
        
        if let option = RestAPIHelper.poiAlongRouteOption(argument: options) {
            poiAlongRouteManager.getPOIsAlongTheRoute(option) { (response, error) in
                
                if let error = error {
                    reject(String(error.code),error.localizedDescription,nil)
                }else {
                    let theJSONText = RestAPIHelper.poiAlongRouteResponse(response: response)
                    resolve("\(theJSONText ?? "")")
                }
                
            }
        } else {
            reject("-1","Something went wrong",nil)
        }
    }
    
    @objc(feedback:withResolver:withRejecter:)
    func feedback(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        if(options["typedKeyword"]==nil){
            reject(REQUIRED_CODE,"Please provide typedKeyword parameter",nil)
            return
        }
        
        if(options["mapplsPin"]==nil){
            reject(REQUIRED_CODE,"Please provide mapplsPin parameter",nil)
            return
        }
        
        if(options["index"]==nil){
            reject(REQUIRED_CODE,"Please provide index parameter",nil)
            return
        }
        if(options["appVersion"]==nil){
            reject(REQUIRED_CODE,"Please provide appVersion parameter",nil)
            return
        }
        if(options["locationName"]==nil){
            reject(REQUIRED_CODE,"Please provide locationName parameter",nil)
            return
        }
        if(options["userName"]==nil){
            reject(REQUIRED_CODE,"Please provide userName parameter",nil)
            return
        }
        if(options["latitude"]==nil){
            reject(REQUIRED_CODE,"Please provide latitude parameter",nil)
            return
        }
        if(options["longitude"]==nil){
            reject(REQUIRED_CODE,"Please provide longitude parameter",nil)
            return
        }
        
        let feedbackManager: MapplsFeedbackManager
        if let baseUrl = options["baseUrl"] as? String {
            let url = URL(string: baseUrl)
            feedbackManager = MapplsFeedbackManager.init(host: url?.host, scheme: url?.scheme)
        } else {
            feedbackManager = MapplsFeedbackManager.shared
        }
        
        if let option = RestAPIHelper.feedbackOption(argument: options) {
            feedbackManager.sendFeedback(option) { (created, error) in
                if let error = error {
                    reject(String(error.code),error.localizedDescription,nil)
                }else {
                    resolve("success")
                }
            }
        } else {
            reject("-1","Something went wrong",nil)
        }
    }
    
    @objc(direction:withResolver:withRejecter:)
    func direction(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        if(options["origin"]==nil){
            reject(REQUIRED_CODE,"Please provide origin parameter",nil)
            return
        }
        
        if(options["destination"]==nil){
            reject(REQUIRED_CODE,"Please provide destination parameter",nil)
            return
        }
        
        let directionManager: Directions
        if let baseUrl = options["baseUrl"] as? String {
            let url = URL(string: baseUrl)
            directionManager = Directions.init(host: url?.host, scheme: url?.scheme)
        } else {
            directionManager = Directions.shared
        }
        
        if let option = RestAPIHelper.directionOption(argument: options) {
            directionManager.calculate(option) { (waypoints, routes, error) in
                if let error = error {
                    reject(String(error.code),error.localizedDescription,nil)
                }else {
                    let theJSONText = RestAPIHelper.directionResponse(response: routes ?? [], waypoints: waypoints ?? [], geometry: option.shapeFormat)
                    resolve("\(theJSONText ?? "")")
                }
            }
        } else {
            reject("-1","Something went wrong",nil)
        }
    }
    
    @objc(directionRefresh:withResolver:withRejecter:)
    func directionRefresh(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        if(options["route"]==nil){
            reject(REQUIRED_CODE,"Please provide route parameter",nil)
            return
        }
        
        let directionRefreshManager: Directions
        if let baseUrl = options["baseUrl"] as? String {
            let url = URL(string: baseUrl)
            directionRefreshManager = Directions.init(host: url?.host, scheme: url?.scheme)
        } else {
            directionRefreshManager = Directions.shared
        }

        if let option = RestAPIHelper.directionRefreshOption(argument: options) {
            directionRefreshManager.calculate(refresh: option) { (waypoints, routes, error) in
                if let error = error {
                    reject(String(error.code),error.localizedDescription,nil)
                }else {
                    let theJSONText = RestAPIHelper.getDirectionsRoute(item: routes![0], index: 0)!
                    resolve("\(theJSONText ?? "")")
                }
            }
        }
    }
    
    @objc(textSearch:withResolver:withRejecter:)
    func textSearch(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        if(options["query"]==nil){
            reject(REQUIRED_CODE,"Please provide query parameter",nil)
            return
        }
        
        let textSearchManager: MapplsAtlasTextSearchManager
        if let baseUrl = options["baseUrl"] as? String {
            let url = URL(string: baseUrl)
            textSearchManager = MapplsAtlasTextSearchManager.init(host: url?.host, scheme: url?.scheme)
        } else {
            textSearchManager = MapplsAtlasTextSearchManager.shared
        }
        
        if let option = RestAPIHelper.textSearchOption(argument: options) {
            textSearchManager.getTextSearchResult(option) { (suggestions, error) in
                if let error = error {
                    reject(String(error.code),error.localizedDescription,nil)
                } else {
                    let theJSONText = RestAPIHelper.autosuggestResponse(response: suggestions)
                    resolve("\(theJSONText ?? "")")
                }
                
            }
        } else {
            reject("-1","Something went wrong",nil)
        }
    }
    
    @objc(hateosnearby:withResolver:withRejecter:)
    func hateosnearby(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        if(options["hyperlink"]==nil){
            reject(REQUIRED_CODE,"Please provide hyperlink parameter",nil)
            return
        }
        
        
        let hateOsManager = MapplsHateOSManager.shared
        if let option = RestAPIHelper.hateOsNearbyOption(argument: options) {
            hateOsManager.getResults(option) { (nearbyResponse, error) in
                if let error = error {
                    reject(String(error.code),error.localizedDescription,nil)
                } else {
                    let theJSONText = RestAPIHelper.hateOsNearbyResponse(response: nearbyResponse)
                    resolve("\(theJSONText ?? "")")
                }
            }
        } else {
            reject("-1","Something went wrong",nil)
        }
    }
    
    @objc(clusterLinkedDevices:withResolver:withRejecter:)
    func clusterLinkedDevices(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        if(options["clusterId"]==nil){
            reject(REQUIRED_CODE,"Please provide clusterId parameter",nil)
            return
        }

        var sessionType = MapplsSessionType.global
        
        if(options["sessionType"] != nil){
            let seesionTypeString  = options["sessionType"] as! String
            sessionType = MapplsSessionType(rawValue: seesionTypeString)
        }
        
        let clusterLinkedDevicesManager: MapplsClusterLinkedDevicesManager
        if let baseUrl = options["baseUrl"] as? String {
            let url = URL(string: baseUrl)
            clusterLinkedDevicesManager = MapplsClusterLinkedDevicesManager.init(clientId: MapplsAccountManager.clientId(), clientSecret: MapplsAccountManager.clientSecret(), grantType: MapplsAccountManager.grantType(), sessionType: sessionType, host: url?.host, scheme: url?.scheme)
        } else {
            clusterLinkedDevicesManager = MapplsClusterLinkedDevicesManager.init(clientId: MapplsAccountManager.clientId(), clientSecret: MapplsAccountManager.clientSecret(), grantType: MapplsAccountManager.grantType(), sessionType: sessionType)
        }
        
        if  let clusterLinkedDevicesOptions = RestAPIHelper.clusterLinkedDevicesOption(argument: options) {
            clusterLinkedDevicesManager.getClusterLinkedDevices(clusterLinkedDevicesOptions) { (devices, error) in
                if let error = error {
                    reject(String(error.code),error.localizedDescription,nil)
                } else if let devices = devices {
                    let theJSONText = RestAPIHelper.clusterLinkedDevicesResponse(response: devices)
                    resolve("\(theJSONText ?? "")")
                }
            }
        } else {
            reject("-1","Something went wrong",nil)
        }
        
    }
    
    
    @objc(deleteClusterLinkedDevice:withResolver:withRejecter:)
    func deleteClusterLinkedDevice(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        if(options["clusterId"]==nil){
            reject(REQUIRED_CODE,"Please provide clusterId parameter",nil)
            return
        }
        
        if(options["linkedDevice"]==nil){
            reject(REQUIRED_CODE,"Please provide linkedDevice parameter",nil)
            return
        }
        
        var sessionType = MapplsSessionType.global
        
        if(options["sessionType"] != nil){
            let seesionTypeString  = options["sessionType"] as! String
            sessionType = MapplsSessionType(rawValue: seesionTypeString)
        }
        
        let deleteClusterLinkedDevicesManager: MapplsDeleteClusterLinkedDeviceManager
        if let baseUrl = options["baseUrl"] as? String {
            let url = URL(string: baseUrl)
            deleteClusterLinkedDevicesManager = MapplsDeleteClusterLinkedDeviceManager.init(clientId: MapplsAccountManager.clientId(), clientSecret: MapplsAccountManager.clientSecret(), grantType: MapplsAccountManager.grantType(), sessionType: sessionType, host: url?.host, scheme: url?.scheme)
        } else {
            deleteClusterLinkedDevicesManager = MapplsDeleteClusterLinkedDeviceManager.init(clientId: MapplsAccountManager.clientId(), clientSecret: MapplsAccountManager.clientSecret(), grantType: MapplsAccountManager.grantType(), sessionType: sessionType)
        }
        
        if let deleteClusterLinkedDevicesOptions = RestAPIHelper.deleteClusterLinkedDeviceOption(argument: options){
            deleteClusterLinkedDevicesManager.deleteClusterLinkedDevice(deleteClusterLinkedDevicesOptions) { (isSccuess, error) in
                if let error = error {
                    reject(String(error.code),error.localizedDescription,nil)
                }else if isSccuess {
                    resolve("success")
                }
            }
        }else {
            reject("-1","Something went wrong",nil)
        }
        
        
    }
    
    
    @objc(endSession:withResolver:withRejecter:)
    func endSession(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        if(options["clusterId"]==nil){
            reject(REQUIRED_CODE,"Please provide clusterId parameter",nil)
            return
        }
        
        
        var sessionType = MapplsSessionType.global
        
        if(options["sessionType"] != nil){
            let seesionTypeString  = options["sessionType"] as! String
            sessionType = MapplsSessionType(rawValue: seesionTypeString)
        }
        
        let endSessionManager: MapplsEndSessionManager
        if let baseUrl = options["baseUrl"] as? String {
            let url = URL(string: baseUrl)
            endSessionManager = MapplsEndSessionManager.init(clientId: MapplsAccountManager.clientId(), clientSecret: MapplsAccountManager.clientSecret(), grantType: MapplsAccountManager.grantType(), sessionType: sessionType, host: url?.host, scheme: url?.scheme)
        } else {
            endSessionManager = MapplsEndSessionManager.init(clientId: MapplsAccountManager.clientId(), clientSecret: MapplsAccountManager.clientSecret(), grantType: MapplsAccountManager.grantType(), sessionType: sessionType)
        }
        
        if  let endSessionOptions = RestAPIHelper.endSessionOption(argument: options){
            endSessionManager.endSession(endSessionOptions) { (isSuccess, error) in
                if let error = error {
                    reject(String(error.code),error.localizedDescription,nil)
                }else if isSuccess {
                    resolve("success")
                }
            }
            
        } else {
            reject("-1","Something went wrong",nil)
        }
    }
    
    @objc(geoAnalyticsList:withResolver:withRejecter:)
    func geoAnalyticsList(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        if(options["api"]==nil){
            reject(REQUIRED_CODE,"Please provide api parameter",nil)
            return
        }
        
        if(options["geoBoundType"]==nil){
            reject(REQUIRED_CODE,"Please provide geoBoundType parameter",nil)
            return
        }
        
        if(options["geoBound"]==nil){
            reject(REQUIRED_CODE,"Please provide geoBound parameter",nil)
            return
        }
        
        if(options["attributes"]==nil){
            reject(REQUIRED_CODE,"Please provide attributes parameter",nil)
            return
        }
        
        
        if  let listingRequest = RestAPIHelper.geoAnalyticsListOption(argument: options){
            
            let listingManager = MapplsGeoanalyticsListingManager.shared()
            listingManager.getListingInfo(listingRequest) { (response, err) in
                let error = err as NSError?
                if let error = error {
                    reject(String(error.code), error.localizedDescription,nil)
                } else {
                    let theJSONText = RestAPIHelper.geoAnalyticsListResponse(response: response)
                    resolve("\(theJSONText ?? "")")
                }
            }
            
        } else {
            reject("-1","Something went wrong",nil)
        }
    }
    
    @objc(roadTrafficDetail:withResolver:withRejecter:)
    func roadTrafficDetail(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        
        if let location  = options["location"] as? NSDictionary {
            if(location["latitude"] == nil || location["longitude"] == nil){
                reject(REQUIRED_CODE,"Please provide latitude or longitude parameter",nil)
                return
            }
        }else{
            reject(REQUIRED_CODE,"Please provide location parameter",nil)
            return
        }
        
        
        if  let trafficDetailRequest = RestAPIHelper.roadTrafficDetailOption(argument: options){
            
            let trafficDetailManger: MapplsRoadTrafficDetailsManager
            if let baseUrl = options["baseUrl"] as? String {
                let url = URL(string: baseUrl)
                trafficDetailManger = MapplsRoadTrafficDetailsManager.init(host: url?.host, scheme: url?.scheme)
            } else {
                trafficDetailManger = MapplsRoadTrafficDetailsManager.shared
            }

            trafficDetailManger.getTrafficRoadDetailsResults(trafficDetailRequest) { response, error in
                if let error = error {
                    reject(String(error.code), error.localizedDescription,nil)
                } else {
                    let theJSONText = RestAPIHelper.roadTrafficDetailsResponse(response: response)
                    resolve("\(theJSONText ?? "")")
                }
            }
        } else {
            reject("-1","Something went wrong",nil)
        }
    }
    
    @objc(generateOtp:withResolver:withRejecter:)
    func generateOtp(userHandle: NSString,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        
        let otpManger = MapplsOtpGenerateManager.shared;
        let otpOptions = MapplsOtpGenerateOptions.init(userHandle: userHandle as String);
        otpManger.getOtp(otpOptions) { location, error in
            if let error = error {
                reject(String(error.code), error.localizedDescription,nil)
            } else {
                
                resolve(location)
            }
        }
        
    }
    
    @objc(whiteList:withResolver:withRejecter:)
    func whiteList(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        
        if(options["url"]==nil){
            reject(REQUIRED_CODE,"Please provide url parameter",nil)
            return
        }
        
        if(options["userHandle"]==nil){
            reject(REQUIRED_CODE,"Please provide userHandle parameter",nil)
            return
        }
        
        if(options["otp"]==nil){
            reject(REQUIRED_CODE,"Please provide otp parameter",nil)
            return
        }
        
        
        if  let whiteListRequest = RestAPIHelper.whiteListOption(argument: options){
            
            let whitelistManager = MapplsWhitelistManager.shared;
            
            whitelistManager.whitelistUser(whiteListRequest) { isSuccess, error in
                if let error = error {
                    reject(String(error.code), error.localizedDescription,nil);
                } else {
                    resolve(nil);
                }
            }
            
        } else {
            reject("-1","Something went wrong",nil)
        }
    }
    
    
    @objc(nearbyReports:withResolver:withRejecter:)
    func nearbyReports(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        if(options["topLeft"]==nil){
            reject(REQUIRED_CODE,"Please provide topLeft parameter",nil)
            return
        }
        
        if(options["bottomRight"]==nil){
            reject(REQUIRED_CODE,"Please provide bottomRight parameter",nil)
            return
        }
        
        
        
        
        if  let nearbyReportRequest = RestAPIHelper.nearbyReportOption(argument: options){
            
            let nearbyReportManager: MapplsNearbyReportManager
            if let baseUrl = options["baseUrl"] as? String {
                let url = URL(string: baseUrl)
                nearbyReportManager = MapplsNearbyReportManager.init(host: url?.host, scheme: url?.scheme)
            } else {
                nearbyReportManager = MapplsNearbyReportManager.shared
            }
            
            nearbyReportManager.getNearbyReportResult(nearbyReportRequest) { placemarks, error in
                if let error = error {
                    reject(String(error.code), error.localizedDescription,nil);
                } else {
                    let theJSONText = RestAPIHelper.nearbyReportResponse(response: placemarks);
                    resolve("\(theJSONText ?? "")");
                }
            }
            
        } else {
            reject("-1","Something went wrong",nil)
        }
    }
    
    @objc(weather:withResolver:withRejecter:)
    func weather(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        if let location  = options["location"] as? NSDictionary {
            if(location["latitude"] == nil || location["longitude"] == nil){
                reject(REQUIRED_CODE,"Please provide latitude or longitude parameter",nil)
                return
            }
        }else{
            reject(REQUIRED_CODE,"Please provide location parameter",nil)
            return
        }
        
        if  let weatherRequest = RestAPIHelper.weatherOption(argument: options){
            
            let weatherManager: MapplsWeatherManager
            if let baseUrl = options["baseUrl"] as? String {
                let url = URL(string: baseUrl)
                weatherManager = MapplsWeatherManager.init(clientId: nil,clientSecret: nil, grantType: nil, host: url?.host, scheme: url?.scheme)
            } else {
                weatherManager = MapplsWeatherManager.shared
            }

            weatherManager.getResults(weatherRequest){ weatherResponse, error in
                if let error = error {
                    reject(String(error.code), error.localizedDescription,nil);
                } else {
                    let theJSONText = RestAPIHelper.weatherResponse(response: weatherResponse);
                    resolve("\(theJSONText ?? "")");
                }
            }
        } else {
            reject("-1","Something went wrong",nil)
        }
        
    }
    
    @objc(tripCostEstimation:withResolver:withRejecter:)
    func tripCostEstimation(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        if let tripCostRequest = RestAPIHelper.tripCostEstimationOption(argument: options) {
            
            let tripCostManager = MapplsCostEstimationManager.shared
            tripCostManager.getMapplsTollResult(tripCostRequest) { costEstimationResponse, error in
                if let error = error {
                    reject(String(error.code), error.localizedDescription,nil);
                } else {
                    let theJSONText = RestAPIHelper.costEstimationResponse(response: costEstimationResponse);
                    resolve("\(theJSONText ?? "")");
                }
            }
        } else {
            reject("-1","Something went wrong",nil)
        }
    }
    
    @objc(eventCategoryMaster:withResolver:withRejecter:)
    func eventCategoryMaster(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        let feedbackKitManager = MapplsFeedbackKitManager.shared
        feedbackKitManager.getReportCategories { (reportCategories, error) in
            if let error = error {
                reject(String(error.code), error.localizedDescription,nil);
            } else {
                let theJSONText = RestAPIHelper.eventCategoryMasterResponse(response: reportCategories);
                resolve("\(theJSONText ?? "")");
            }
        }
    }
    
    @objc(routeReportSummary:withResolver:withRejecter:)
    func routeReportSummary(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        if let routeId = options["routeId"] {
            
        }else{
            reject(REQUIRED_CODE,"Please provide routeId parameter",nil)
            return
        }
        if let mapplsReportSummaryOption = RestAPIHelper.routeReportSummaryOption(argument: options){
            let directionManager: Directions
            if let baseUrl = options["baseUrl"] as? String {
                let url = URL(string: baseUrl)
                directionManager = Directions.init(host: url?.host, scheme: url?.scheme)
            } else {
                directionManager = Directions.shared
            }
            
            
            directionManager.getReportedEventSummaryForRoute(options: mapplsReportSummaryOption) { respons, error in
                if let error = error {
                    reject(String(error.code), error.localizedDescription,nil);
                } else {
                    let theJSONText = RestAPIHelper.routeReportSummaryResponse(response: respons);
                    resolve("\(theJSONText ?? "")");
                }
            }
        } else {
            reject("-1","Something went wrong",nil)
        }
    }
    
    @objc(fuelCost:withResolver:withRejecter:)
    func fuelCost(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        if let mapplsFuelCostOptions = RestAPIHelper.fuelPriceOption(argument: options){
            let mapplsFuelPriceManager: MapplsFuelPriceManager = MapplsFuelPriceManager.shared
            mapplsFuelPriceManager.getMapplsFulePrice(mapplsFuelCostOptions) {response, error in
                if let error = error {
                    reject(String(error.code), error.localizedDescription,nil);
                } else {
                    let theJSONText = RestAPIHelper.fuelCostResponse(response: response);
                    resolve("\(theJSONText ?? "")");
                }
            }
        } else {
            reject("-1","Something went wrong",nil)
        }
    }
    
    @objc(transitPlanner:withResolver:withRejecter:)
    func transitPlanner(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {

    }
    
    @objc(tripOptimisation:withResolver:withRejecter:)
    func tripOptimisation(options: NSDictionary,withReslover resolve:@escaping RCTPromiseResolveBlock,withRejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
    }
    
}