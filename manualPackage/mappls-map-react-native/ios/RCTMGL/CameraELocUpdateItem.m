//
//  CameraELocUpdateItem.m
//  mappls-map-react-native
//
//  Created by ceinfo on 29/01/21.
//

#import "CameraELocUpdateItem.h"
#import "CameraMode.h"

@implementation CameraELocUpdateItem

- (void)execute:(RCTMGLMapView *)mapView withCompletionHandler:(void (^)(void))completionHandler
{
    if (_cameraStop.mode == [NSNumber numberWithInt:RCT_MAPBOX_CAMERA_MODE_FLIGHT] && _cameraStop.mapplsPin != nil) {
        [self _flyToCamera:mapView withCompletionHandler:completionHandler];
    } else if (_cameraStop.mode == [NSNumber numberWithInt:RCT_MAPBOX_CAMERA_MODE_EASE] && _cameraStop.mapplsPin != nil) {
        [self _moveCamera:mapView animated:YES withCompletionHandler:completionHandler];
    } else if (_cameraStop.mapplsPinBounds != nil) {
        [self _fitBoundsCamera:mapView withCompletionHandler:completionHandler];
    }
else {
        [self _moveCamera:mapView animated:NO withCompletionHandler:completionHandler];
    }
}

- (void)_flyToCamera:(RCTMGLMapView*)mapView withCompletionHandler:(void (^)(void))completionHandler
{
    
      MGLMapCamera *nextCamera = [self _makeCamera:mapView];
      MapplsMapView *mmiMapView = mapView;
      [mmiMapView flyToCamera: nextCamera withDuration:_cameraStop.duration completionHandler:completionHandler];
}


- (void)_moveCamera:(RCTMGLMapView*)mapView animated:(BOOL)animated withCompletionHandler:(void (^)(void))completionHandler
{
    if(_cameraStop.mapplsPin == nil) {
        [self _centerCoordWithZoomCamera:mapView animated:animated withCompletionHandler:completionHandler];
    } else {
        MGLMapCamera *nextCamera = [self _makeCamera:mapView];
        [mapView setCamera:nextCamera
                 withDuration:animated ? _cameraStop.duration : 0
                 animationTimingFunction:[CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut]
                 completionHandler:completionHandler];
        
    }
}

- (void)_fitBoundsCamera:(RCTMGLMapView*)mapView withCompletionHandler:(void (^)(void))completionHandler
{
//    MGLCoordinateBounds bounds = _cameraStop.bounds;
//    CLLocationCoordinate2D coordinates[] = {
//        { bounds.ne.latitude, bounds.sw.longitude },
//        bounds.sw,
//        { bounds.sw.latitude, bounds.ne.longitude },
//        bounds.ne
//    };
    MapplsMapView *mmiMapView = mapView;
    [mmiMapView showMapplsPins:_cameraStop.mapplsPinBounds animated:true completionHandler:nil];
//    [mmiMapView setVisibleCoordinates:coordinates
//             count:4
//             edgePadding:_cameraStop.boundsPadding
//             direction:mapView.direction
//             duration:_cameraStop.duration
//             animationTimingFunction:[CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut]
//             completionHandler:completionHandler];
}

- (void)_centerCoordWithZoomCamera:(RCTMGLMapView*)mapView animated:(BOOL)animated withCompletionHandler:(void (^)(void))completionHandler
{
    MGLMapCamera *camera = [MGLMapCamera cameraLookingAtCenterCoordinate:_cameraStop.coordinate
                                    fromDistance:[mapView altitudeFromZoom:[_cameraStop.zoom doubleValue] atLatitude:_cameraStop.coordinate.latitude]
                                    pitch:[_cameraStop.pitch floatValue]
                                    heading:[_cameraStop.heading floatValue]];
    MapplsMapView *mmiMapView = mapView;
    
    
    [mmiMapView setCamera:camera
                withDuration:animated ? _cameraStop.duration : 0
                animationTimingFunction:[CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut]
                completionHandler:completionHandler];
}

- (MGLMapCamera*)_makeCamera:(RCTMGLMapView*)mapView
{
    MGLMapCamera *nextCamera = [mapView.camera copy];
    
    if (_cameraStop.pitch != nil) {
        nextCamera.pitch = [_cameraStop.pitch floatValue];
    }
    
    if (_cameraStop.heading != nil) {
        nextCamera.heading = [_cameraStop.heading floatValue];
    }
    
    if (_cameraStop.mapplsPin != nil) {
        nextCamera.centerMapplsPin = _cameraStop.mapplsPin;
    }
    
    if (_cameraStop.zoom != nil) {
        nextCamera.altitude = [mapView altitudeFromZoom:[_cameraStop.zoom doubleValue] atLatitude:nextCamera.centerCoordinate.latitude atPitch:nextCamera.pitch];
    }
    
    return nextCamera;
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
    BOOL isValid = CLLocationCoordinate2DIsValid(_cameraStop.coordinate);
    
    if (!isValid) {
        return NO;
    }
    
    return coord.latitude != 0.0 && coord.longitude != 0.0;
}

- (BOOL)_hasCenterCoordAndZoom
{
    BOOL isValid = CLLocationCoordinate2DIsValid(_cameraStop.coordinate) && _cameraStop.zoom != nil;
    
    if (!isValid) {
        return NO;
    }
    
    return [self _isCoordValid:_cameraStop.coordinate];
}

@end

