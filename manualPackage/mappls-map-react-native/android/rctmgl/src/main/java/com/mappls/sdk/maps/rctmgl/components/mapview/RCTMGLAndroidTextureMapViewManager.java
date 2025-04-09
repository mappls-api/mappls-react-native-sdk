package com.mappls.sdk.maps.rctmgl.components.mapview;

import com.facebook.react.bridge.ReactApplicationContext;
import com.mappls.sdk.maps.MapplsMapOptions;
import com.facebook.react.uimanager.ThemedReactContext;

/**
 * Created by hernanmateo on 12/11/18.
 */

public class RCTMGLAndroidTextureMapViewManager extends RCTMGLMapViewManager {
    public static final String LOG_TAG = "RCTMGLAndroidTextureMapViewManager";
    public static final String REACT_CLASS = "RCTMGLAndroidTextureMapView";

    public RCTMGLAndroidTextureMapViewManager(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected RCTMGLAndroidTextureMapView createViewInstance(ThemedReactContext themedReactContext) {
        MapplsMapOptions options = MapplsMapOptions.createFromAttributes(themedReactContext);
        options.textureMode(true);
        return new RCTMGLAndroidTextureMapView(themedReactContext, this, options);
    }
}
