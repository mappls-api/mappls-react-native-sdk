//
//  CameraUpdateQueue.m
//  RCTMGL
//
//  Created by Nick Italiano on 9/6/17.
//  Copyright © 2017 Mapbox Inc. All rights reserved.
//

#import "CameraUpdateQueue.h"

@implementation CameraUpdateQueue
{
    NSMutableArray<CameraStop*> *queue;
}

- (instancetype)init
{
    if (self = [super init]) {
        queue = [[NSMutableArray alloc] init];
    }
    
    return self;
}

- (void)enqueue:(CameraStop*)cameraUpdateItem
{
    [queue addObject:cameraUpdateItem];
}

- (CameraStop*)dequeue
{
    if ([self isEmpty]) {
        return nil;
    }
    CameraStop *stop = queue.firstObject;
    [queue removeObjectAtIndex:0];
    return stop;
}

- (void)flush
{
    [queue removeAllObjects];
}

- (BOOL)isEmpty
{
    return queue.count == 0;
}

- (void)execute:(RCTMGLMapView*)mapView
{
    if (mapView == nil) {
        return;
    }

    if ([self isEmpty]) {
        return;
    }

    CameraStop *stop = [self dequeue];
    if (stop == nil) {
        return;
    }
    
    
    __weak CameraUpdateQueue *weakSelf = self;
    __weak RCTMGLMapView *weakMap = mapView;

    
    if([self _isCoordValid: stop.coordinate] || [self _areBoundsValid:stop.bounds]) {
            
        CameraUpdateItem *item = [[CameraUpdateItem alloc] init];
        item.cameraStop = stop;
        [item execute:mapView withCompletionHandler:^{ [weakSelf execute:weakMap]; }];
    } else {
            
        CameraELocUpdateItem *item = [[CameraELocUpdateItem alloc] init];
        item.cameraStop = stop;
        [item execute:mapView withCompletionHandler:^{ [weakSelf execute:weakMap]; }];
    }
}
- (BOOL)_areBoundsValid:(MGLCoordinateBounds)bounds {
    BOOL isValid = CLLocationCoordinate2DIsValid(bounds.ne) && CLLocationCoordinate2DIsValid(bounds.sw);
        
    if (!isValid) {
        return NO;
    }
        
    CLLocationCoordinate2D ne = bounds.ne;
    CLLocationCoordinate2D sw = bounds.sw;
    return [self _isCoordValid:ne] && [self _isCoordValid:sw];
}
- (BOOL)_isCoordValid:(CLLocationCoordinate2D)coord
{
        
    return CLLocationCoordinate2DIsValid(coord);
}
@end
