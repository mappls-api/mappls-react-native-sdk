//
//  RCTMGLMapStyleListEvent.h
//  Pods
//
//  Created by Saksham on 21/06/21.
//

#import <Foundation/Foundation.h>
#import "RCTMGLEvent.h"


@import MapplsMap;

@interface RCTMGLMapStyleListEvent: RCTMGLEvent

@property (nonatomic, assign) NSArray<MapplsMapStyle *> *styles;

+ (RCTMGLMapStyleListEvent*) mapplsStyles:(MGLMapView*)mapView styles:(NSArray<MapplsMapStyle *>*)styles;

@end

