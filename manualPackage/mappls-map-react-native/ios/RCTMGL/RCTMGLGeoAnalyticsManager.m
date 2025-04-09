//
//  RCTMGLGeoAnalyticsManager.m
//  mappls-map-react-native
//
//  Created by Shashank on 2/25/22.
//

#import "RCTMGLGeoAnalyticsManager.h"
#import "RCTMGLGeoAnalytics.h"

@implementation RCTMGLGeoAnalyticsManager

RCT_EXPORT_MODULE(RCTMGLGeoAnalytics)

#pragma - View Properties


RCT_EXPORT_VIEW_PROPERTY(showGeoAnalytics, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(geoboundType, NSString)
RCT_EXPORT_VIEW_PROPERTY(layerRequest, NSArray)


//RCT_EXPORT_VIEW_PROPERTY(attribute, NSString)
//RCT_EXPORT_VIEW_PROPERTY(propertyNames, NSArray)
//RCT_EXPORT_VIEW_PROPERTY(geoBound, NSArray)
//RCT_EXPORT_VIEW_PROPERTY(query, NSString)
//RCT_EXPORT_VIEW_PROPERTY(styles, NSDictionary)
//RCT_EXPORT_VIEW_PROPERTY(enableInfoWindow, BOOL)
//RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)


#pragma Methods

- (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (UIView *)view
{
    return [[RCTMGLGeoAnalytics alloc] init];
}

@end
