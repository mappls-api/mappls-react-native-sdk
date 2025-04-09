//
//  RCTMGLMapReinitEvent.h
//  Pods
//
//  Created by Saksham on 03/02/25.
//

#import <Foundation/Foundation.h>
#import "RCTMGLEvent.h"

@import MapplsMap;

@interface RCTMGLMapReinitEvent : RCTMGLEvent

@property (nonatomic, assign) NSError *mapError;
@property (nonatomic, assign) NSNumber *reinitAfter;

+ (RCTMGLMapReinitEvent*)mapReinit:(MGLMapView*)mapView reinitAfter: (NSNumber *)reinitAfter error:(NSError *)error;


@end /* RCTMGLMapReinitEvent_h */
