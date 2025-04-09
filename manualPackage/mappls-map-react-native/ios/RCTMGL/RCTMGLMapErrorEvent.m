//
//  RCTMGLMapErrorEvent.m
//  DoubleConversion
//
//  Created by ceinfo on 10/02/21.
//

#import "RCTMGLMapErrorEvent.h"
#import "RCTMGLEventTypes.h"

@implementation RCTMGLMapErrorEvent

- (NSDictionary *)payload {
    
    NSString*str = [NSString stringWithFormat:@"%ld",_mapError.code];
    NSDictionary *dict = @{@"code": str, @"message": _mapError.localizedDescription};
    return dict;
}



+ (RCTMGLMapErrorEvent *)mapError:(id)mapView error:(NSError *)error {
    RCTMGLMapErrorEvent *event = [[RCTMGLMapErrorEvent alloc] init];
    event.mapError = error;
    event.type = RCT_MAPBOX_DID_FAIL_LOADING_MAP;
    return event;
}

@end

