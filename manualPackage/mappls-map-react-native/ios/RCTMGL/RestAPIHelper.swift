//
//  RestAPIHelper.swift
//
//  Created by CEINFO on 20/05/21.
//

import Foundation
import MapplsAPIKit
import MapplsMap
import MapplsGeoanalytics
import MapplsFeedbackKit

class RestAPIHelper {
    
    class func autosuggestOption(argument: Any?) -> MapplsAutoSearchAtlasOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        let option = MapplsAutoSearchAtlasOptions.init(query: options["query"] as! String)
        if let location = options["location"] as? NSDictionary {
            
            let lat = location["latitude"] as! Double
            let lng = location["longitude"] as! Double
            
            option.location = CLLocation(latitude: lat, longitude:lng)
        }
        if let zoom = options["zoom"] as? NSNumber {
            option.zoom = zoom
        }
        if(options.keys.contains("tokenizeAddress")) {
            if let tokenizeAddress =  options["tokenizeAddress"] as? Bool {
                option.includeTokenizeAddress = tokenizeAddress
            }
        }
        if(options.keys.contains("pod")) {
            option.pod = MapplsPodType(options["pod"] as! String)
        }
        if(options.keys.contains("bridge")) {
            option.isBridgeEnabled = options["bridge"] as! Bool
        }
        if(options.keys.contains("hyperLocal")) {
            option.hyperLocal = options["hyperLocal"] as! Bool
        }
        
        if (options.keys.contains("responseLang")) {
            option.responseLanguage = options["responseLang"] as? String
        }
        if let filter = options["filter"] as? String {
            if(filter.contains("bounds")) {
                let filterArray = filter.components(separatedBy: ":")
                let boundsArray = filterArray[1].components(separatedBy: ";")
                let firstBound = boundsArray[0].components(separatedBy: ",")
                let secondBound = boundsArray[1].components(separatedBy: ",")
                let firstLng=(firstBound[1] as NSString).doubleValue
                let firstLat=(firstBound[0] as NSString).doubleValue
                let secondLng=(secondBound[1] as NSString).doubleValue
                let secondLat=(secondBound[0] as NSString).doubleValue
                
                let southwest = CLLocationCoordinate2D(latitude: firstLat, longitude: firstLng)
                let northeast = CLLocationCoordinate2D(latitude: secondLat, longitude: secondLng)
                option.filter = MapplsBoundsFilter(bounds: MapplsRectangularRegion(topLeft: northeast, bottomRight: southwest))
            } else if(filter.contains("cop")) {
                let filterArray = filter.components(separatedBy: ":")
                option.filter = MapplsMapplsPinFilter(mapplsPin: filterArray[1])
            } else if(filter.contains("pin")) {
                let filterArray = filter.components(separatedBy: ":")
                option.filter = MapplsPinFilter(pincode: filterArray[1])
            }
        }
        if let explain = options["explain"] as? Bool {
            option.shouldExplain = explain
        }
        return option
    }
    
    class func geocodeOption(argument: Any?) -> MapplsAtlasGeocodeOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        let geocodeOptions = MapplsAtlasGeocodeOptions.init(query: options["address"] as! String)
        if let bias = options["bias"] as? NSNumber {
            //Need to check
        }
        if let bound = options["bound"] as? String {
            //Need to check
        }
        if let itemCount = options["itemCount"] as? NSNumber {
            geocodeOptions.maximumResultCount = itemCount.uintValue
        }
        if let podFilter = options["podFilter"] as? String {
            //Need to check
        }
        if let scores = options["scores"] as? Bool {
//            geocodeOptions.
        }
        
        return geocodeOptions
        
    }
    
    class func reverseGeocodeOption(argument: Any?) -> MapplsReverseGeocodeOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        if let latitude = options["latitude"] as? Double,
           let longitude = options["longitude"] as? Double{
            let option = MapplsReverseGeocodeOptions.init(coordinate:CLLocationCoordinate2D(latitude: latitude, longitude:longitude))
            
            if let lang = options["lang"] as? String {
                option.language = lang
            }
            return option
            
        }
        return nil
        
    }
    
    class func nearbyOption(argument: Any?) -> MapplsNearbyAtlasOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        let location: String = options["location"] as! String;
        
        let nearbyOption = MapplsNearbyAtlasOptions.init(query: options["keyword"] as! String, location: location)
        if let page = options["page"] as? NSNumber {
            nearbyOption.page = page
        }
        if let radius = options["radius"] as? NSNumber {
            nearbyOption.radius = radius
        }
        if let pod = options["pod"] as? String {
            nearbyOption.pod = MapplsPodType.init(rawValue: pod)
        }
        if let bounds = options["bounds"] as? String {
            let boundsArray = bounds.components(separatedBy: ";")
            let firstBound = boundsArray[0].components(separatedBy: ",")
            let secondBound = boundsArray[1].components(separatedBy: ",")
            let firstLng=(firstBound[1] as NSString).doubleValue
            let firstLat=(firstBound[0] as NSString).doubleValue
            let secondLng=(secondBound[1] as NSString).doubleValue
            let secondLat=(secondBound[0] as NSString).doubleValue
            
            let southwest = CLLocationCoordinate2D(latitude: firstLat, longitude: firstLng)
            let northeast = CLLocationCoordinate2D(latitude: secondLat, longitude: secondLng)
            nearbyOption.bounds = MapplsRectangularRegion.init(topLeft: northeast, bottomRight: southwest)
        }
        if let filter = options["filter"] as? String {
            let filterListArray = filter.components(separatedBy: ",")
            var mapplsNearbyFilters = [MapplsNearbyKeyValueFilter]()
            filterListArray.map { filterValue in
                let filterArray = filterValue.components(separatedBy: ":")
                mapplsNearbyFilters.append(MapplsNearbyKeyValueFilter(filterKey: filterArray[0], filterValues: [filterArray[1]]))
            }
            nearbyOption.filters = mapplsNearbyFilters
        }
        if let explain = options["explain"] as? Bool {
            nearbyOption.shouldExplain = explain
        }
        if let richData = options["richData"] as? Bool {
            nearbyOption.isRichData = richData
        }
        if let searchBy = options["searchBy"] as? String {
            nearbyOption.searchBy = MapplsSearchByType.init(searchBy)
        }
        if let sortBy = options["sortBy"] as? String {
            if sortBy == "dist:asc" || sortBy == "dist:desc" {
                nearbyOption.sortBy = MapplsSortByDistanceWithOrder(orderBy: MapplsSortByOrderType.init(sortBy))
            } else if sortBy == "name:asc" || sortBy == "name:desc" {
                //Need to check
            }
        }
        if let userName = options["userName"] as? String {
            nearbyOption.userName = userName
        }
        
        
        return nearbyOption
    }
    
    class func directionRefreshOption(argument: Any?) -> DirectionsRefreshOptions?{
        guard let options = argument as? [String: Any] else { return nil}
    
        let routeOptions = directionOption(argument: options["routeOptions"]);

        let route = Route.init(json: RestAPIHelper.convertToDictionary(text: options["route"] as! String)!, waypoints: routeOptions!.waypoints, options: routeOptions!);
        
        
        let directionRefreshOption: DirectionsRefreshOptions;
        if let tripType = options["tripType"] as? Int {
            directionRefreshOption = DirectionsRefreshOptions(route: route, routeIndex: (options["routeIndex"] as? Int) ?? 0, nodeIndex: (options["nodeIndex"] as? Int) ?? -1, tripType: MapplsETARefreshTripType(rawValue: tripType) ?? MapplsETARefreshTripType.continue);
        } else{
            directionRefreshOption = DirectionsRefreshOptions(route: route, routeIndex: (options["routeIndex"] as? Int) ?? 0, nodeIndex: (options["nodeIndex"] as? Int) ?? -1);
        }
        if let isRefresh = options["isRefresh"] as? Bool {
            directionRefreshOption.isRefresh = isRefresh;
        }
        return directionRefreshOption;
        
    }
    
    class private func convertToDictionary(text: String) -> [String: Any]? {
        if let data = text.data(using: .utf8) {
            do {
                return try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
            } catch {
                print(error.localizedDescription)
            }
        }
        return nil
    }
    
    class func directionOption(argument: Any?) -> RouteOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        var waypointList: [Waypoint] = [Waypoint]()
        if let originPoint = options["origin"] as? String {
            waypointList.append(Waypoint.init(mapplsPin: originPoint))
        }
        if let waypointPoint = options["waypoints"] as? [Any] {
            for item in waypointPoint {
                let location = item as! String
                waypointList.append(Waypoint.init(mapplsPin: location	))
            }
        }
        if let destinationPoint = options["destination"] as? String {
            waypointList.append(Waypoint.init(mapplsPin: destinationPoint))
        }
        
        let directionOptions = RouteOptions.init(waypoints: waypointList)
        directionOptions.profileIdentifier = options["profile"] != nil ? MapplsDirectionsProfileIdentifier.init(options["profile"] as! String) : MapplsDirectionsProfileIdentifier.driving
        directionOptions.resourceIdentifier = options["resource"] != nil ?  MapplsDirectionsResourceIdentifier.init(options["resource"] as! String) : MapplsDirectionsResourceIdentifier.routeAdv
        directionOptions.routeShapeResolution = options["overview"] != nil ?  RouteShapeResolution.init(description: options["overview"] as! String)! : .full
        if let polylineType = options["geometries"] as? String {
            if polylineType == "polyline" {
                directionOptions.shapeFormat = .polyline
            } else {
                directionOptions.shapeFormat = .polyline6
            }
        } else {
            directionOptions.shapeFormat = .polyline6
        }
        if let excludes = options["excludes"] as? [String] {
            var avoidClasses: MapplsRoadClasses = MapplsRoadClasses()
            avoidClasses = RoadClasses.init(descriptions: excludes)!
            directionOptions.roadClassesToAvoid = avoidClasses
        }
        if let annotations = options["annotations"] as? [String] {
            var attributionArray: MapplsAttributeOptions = MapplsAttributeOptions()
            attributionArray = AttributeOptions.init(descriptions: annotations)!
            directionOptions.attributeOptions = attributionArray
        }
        if let routeType = options["routeType"] as? Int {
            directionOptions.routeType = MapplsDistanceRouteType.init(rawValue: routeType)!
        }
        if let steps = options["steps"] as? Bool {
            directionOptions.includesSteps = steps
        }
        if let alternatives = options["alternatives"] as? Bool {
            directionOptions.includesAlternativeRoutes = alternatives
        }
        if let bearing = options["bearing"] as? [String: Any?] {
            //Need to check
        }
        if let bannerInstructions = options["bannerInstructions"] as? Bool {
            directionOptions.includesVisualInstructions = bannerInstructions
        }
        if let roundaboutExits = options["roundaboutExits"] as? Bool {
            directionOptions.includesExitRoundaboutManeuver = roundaboutExits
        }
        if let instructions = options["instructions"] as? Bool {
            directionOptions.instructions = instructions
        }
        if let isSort = options["isSort"] as? Bool {
            directionOptions.sorted = isSort
        }
        if let lessVerbose = options["lessVerbose"] as? Bool {
            directionOptions.lessVerbose = lessVerbose
        }
        if let radiuses = options["radiuses"] as? [Double] {
            //Need to check
        }
        
        if let approches = options["approaches"] as? [String] {
            //Need to check
        }
        
        if let waypointIndices = options["waypointIndices"] as? [Any] {
            //Need to check
        }
        
        if let waypointNames = options["waypointNames"] as? [String] {
            //Need to check
        }
        
        if let waypointTargets = options["waypointTargets"] as? [Any] {
            //need to check
        }
        
        
        if let routeRefresh = options["routeRefresh"] as? Bool {
            directionOptions.routeRefresh = routeRefresh
        }
        if let deviceId = options["deviceId"] as? String {
//            directionOptions.deviceId = deviceId
        }
        if let roundaboutExits = options["roundaboutExits"] as? Bool {
            directionOptions.includesExitRoundaboutManeuver = roundaboutExits
        }
        if let sessionId = options["sessionId"] as? String {
            directionOptions.prevRouteSessionId = sessionId
        }
        if let voiceInstructions = options["voiceInstructions"] as? Bool {
            directionOptions.includesSpokenInstructions = voiceInstructions
        }
        if let voiceUnits = options["voiceUnits"] as? String {
            directionOptions.distanceMeasurementSystem = MeasurementSystem.init(description: voiceUnits)!
        }
        if let skipWaypoints = options["skipWaypoints"] as? Bool {
//            directionOptions.
        }
        if let routeType = options["routeType"] as? Int {
            directionOptions.routeType = MapplsDistanceRouteType(rawValue: routeType) ?? MapplsDistanceRouteType.quickest
        }
        if let dateTime = options["dateTime"] as? [String: Any] {
            
        }
        return directionOptions
    }
    
    class func distanceMatrix(argument: Any?) -> MapplsDrivingDistanceMatrixOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        if let coordinates = options["coordinates"] as? [String] {
            let distanceMatrixOption = MapplsDrivingDistanceMatrixOptions.init(locations: coordinates)
            if let profile = options["profile"] as? String {
                distanceMatrixOption.profileIdentifier =   MapplsDirectionsProfileIdentifier.init(profile)
            }
            
            if let resource = options["resource"] as? String {
                distanceMatrixOption.resourceIdentifier = MapplsDistanceMatrixResourceIdentifier.init(resource)
            }
            if let sources = options["sources"] as? [Int] {
                distanceMatrixOption.sourceIndexes = sources
            }
            if let destinations = options["destinations"] as? [Int] {
                distanceMatrixOption.destinationIndexes = destinations
            }
            if let routeType = options["routeType"] as? NSNumber {
                distanceMatrixOption.routeType = MapplsDistanceRouteType.init(rawValue: routeType.intValue) ?? .none
            }
            if let fallbackSpeed = options["fallbackSpeed"] as? Double {
//                distanceMatrixOption.spe
            }
            if let fallbackCoordinate = options["fallbackCoordinate"] as? String {
//                distanceMatrixOption.co
            }
            return distanceMatrixOption
        } else {
            return nil
        }
    }
    
    class func feedbackOption(argument: Any?) -> MapplsFeedbackOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        let lat = options["latitude"] as! Double
        let lng = options["longitude"] as! Double
        return MapplsFeedbackOptions.init(typedKeyword: options["typedKeyword"] as! String, selectedMapplsPin: options["mapplsPin"] as! String, selectedLocationName: options["locationName"] as! String, selectedIndex: options["index"] as! Int, username: options["userName"] as! String, appVersion: options["appVersion"] as! String, latitude: lat, longitude: lng)
    }
    
    class func poiAlongRouteOption(argument: Any?) -> MapplsPOIAlongTheRouteOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        let poiAlongRouteOptions = MapplsPOIAlongTheRouteOptions.init(path: options["path"] as! String, category: options["category"] as! String)
        let geometries = options["geometries"] as? String;
        if geometries == "polyline6" {
            poiAlongRouteOptions.geometries = .polyline6
        } else if geometries == "polyline" {
            poiAlongRouteOptions.geometries = .polyline5
        } else {
            poiAlongRouteOptions.geometries = .base64
        }
        if let buffer = options["buffer"] as? Int {
            poiAlongRouteOptions.buffer = buffer
        }
        if let page = options["page"] as? Int {
            poiAlongRouteOptions.page = page
        }
        if let sort = options["sort"] as? Bool {
            poiAlongRouteOptions.sort = sort
        }
        return poiAlongRouteOptions
    }
    
    class func textSearchOption(argument: Any?) -> MapplsTextSearchAtlasOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        let textSearchOptions = MapplsTextSearchAtlasOptions.init(query: options["query"] as! String)
        if let location = options["location"] as? [Double] {
            textSearchOptions.refLocation = CLLocation(latitude: location[0], longitude:location[1])
        }
        if let username = options["username"] as? NSNumber {
            //            textSearchOptions.username = username
        }
        if let explain = options["explain"] as? Bool {
            //Need to check
        }
        if(options.keys.contains("bridge")) {
            //Need to check
        }
        if let filter = options["filter"] as? String {
            //Need tocheck
            
        }
        
        return textSearchOptions
        
    }
    
    class func placeDetailOption(argument: Any?) -> MapplsPlaceDetailOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        return MapplsPlaceDetailOptions.init(mapplsPin: options["mapplsPin"] as! String)
    }
    
    
    class func hateOsNearbyOption(argument: Any?) -> MapplsHateOSNearbyOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        
        return MapplsHateOSNearbyOptions(hyperlink: URL(string: options["hyperlink"] as! String)!)
    }
    
    class func clusterLinkedDevicesOption(argument: Any?) -> MapplsClusterLinkedDevicesOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        
        let clusterLinkedDevicesOptions = MapplsClusterLinkedDevicesOptions(sessionDevice: options["clusterId"] as! String);
        return clusterLinkedDevicesOptions;
        
    }
    
    class func deleteClusterLinkedDeviceOption(argument: Any?) -> MapplsDeleteClusterLinkedDeviceOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        let deleteClusterLinkedDevicesOptions = MapplsDeleteClusterLinkedDeviceOptions(sessionDevice: options["clusterId"] as! String , linkedDevice: options["linkedDevice"] as! String)
        return deleteClusterLinkedDevicesOptions;
        
    }
    
    class func endSessionOption(argument: Any?) -> MapplsEndSessionOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        let endSessionOptions = MapplsEndSessionOptions(sessionDevice: options["clusterId"] as! String)
        return endSessionOptions;
        
    }
    
    
    class func geoAnalyticsListOption(argument: Any?) -> GeoanalyticsListingAPIRequest? {
        guard let options = argument as? [String: Any] else { return nil}
        
        return GeoanalyticsListingAPIRequest.init(geoboundType: options["geoBoundType"] as! String, geobound: options["geoBound"] as! [String], attribute: options["attributes"] as! String, api: MapplsGeoanalyticsLayerType.init(rawValue: options["api"] as! String))
    }
    
    class func nearbyReportOption(argument: Any?) -> MapplsNearbyReportOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        
        let mTopLeft = options["topLeft"] as! [Double];
        let mBottomRight = options["bottomRight"] as! [Double];
        
        let topleft = CLLocationCoordinate2D(latitude: mTopLeft[1], longitude: mTopLeft[0])
        let bottomRight = CLLocationCoordinate2D(latitude: mBottomRight[1], longitude: mBottomRight[0])
        
        let bound = MapplsRectangularRegion(topLeft: topleft, bottomRight: bottomRight)
        return MapplsNearbyReportOptions(bound: bound)
    }
    class func weatherOption(argument: Any?) -> MapplsWeatherRequestOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        
        let location = options["location"] as! NSDictionary;
        let lat = location["latitude"] as! Double;
        let lng  = location["longitude"] as! Double;
        
        let mapplsWeatherOption = MapplsWeatherRequestOptions.init(location: CLLocation(latitude: lat, longitude: lng))
        
        if let theme = options["theme"] as? String {
            mapplsWeatherOption.theme = MapplsIconTheme(rawValue: theme)
        }
        if let size = options["size"] as? String {
            mapplsWeatherOption.size = MapplsWeatherIconSize(rawValue: size)
        }
        if let tempUnit = options["tempUnit"] as? String {
            mapplsWeatherOption.tempUnit = tempUnit
        }
        if let unitType = options["unitType"] as? String {
            mapplsWeatherOption.unitType = MapplsWeatherForcastUnitType(rawValue: unitType)
        }
        if let unit = options["unit"] as? String {
            mapplsWeatherOption.unit = unit
        }
        return mapplsWeatherOption
    }
    
    class func tripCostEstimationOption(argument: Any?) ->  MapplsCostEstimationOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        
        let mapplsCostEstimationOptions = MapplsCostEstimationOptions.init(routeId: options["routeId"] as? String)
        
        
        if let routeIndex = options["routeIndex"] as? NSNumber {
            mapplsCostEstimationOptions.routeIndex = routeIndex
        }
        if let vehicleType = options["vehicleType"] as? String {
            mapplsCostEstimationOptions.vehicleType = vehicleType
        }
        if let isTollEnabled = options["isTollEnabled"] as? Bool {
            mapplsCostEstimationOptions.isTollEnabled = isTollEnabled
        } else {
            mapplsCostEstimationOptions.isTollEnabled = false
        }
        if let vehicleFuelType = options["vehicleFuelType"] as? String {
            mapplsCostEstimationOptions.vehicleFuelType = vehicleFuelType
        }
        if let fuelEfficiency = options["fuelEfficiency"] as? NSNumber {
            mapplsCostEstimationOptions.fuelEfficiency = "\(fuelEfficiency)"
        }
        if let fuelEfficiencyUnit = options["fuelEfficiencyUnit"] as? String {
            mapplsCostEstimationOptions.fuelEfficiencyUnit = fuelEfficiencyUnit
        }
        if let fuelPrice = options["fuelPrice"] as? Double {
            mapplsCostEstimationOptions.fuelPrice = "\(fuelPrice)"
        }
        if let distance = options["distance"] as? Double {
            mapplsCostEstimationOptions.distance = NSNumber(floatLiteral: distance)
        }
        if let latitude = options["latitude"] as? Double {
            if let longitude = options["longitude"] as? Double {
                mapplsCostEstimationOptions.coordinate = CLLocation(latitude: latitude, longitude: longitude)
            }
        }
        
        return mapplsCostEstimationOptions
    }
    
    class func routeReportSummaryOption(argument: Any?) -> MapplsReportSummaryOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        
        let mapplsRouteReportSummary = MapplsReportSummaryOptions.init(routeId: options["routeId"] as! String)
        if let routeIndex = options["routeIndex"] as? Int {
            mapplsRouteReportSummary.routeIdx = routeIndex
        }
        if let currentNode = options["currentNode"] as? Int {
            mapplsRouteReportSummary.nodeId = currentNode
        }
        if let isGroup = options["isGroup"] as? Int {
            mapplsRouteReportSummary.isGroup = "\(isGroup)"
        }
        if let categories = options["categories"] as? [String] {
            mapplsRouteReportSummary.categories = categories
        }
        return mapplsRouteReportSummary
    }
    
    class func roadTrafficDetailOption(argument: Any?) -> MapplsRoadTrafficDetailsOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        
        let location = options["location"] as! NSDictionary;
        let lat = location["latitude"] as! Double;
        let lng  = location["longitude"] as! Double;
        
        let trafficDetailOptions = MapplsRoadTrafficDetailsOptions.init(latitude: lat, longitude: lng);
        
        if let radius = options["radius"] as? Int {
            trafficDetailOptions.radius = radius;
        }
        
        return trafficDetailOptions;
    }
    
    class func whiteListOption(argument: Any?) -> MapplsWhitelistOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        
        let url = options["url"] as! String;
        let userHandle = options["userHandle"] as! String;
        let otp = options["otp"] as! String;
        
        
        return MapplsWhitelistOptions.init(userHandle: userHandle, passPhrase: otp, refLocation:url);
    }
    
    class func fuelPriceOption(argument: Any?) -> MapplsFuelPriceOptions? {
        guard let options = argument as? [String: Any] else { return nil}
        
        if let location = options["location"] as? NSDictionary {
            if let latitude = location["latitude"] as? Double {
                if let longitude = location["longitude"] as? Double {
                    return MapplsFuelPriceOptions(coordinate: CLLocationCoordinate2D(latitude: latitude, longitude: longitude));
                }
            }
        }
        
        return nil
    }
    
    class func autosuggestResponse(response: MapplsAutoSuggestLocationResults?) -> String? {
        guard let response = response else {return nil}
        
        do {
            
            let encodedData = try JSONEncoder().encode(response)
            let jsonString = String(data: encodedData,
                                    encoding: .utf8);
            return jsonString;
        } catch {
            return nil
        }
    }
    
    class func textSearchResponse(response: [MapplsAtlasSuggestion]) -> String? {
        do {
            
            let encodedData = try JSONEncoder().encode(response)
            let jsonString = String(data: encodedData,
                                    encoding: .utf8);
            return jsonString;
        } catch {
            return nil
        }
    }
    
    class func geocodeResponse(response: MapplsAtlasGeocodeAPIResponse?) -> String? {
        guard let response = response else {
            return nil
        }
        var results: Array<Any> = [Any]()
        if let placemarks = response.placemarks {
            for item in placemarks {
                let data: [String: Any?] = [
                    "houseNumber": item.houseNumber,
                    "houseName": item.houseName,
                    "poi": item.poi,
                    "street": item.street,
                    "subSubLocality": item.subSubLocality,
                    "subLocality": item.subLocality,
                    "locality": item.locality,
                    "village": item.village,
                    "subDistrict": item.subDistrict,
                    "district": item.district,
                    "city": item.city,
                    "state": item.state,
                    "pincode": item.pincode,
                    "formattedAddress": item.formattedAddress,
                    "mapplsPin": item.mapplsPin,
                    "latitude": item.latitude,
                    "longitude": item.longitude,
                    "geocodeLevel": item.geocodeLevel
                ]
                results.append(data)
            }
        }
        
        let dict: [String: Any?] = ["results": results]
        return toJson(data: dict)
    }
    
    class func reverseGeocodeResponse(response: [MapplsGeocodedPlacemark]) -> String? {
        var results: Array<Any> = [Any]()
        for item in response {
            let data: [String: Any?] = [
                "area": item.area,
                "houseNumber": item.houseNumber,
                "houseName": item.houseName,
                "poi": item.poi,
                "poi_dist": item.poiDist,
                "street": item.street,
                "street_dist": item.streetDist,
                "subSubLocality": item.subSubLocality,
                "subLocality": item.subLocality,
                "locality": item.locality,
                "village": item.village,
                "subDistrict": item.subDistrict,
                "district": item.district,
                "city": item.city,
                "state": item.state,
                "pincode": item.pincode,
                "formatted_address": item.formattedAddress,
                "mapplsPin": item.mapplsPin,
                "lat": item.latitude,
                "lng": item.longitude,
                "areaCode": item.areaCode,
                "twnName": item.twnName,
                "vlgCenCd": item.vlgCenCd,
                "vlgLgdCd": item.vlgLgdCd,
                "sdbCenCd": item.sdbCenCd,
                "sdbLgdCd": item.sdbLgdCd,
                "dstCenCd": item.dstCenCd,
                "dstLgdCd": item.dstLgdCd,
                "sttCenCd": item.sttCenCd,
                "sttLgdCd": item.sttLgdCd,
                "twnCenCd": item.twnCenCd,
                "twnLgdCd": item.twnLgdCd,
                "isRooftop": item.isRoofTop,
                "richInfo": item.richInfoDictionary
            ]
            results.append(data)
            
        }
        
        let dict: [String: Any?] = ["results": results, "responseCode": 200]
        return toJson(data: dict)
    }
    
    class func nearbyResponse(response: NearbyResult?) -> String? {
        guard let response = response else {return nil}
        
        do {
            
            let encodedData = try JSONEncoder().encode(response)
            let jsonString = String(data: encodedData,
                                    encoding: .utf8);
            return jsonString;
        } catch {
            return nil
        }
    }
    
    
    class func directionResponse(response: [Route], waypoints: [Waypoint], geometry: RouteShapeFormat) -> String? {
        var dict: [String: Any?] = ["code": "OK"]
        var routes: [Any] = [Any]()
        var wayPointList: [Any] = [Any]()
        
        
        for location in waypoints {
            var data: [String: Any?] = [
                "location": [location.coordinate.longitude, location.coordinate.latitude],
                "name": location.name
            ]
            wayPointList.append(data)
        }
        dict["waypoints"] = wayPointList
        if response.count > 0 {
            if let routeId = response[0].routeIdentifier {
                dict["routeId"] = routeId
            }
            if let sessionId = response[0].routeSessionIdentifier {
                dict["sessionId"] = sessionId
            }
        }
        for item in response {
            routes.append(getDirectionsRouteMap(item: item, index: response.firstIndex(of: item)!))
        }
        dict["routes"] = routes
        
        return toJson(data: dict)
    }
    
    class func getDirectionsRoute(item: Route, index: Int) -> String? {
        return toJson(data: getDirectionsRouteMap(item: item, index: index))
    }
    
    class private func getDirectionsRouteMap(item: Route, index: Int) -> [String: Any?] {
        var data: [String: Any?] = [
            "distance": item.distance,
            "duration": item.expectedTravelTime,
            "geometry": item.geometry,
            "routeIndex": index,
        ]
        if item.legs != nil {
            var legList: [Any] = [Any]()
            for legs in item.legs {
                var legsDict: [String: Any?] = [
                    "distance": legs.distance,
                    "duration": legs.expectedTravelTime,
                    "summary": legs.description,
                ]
                var stepsList: [Any] = [Any]()
                for steps in legs.steps {
                    var stepsDict: [String: Any?] = [
                        "distance": steps.distance,
                        "duration": steps.expectedTravelTime,
                        "geometry": getGeometryString(coordinateList: steps.coordinates, geometries: item.routeOptions.shapeFormat),
                        "name": steps.names?.count ?? 0 > 0 ? steps.names![0]: "",
                        "destinations": steps.destinations?.count ?? 0 > 0 ? steps.destinations![0]: nil,
                        "mode": steps.transportType.description,
                        "pronunciation": steps.instructions,
                        "rotary_name": steps.exitNames?.count ?? 0 > 0 ? steps.exitNames![0]: nil,
                        "rotary_pronunciation": steps.phoneticExitNames?.count ?? 0 > 0 ? steps.phoneticExitNames![0]: nil,
                        "driving_side": steps.drivingSide.description,
                        "maneuver": [
                            "degree": steps.maneuverDegree,
                            "location": [steps.maneuverLocation.longitude, steps.maneuverLocation.latitude],
                            "bearing_before": steps.initialHeading,
                            "bearing_after": steps.finalHeading,
                            "instruction": steps.instructions,
                            "type": steps.maneuverType.description,
                            "modifier": steps.maneuverDirection.description,
                            "exit": steps.exitIndex,
                            "short_instruction": steps.shortInstruction,
                            "maneuver_id": steps.maneuverId
                        ]
                    ]
                    if let bannerInstruction = steps.instructionsDisplayedAlongStep {
                        var bannerInstructionList = [Any]()
                        for displayInstruction in bannerInstruction {
                            var displaydict: [String: Any?] = [
                                "distance_along_geometry": displayInstruction.distanceAlongStep,
                            ]
                            let primaryInstruction = displayInstruction.primaryInstruction
                            var primaryDict: [String: Any?] = [
                                "modifier": primaryInstruction.maneuverDirection.description,
                                "text": primaryInstruction.text,
                                "type": primaryInstruction.maneuverType.description,
                                "degrees": primaryInstruction.finalHeading,
                                "driving_side": steps.drivingSide.description
                            ]
                            var primaryComponentList = [Any]()
                            for componentItem in primaryInstruction.components {
                                let componentDict: [String: Any?] = [
                                    "text": primaryInstruction.text,
                                    "type": primaryInstruction.maneuverType.description,
                                ]
                                primaryComponentList.append(componentDict)
                            }
                            primaryDict["components"] = primaryComponentList
                            displaydict["primary"] = primaryDict
                            bannerInstructionList.append(displaydict)
                            
                        }
                        stepsDict["banner_instructions"] = bannerInstructionList
                    }
                    if let voiceInstruction = steps.instructionsSpokenAlongStep {
                        var voiceInstuctionList = [Any]()
                        for spokenInstruction in voiceInstruction {
                            let spokenDict: [String: Any?] = [
                                "distanceAlongGeometry": spokenInstruction.distanceAlongStep,
                                "announcement": spokenInstruction.text,
                                "ssmlAnnouncement": spokenInstruction.ssmlText
                            ]
                            voiceInstuctionList.append(spokenDict)
                        }
                        stepsDict["voice_instructions"] = voiceInstuctionList
                    }
                    if let intersections = steps.intersections {
                        var intersectionList = [Any]()
                        for stepsintersection in intersections {
                            let intersectionDict = NSMutableDictionary()
                            intersectionDict["out"] = stepsintersection.outletIndex
                            intersectionDict["in"] = stepsintersection.approachIndex
                            let bearingsArray = NSMutableArray()
                            let entryArray = NSMutableArray()
                            for (index, bearing) in stepsintersection.headings.enumerated() {
                                bearingsArray.add(bearing)
                                entryArray.add(stepsintersection.outletIndexes.contains(index))
                            }
                            intersectionDict["bearings"] = bearingsArray
                            
                            intersectionDict["classes"] = stepsintersection.outletRoadClasses?.description
                            intersectionDict["location"] = [stepsintersection.location.longitude, stepsintersection.location.latitude]
                            
                            intersectionDict["entry"] = entryArray
                            
                            if let lanes = stepsintersection.approachLanes {
                                var lanesList = [Any]()
                                for (index, laneItem) in lanes.enumerated() {
                                    lanesList.append([
                                        "valid": stepsintersection.usableApproachLanes?.contains(index) ?? false,
                                        "indications": [laneItem.indications.description]
                                    ])
                                }
                                intersectionDict["lanes"] = lanesList
                            }
                            intersectionList.append(intersectionDict)
                        }
                        stepsDict["intersections"] = intersectionList
                    }
                    
                    stepsList.append(stepsDict)
                }
                legsDict["steps"] = stepsList
                legsDict["annotation"] = [
                    "distance": legs.segmentDistances,
                    "duration": legs.expectedSegmentTravelTimes,
                    "speed": legs.segmentSpeeds,
                    "congestion": legs.segmentCongestionLevels?.map { $0.description },
                    "baseDuration": legs.segmentBaseDurations?.map { $0.description },
                    "nodes": legs.segmentNodes,
                    "spdlmt": legs.segmentSpeedLimits?.map { $0.description },
                    "toll_road": legs.tollRoad?.map { $0.description },
                    //                        "maxspeed": legs.segmen
                ]
                legList.append(legsDict)
            }
            data["legs"] = legList
        }
        
        var coordinates: [String] = [String]()
        for waypoint in item.routeOptions.waypoints {
            if(waypoint.mapplsPin != nil) {
                coordinates.append(waypoint.mapplsPin!)
            } else {
                coordinates.append("\(waypoint.coordinate.longitude),\(waypoint.coordinate.latitude)")
            }
        }
        var routeOption: [String: Any?] = [
            //                "deviceID": item.routeOptions.
            //                "user": item.routeOptions.user
            "profile": item.routeOptions.profileIdentifier.rawValue,
            "resource": item.routeOptions.resourceIdentifier.rawValue,
            "coordinates": coordinates,
            "alternatives": item.routeOptions.includesAlternativeRoutes,
            //                "radiuses": item.routeOptions.rad
            //                "bearings": item.routeOptions.
            //                "language": item.routeOptions.lan
            //                "lessverbose": item.routeOptions.less
            "geometries": item.routeOptions.shapeFormat.description,
            "overview": item.routeOptions.routeShapeResolution.description,
            "steps": item.routeOptions.includesSteps,
            "annotations": item.routeOptions.attributeOptions.description,
            "exclude": item.routeOptions.roadClassesToAvoid.description,
            "isSort": item.routeOptions.sorted
        ]
        
        data["routeOptions"] = routeOption
        return data;
    }
    
    class func getGeometryString(coordinateList: [CLLocationCoordinate2D]?, geometries: RouteShapeFormat)-> String? {
        guard let coordinateList = coordinateList else {return nil}
        if geometries == .polyline6 {
            return PolylineUtility(coordinates: coordinateList,precision: 1e6).encodedPolyline
        } else if geometries == .polyline {
            return PolylineUtility(coordinates: coordinateList,precision: 1e5).encodedPolyline
        } else {
            var coordinates = [Any]()
            for location in coordinateList {
                
                var points = [Any]()
                points.append("\(location.longitude)")
                points.append("\(location.latitude)")
                coordinates.append(points)
            }
            let jsonDic: [String: Any] = [
                "type": "FeatureCollection",
                "features": [
                    [
                        "type": "Feature",
                        "properties": ["name": "geojson-1"],
                        "geometry": [
                            "type": "LineString",
                            "coordinates": coordinates
                        ]
                    ]
                ]
            ]
            return toJson(data: jsonDic)
        }
    }
    
    class func distanceMatrixResponse(response: MapplsDrivingDistanceMatrixResponse?) -> String? {
        guard let response = response else {return nil}
        do {
            
            let encodedData = try JSONEncoder().encode(response)
            let jsonString = String(data: encodedData,
                                    encoding: .utf8);
            return jsonString;
        } catch {
            return nil
        }
    }
    
    class func poiAlongRouteResponse(response: MapplsPOIAlongTheRouteResult?) -> String? {
        guard let response = response else {return nil}
        do {
            
            let encodedData = try JSONEncoder().encode(response)
            let jsonString = String(data: encodedData,
                                    encoding: .utf8);
            return jsonString;
        } catch {
            return nil
        }
    }
    
    class func placeDetailResponse(response: MapplsPlaceDetail?) -> String? {
        guard let response = response else {return nil}
        let dict: [String: Any?] = [
            "mapplsPin": response.mapplsPin,
            "latitude": response.latitude?.doubleValue,
            "longitude": response.longitude?.doubleValue,
            "placeName": response.placeName,
            "address": response.address,
            "type": response.type,
            "houseNumber": response.houseNumber,
            "houseName": response.houseName,
            "poi": response.poi,
            "street": response.street,
            "subSubLocality": response.subSubLocality,
            "subLocality": response.subLocality,
            "locality": response.locality,
            "village": response.village,
            "district": response.district,
            "subDistrict": response.subDistrict,
            "city": response.city,
            "state": response.state,
            "pincode": response.pincode,
            "richInfo": response.richInfoDictionary
        ]
        
        return toJson(data: dict)
    }
    
    class func hateOsNearbyResponse(response: MapplsLocationResults?) -> String? {
        guard let response = response else {return nil}
        var suggestedLocations: [Any] = [Any]()
        if let nearbyResults = response.suggestions {
            for item in nearbyResults {
                let addressToken = item.addressTokens
                var data: [String: Any?] = [
                    "distance": item.distance,
                    "mapplsPin": item.mapplsPin,
                    "email": item.email,
                    "entryLatitude": item.entryLatitude,
                    "entryLongitude": item.entryLongitude,
                    "keywords": item.keywords,
                    "landlineNo": item.landlineNo,
                    "latitude": item.latitude,
                    "longitude": item.longitude,
                    "mobileNo": item.mobileNo,
                    "orderIndex": item.orderIndex,
                    "placeAddress": item.placeAddress,
                    "placeName": item.placeName,
                    "type": item.type,
                    "categoryCode": item.categoryCode,
                    "hourOfOperation": item.hourOfOperation,
                    "richInfo": item.richInfoDictionary]
                if addressToken != nil {
                    data["addressTokens"] = ["poi": addressToken?.poi,
                                             "city": addressToken?.city,
                                             "district":addressToken?.district,
                                             "houseName": addressToken?.houseName,
                                             "houseNumber": addressToken?.houseNumber,
                                             "locality": addressToken?.locality,
                                             "pincode": addressToken?.pincode,
                                             "state": addressToken?.state,
                                             "street": addressToken?.street,
                                             "subDistrict": addressToken?.subDistrict,
                                             "subLocality": addressToken?.subLocality,
                                             "subSubLocality": addressToken?.subSubLocality,
                                             "village": addressToken?.village]
                    
                }
                suggestedLocations.append(data)
            }
        }
        var pageInfo: [String: Any?] = [:]
        //        if let page = response.pageInfo {
        //            pageInfo = [
        //                "pageCount": page.pageCount,
        //                "totalHits": page.totalHits,
        //                "totalPages": page.totalPages,
        //                "pageSize": page.pageSize
        //            ]
        //        }
        let dict: [String: Any?] = [
            "suggestedLocations": suggestedLocations,
            //            "pageInfo": pageInfo
        ]
        return toJson(data: dict)
    }
    
    class func geoAnalyticsListResponse(response: GeoanalyticsListingAPIsResponse?) -> String? {
        guard let response = response else {return nil}
        var attributeList: [Any] = [Any]();
        if let values = response.results?.getAttrValues {
            for item in values {
                let value: [String: Any?] = [
                    "geo_bound": (item as! GeoanalyticsAttributedValues).geoBound,
                    "get_attr_values": (item as! GeoanalyticsAttributedValues).attributedValues
                ]
                attributeList.append(value)
            }
        }
        
        let results: [String: Any?] = [
            "api_name": response.results?.apiName,
            "attribute": response.results?.attribute,
            "get_attr_values": attributeList
        ]
        
        let dict: [String: Any?] = [
            "responseCode": NSNumber.init(value: Int(response.responseCode ?? "0") ?? 0) ,
            "total_feature_count": response.totalFeatureCount,
            "version": response.version,
            "results": results
        ]
        return toJson(data: dict)
    }
    
    
    class func roadTrafficDetailsResponse(response: MapplsRoadTrafficDetailsResponse?) -> String? {
        guard let response = response else {return nil}
        do {
            
            let encodedData = try JSONEncoder().encode(response)
            let jsonString = String(data: encodedData,
                                    encoding: .utf8);
            return jsonString;
        } catch {
            return nil
        }
    }
    
    class func nearbyReportResponse(response: MapplsNearbyReportResponse?) -> String? {
        guard let response = response else {return nil}
        
        do {
            
            let encodedData = try JSONEncoder().encode(response)
            let jsonString = String(data: encodedData,
                                    encoding: .utf8);
            return jsonString;
        } catch {
            return nil
        }
    }
    
    class func clusterLinkedDevicesResponse(response: [MapplsClusterLinkedDevice]?) -> String? {
        guard let response = response else {return nil}
        var linkedDevicesList = [Any?]()
        
        for device in response {
            let deviceDict : [String: Any?] = [
                "deviceAlias": device.linkedDevice ?? "",
                "deviceFingerprint": device.alias ?? "",
            ]
            linkedDevicesList.append(deviceDict)
        }
        return toJson(from: linkedDevicesList as Any)
    }
    
    class func weatherResponse(response: MapplsWeatherResponse?) -> String? {
        guard let response = response else {return nil}
        
        do {
            
            let encodedData = try JSONEncoder().encode(response)
            let jsonString = String(data: encodedData,
                                    encoding: .utf8);
            return jsonString;
        } catch {
            return nil
        }
        
    }
    
    class func costEstimationResponse(response: MapplsCostEstimationResponse?) -> String? {
        guard let response = response else {return nil}
        do {
            
            let encodedData = try JSONEncoder().encode(response)
            let jsonString = String(data: encodedData,
                                    encoding: .utf8);
            return jsonString;
        } catch {
            return nil
        }
    }
    
    class func eventCategoryMasterResponse(response: [ParentCategories]?) -> String? {
        guard let response = response else { return nil }
        var parentCategories: [Any?] = []
        for parentCategory in response {
            var parentData: [String: Any?] = [
                "id": parentCategory.id,
                "name": parentCategory.name,
                "icon": parentCategory.icon,
                "iconBaseUrl": parentCategory.iconBaseURL
            ]
            if let childCategoriesList = parentCategory.childCategories {
                var childCategories: [Any?] = []
                for childCategory in childCategoriesList {
                    var childData: [String: Any?] = [
                        "id": childCategory.id,
                        "name": childCategory.name,
                        "icon": childCategory.icon,
                        "iconBaseUrl": childCategory.iconBaseURL
                    ]
                    if let desc = childCategory.desc {
                        if(desc != "null") {
                            childData["desc"] = desc
                        }
                    }
                    if let subChildCategoriesList = childCategory.subChildCategories {
                        var subChildCategories: [Any?] = []
                        for subChildCategory in subChildCategoriesList {
                            var subChildData: [String: Any?] = [
                                "id": subChildCategory.id,
                                "name": subChildCategory.name,
                                "icon": subChildCategory.icon,
                                "iconBaseUrl": subChildCategory.iconBaseURL
                            ]
                            if let desc = subChildCategory.desc {
                                if(desc != "null") {
                                    subChildData["desc"] = desc
                                }
                            }
        //                    if let expiresInHour = childCategory.expires
                            subChildCategories.append(subChildData)
                        }
                        childData["subChildCategories"] = subChildCategories
                    }
//                    if let expiresInHour = childCategory.expires
                    childCategories.append(childData)
                }
                parentData["childCategories"] = childCategories
            }
            parentCategories.append(parentData)
        }
        return toJson(data: ["parentCategories": parentCategories])
    }
    
    
    class func routeReportSummaryResponse(response: MapplsRouteReportedEventSummaryResponse?) -> String? {
        guard let response = response else {return nil}
        do {
            
            let encodedData = try JSONEncoder().encode(response)
            let jsonString = String(data: encodedData,
                                    encoding: .utf8);
            return jsonString;
        } catch {
            return nil
        }
    }
    
    class func fuelCostResponse(response: MapplsFuelPriceResponse?) -> String? {
        guard let response = response else {return nil}
        do {
            
            let encodedData = try JSONEncoder().encode(response)
            let jsonString = String(data: encodedData,
                                    encoding: .utf8);
            return jsonString;
        } catch {
            return nil
        }
    }
    
    
    class func toJson(data: [String: Any?]) -> String? {
        if let theJSONData = try? JSONSerialization.data(
            withJSONObject: data,
            options: []) {
            let theJSONText = String(data: theJSONData,
                                     encoding: .utf8)
            
            return theJSONText
        }
        return nil;
    }
    
    class func toJson(from object:Any) -> String? {
        guard let data = try? JSONSerialization.data(withJSONObject: object, options: []) else {
            return nil
        }
        return String(data: data, encoding: String.Encoding.utf8)
    }
}