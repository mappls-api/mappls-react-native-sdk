//
//  RCTMGLPlaceClickEvent.h
//  Pods
//
//  Created by saksham on 18/10/22.
//
#import <Foundation/Foundation.h>
#import "RCTMGLEvent.h"

@import MapplsMap;

@interface RCTMGLPlaceClickEvent: RCTMGLEvent

@property (nonatomic, assign) NSString *mapplsPin;

+ (RCTMGLPlaceClickEvent*) didPlaceOnTap: (MGLMapView*)mapView mapplsPin: (NSString*)mapplsPin;
@end
/* RCTMGLPlaceClickEvent_h */
