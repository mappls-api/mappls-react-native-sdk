//
//  RCTMGLMapStyleListEvent.m
//  mappls-map-react-native
//
//  Created by Saksham on 21/06/21.
//

#import "RCTMGLMapStyleListEvent.h"
#import "RCTMGLEventTypes.h"

@implementation RCTMGLMapStyleListEvent

- (NSDictionary *)payload {
    NSMutableArray<NSDictionary *> *array = [[NSMutableArray alloc] init];
    for(MapplsMapStyle* style in _styles) {
        NSMutableDictionary *styleDict = [[NSMutableDictionary alloc] init];
        if(style.name != nil) {
            styleDict[@"name"] = style.name;
        }
        if(style.imageUrl != nil) {
            styleDict[@"imageUrl"] = style.imageUrl;
        }
        if(style.displayName != nil) {
            styleDict[@"displayName"] = style.displayName;
        }
        if(style.style_Description != nil) {
            styleDict[@"description"] = style.style_Description;
        }
        [array addObject:styleDict];
    }
    NSDictionary *dict = @{@"mappls_styles": array};
    return dict;
    
}


+ (RCTMGLMapStyleListEvent *)mapplsStyles:(MGLMapView *)mapView styles:(NSArray<MapplsMapStyle *> *)styles {
    RCTMGLMapStyleListEvent *event = [[RCTMGLMapStyleListEvent alloc] init];
    event.styles = styles;
    event.type = RCT_MAPPLS_STYLES_LIST_LOADED;
    return  event;
}

@end

