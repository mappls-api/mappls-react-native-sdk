package com.mappls.sdk.maps.rctmgl.components.geoAnalytics;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.mappls.sdk.maps.rctmgl.components.AbstractEventEmitter;
import com.mappls.sdk.maps.rctmgl.utils.GeoAnalyticsUtils;

import java.util.HashMap;
import java.util.Map;

public class RCTMGLGeoAnalyticsManager extends AbstractEventEmitter<RCTMGLGeoAnalytics> {

    public static final String REACT_CLASS = "RCTMGLGeoAnalytics";

    private ReactApplicationContext mContext;

    public RCTMGLGeoAnalyticsManager(ReactApplicationContext mContext) {
        super(mContext);
        this.mContext = mContext;
    }

    @Nullable
    @Override
    public Map<String, String> customEvents() {
        return new HashMap<>();
    }

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    protected RCTMGLGeoAnalytics createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new RCTMGLGeoAnalytics(reactContext);
    }

    @ReactProp(name="showGeoAnalytics")
    public void showGeoAnalytics(RCTMGLGeoAnalytics geoAnalytics, int value) {
        geoAnalytics.showGeoAnalytics(GeoAnalyticsUtils.geoAnalyticsType(value));
    }

//    @ReactProp(name="removeGeoAnalytics")
//    public void removeGeoAnalytics(RCTMGLGeoAnalytics geoAnalytics, int value) {
//        geoAnalytics.removeGeoAnalytics(GeoAnalyticsUtils.geoAnalyticsType(value));
//    }


    @ReactProp(name = "layerRequest")
    public void setLayerRequest(RCTMGLGeoAnalytics geoAnalytics, ReadableArray value){
        if (value!=null){
            geoAnalytics.setLayerRequest(value);
        }
    }
    @ReactProp(name="geoboundType")
    public void setGeoboundType(RCTMGLGeoAnalytics geoAnalytics, String value) {
        if (value != null) {
            geoAnalytics.setGeoboundType(value);
        }
    }

}
