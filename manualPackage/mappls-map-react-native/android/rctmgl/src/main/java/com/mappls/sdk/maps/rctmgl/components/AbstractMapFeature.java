package com.mappls.sdk.maps.rctmgl.components;

import android.content.Context;

import com.facebook.react.views.view.ReactViewGroup;
import com.mappls.sdk.maps.rctmgl.components.mapview.RCTMGLMapView;

/**
 * Created by nickitaliano on 9/6/17.
 */

public abstract class AbstractMapFeature extends ReactViewGroup {
    public AbstractMapFeature(Context context) {
        super(context);
    }

    public abstract void addToMap(RCTMGLMapView mapView);
    public abstract void removeFromMap(RCTMGLMapView mapView);
}
