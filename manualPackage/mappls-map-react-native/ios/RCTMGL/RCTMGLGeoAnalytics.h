//
//  RCTMGLGeoAnalytics.h
//  mappls-map-react-native
//
//  Created by Shashank on 2/25/22.
//

#import <React/RCTComponent.h>
#import "RCTMGLVectorLayer.h"
#import "LayerRequest.h"
@import MapplsGeoanalytics;
@import MapplsMap;

@interface RCTMGLGeoAnalytics : UIView

@property (nonatomic, strong) RCTMGLMapView *map;



@property (nonatomic, copy) NSNumber *showGeoAnalytics;
@property (nonatomic, copy) NSString *geoboundType;
@property (nonatomic, strong) NSArray<NSDictionary *> *layerRequest;
@property (nonatomic, copy) NSArray<LayerRequest *> *nativeLayerRequest;
@property (nonatomic, strong)  NSArray<MapplsGeoanalyticsLayerRequest *> *  mmilayerRequest;

//@property (nonatomic, copy) NSString *attribute;
//@property (nonatomic, copy) NSArray<NSString *> *propertyNames;
//@property (nonatomic, copy) NSArray<NSString *> *geoBound;
//@property (nonatomic, copy) NSString *query;
//@property (nonatomic, copy) NSDictionary *styles;

//@property (nonatomic, assign) BOOL enableInfoWindow;
//@property (nonatomic, copy) RCTBubblingEventBlock onPress;


@property (nonatomic, copy) MapplsGeoanalyticsPlugin *geoanalyticsPlugin;
//@property (nonatomic, copy) MapplsGeoanalyticsLayerRequest* layerRequest;
@property (nonatomic, copy) GeoanalyticsLayerAppearance * apperence;



@end
