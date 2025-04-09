//
//  MGLModule.m
//  RCTMGL
//
//  Created by Nick Italiano on 8/23/17.
//  Copyright © 2017 Mapbox Inc. All rights reserved.
//

#import "MGLModule.h"
#import "RCTMGLEventTypes.h"
#import "MGLOfflineModule.h"
#import "CameraMode.h"
#import "RCTMGLSource.h"
#import "MGLCustomHeaders.h"
@import MapplsMap;
@import MapplsAPIKit;

@implementation MGLModule

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (NSDictionary<NSString *, id> *)constantsToExport
{
    // style urls
  

    // event types
    NSMutableDictionary *eventTypes = [[NSMutableDictionary alloc] init];
    [eventTypes setObject:RCT_MAPBOX_EVENT_TAP forKey:@"MapClick"];
    [eventTypes setObject:RCT_MAPBOX_EVENT_LONGPRESS forKey:@"MapLongClick"];
    [eventTypes setObject:RCT_MAPBOX_REGION_WILL_CHANGE_EVENT forKey:@"RegionWillChange"];
    [eventTypes setObject:RCT_MAPBOX_REGION_IS_CHANGING forKey:@"RegionIsChanging"];
    [eventTypes setObject:RCT_MAPBOX_REGION_DID_CHANGE forKey:@"RegionDidChange"];
    [eventTypes setObject:RCT_MAPBOX_WILL_START_LOADING_MAP forKey:@"WillStartLoadingMap"];
    [eventTypes setObject:RCT_MAPBOX_DID_FINISH_LOADING_MAP forKey:@"DidFinishLoadingMap"];
    [eventTypes setObject:RCT_MAPBOX_DID_FAIL_LOADING_MAP forKey:@"DidFailLoadingMap"];
    [eventTypes setObject:RCT_MAPPLS_STYLES_LIST_LOADED forKey:@"DidLoadedMapplsMapsStyles"];
    [eventTypes setObject:RCT_MAPPLS_MAP_REINIT forKey:@"MapReinit"];
    [eventTypes setObject:RCT_MAPBOX_WILL_START_RENDERING_FRAME forKey:@"WillStartRenderingFrame"];
    [eventTypes setObject:RCT_MAPBOX_DID_FINSIH_RENDERING_FRAME forKey:@"DidFinishRenderingFrame"];
    [eventTypes setObject:RCT_MAPBOX_DID_FINISH_RENDERING_FRAME_FULLY forKey:@"DidFinishRenderingFrameFully"];
    [eventTypes setObject:RCT_MAPBOX_WILL_START_RENDERING_MAP forKey:@"WillStartRenderingMap"];
    [eventTypes setObject:RCT_MAPBOX_DID_FINISH_RENDERING_MAP forKey:@"DidFinishRenderingMap"];
    [eventTypes setObject:RCT_MAPBOX_DID_FINISH_RENDERING_MAP_FULLY forKey:@"DidFinishRenderingMapFully"];
    [eventTypes setObject:RCT_MAPBOX_DID_FINISH_LOADING_STYLE forKey:@"DidFinishLoadingStyle"];
    [eventTypes setObject:RCT_MAPBOX_HIDE_INDOOR_CONTROL forKey:@"IndoorControlHide"];
    [eventTypes setObject:RCT_MAPBOX_SHOW_INDOOR_CONTROL forKey:@"IndoorControlShow"];

    // location module events
    NSMutableDictionary *locationModuleEvents = [[NSMutableDictionary alloc] init];
    [locationModuleEvents setObject:RCT_MAPBOX_USER_LOCATION_UPDATE forKey:@"Update"];

    // user tracking modes
    NSMutableDictionary *userTrackingModes = [[NSMutableDictionary alloc] init];
    [userTrackingModes setObject:[NSNumber numberWithInt:MGLUserTrackingModeNone] forKey:@"None"];
    [userTrackingModes setObject:[NSNumber numberWithInt:MGLUserTrackingModeFollow] forKey:@"Follow"];
    [userTrackingModes setObject:[NSNumber numberWithInt:MGLUserTrackingModeFollowWithHeading] forKey:@"FollowWithHeading"];
    [userTrackingModes setObject:[NSNumber numberWithInt:MGLUserTrackingModeFollowWithCourse] forKey:@"FollowWithCourse"];

    // user location vertical alignment
    NSMutableDictionary *userLocationVerticalAlignment = [[NSMutableDictionary alloc] init];
    [userLocationVerticalAlignment setObject:[NSNumber numberWithInt:MGLAnnotationVerticalAlignmentTop] forKey:@"Top"];
    [userLocationVerticalAlignment setObject:[NSNumber numberWithInt:MGLAnnotationVerticalAlignmentCenter] forKey:@"Center"];
    [userLocationVerticalAlignment setObject:[NSNumber numberWithInt:MGLAnnotationVerticalAlignmentBottom] forKey:@"Bottom"];

    // camera modes
    NSMutableDictionary *cameraModes = [[NSMutableDictionary alloc] init];
    [cameraModes setObject:[NSNumber numberWithInt:RCT_MAPBOX_CAMERA_MODE_FLIGHT] forKey:@"Flight"];
    [cameraModes setObject:[NSNumber numberWithInt:RCT_MAPBOX_CAMERA_MODE_EASE] forKey:@"Ease"];
    [cameraModes setObject:[NSNumber numberWithInt:RCT_MAPBOX_CAMERA_MODE_LINEAR] forKey:@"Linear"];
    [cameraModes setObject:[NSNumber numberWithInt:RCT_MAPBOX_CAMERA_MODE_NONE] forKey:@"None"];

    // style sources
    NSMutableDictionary *styleSourceConsts = [[NSMutableDictionary alloc] init];
    [styleSourceConsts setObject:DEFAULT_SOURCE_ID forKey:@"DefaultSourceID"];

    // line layer constants
    NSMutableDictionary *lineJoin = [[NSMutableDictionary alloc] init];
    [lineJoin setObject:@(MGLLineJoinBevel) forKey:@"Bevel"];
    [lineJoin setObject:@(MGLLineJoinRound) forKey:@"Round"];
    [lineJoin setObject:@(MGLLineJoinMiter) forKey:@"Miter"];

    NSMutableDictionary *lineCap = [[NSMutableDictionary alloc] init];
    [lineCap setObject:@(MGLLineCapButt) forKey:@"Butt"];
    [lineCap setObject:@(MGLLineCapRound) forKey:@"Round"];
    [lineCap setObject:@(MGLLineCapSquare) forKey:@"Square"];

    NSMutableDictionary *lineTranslateAnchor = [[NSMutableDictionary alloc] init];
    [lineTranslateAnchor setObject:@(MGLLineTranslationAnchorMap) forKey:@"Map"];
    [lineTranslateAnchor setObject:@(MGLLineTranslationAnchorViewport) forKey:@"Viewport"];

    // circle layer constants
    NSMutableDictionary *circlePitchScale = [[NSMutableDictionary alloc] init];
    [circlePitchScale setObject:@(MGLCircleScaleAlignmentMap) forKey:@"Map"];
    [circlePitchScale setObject:@(MGLCircleScaleAlignmentViewport) forKey:@"Viewport"];

    NSMutableDictionary *circlePitchAlignment = [[NSMutableDictionary alloc] init];
    [circlePitchAlignment setObject:@(MGLCirclePitchAlignmentMap) forKey:@"Map"];
    [circlePitchAlignment setObject:@(MGLCirclePitchAlignmentViewport) forKey:@"Viewport"];

    NSMutableDictionary *circleTranslateAnchor = [[NSMutableDictionary alloc] init];
    [circleTranslateAnchor setObject:@(MGLCircleTranslationAnchorMap) forKey:@"Map"];
    [circleTranslateAnchor setObject:@(MGLCircleTranslationAnchorViewport) forKey:@"Viewport"];

    // fill extrusion layer constants
    NSMutableDictionary *fillExtrusionTranslateAnchor = [[NSMutableDictionary alloc] init];
    [fillExtrusionTranslateAnchor setObject:@(MGLFillExtrusionTranslationAnchorMap) forKey:@"Map"];
    [fillExtrusionTranslateAnchor setObject:@(MGLFillExtrusionTranslationAnchorViewport) forKey:@"Viewport"];

    // fill layer constants
    NSMutableDictionary *fillTranslateAnchor = [[NSMutableDictionary alloc] init];
    [fillTranslateAnchor setObject:@(MGLFillTranslationAnchorMap) forKey:@"Map"];
    [fillTranslateAnchor setObject:@(MGLFillTranslationAnchorViewport) forKey:@"Viewport"];

    // symbol layer constants
    NSMutableDictionary *iconRotationAlignment = [[NSMutableDictionary alloc] init];
    [iconRotationAlignment setObject:@(MGLIconRotationAlignmentAuto) forKey:@"Auto"];
    [iconRotationAlignment setObject:@(MGLIconRotationAlignmentMap) forKey:@"Map"];
    [iconRotationAlignment setObject:@(MGLIconRotationAlignmentViewport) forKey:@"Viewport"];

    NSMutableDictionary *iconTextFit = [[NSMutableDictionary alloc] init];
    [iconTextFit setObject:@(MGLIconTextFitNone) forKey:@"None"];
    [iconTextFit setObject:@(MGLIconTextFitWidth) forKey:@"Width"];
    [iconTextFit setObject:@(MGLIconTextFitHeight) forKey:@"Height"];
    [iconTextFit setObject:@(MGLIconTextFitBoth) forKey:@"Both"];

    NSMutableDictionary *iconAnchor = [[NSMutableDictionary alloc] init];
    [iconAnchor setObject:@(MGLIconAnchorCenter) forKey:@"Center"];
    [iconAnchor setObject:@(MGLIconAnchorTop) forKey:@"Top"];
    [iconAnchor setObject:@(MGLIconAnchorBottom) forKey:@"Bottom"];
    [iconAnchor setObject:@(MGLIconAnchorLeft) forKey:@"Left"];
    [iconAnchor setObject:@(MGLIconAnchorRight) forKey:@"Right"];
    [iconAnchor setObject:@(MGLIconAnchorTopLeft) forKey:@"TopLeft"];
    [iconAnchor setObject:@(MGLIconAnchorTopRight) forKey:@"TopRight"];
    [iconAnchor setObject:@(MGLIconAnchorBottomLeft) forKey:@"BottomLeft"];
    [iconAnchor setObject:@(MGLIconAnchorBottomRight) forKey:@"BottomRight"];

    NSMutableDictionary *iconTranslateAnchor = [[NSMutableDictionary alloc] init];
    [iconTranslateAnchor setObject:@(MGLIconTranslationAnchorMap) forKey:@"Map"];
    [iconTranslateAnchor setObject:@(MGLIconTranslationAnchorViewport) forKey:@"Viewport"];

    NSMutableDictionary *iconPitchAlignment = [[NSMutableDictionary alloc] init];
    [iconPitchAlignment setObject:@(MGLIconPitchAlignmentAuto) forKey:@"Auto"];
    [iconPitchAlignment setObject:@(MGLIconPitchAlignmentMap) forKey:@"Map"];
    [iconPitchAlignment setObject:@(MGLIconPitchAlignmentViewport) forKey:@"Viewport"];

    NSMutableDictionary *symbolPlacement = [[NSMutableDictionary alloc] init];
    [symbolPlacement setObject:@(MGLSymbolPlacementLine) forKey:@"Line"];
    [symbolPlacement setObject:@(MGLSymbolPlacementPoint) forKey:@"Point"];

    NSMutableDictionary *textAnchor = [[NSMutableDictionary alloc] init];
    [textAnchor setObject:@(MGLTextAnchorCenter) forKey:@"Center"];
    [textAnchor setObject:@(MGLTextAnchorLeft) forKey:@"Left"];
    [textAnchor setObject:@(MGLTextAnchorRight) forKey:@"Right"];
    [textAnchor setObject:@(MGLTextAnchorTop) forKey:@"Top"];
    [textAnchor setObject:@(MGLTextAnchorBottom) forKey:@"Bottom"];
    [textAnchor setObject:@(MGLTextAnchorTopLeft) forKey:@"TopLeft"];
    [textAnchor setObject:@(MGLTextAnchorTopRight) forKey:@"TopRight"];
    [textAnchor setObject:@(MGLTextAnchorBottomLeft) forKey:@"BottomLeft"];
    [textAnchor setObject:@(MGLTextAnchorBottomRight) forKey:@"BottomRight"];

    NSMutableDictionary *textJustify = [[NSMutableDictionary alloc] init];
    [textJustify setObject:@(MGLTextJustificationCenter) forKey:@"Center"];
    [textJustify setObject:@(MGLTextJustificationLeft) forKey:@"Left"];
    [textJustify setObject:@(MGLTextJustificationRight) forKey:@"Right"];

    NSMutableDictionary *textPitchAlignment = [[NSMutableDictionary alloc] init];
    [textPitchAlignment setObject:@(MGLTextPitchAlignmentAuto) forKey:@"Auto"];
    [textPitchAlignment setObject:@(MGLTextPitchAlignmentMap) forKey:@"Map"];
    [textPitchAlignment setObject:@(MGLTextPitchAlignmentViewport) forKey:@"Viewport"];

    NSMutableDictionary *textRotationAlignment = [[NSMutableDictionary alloc] init];
    [textRotationAlignment setObject:@(MGLTextRotationAlignmentAuto) forKey:@"Auto"];
    [textRotationAlignment setObject:@(MGLTextRotationAlignmentMap) forKey:@"Map"];
    [textRotationAlignment setObject:@(MGLTextRotationAlignmentViewport) forKey:@"Viewport"];

    NSMutableDictionary *textTransform = [[NSMutableDictionary alloc] init];
    [textTransform setObject:@(MGLTextTransformNone) forKey:@"None"];
    [textTransform setObject:@(MGLTextTransformLowercase) forKey:@"Lowercase"];
    [textTransform setObject:@(MGLTextTransformUppercase) forKey:@"Uppercase"];

    NSMutableDictionary *textTranslateAnchor = [[NSMutableDictionary alloc] init];
    [textTranslateAnchor setObject:@(MGLTextTranslationAnchorMap) forKey:@"Map"];
    [textTranslateAnchor setObject:@(MGLTextTranslationAnchorViewport) forKey:@"Viewport"];

    // light constants
    NSMutableDictionary *lightAnchor = [[NSMutableDictionary alloc] init];
    [lightAnchor setObject:@(MGLLightAnchorMap) forKey:@"Map"];
    [lightAnchor setObject:@(MGLLightAnchorViewport) forKey:@"Viewport"];

    // offline module callback names
    NSMutableDictionary *offlineModuleCallbackNames = [[NSMutableDictionary alloc] init];
    [offlineModuleCallbackNames setObject:RCT_MAPBOX_OFFLINE_CALLBACK_ERROR forKey:@"Error"];
    [offlineModuleCallbackNames setObject:RCT_MAPBOX_OFFLINE_CALLBACK_PROGRESS forKey:@"Progress"];

    NSMutableDictionary *offlinePackDownloadState = [[NSMutableDictionary alloc] init];
    [offlinePackDownloadState setObject:@(MGLOfflinePackStateInactive) forKey:@"Inactive"];
    [offlinePackDownloadState setObject:@(MGLOfflinePackStateActive) forKey:@"Active"];
    [offlinePackDownloadState setObject:@(MGLOfflinePackStateComplete) forKey:@"Complete"];

    return @{
         @"EventTypes": eventTypes,
         @"UserTrackingModes": userTrackingModes,
         @"UserLocationVerticalAlignment": userLocationVerticalAlignment,
         @"CameraModes": cameraModes,
         @"StyleSource": styleSourceConsts,
         @"LineJoin": lineJoin,
         @"LineCap": lineCap,
         @"LineTranslateAnchor": lineTranslateAnchor,
         @"CirclePitchScale": circlePitchScale,
         @"CircleTranslateAnchor": circleTranslateAnchor,
         @"CirclePitchAlignment": circlePitchAlignment,
         @"FillExtrusionTranslateAnchor": fillExtrusionTranslateAnchor,
         @"FillTranslateAnchor": fillTranslateAnchor,
         @"IconRotationAlignment": iconRotationAlignment,
         @"IconTextFit": iconTextFit,
         @"IconTranslateAnchor": iconTranslateAnchor,
         @"IconAnchor": iconAnchor,
         @"IconPitchAlignment": iconPitchAlignment,
         @"SymbolPlacement": symbolPlacement,
         @"TextAnchor": textAnchor,
         @"TextJustify": textJustify,
         @"TextPitchAlignment": textPitchAlignment,
         @"TextRotationAlignment": textRotationAlignment,
         @"TextTransform": textTransform,
         @"TextTranslateAnchor": textTranslateAnchor,
         @"LightAnchor": lightAnchor,
         @"OfflineCallbackName": offlineModuleCallbackNames,
         @"OfflinePackDownloadState": offlinePackDownloadState,
         @"LocationCallbackName": locationModuleEvents
    };
}

RCT_EXPORT_METHOD(setMapSDKKey:(NSString *)mapSDKKey)
{
    [MapplsAccountManager setMapSDKKey:mapSDKKey];
}



RCT_EXPORT_METHOD(setRestAPIKey:(NSString *)restAPIKey)
{
    [MapplsAccountManager setRestAPIKey:restAPIKey];
}


RCT_EXPORT_METHOD(setRegion:(NSString *)region)
{
    [MapplsAccountManager setDefaultRegion:region];
}

RCT_EXPORT_METHOD(setAtlasClientId:(NSString *)atlasClientId)
{
    [MapplsAccountManager setClientId:atlasClientId];
    
    [MapplsSharedInfoManager setAppId: @"mappls-rn-ios-sdk" isOneTimeAccessible:true];
    
    [MapplsAccountManager setGrantType:@"client_credentials"];
}

RCT_EXPORT_METHOD(setAtlasClientSecret:(NSString *)atlasClientSecret)
{
    [MapplsAccountManager setClientSecret:atlasClientSecret];
}


RCT_EXPORT_METHOD(setDeveloperShowingSplash:(BOOL )showDeveloperSplash)
{
    [MapplsAccountManager setIsHiddenAuthorizationFailOverlay: showDeveloperSplash];
}

RCT_EXPORT_METHOD(setEnablePromotion: (BOOL ) enablePromotion)
{
    [MapplsMapConfiguration setIsPromotionsEnabled: enablePromotion];
}

RCT_EXPORT_METHOD(setAssociationId: (NSString *) associationId)
{
    [MapplsAccountManager setAssociationId: associationId];
}

RCT_EXPORT_METHOD(setShowLastSelectedStyle: (BOOL )showLastSelectedStyle)
{
    [MapplsMapConfiguration setIsShowPreferedMapStyle:showLastSelectedStyle];
}

RCT_EXPORT_METHOD(isShowLastSelectedStyle:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    bool showSelectedStyle = [MapplsMapConfiguration isShowPreferedMapStyle];
    if(showSelectedStyle) {
        resolve(@YES);
    } else {
        resolve(@NO);
    }
    
}

RCT_EXPORT_METHOD(isUsingRasterStyle:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    bool isUsingRasterStyle = [MapplsAccountManager tileEncryptionEnabled];
    if(isUsingRasterStyle) {
        resolve(@YES);
    } else {
        resolve(@NO);
    }
    
}

RCT_EXPORT_METHOD(isAllowOtherUrls:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    bool isAllowOtherUrls = [MapplsAccountManager allowOtherURLs];
    if(isAllowOtherUrls) {
        resolve(@YES);
    } else {
        resolve(@NO);
    }
}

RCT_EXPORT_METHOD(isDeveloperShowingSplash:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    bool isDeveloperShowingSplash = [MapplsAccountManager isHiddenAuthorizationFailOverlay];
    if(isDeveloperShowingSplash) {
        resolve(@YES);
    } else {
        resolve(@NO);
    }
}

RCT_EXPORT_METHOD(isEnablePromotion:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    bool isEnablePromotion = [MapplsMapConfiguration isPromotionsEnabled];
    if(isEnablePromotion) {
        resolve(@YES);
    } else {
        resolve(@NO);
    }
}

RCT_EXPORT_METHOD(settingClusterId: (NSString *) clusterId vin: (NSString *) vin) {
    if(vin == nil) {
        [MapplsAccountManager setClusterId: clusterId];
    } else {
        [MapplsAccountManager setClusterId:clusterId linkedDeviceAlias: vin];
    }
    
}

RCT_EXPORT_METHOD(getClusterId: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve([MapplsAccountManager clusterId]);
}

RCT_EXPORT_METHOD(getAssociationId: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve([MapplsAccountManager associationId]);
}


RCT_EXPORT_METHOD(setIndoorEnabled:(BOOL )enabled)
{
    [MapplsAccountManager setIndoorEnabled:enabled];
}

RCT_EXPORT_METHOD(setUsingRasterStyle:(BOOL )enabled) {
    [MapplsAccountManager setTileEncryptionEnabled:!enabled];
}

RCT_EXPORT_METHOD(setAllowOtherUrls: (BOOL ) allowOtherUrls)
{
    [MapplsAccountManager setAllowOtherURLs: allowOtherUrls];
}

RCT_EXPORT_METHOD(setConnected: (BOOL ) conneccted)
{
    
}

RCT_EXPORT_METHOD(setIndoorDefaultUIEnabled:(BOOL )enabled)
{
    [MapplsAccountManager setIndoorDefaultUIEnabled:enabled];
}

RCT_EXPORT_METHOD(getMapSDKKey:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *mapSDKKey = MapplsAccountManager.mapSDKKey;

    if (mapSDKKey != nil) {
        resolve(mapSDKKey);
        return;
    }

    reject(@"missing_mapSDKKey", @"No mapSDKKey has been set", nil);
}

RCT_EXPORT_METHOD(getRestAPIKey:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *restAPIKey = MapplsAccountManager.restAPIKey;

    if (restAPIKey != nil) {
        resolve(restAPIKey);
        return;
    }

    reject(@"missing_restAPIKey", @"No restAPIKey has been set", nil);
}

RCT_EXPORT_METHOD(getDeviceAlias:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *deviceAlias = MapplsAccountManager.linkedDeviceAlias;

    if (deviceAlias != nil) {
        resolve(deviceAlias);
        return;
    }

    reject(@"missing_restAPIKey", @"No deviceAlias has been set", nil);
}

RCT_EXPORT_METHOD(getRegion:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *region = MapplsAccountManager.defaultRegion;

    if (region != nil) {
        resolve(region);
        return;
    }

    reject(@"missing_restAPIKey", @"No region has been set", nil);
}

RCT_EXPORT_METHOD(getUserId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *userId = MapplsAccountManager.userId;

    if (userId != nil) {
        resolve(userId);
        return;
    }

    reject(@"missing_restAPIKey", @"No userId has been set", nil);
}

RCT_EXPORT_METHOD(setUserId:(NSString *)userId)
{
    [MapplsAccountManager setUserId:userId];
}

RCT_EXPORT_METHOD(getAtlasClientId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *atlasClientId = MapplsAccountManager.clientId;

    if (atlasClientId != nil) {
        resolve(atlasClientId);
        return;
    }

    reject(@"missing_atlasClientId", @"No atlasClientId has been set", nil);
}

RCT_EXPORT_METHOD(getAtlasClientSecret:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *atlasClientSecret = MapplsAccountManager.clientSecret;

    if (atlasClientSecret != nil) {
        resolve(atlasClientSecret);
        return;
    }

    reject(@"missing_atlasClientSecret", @"No atlasClientSecret has been set", nil);
}

RCT_EXPORT_METHOD(setDisableHostnameVerifier: (BOOL ) disableHostNameVerifier)
{
    
}

RCT_EXPORT_METHOD(setProxy: (NSString *) proxyHost proxyPort:(NSNumber *) proxyPort)
{
    
}

RCT_EXPORT_METHOD(setReinitEnable: (BOOL ) reinitEnable)
{
    [MapplsMapConfiguration setShouldReinit: reinitEnable];
    
    NSLog(@"setReinitEnable %d", reinitEnable);
}

RCT_EXPORT_METHOD(getDigipinFromCoordinate: (NSArray<NSNumber *> *) coordinates resolve: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    if(coordinates.count == 2){
        MapplsDigiPinUtility * digipinUtility = [[MapplsDigiPinUtility alloc] init];
        resolve([digipinUtility getDigiPinFrom:CLLocationCoordinate2DMake( [coordinates[1] doubleValue],  [coordinates[0] doubleValue])]);
    } else {
        reject(@"Invalid coordinates", @"Invalid coordinates", nil);
    }
}

RCT_EXPORT_METHOD(getCoordinateFromDigipin: (NSString *) digipin resolve: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    MapplsDigiPinUtility * digipinUtility = [[MapplsDigiPinUtility alloc] init];
    CLLocation *coordinate = [digipinUtility getCoordinateFrom: digipin];
    
    resolve(@[@(coordinate.coordinate.longitude), @(coordinate.coordinate.latitude)]);
}

RCT_EXPORT_METHOD(isReinitEnable: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    BOOL shouldReinit = [MapplsMapConfiguration shouldReinit];
    if(shouldReinit) {
        resolve(@YES);
    } else {
        resolve(@NO);
    }
}

RCT_EXPORT_METHOD(addCustomHeader:(NSString *)headerName forHeaderValue:(NSString *) headerValue)
{
    [MGLCustomHeaders.sharedInstance addHeader:headerValue forHeaderName:headerName];
}

RCT_EXPORT_METHOD(removeCustomHeader:(NSString *)headerName)
{
    [MGLCustomHeaders.sharedInstance removeHeader:headerName];
}

@end
