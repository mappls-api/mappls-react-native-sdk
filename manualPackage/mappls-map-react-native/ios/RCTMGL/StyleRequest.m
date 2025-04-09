//
//  StyleRequest.m
//  mappls-map-react-native
//
//  Created by Shashank on 3/3/22.
//

#import "StyleRequest.h"

@implementation StyleRequest


-(void)setLabelColor:(NSString *)labelColor {
    _labelColor = labelColor;
}

-(void)setLabelSize:(NSNumber *)labelSize {
    _labelSize = labelSize;
}

-(void)setFillColor:(NSString *)fillColor {
    _fillColor = fillColor;
}

-(void)setPointSize:(NSNumber *)pointSize {
    _pointSize = pointSize;
}

-(void)setStrokeColor:(NSString *)strokeColor {
    _strokeColor = strokeColor;
}

-(void)setStrokeWidth:(NSNumber *)strokeWidth {
    _strokeWidth = strokeWidth;
}

-(void)setFillOpacity:(NSNumber *)fillOpacity {
    _fillOpacity = fillOpacity;
}


@end
