//
//  RCTMGLMapReinitEvent.m
//  mappls-map-react-native
//
//  Created by Saksham on 03/02/25.
//

#import "RCTMGLMapReinitEvent.h"
#import "RCTMGLEventTypes.h"

@implementation RCTMGLMapReinitEvent

- (NSDictionary *)payload {
    if(_mapError != nil){
        
        NSString*str = [NSString stringWithFormat:@"%ld",_mapError.code];
        NSDictionary *dict = @{@"reinitAfter": _reinitAfter, @"code": str, @"message": _mapError.localizedDescription};
        return dict;
    } else {
        NSDictionary *dict = @{@"reinitAfter": _reinitAfter};
        return dict;
    }
}

+ (RCTMGLMapReinitEvent *)mapReinit:(MGLMapView *)mapView reinitAfter:(NSNumber *)reinitAfter error:(NSError *)error {
    RCTMGLMapReinitEvent *event = [[RCTMGLMapReinitEvent alloc] init];
    event.mapError = error;
    event.reinitAfter = reinitAfter;
    event.type = RCT_MAPPLS_MAP_REINIT;
    return event;
}

@end
