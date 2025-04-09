//
//  RCTMGLMapErrorEvent.h
//  Pods
//
//  Created by Saksham on 10/02/21.
//
#import <Foundation/Foundation.h>
#import "RCTMGLEvent.h"

@import MapplsMap;

@interface RCTMGLMapErrorEvent : RCTMGLEvent

@property (nonatomic, assign) NSError *mapError;

+ (RCTMGLMapErrorEvent*)mapError:(MGLMapView*)mapView error:(NSError *)error;


@end /* RCTMGLMapErrorEvent_h */
