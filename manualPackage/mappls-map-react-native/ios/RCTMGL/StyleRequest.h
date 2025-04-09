//
//  StyleRequest.h
//  mappls-map-react-native
//
//  Created by Shashank on 3/3/22.
//

#import <Foundation/Foundation.h>




@interface StyleRequest : NSObject

@property (nonatomic, strong) NSString *labelColor;
@property (nonatomic, strong) NSNumber *labelSize;
@property (nonatomic, strong) NSString *fillColor;
@property (nonatomic, strong) NSNumber *pointSize;
@property (nonatomic, strong) NSString *strokeColor;
@property (nonatomic, strong) NSNumber *strokeWidth;
@property (nonatomic, strong) NSNumber *fillOpacity;

@end

