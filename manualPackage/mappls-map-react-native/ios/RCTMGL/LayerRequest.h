//
//  LayerRequest.h
//  mappls-map-react-native
//
//  Created by Shashank on 3/3/22.
//

#import <Foundation/Foundation.h>
#import "StyleRequest.h"

@interface LayerRequest : NSObject

@property (nonatomic, strong) NSArray<NSString *> *geoBound;
@property (nonatomic, strong) NSArray<NSString *> *propertyNames;
@property (nonatomic, strong) NSString *attribute;
@property (nonatomic, strong) NSString *query;
@property (nonatomic, strong) StyleRequest *styleRequest;



@end

