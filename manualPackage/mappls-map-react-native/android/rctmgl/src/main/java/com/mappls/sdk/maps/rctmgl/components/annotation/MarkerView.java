package com.mappls.sdk.maps.rctmgl.components.annotation;

import android.view.View;

import androidx.annotation.NonNull;

import com.mappls.sdk.maps.geometry.LatLng;


/**
 * Subclass of MarkerView so we MarkerViewManager can implement remove/restoreViews
 */
public class MarkerView extends com.mappls.sdk.plugin.markerview.MarkerView {
    View view;

    public MarkerView(@NonNull LatLng latLng, @NonNull View view) {
        super(latLng, view);
        this.view = view;
    }

    public View getView() {
        return this.view;
    }
}
