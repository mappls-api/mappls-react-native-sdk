//
//  RCTMGLPlaceClickEvent.m
//  mappls-map-react-native
//
//  Created by saksham on 18/10/22.
//

#import "RCTMGLPlaceClickEvent.h"
#import "RCTMGLEventTypes.h"

@implementation RCTMGLPlaceClickEvent


- (NSDictionary *)payload {
    if(_mapplsPin) {
    return @{@"mapplsPin": _mapplsPin};
    } else {
        return @{};
    }
}

+ (RCTMGLPlaceClickEvent *)didPlaceOnTap:(MGLMapView *)mapView mapplsPin:(NSString *)mapplsPin {
    RCTMGLPlaceClickEvent *event = [[RCTMGLPlaceClickEvent alloc] init];
    event.type = RCT_MAPBOX_EVENT_TAP;
    event.mapplsPin = mapplsPin;
    return event;
}

@end
