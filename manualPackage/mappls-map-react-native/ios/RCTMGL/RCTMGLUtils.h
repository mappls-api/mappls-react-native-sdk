//
//  RCTConvert+Mapbox.h
//  RCTMGL
//
//  Created by Nick Italiano on 8/23/17.
//  Copyright © 2017 Mapbox Inc. All rights reserved.
//

#import <MapKit/MapKit.h>
#import <React/RCTBridge.h>
#import <React/RCTConvert.h>
#import <React/RCTImageLoader.h>

@import MapplsMap;

@interface RCTMGLUtils: NSObject

+ (CLLocationCoordinate2D)fromFeature:(NSString*)json;
+ (MGLShape*)shapeFromGeoJSON:(NSString*)json;
+ (MGLCoordinateBounds)fromFeatureCollection:(NSString*)json;
+ (NSArray<NSNumber *> *)fromCoordinateBounds:(MGLCoordinateBounds)bounds;
+ (NSTimeInterval)fromMS:(NSNumber*)number;
+ (NSNumber*)clamp:(NSNumber*)value min:(NSNumber*)min max:(NSNumber*)max;
+ (UIColor*)toColor:(id)value;
+ (void)fetchImage:(RCTBridge*)bridge url:(NSString*)url scale:(double)scale callback:(RCTImageLoaderCompletionBlock)callback;
+ (void)fetchImages:(RCTBridge *)bridge style:(MGLStyle *)style objects:(NSDictionary<NSString *, NSString *>*)objects forceUpdate:(BOOL)forceUpdate callback:(void (^)(void))callback;
+ (CGVector)toCGVector:(NSArray<NSNumber*>*)arr;
+ (UIEdgeInsets)toUIEdgeInsets:(NSArray<NSNumber *> *)arr;
+ (NSURL*)styleURLFromStyleJSON:(NSString *)styleJSON;

@end
