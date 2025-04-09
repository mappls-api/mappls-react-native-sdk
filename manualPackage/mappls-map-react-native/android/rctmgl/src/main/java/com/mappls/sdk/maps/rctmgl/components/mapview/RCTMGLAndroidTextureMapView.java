package com.mappls.sdk.maps.rctmgl.components.mapview;

import android.content.Context;

import com.mappls.sdk.maps.MapplsMapOptions;

/**
 * Created by hernanmateo on 12/11/18.
 */

@SuppressWarnings({"MissingPermission"})
public class RCTMGLAndroidTextureMapView extends RCTMGLMapView {
	public static final String LOG_TAG = "RCTMGLAndroidTextureMapView";
	
    public RCTMGLAndroidTextureMapView(Context context, RCTMGLAndroidTextureMapViewManager manager, MapplsMapOptions options) {
        super(context, manager, options);
    }
}
