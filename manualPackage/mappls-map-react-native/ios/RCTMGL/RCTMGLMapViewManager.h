//
//  RCTMGLMapViewManager.h
//  RCTMGL
//
//  Created by Nick Italiano on 8/23/17.
//  Copyright © 2017 Mapbox Inc. All rights reserved.
//

#import "ViewManager.h"
@import MapplsMap;

@interface RCTMGLMapViewManager : ViewManager
 
 @property (nonatomic, strong) MGLMapView *mapView;
- (void)didTapMap:(UITapGestureRecognizer *)recognizer;
- (void)didLongPressMap:(UILongPressGestureRecognizer *)recognizer;

@end
