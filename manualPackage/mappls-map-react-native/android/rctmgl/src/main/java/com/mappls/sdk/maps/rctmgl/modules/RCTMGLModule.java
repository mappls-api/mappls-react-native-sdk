package com.mappls.sdk.maps.rctmgl.modules;

import android.os.Handler;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.module.annotations.ReactModule;
import com.mappls.sdk.geojson.Point;
import com.mappls.sdk.maps.Mappls;
import com.mappls.sdk.maps.MapplsMapConfiguration;
// import com.mappls.sdk.maps.constants.Style;
import com.mappls.sdk.maps.style.layers.Property;
import com.mappls.sdk.maps.rctmgl.components.camera.constants.CameraMode;
import com.mappls.sdk.maps.rctmgl.components.styles.RCTMGLStyleValue;
import com.mappls.sdk.maps.rctmgl.components.styles.sources.RCTSource;
import com.mappls.sdk.maps.rctmgl.events.constants.EventTypes;
import com.mappls.sdk.maps.rctmgl.http.CustomHeadersInterceptor;
import com.mappls.sdk.maps.rctmgl.location.UserLocationVerticalAlignment;
import com.mappls.sdk.maps.rctmgl.location.UserTrackingMode;

import okhttp3.Dispatcher;
import okhttp3.OkHttpClient;

import com.mappls.sdk.maps.module.http.HttpRequestUtil;
import com.mappls.sdk.services.account.MapplsAccountManager;
import com.mappls.sdk.services.api.MapplsApiConfiguration;
import com.mappls.sdk.services.utils.DigipinUtility;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by nickitaliano on 8/18/17.
 */

@ReactModule(name = RCTMGLModule.REACT_CLASS)
public class RCTMGLModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "RCTMGLModule";

    private static boolean customHeaderInterceptorAdded = false;

    private Handler mUiThreadHandler;
    private ReactApplicationContext mReactContext;

    public RCTMGLModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
        mReactContext = reactApplicationContext;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    @Nullable
    public Map<String, Object> getConstants() {

        // events
        Map<String, String> eventTypes = new HashMap<>();
        eventTypes.put("MapClick", EventTypes.MAP_CLICK);
        eventTypes.put("MapLongClick", EventTypes.MAP_LONG_CLICK);
        eventTypes.put("RegionWillChange", EventTypes.REGION_WILL_CHANGE);
        eventTypes.put("RegionIsChanging", EventTypes.REGION_IS_CHANGING);
        eventTypes.put("RegionDidChange", EventTypes.REGION_DID_CHANGE);
        eventTypes.put("UserLocationUpdated", EventTypes.USER_LOCATION_UPDATED);
        eventTypes.put("WillStartLoadingMap", EventTypes.WILL_START_LOADING_MAP);
        eventTypes.put("DidFinishLoadingMap", EventTypes.DID_FINISH_LOADING_MAP);
        eventTypes.put("DidFailLoadingMap", EventTypes.DID_FAIL_LOADING_MAP);
        eventTypes.put("WillStartRenderingFrame", EventTypes.WILL_START_RENDERING_FRAME);
        eventTypes.put("DidFinishRenderingFrame", EventTypes.DID_FINISH_RENDERING_FRAME);
        eventTypes.put("DidFinishRenderingFrameFully", EventTypes.DID_FINISH_RENDERING_FRAME_FULLY);
        eventTypes.put("WillStartRenderingMap", EventTypes.WILL_START_RENDERING_MAP);
        eventTypes.put("DidFinishRenderingMap", EventTypes.DID_FINISH_RENDERING_MAP);
        eventTypes.put("DidFinishRenderingMapFully", EventTypes.DID_FINISH_RENDERING_MAP_FULLY);
        eventTypes.put("DidFinishLoadingStyle", EventTypes.DID_FINISH_LOADING_STYLE);

        // user tracking modes
        Map<String, Integer> userTrackingModes = new HashMap<>();
        userTrackingModes.put("None", UserTrackingMode.NONE);
        userTrackingModes.put("Follow", UserTrackingMode.FOLLOW);
        userTrackingModes.put("FollowWithCourse", UserTrackingMode.FollowWithCourse);
        userTrackingModes.put("FollowWithHeading", UserTrackingMode.FollowWithHeading);

        // user location vertical alignment
        Map<String, Integer> userLocationVerticalAlignment = new HashMap<>();
        userLocationVerticalAlignment.put("Center", UserLocationVerticalAlignment.CENTER);
        userLocationVerticalAlignment.put("Top", UserLocationVerticalAlignment.TOP);
        userLocationVerticalAlignment.put("Bottom", UserLocationVerticalAlignment.BOTTOM);

        // camera modes
        Map<String, Integer> cameraModes = new HashMap<>();
        cameraModes.put("Flight", CameraMode.FLIGHT);
        cameraModes.put("Ease", CameraMode.EASE);
        cameraModes.put("Linear", CameraMode.LINEAR);
        cameraModes.put("None", CameraMode.NONE);

        // style source constants
        Map<String, String> styleSourceConsts = new HashMap<>();
        styleSourceConsts.put("DefaultSourceID", RCTSource.DEFAULT_ID);

        // interpolation modes
        Map<String, Integer> interpolationModes = new HashMap<>();
        interpolationModes.put("Exponential", RCTMGLStyleValue.InterpolationModeExponential);
        interpolationModes.put("Categorical", RCTMGLStyleValue.InterpolationModeCategorical);
        interpolationModes.put("Interval", RCTMGLStyleValue.InterpolationModeInterval);
        interpolationModes.put("Identity", RCTMGLStyleValue.InterpolationModeIdentity);

        // line layer constants
        Map<String, String> lineJoin = new HashMap<>();
        lineJoin.put("Bevel", Property.LINE_JOIN_BEVEL);
        lineJoin.put("Round", Property.LINE_JOIN_ROUND);
        lineJoin.put("Miter", Property.LINE_JOIN_MITER);

        Map<String, String> lineCap = new HashMap<>();
        lineCap.put("Butt", Property.LINE_CAP_BUTT);
        lineCap.put("Round", Property.LINE_CAP_ROUND);
        lineCap.put("Square", Property.LINE_CAP_SQUARE);

        Map<String, String> lineTranslateAnchor = new HashMap<>();
        lineTranslateAnchor.put("Map", Property.LINE_TRANSLATE_ANCHOR_MAP);
        lineTranslateAnchor.put("Viewport", Property.LINE_TRANSLATE_ANCHOR_VIEWPORT);

        // circle layer constants
        Map<String, String> circlePitchScale = new HashMap<>();
        circlePitchScale.put("Map", Property.CIRCLE_PITCH_SCALE_MAP);
        circlePitchScale.put("Viewport", Property.CIRCLE_PITCH_SCALE_VIEWPORT);

        Map<String, String> circleTranslateAnchor = new HashMap<>();
        circleTranslateAnchor.put("Map", Property.CIRCLE_TRANSLATE_ANCHOR_MAP);
        circleTranslateAnchor.put("Viewport", Property.CIRCLE_TRANSLATE_ANCHOR_VIEWPORT);

        Map<String, String> circlePitchAlignment = new HashMap<>();
        circlePitchAlignment.put("Map", Property.CIRCLE_PITCH_ALIGNMENT_MAP);
        circlePitchAlignment.put("Viewport", Property.CIRCLE_PITCH_ALIGNMENT_VIEWPORT);

        // fill extrusion layer constants
        Map<String, String> fillExtrusionTranslateAnchor = new HashMap<>();
        fillExtrusionTranslateAnchor.put("Map", Property.FILL_EXTRUSION_TRANSLATE_ANCHOR_MAP);
        fillExtrusionTranslateAnchor.put("Viewport", Property.FILL_EXTRUSION_TRANSLATE_ANCHOR_VIEWPORT);

        // fill layer constants
        Map<String, String> fillTranslateAnchor = new HashMap<>();
        fillTranslateAnchor.put("Map", Property.FILL_TRANSLATE_ANCHOR_MAP);
        fillTranslateAnchor.put("Viewport", Property.FILL_TRANSLATE_ANCHOR_VIEWPORT);

        // symbol layer constants
        Map<String, String> iconRotationAlignment = new HashMap<>();
        iconRotationAlignment.put("Auto", Property.ICON_ROTATION_ALIGNMENT_AUTO);
        iconRotationAlignment.put("Map", Property.ICON_ROTATION_ALIGNMENT_MAP);
        iconRotationAlignment.put("Viewport", Property.ICON_ROTATION_ALIGNMENT_VIEWPORT);

        Map<String, String> iconTextFit = new HashMap<>();
        iconTextFit.put("None", Property.ICON_TEXT_FIT_NONE);
        iconTextFit.put("Width", Property.ICON_TEXT_FIT_WIDTH);
        iconTextFit.put("Height", Property.ICON_TEXT_FIT_HEIGHT);
        iconTextFit.put("Both", Property.ICON_TEXT_FIT_BOTH);

        Map<String, String> iconAnchor = new HashMap<>();
        iconAnchor.put("Center", Property.ICON_ANCHOR_CENTER);
        iconAnchor.put("Left", Property.ICON_ANCHOR_LEFT);
        iconAnchor.put("Right", Property.ICON_ANCHOR_RIGHT);
        iconAnchor.put("Top", Property.ICON_ANCHOR_TOP);
        iconAnchor.put("Bottom", Property.ICON_ANCHOR_BOTTOM);
        iconAnchor.put("TopLeft", Property.ICON_ANCHOR_TOP_LEFT);
        iconAnchor.put("TopRight", Property.ICON_ANCHOR_TOP_RIGHT);
        iconAnchor.put("BottomLeft", Property.ICON_ANCHOR_BOTTOM_LEFT);
        iconAnchor.put("BottomRight", Property.ICON_ANCHOR_BOTTOM_RIGHT);

        Map<String, String> iconPitchAlignment = new HashMap<>();
        iconPitchAlignment.put("Auto", Property.ICON_PITCH_ALIGNMENT_AUTO);
        iconPitchAlignment.put("Map", Property.ICON_PITCH_ALIGNMENT_MAP);
        iconPitchAlignment.put("Viewport", Property.ICON_PITCH_ALIGNMENT_VIEWPORT);

        Map<String, String> iconTranslateAnchor = new HashMap<>();
        iconTranslateAnchor.put("Map", Property.ICON_TRANSLATE_ANCHOR_MAP);
        iconTranslateAnchor.put("Viewport", Property.ICON_TRANSLATE_ANCHOR_VIEWPORT);

        Map<String, String> symbolPlacement = new HashMap<>();
        symbolPlacement.put("Line", Property.SYMBOL_PLACEMENT_LINE);
        symbolPlacement.put("Point", Property.SYMBOL_PLACEMENT_POINT);

        Map<String, String> textAnchor = new HashMap<>();
        textAnchor.put("Center", Property.TEXT_ANCHOR_CENTER);
        textAnchor.put("Left", Property.TEXT_ANCHOR_LEFT);
        textAnchor.put("Right", Property.TEXT_ANCHOR_RIGHT);
        textAnchor.put("Top", Property.TEXT_ANCHOR_TOP);
        textAnchor.put("Bottom", Property.TEXT_ANCHOR_BOTTOM);
        textAnchor.put("TopLeft", Property.TEXT_ANCHOR_TOP_LEFT);
        textAnchor.put("TopRight", Property.TEXT_ANCHOR_TOP_RIGHT);
        textAnchor.put("BottomLeft", Property.TEXT_ANCHOR_BOTTOM_LEFT);
        textAnchor.put("BottomRight", Property.TEXT_ANCHOR_BOTTOM_RIGHT);

        Map<String, String> textJustify = new HashMap<>();
        textJustify.put("Center", Property.TEXT_JUSTIFY_CENTER);
        textJustify.put("Left", Property.TEXT_JUSTIFY_LEFT);
        textJustify.put("Right", Property.TEXT_JUSTIFY_RIGHT);

        Map<String, String> textPitchAlignment = new HashMap<>();
        textPitchAlignment.put("Auto", Property.TEXT_PITCH_ALIGNMENT_AUTO);
        textPitchAlignment.put("Map", Property.TEXT_PITCH_ALIGNMENT_MAP);
        textPitchAlignment.put("Viewport", Property.TEXT_PITCH_ALIGNMENT_VIEWPORT);

        Map<String, String> textRotationAlignment = new HashMap<>();
        textRotationAlignment.put("Auto", Property.TEXT_ROTATION_ALIGNMENT_AUTO);
        textRotationAlignment.put("Map", Property.TEXT_ROTATION_ALIGNMENT_MAP);
        textRotationAlignment.put("Viewport", Property.TEXT_ROTATION_ALIGNMENT_VIEWPORT);

        Map<String, String> textTransform = new HashMap<>();
        textTransform.put("None", Property.TEXT_TRANSFORM_NONE);
        textTransform.put("Lowercase", Property.TEXT_TRANSFORM_LOWERCASE);
        textTransform.put("Uppercase", Property.TEXT_TRANSFORM_UPPERCASE);

        Map<String, String> textTranslateAnchor = new HashMap<>();
        textTranslateAnchor.put("Map", Property.TEXT_TRANSLATE_ANCHOR_MAP);
        textTranslateAnchor.put("Viewport", Property.TEXT_TRANSLATE_ANCHOR_VIEWPORT);

        // light constants
        Map<String, String> lightAnchor = new HashMap<>();
        lightAnchor.put("Map", Property.ANCHOR_MAP);
        lightAnchor.put("Viewport", Property.ANCHOR_VIEWPORT);

        // offline region download states
        Map<String, Integer> offlinePackDownloadStates = new HashMap<>();
        offlinePackDownloadStates.put("Inactive", RCTMGLOfflineModule.INACTIVE_REGION_DOWNLOAD_STATE);
        offlinePackDownloadStates.put("Active", RCTMGLOfflineModule.ACTIVE_REGION_DOWNLOAD_STATE);
        offlinePackDownloadStates.put("Complete", RCTMGLOfflineModule.COMPLETE_REGION_DOWNLOAD_STATE);

        // offline module callback names
        Map<String, String> offlineModuleCallbackNames = new HashMap<>();
        offlineModuleCallbackNames.put("Error", RCTMGLOfflineModule.OFFLINE_ERROR);
        offlineModuleCallbackNames.put("Progress", RCTMGLOfflineModule.OFFLINE_PROGRESS);

        // location module callback names
        Map<String, String> locationModuleCallbackNames = new HashMap<>();
        locationModuleCallbackNames.put("Update", RCTMGLLocationModule.LOCATION_UPDATE);

        return MapBuilder.<String, Object>builder()
//                .put("StyleURL", styleURLS)
                .put("EventTypes", eventTypes)
                .put("UserTrackingModes", userTrackingModes)
                .put("UserLocationVerticalAlignment", userLocationVerticalAlignment)
                .put("CameraModes", cameraModes)
                .put("StyleSource", styleSourceConsts)
                .put("InterpolationMode", interpolationModes)
                .put("LineJoin", lineJoin)
                .put("LineCap", lineCap)
                .put("LineTranslateAnchor", lineTranslateAnchor)
                .put("CirclePitchScale", circlePitchScale)
                .put("CircleTranslateAnchor", circleTranslateAnchor)
                .put("CirclePitchAlignment", circlePitchAlignment)
                .put("FillExtrusionTranslateAnchor", fillExtrusionTranslateAnchor)
                .put("FillTranslateAnchor", fillTranslateAnchor)
                .put("IconRotationAlignment", iconRotationAlignment)
                .put("IconTextFit", iconTextFit)
                .put("IconTranslateAnchor", iconTranslateAnchor)
                .put("SymbolPlacement", symbolPlacement)
                .put("IconAnchor", iconAnchor)
                .put("TextAnchor", textAnchor)
                .put("TextJustify", textJustify)
                .put("IconPitchAlignment", iconPitchAlignment)
                .put("TextPitchAlignment", textPitchAlignment)
                .put("TextRotationAlignment", textRotationAlignment)
                .put("TextTransform", textTransform)
                .put("TextTranslateAnchor", textTranslateAnchor)
                .put("LightAnchor", lightAnchor)
                .put("OfflinePackDownloadState", offlinePackDownloadStates)
                .put("OfflineCallbackName", offlineModuleCallbackNames)
                .put("LocationCallbackName", locationModuleCallbackNames)
                .build();
    }

    @ReactMethod
    public void initialize() {
        mReactContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Mappls.getInstance(getReactApplicationContext());
            }
        });
    }

    @ReactMethod
    public void setRestAPIKey(final String restAPIKey) {
        mReactContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                MapplsAccountManager.getInstance().setRestAPIKey(restAPIKey);
            }
        });
    }

    @ReactMethod
    public void setMapSDKKey(final String mapSDKKey) {
        mReactContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                MapplsAccountManager.getInstance().setMapSDKKey(mapSDKKey);
            }
        });
    }


    @ReactMethod
    public void setAtlasClientId(final String atlasClientId) {
        mReactContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                MapplsAccountManager.getInstance().setAtlasClientId(atlasClientId);
            }
        });
    }


    @ReactMethod
    public void setAtlasClientSecret(final String atlasClientSecret) {
        mReactContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                MapplsAccountManager.getInstance().setAtlasClientSecret(atlasClientSecret);
            }
        });
    }


    @ReactMethod
    public void setRegion(final String region) {
        mReactContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                MapplsAccountManager.getInstance().setRegion(region);
            }
        });
    }

    @ReactMethod
    public void setDeveloperShowingSplash(final boolean developerShowingSplash) {
        mReactContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                MapplsMapConfiguration.getInstance().setDeveloperShowingSplash(developerShowingSplash);
            }
        });
    }

    @ReactMethod
    public void setEnablePromotion(final boolean enablePromotion) {
        mReactContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                MapplsMapConfiguration.getInstance().setEnablePromotion(enablePromotion);
            }
        });
    }


    @ReactMethod
    public void setAssociationId(final String associationId) {
        mReactContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                MapplsAccountManager.getInstance().setAssociationId(associationId);
            }
        });
    }

    @ReactMethod
    public void setUsingRasterStyle(final boolean usingRasterStyle) {
        mReactContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                MapplsMapConfiguration.getInstance().setUsingRasterStyle(usingRasterStyle);
            }
        });
    }

    @ReactMethod
    public void setAllowOtherUrls(final boolean allowOtherUrls) {
        mReactContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                MapplsMapConfiguration.getInstance().setAllowOtherUrls(allowOtherUrls);
            }
        });
    }


    @ReactMethod
    public void removeCustomHeader(final String headerName) {
        mReactContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                CustomHeadersInterceptor.INSTANCE.removeHeader(headerName);
            }
        });
    }

    @ReactMethod
    public void addCustomHeader(final String headerName, final String headerValue) {
        mReactContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                if (!customHeaderInterceptorAdded) {
                    Log.i("header", "Add interceptor");
                    OkHttpClient httpClient = new OkHttpClient.Builder()
                            .addInterceptor(CustomHeadersInterceptor.INSTANCE).dispatcher(getDispatcher()).build();
                    HttpRequestUtil.setOkHttpClient(httpClient);
                    customHeaderInterceptorAdded = true;
                }

                CustomHeadersInterceptor.INSTANCE.addHeader(headerName, headerValue);
            }
        });
    }


    @ReactMethod
    public void settingClusterId(final String clusterId, final String vin) {
        mReactContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                if (vin == null){
                    MapplsAccountManager.getInstance().setClusterId(clusterId);
                }else {
                    MapplsAccountManager.getInstance().setClusterId(clusterId,vin);
                }
            }
        });
    }

    @ReactMethod
    public void getClusterId(Promise promise) {
        promise.resolve(MapplsAccountManager.getInstance().getClusterId());
    }

    @ReactMethod
    public void setConnected(final boolean connected) {
        mReactContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                Mappls.setConnected(connected);
            }
        });
    }

    @ReactMethod
    public void setShowLastSelectedStyle(final boolean showLastStyle) {
        mReactContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                MapplsMapConfiguration.getInstance().setShowLastSelectedStyle(showLastStyle);
            }
        });
    }

    @ReactMethod
    public void isShowLastSelectedStyle(Promise promise) {
        promise.resolve(MapplsMapConfiguration.getInstance().isShowLastSelectedStyle());
    }

    @ReactMethod
    public void isUsingRasterStyle(Promise promise) {
        promise.resolve(MapplsMapConfiguration.getInstance().isUsingRasterStyle());
    }

    @ReactMethod
    public void isAllowOtherUrls(Promise promise) {
        promise.resolve(MapplsMapConfiguration.getInstance().isAllowOtherUrls());
    }

    @ReactMethod
    public void isDeveloperShowingSplash(Promise promise) {
        promise.resolve(MapplsMapConfiguration.getInstance().isDeveloperShowingSplash());
    }

    @ReactMethod
    public void isEnablePromotion(Promise promise) {
        promise.resolve(MapplsMapConfiguration.getInstance().isEnablePromotion());
    }

    @ReactMethod
    public void getAssociationId(Promise promise) {
        promise.resolve(MapplsAccountManager.getInstance().getAssociationId());
    }

    @ReactMethod
    public void  getAtlasClientId(Promise promise){
        promise.resolve(MapplsAccountManager.getInstance().getAtlasClientId());
    }

    @ReactMethod
    public  void getAtlasClientSecret(Promise promise){
        promise.resolve(MapplsAccountManager.getInstance().getAtlasClientSecret());
    }

    @ReactMethod
    public void getMapSDKKey(Promise promise){
        promise.resolve(MapplsAccountManager.getInstance().getMapSDKKey());
    }

    @ReactMethod
    public void getRestAPIKey(Promise promise){
        promise.resolve(MapplsAccountManager.getInstance().getRestAPIKey());
    }

    @ReactMethod
    public void getDeviceAlias(Promise promise){
        promise.resolve(MapplsAccountManager.getInstance().getDeviceAlias());
    }

    @ReactMethod
    public void getRegion(Promise promise){
        promise.resolve(MapplsAccountManager.getInstance().getRegion());
    }

    @ReactMethod
    public void getUserId(Promise promise){
        promise.resolve(MapplsAccountManager.getInstance().getUserId());
    }

    @ReactMethod
    public void setUserId(String userId){
        MapplsAccountManager.getInstance().setUserId(userId);
    }
    
    @ReactMethod
    public void setDisableHostnameVerifier(boolean disableHostnameVerifier) {
        MapplsAccountManager.getInstance().setDisableHostnameVerifier(disableHostnameVerifier);
    }
    
    @ReactMethod
    public void isDisableHostnameVerifier(Promise promise) {
        promise.resolve(MapplsAccountManager.getInstance().isDisableHostnameVerifier());
    }
    
    @ReactMethod
    public void setProxy(String proxyHost, int proxyPort) {
        Mappls.setProxy(proxyHost, proxyPort);
    }

    @ReactMethod
    public void setReinitEnable(boolean enable) {
        MapplsMapConfiguration.getInstance().setReinitEnable(true);
    }
    @ReactMethod
    public void isReinitEnable(Promise promise) {
        promise.resolve(MapplsMapConfiguration.getInstance().isMapReinitEnable());
    }

    @ReactMethod
    public void getDigipinFromCoordinate(ReadableArray coordinates, Promise promise) {
        if(coordinates.size() == 2) {
            String digipin = DigipinUtility.getDigipinFromCoordinate(Point.fromLngLat(coordinates.getDouble(0), coordinates.getDouble(1)));
            promise.resolve(digipin);
        } else {
            promise.reject("Invalid Coordinates", new RuntimeException("Invalid Coordinates"));
        }
    }

    @ReactMethod
    public void getCoordinateFromDigipin(String digipin, Promise promise) {
        Point point = DigipinUtility.getCoordinateFromDigipin(digipin);
        if(point != null) {
            WritableArray nativeArray = new WritableNativeArray();
            nativeArray.pushDouble(point.longitude());
            nativeArray.pushDouble(point.latitude());
            promise.resolve(nativeArray);
        } else {
            promise.reject("Invalid Digipin", new RuntimeException("Invalid Digipin"));
        }
    }

    private Dispatcher getDispatcher() {
        Dispatcher dispatcher = new Dispatcher();
        // Matches core limit set on
        // https://github.com/mapbox/mapbox-gl-native/blob/master/platform/android/src/http_file_source.cpp#L192
        dispatcher.setMaxRequestsPerHost(20);
        return dispatcher;
    }
}
