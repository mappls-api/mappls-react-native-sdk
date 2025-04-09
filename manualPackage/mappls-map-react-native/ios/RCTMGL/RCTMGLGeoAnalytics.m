#import "RCTMGLGeoAnalytics.h"
//#import "RCTMGLEvent.h"
//#import "RCTMGLEventTypes.h"

//@interface RCTMGLGeoAnalytics() <MapplsGeoanalyticsPluginDelegate>

//@end
#import "RCTMGLMapView.h"

@implementation RCTMGLGeoAnalytics


- (void)setMap:(MGLMapView*) map
{
    _map = ((RCTMGLMapView *) map);
    _geoanalyticsPlugin = _map.geoanalyticsPlugin;
    if (map.style != nil) {
        [self setUpGeoAnalytics];
    }else{
        [self removeGeoAnalyticsLayer];
    }
   
    
}



-(void)setShowGeoAnalytics:(NSNumber *)showGeoAnalytics {
    _showGeoAnalytics = showGeoAnalytics;
}


//- (void)setAttribute:(NSString *) attribute {
//    _attribute = attribute;
//}


-(void)setGeoboundType:(NSString *)geoboundType{
    _geoboundType = geoboundType;
}

-(void)setLayerRequest:(NSArray<NSDictionary *> *)layerRequest {
    _layerRequest = layerRequest;
    [self createNativeLayerRequest];
}

//-(void)setPropertyNames:(NSArray<NSString *> *) propertyNames {
//    _propertyNames = propertyNames;
//}
//
//-(void)setGeoBound:(NSArray<NSString *> *) geoBounds {
//    _geoBound = geoBounds;
//}
//
//- (void)setQuery:(NSString *)query {
//    _query = query;
//}
//
//-(void)setEnableInfoWindow:(BOOL)enableInfoWindow {
//    _enableInfoWindow = enableInfoWindow;
//}

//-(void)setStyles:(NSDictionary *)styles {
//    _apperence = [[GeoanalyticsLayerAppearance alloc] init];
//
//    if ([styles objectForKey:@"labelColor"] != nil){
//        NSString * labelColor =  [styles objectForKey:@"labelColor"];
//        _apperence.labelColor = (labelColor.length == 7) ? [labelColor
//                                                            stringByReplacingOccurrencesOfString:@"#" withString:@""] : labelColor;
//    }
//    if ([styles objectForKey:@"labelSize"] != nil){
//        _apperence.labelSize = [styles objectForKey:@"labelSize"];
//    }
//    if ([styles objectForKey:@"fillColor"] != nil){
//        NSString * fillColor =  [styles objectForKey:@"fillColor"];
//        _apperence.fillColor = (fillColor.length == 7) ? [fillColor
//                                                            stringByReplacingOccurrencesOfString:@"#" withString:@""] : fillColor;
//
//    }
//    if ([styles objectForKey:@"strokeColor"] != nil){
//        NSString * strokeColor =  [styles objectForKey:@"strokeColor"];
//        _apperence.strokeColor = (strokeColor.length == 7) ? [strokeColor
//                                                            stringByReplacingOccurrencesOfString:@"#" withString:@""] : strokeColor;
//    }
//    if ([styles objectForKey:@"strokeWidth"] != nil){
//        _apperence.strokeWidth = [styles objectForKey:@"strokeWidth"];
//    }
//
//    if ([styles objectForKey:@"fillOpacity"] != nil){
//        _apperence.fillOpacity = [styles objectForKey:@"fillOpacity"];
//    }
//
//    if ([styles objectForKey:@"pointSize"] != nil){
//       // _apperence.s = [styles objectForKey:@"labelColor"];
//    }
//
//
//
//}


-(void)setUpGeoAnalytics {
    
   // MapplsMapView *mapplsMapView = (MapplsMapView *)_map;
   // _geoanalyticsPlugin = [[MapplsGeoanalyticsPlugin alloc] initWithMapView: mapplsMapView];
    
    NSMutableArray<MapplsGeoanalyticsLayerRequest *> *  mmilayerRequestArr = [[NSMutableArray alloc] init];
    
    //LayerRequest* requests = _nativeLayerRequest.firstObject;
    for (LayerRequest * requests in _nativeLayerRequest) {
        
        GeoanalyticsLayerAppearance * apperence = [self createAppearance:requests.styleRequest];
        NSMutableArray<MapplsGeoanalyticsGeobound*>* geoboundArray = [[NSMutableArray alloc] init];
        
        NSArray<NSString *> *geoBoundStringArray = requests.geoBound;
        
               for(int  a = 0; a < geoBoundStringArray.count; a = a + 1 ) {
                   
                   MapplsGeoanalyticsGeobound * geoboundOptions = [[MapplsGeoanalyticsGeobound alloc] initWithGeobound:geoBoundStringArray[a]];
        
        
                   if (apperence != nil) {
                       geoboundOptions.appearance = apperence;
                   }
                   [geoboundArray addObject:geoboundOptions];
               }
        
        MapplsGeoanalyticsLayerRequest *  layerRequest = [[MapplsGeoanalyticsLayerRequest alloc] initWithGeoboundType:_geoboundType geobound:geoboundArray propertyName:requests.propertyNames layerType:[self formatMapplsGeoanalyticsLayerType:_showGeoAnalytics]];
        
        
       
        if (requests.attribute !=nil) {
                layerRequest.attribute = requests.attribute;
            }
            if (requests.query != nil) {
                layerRequest.query = requests.query;
            }
            layerRequest.transparent = true;
        [mmilayerRequestArr addObject:layerRequest];
        [_geoanalyticsPlugin showGeoanalyticsLayer: layerRequest];
   }
    
    _mmilayerRequest = mmilayerRequestArr;
    
//
//    NSMutableArray<MapplsGeoanalyticsGeobound*>* geoboundArray = [[NSMutableArray alloc] init];
//    int a ;
//
//       for( a = 0; a < _geoBound.count; a = a + 1 ) {
//           MapplsGeoanalyticsGeobound * geoboundOptions = [[MapplsGeoanalyticsGeobound alloc] initWithGeobound:_geoBound[a]];
//
//
//           if (_apperence != nil) {
//               geoboundOptions.appearance = _apperence;
//           }
//           [geoboundArray addObject:geoboundOptions];
//       }
//
//
//
//
//
//
//    if ( _propertyNames != nil && _propertyNames.count > 0 ) {
//        _layerRequest = [[MapplsGeoanalyticsLayerRequest alloc] initWithGeoboundType:_geoboundType geobound:geoboundArray propertyName:_propertyNames layerType:[self formatMapplsGeoanalyticsLayerType:_showGeoAnalytics]];
//    }
//
//    if (_attribute !=nil) {
//        _layerRequest.attribute = _attribute;
//    }
//    if (_query != nil) {
//        _layerRequest.query = _query;
//    }
//    _layerRequest.transparent = true;
//    _geoanalyticsPlugin = [[MapplsGeoanalyticsPlugin alloc] initWithMapView: mapplsMapView];
//
//    if (_enableInfoWindow) {
//        _geoanalyticsPlugin.delegate = self;
//        _geoanalyticsPlugin.shouldShowPopupForGeoanalyticsLayer = _enableInfoWindow;
//    }
//
//    if (_showGeoAnalytics != nil) {
//        [_geoanalyticsPlugin showGeoanalyticsLayer: _layerRequest];
//    }
}

-(void) removeGeoAnalyticsLayer {
    
    if (_mmilayerRequest != nil && _mmilayerRequest.count>0) {
     
        for (MapplsGeoanalyticsLayerRequest * layerReq in _mmilayerRequest) {
            [_geoanalyticsPlugin removeGeoanalyticsLayer: layerReq];
        }
    }
    
//    if () {
//        for ( LayerRequest * layerReq in _nativeLayerRequest) {
//            [_geoanalyticsPlugin removeGeoanalyticsLayer: layerReq];
//        }
//        //[_geoanalyticsPlugin removeGeoanalyticsLayer: [self formatMapplsGeoanalyticsLayerType:_showGeoAnalytics]];
//    }
}

-(GeoanalyticsLayerAppearance *)createAppearance:(StyleRequest * )style {
    GeoanalyticsLayerAppearance * apperence = [[GeoanalyticsLayerAppearance alloc] init];
   
       if (style.labelColor != nil){
           apperence.labelColor = [style.labelColor
                                   stringByReplacingOccurrencesOfString:@"#" withString:@""];
                                                        
       }
       if (style.labelSize != nil){
           apperence.labelSize = [style.labelSize stringValue];
       }
       if (style.fillColor != nil){
           apperence.fillColor = [style.fillColor
                                  stringByReplacingOccurrencesOfString:@"#" withString:@""];;
   
       }
       if (style.strokeColor != nil){
           apperence.strokeColor = [style.strokeColor
                                    stringByReplacingOccurrencesOfString:@"#" withString:@""];;
       }
       if (style.strokeWidth != nil){
           apperence.strokeWidth = [style.strokeWidth stringValue];
       }
   
       if (style.fillOpacity != nil){
           apperence.fillOpacity = [style.fillOpacity stringValue ];
       }
   
       if (style.pointSize != nil){
          // _apperence.s = [styles objectForKey:@"labelColor"];
       }
    return  apperence;
}

-(MapplsGeoanalyticsLayerType) formatMapplsGeoanalyticsLayerType: (NSNumber *) type{
    switch ([type intValue]) {
       case 0:
          return MapplsGeoanalyticsLayerTypeState;
       
        case 1:
           return MapplsGeoanalyticsLayerTypeDistrict;
        
        case 2:
           return MapplsGeoanalyticsLayerTypeSubDistrict;
        
        case 3:
           return MapplsGeoanalyticsLayerTypeTown;
                   
        case 4:
           return MapplsGeoanalyticsLayerTypeCity;
        case 5:
           return MapplsGeoanalyticsLayerTypePincode;
        case 6:
           return MapplsGeoanalyticsLayerTypeWard;
        case 7:
           return MapplsGeoanalyticsLayerTypeLocality;
        case 8:
           return MapplsGeoanalyticsLayerTypePanchayat;
        case 9:
           return MapplsGeoanalyticsLayerTypeBlock;
        case 10:
           return MapplsGeoanalyticsLayerTypeVillage;
        case 11:
           return MapplsGeoanalyticsLayerTypeSubLocality;
        case 12:
           return MapplsGeoanalyticsLayerTypeSubSubLocality;
        default:
           return MapplsGeoanalyticsLayerTypeState;

    }
}


//- (void)didGetFeatureInfoResponse:(nonnull GeoanalyticsGetFeatureInfoResponse *)featureInfoResponse {
//
//    RCTMGLEvent *event = [RCTMGLEvent makeEvent: RCT_MAPBOX_GEOANALYTICS_LAYER_PRESS withPayload: @{
//        @"test":@"OK",
//        }];
//    //[self fireEvent:event withCallback:source.onPress];
//
//}
//
//- (nullable UIView *)viewForGeoanalyticsInfo:(nonnull GeoanalyticsGetFeatureInfoResponse *)response {
//    return nil;
//}

- (void) createNativeLayerRequest {
    NSMutableArray<LayerRequest *> * mNativeRequests = [[NSMutableArray alloc] init];
    for (int i =0; i < _layerRequest.count; i++) {
        NSDictionary * request = _layerRequest[i];
        
        NSString * query = [request objectForKey:@"query"] != nil ? [request objectForKey:@"query"] : nil;
        NSString * attribute = [request objectForKey:@"attribute"] != nil ? [request objectForKey:@"attribute"] : nil;
        NSArray<NSString *> * geoBound = [request objectForKey:@"geoBound"] != nil ? [request objectForKey:@"geoBound"] : [NSMutableArray new];
        NSArray<NSString *> * propertyNames = [request objectForKey:@"propertyNames"] != nil ? [request objectForKey:@"propertyNames"] : [NSMutableArray new];
        NSDictionary * styles = [request objectForKey:@"styles"] != nil ? [request objectForKey:@"styles"] : nil;
        StyleRequest * mStyle = [self createNativeStyleRequest:styles];

        LayerRequest * mRequest = [[LayerRequest alloc] init];
        mRequest.query = query;
        mRequest.attribute = attribute;
        mRequest.geoBound = geoBound;
        mRequest.propertyNames = propertyNames;
        mRequest.styleRequest = mStyle;
        
        [mNativeRequests addObject:mRequest];
    }
    
    _nativeLayerRequest = mNativeRequests;
}

-(StyleRequest *) createNativeStyleRequest:(NSDictionary *) styleDict {
    
    NSString * labelColor = [styleDict objectForKey:@"labelColor"] != nil ? [styleDict objectForKey:@"labelColor"] : nil;
    NSNumber * labelSize = [styleDict objectForKey:@"labelSize"] != nil ? [styleDict objectForKey:@"labelSize"] : nil;
    NSString * fillColor = [styleDict objectForKey:@"fillColor"] != nil ? [styleDict objectForKey:@"fillColor"] : nil;
    NSNumber * pointSize = [styleDict objectForKey:@"pointSize"] != nil ? [styleDict objectForKey:@"pointSize"] : nil;
    NSString * strokeColor = [styleDict objectForKey:@"strokeColor"] != nil ? [styleDict objectForKey:@"strokeColor"] : nil;
    NSNumber * strokeWidth = [styleDict objectForKey:@"strokeWidth"] != nil ? [styleDict objectForKey:@"strokeWidth"] : nil;
    NSNumber * fillOpacity = [styleDict objectForKey:@"fillOpacity"] != nil ? [styleDict objectForKey:@"fillOpacity"] : nil;
    
    
    StyleRequest * mStyleRequest = [[StyleRequest alloc] init];
    mStyleRequest.labelColor = labelColor;
    mStyleRequest.labelSize = labelSize;
    mStyleRequest.fillColor = fillColor;
    mStyleRequest.pointSize = pointSize;
    mStyleRequest.strokeColor = strokeColor;
    mStyleRequest.strokeWidth = strokeWidth;
    mStyleRequest.fillOpacity = fillOpacity;
    
    return  mStyleRequest;
}

@end





