
//
//  CameraELocUpdateItem.h
//  Pods
//
//  Created by ceinfo on 01/02/21.
//

#import "CameraStop.h"
#import "RCTMGLMapView.h"

@interface CameraELocUpdateItem : NSObject

@property (nonatomic, strong) CameraStop* _Nonnull cameraStop;

- (void)execute:(RCTMGLMapView* _Nonnull)mapView withCompletionHandler:(nullable void (^)(void))completionHandler;

@end
