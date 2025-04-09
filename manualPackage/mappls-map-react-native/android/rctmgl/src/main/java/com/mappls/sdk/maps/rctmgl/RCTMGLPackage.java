package com.mappls.sdk.maps.rctmgl;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.mappls.sdk.maps.rctmgl.components.annotation.RCTMGLCalloutManager;
import com.mappls.sdk.maps.rctmgl.components.annotation.RCTMGLPointAnnotationManager;
import com.mappls.sdk.maps.rctmgl.components.annotation.RCTMGLMarkerViewManager;
import com.mappls.sdk.maps.rctmgl.components.camera.RCTMGLCameraManager;
import com.mappls.sdk.maps.rctmgl.components.geoAnalytics.RCTMGLGeoAnalyticsManager;
import com.mappls.sdk.maps.rctmgl.components.images.RCTMGLImagesManager;
import com.mappls.sdk.maps.rctmgl.components.location.RCTMGLNativeUserLocationManager;
import com.mappls.sdk.maps.rctmgl.components.mapview.RCTMGLMapViewManager;
import com.mappls.sdk.maps.rctmgl.components.mapview.RCTMGLAndroidTextureMapViewManager;
import com.mappls.sdk.maps.rctmgl.components.styles.layers.RCTMGLBackgroundLayerManager;
import com.mappls.sdk.maps.rctmgl.components.styles.layers.RCTMGLCircleLayerManager;
import com.mappls.sdk.maps.rctmgl.components.styles.layers.RCTMGLFillExtrusionLayerManager;
import com.mappls.sdk.maps.rctmgl.components.styles.layers.RCTMGLFillLayerManager;
import com.mappls.sdk.maps.rctmgl.components.styles.layers.RCTMGLHeatmapLayerManager;
import com.mappls.sdk.maps.rctmgl.components.styles.layers.RCTMGLLineLayerManager;
import com.mappls.sdk.maps.rctmgl.components.styles.layers.RCTMGLRasterLayerManager;
import com.mappls.sdk.maps.rctmgl.components.styles.layers.RCTMGLSymbolLayerManager;
import com.mappls.sdk.maps.rctmgl.components.styles.light.RCTMGLLightManager;
import com.mappls.sdk.maps.rctmgl.components.styles.sources.RCTMGLImageSourceManager;
import com.mappls.sdk.maps.rctmgl.components.styles.sources.RCTMGLRasterSourceManager;
import com.mappls.sdk.maps.rctmgl.components.styles.sources.RCTMGLShapeSourceManager;
import com.mappls.sdk.maps.rctmgl.components.styles.sources.RCTMGLVectorSourceManager;
import com.mappls.sdk.maps.rctmgl.modules.RCTMGLLocationModule;
import com.mappls.sdk.maps.rctmgl.modules.RCTMGLLogging;
import com.mappls.sdk.maps.rctmgl.modules.RCTMGLModule;
import com.mappls.sdk.maps.rctmgl.modules.RCTMGLOfflineModule;
import com.mappls.sdk.maps.rctmgl.modules.RCTMGLRestApiModule;
import com.mappls.sdk.maps.rctmgl.modules.RCTMGLSnapshotModule;

/**
 * Created by nickitaliano on 8/18/17.
 */

public class RCTMGLPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactApplicationContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new RCTMGLModule(reactApplicationContext));
        modules.add(new RCTMGLOfflineModule(reactApplicationContext));
        modules.add(new RCTMGLSnapshotModule(reactApplicationContext));
        modules.add(new RCTMGLLocationModule(reactApplicationContext));
        modules.add(new RCTMGLLogging(reactApplicationContext));
        modules.add(new RCTMGLRestApiModule(reactApplicationContext));

        return modules;
    }

    @Deprecated
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactApplicationContext) {
        List<ViewManager> managers = new ArrayList<>();

        // components
        managers.add(new RCTMGLCameraManager(reactApplicationContext));
        managers.add(new RCTMGLMapViewManager(reactApplicationContext));
        managers.add(new RCTMGLMarkerViewManager(reactApplicationContext));
        managers.add(new RCTMGLAndroidTextureMapViewManager(reactApplicationContext));
        managers.add(new RCTMGLLightManager());
        managers.add(new RCTMGLPointAnnotationManager(reactApplicationContext));
        managers.add(new RCTMGLCalloutManager());
        managers.add(new RCTMGLNativeUserLocationManager());

        // sources
        managers.add(new RCTMGLVectorSourceManager(reactApplicationContext));
        managers.add(new RCTMGLShapeSourceManager(reactApplicationContext));
        managers.add(new RCTMGLRasterSourceManager(reactApplicationContext));
        managers.add(new RCTMGLImageSourceManager());

        // images
        managers.add(new RCTMGLImagesManager(reactApplicationContext));

        // layers
        managers.add(new RCTMGLFillLayerManager());
        managers.add(new RCTMGLFillExtrusionLayerManager());
        managers.add(new RCTMGLHeatmapLayerManager());
        managers.add(new RCTMGLLineLayerManager());
        managers.add(new RCTMGLCircleLayerManager());
        managers.add(new RCTMGLSymbolLayerManager());
        managers.add(new RCTMGLRasterLayerManager());
        managers.add(new RCTMGLBackgroundLayerManager());

        //geoanalytics
        managers.add(new RCTMGLGeoAnalyticsManager(reactApplicationContext));

        return managers;
    }
}
