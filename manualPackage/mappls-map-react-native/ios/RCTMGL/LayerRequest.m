//
//  LayerRequest.m
//  mappls-map-react-native
//
//  Created by Shashank on 3/3/22.
//

#import "LayerRequest.h"

@implementation LayerRequest

-(void)setQuery:(NSString *)query {
    _query = query;
}

-(void)setAttribute:(NSString *)attribute {
    _attribute = attribute;
}

-(void)setGeoBound:(NSArray *)geoBound {
    _geoBound = geoBound;
}

-(void)setPropertyNames:(NSArray *)propertyNames {
    _propertyNames = propertyNames;
}

-(void)setStyleRequest:(StyleRequest *)styleRequest {
    _styleRequest = styleRequest;
}


@end
