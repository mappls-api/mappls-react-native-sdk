package com.mappls.sdk.maps.rctmgl.components.annotation;

import androidx.annotation.NonNull;


import com.mappls.sdk.maps.MapView;
import com.mappls.sdk.maps.MapplsMap;

import java.util.ArrayList;
import java.util.List;

/**
 * Subclass of MarkerViewManager implementing removeViews and restoreViews
 */
public class MarkerViewManager extends com.mappls.sdk.plugin.markerview.MarkerViewManager {
    private final List<MarkerView> markers = new ArrayList<>();
    private MapView mapView;

    public MarkerViewManager(MapView mapView, MapplsMap mapplsMap) {
        super(mapView, mapplsMap);
        this.mapView = mapView;
        // this.mapplsMap = mapplsMap;
    }

    public void addMarker(@NonNull MarkerView markerView) {
        super.addMarker(markerView);
        markers.add(markerView);
    }

    public void removeMarker(@NonNull MarkerView markerView) {
        super.removeMarker(markerView);
        markers.remove(markerView);
    }

    public void removeViews() {
        for (MarkerView marker: markers) {
            mapView.removeView(marker.getView());
        }
    }

    public void restoreViews() {
        for (MarkerView marker: markers) {
            mapView.addView(marker.getView());
        }
    }
}