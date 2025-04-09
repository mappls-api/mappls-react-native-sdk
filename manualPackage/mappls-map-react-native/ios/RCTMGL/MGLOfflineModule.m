//
//  MGLOfflineModule.m
//  RCTMGL
//
//  Created by Nick Italiano on 10/25/17.
//  Copyright © 2017 Mapbox Inc. All rights reserved.
//

#import "MGLOfflineModule.h"
#import "RCTMGLUtils.h"
#import "RCTMGLEvent.h"
#import "RCTMGLEventTypes.h"

@implementation MGLOfflineModule
{
    NSUInteger lastPackState;
    double lastPackTimestamp;
    double eventThrottle;
    BOOL hasListeners;
    NSMutableArray<RCTPromiseResolveBlock> *packRequestQueue;
}

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (void)startObserving
{
    [super startObserving];
    hasListeners = YES;
}

- (void)stopObserving
{
    [super stopObserving];
    hasListeners = NO;
}

NSString *const RCT_MAPBOX_OFFLINE_CALLBACK_PROGRESS = @"MapboxOfflineRegionProgress";
NSString *const RCT_MAPBOX_OFFLINE_CALLBACK_ERROR = @"MapboOfflineRegionError";

- (instancetype)init
{
    if (self = [super init]) {
        packRequestQueue = [NSMutableArray new];
        eventThrottle = 300;
        lastPackState = -1;
        
    }
    return self;
}

- (void)dealloc
{
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[RCT_MAPBOX_OFFLINE_CALLBACK_PROGRESS, RCT_MAPBOX_OFFLINE_CALLBACK_ERROR];
}

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context
{
    if (packRequestQueue.count == 0) {
        return;
    }
    
}

RCT_EXPORT_METHOD(createPack:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    reject(@"createPack", @"No Implementation of this method", nil);
}

RCT_EXPORT_METHOD(mergeOfflineRegions:(NSString *)path
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    reject(@"mergeOfflineRegions", @"No Implementation of this method", nil);

}

RCT_EXPORT_METHOD(getPacks:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    reject(@"getPacks", @"No Implementation of this method", nil);
}

RCT_EXPORT_METHOD(invalidateAmbientCache:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    reject(@"invalidateAmbientCache", @"No Implementation of this method", nil);
}

RCT_EXPORT_METHOD(clearAmbientCache:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    reject(@"clearAmbientCache", @"No Implementation of this method", nil);
}

RCT_EXPORT_METHOD(setMaximumAmbientCacheSize:(NSUInteger)cacheSize
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    reject(@"setMaximumAmbientCacheSize", @"No Implementation of this method", nil);
    
}

RCT_EXPORT_METHOD(resetDatabase:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    reject(@"resetDatabase", @"No Implementation of this method", nil);
}

RCT_EXPORT_METHOD(getPackStatus:(NSString *)name
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    reject(@"getPackStatus", @"No Implementation of this method", nil);

}

RCT_EXPORT_METHOD(invalidatePack:(NSString *)name
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    reject(@"invalidatePack", @"No Implementation of this method", nil);
}

RCT_EXPORT_METHOD(deletePack:(NSString *)name
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    reject(@"deletePack", @"No Implementation of this method", nil);
}

RCT_EXPORT_METHOD(pausePackDownload:(NSString *)name
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    reject(@"pausePackDownload", @"No Implementation of this method", nil);
}

RCT_EXPORT_METHOD(resumePackDownload:(NSString *)name
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    reject(@"resumePackDownload", @"No Implementation of this method", nil);
}

RCT_EXPORT_METHOD(setTileCountLimit:(nonnull NSNumber *)limit)
{
//    reject(@"setTileCountLimit", @"No Implementation of this method", nil);
}

RCT_EXPORT_METHOD(setProgressEventThrottle:(nonnull NSNumber *)throttleValue)
{
//    eventThrottle = [throttleValue doubleValue];
}

- (void)offlinePackProgressDidChange:(NSNotification *)notification
{
    //
}

- (void)offlinePackDidReceiveError:(NSNotification *)notification
{
    //
}

- (void)offlinePackDidReceiveMaxAllowedMapboxTiles:(NSNotification *)notification
{
    //
}

- (double)_getCurrentTimestamp
{
    return CACurrentMediaTime() * 1000;
}

- (NSData *)_archiveMetadata:(NSString *)metadata
{
    return [NSKeyedArchiver archivedDataWithRootObject:metadata];
}

- (NSDictionary *)_unarchiveMetadata:(MGLOfflinePack *)pack
{
    id data = [NSKeyedUnarchiver unarchiveObjectWithData:pack.context];
    // Version v5 store data as NSDictionary while v6 store data as JSON string.
    // User might save offline pack in v5 and then try to read in v6.
    // In v5 are metadata stored nested which need to be handled in JS.
    // Example of how data are stored in v5
    // {
    //      name: "New York",
    //      metadata: {
    //          customMeta: "...",
    //      }
    // }
    if ([data isKindOfClass:[NSDictionary class]]) {
        return data;
    }
    
    if (data == nil) {
        return @{};
    }
    
    return [NSJSONSerialization JSONObjectWithData:[data dataUsingEncoding:NSUTF8StringEncoding]
                                options:NSJSONReadingMutableContainers
                                error:nil];
}

- (NSDictionary *)_makeRegionStatusPayload:(NSString *)name pack:(MGLOfflinePack *)pack
{
    uint64_t completedResources = pack.progress.countOfResourcesCompleted;
    uint64_t expectedResources = pack.progress.countOfResourcesExpected;
    float progressPercentage = (float)completedResources / expectedResources;

    // prevent NaN errors when expectedResources is 0
    if(expectedResources == 0) {
        progressPercentage = 0;
    }
    
    return @{
      @"state": @(pack.state),
      @"name": name,
      @"percentage": @(ceilf(progressPercentage * 100.0)),
      @"completedResourceCount": @(pack.progress.countOfResourcesCompleted),
      @"completedResourceSize": @(pack.progress.countOfBytesCompleted),
      @"completedTileSize": @(pack.progress.countOfTileBytesCompleted),
      @"completedTileCount": @(pack.progress.countOfTilesCompleted),
      @"requiredResourceCount": @(pack.progress.maximumResourcesExpected)
    };
}

- (RCTMGLEvent *)_makeProgressEvent:(NSString *)name pack:(MGLOfflinePack *)pack
{
    return [RCTMGLEvent makeEvent:RCT_MAPBOX_OFFLINE_PROGRESS withPayload:[self _makeRegionStatusPayload:name pack:pack]];
}

- (RCTMGLEvent *)_makeErrorEvent:(NSString *)name type:(NSString *)type message:(NSString *)message
{
    NSDictionary *payload = @{ @"name": name, @"message": message };
    return [RCTMGLEvent makeEvent:type withPayload:payload];
}

- (NSArray<NSDictionary *> *)_convertPacksToJson:(NSArray<MGLOfflinePack *> *)packs
{
    NSMutableArray<NSDictionary *> *jsonPacks = [NSMutableArray new];
    
    if (packs == nil) {
        return jsonPacks;
    }
    
    for (MGLOfflinePack *pack in packs) {
        [jsonPacks addObject:[self _convertPackToDict:pack]];
    }
    
    return jsonPacks;
}

- (NSDictionary *)_convertPackToDict:(MGLOfflinePack *)pack
{
    // format bounds
    MGLTilePyramidOfflineRegion *region = (MGLTilePyramidOfflineRegion *)pack.region;
    if (region == nil) {
        return nil;
    }
    
    NSArray *jsonBounds = @[
      @[@(region.bounds.ne.longitude), @(region.bounds.ne.latitude)],
      @[@(region.bounds.sw.longitude), @(region.bounds.sw.latitude)]
    ];
    
    // format metadata
    NSDictionary *metadata = [self _unarchiveMetadata:pack];
    NSData *jsonMetadata = [NSJSONSerialization dataWithJSONObject:metadata
                                            options:0
                                            error:nil];
    return @{
      @"metadata": [[NSString alloc] initWithData:jsonMetadata encoding:NSUTF8StringEncoding],
      @"bounds": jsonBounds
    };
}

- (MGLOfflinePack *)_getPackFromName:(NSString *)name
{
    
    return nil;
}

- (void)_sendEvent:(NSString *)eventName event:(RCTMGLEvent *)event
{
    if (!hasListeners) {
        return;
    }
    [self sendEventWithName:eventName body:[event toJSON]];
}

- (BOOL)_shouldSendProgressEvent:(double)currentTimestamp pack:(MGLOfflinePack *)currentPack
{
    if (lastPackState == -1) {
        return YES;
    }
    
    if (lastPackState != currentPack.state) {
        return YES;
    }
    
    if (currentTimestamp - lastPackTimestamp > eventThrottle) {
        return YES;
    }
    
    return NO;
}

@end
