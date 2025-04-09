package com.mappls.sdk.maps.rctmgl.events;

import android.view.View;

import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.mappls.sdk.maps.rctmgl.events.constants.EventKeys;
import com.mappls.sdk.maps.rctmgl.events.constants.EventTypes;

public class MapplsPlaceClickEvent extends AbstractEvent {

    private String mapplsPin;

    public MapplsPlaceClickEvent(View view, String mapplsPin) {
        super(view, EventTypes.MAP_CLICK);
        this.mapplsPin = mapplsPin;
    }

    @Override
    public String getKey() {
        return EventKeys.MAP_PLACE_CLICK;
    }

    @Override
    public WritableMap getPayload() {
        WritableMap map = new WritableNativeMap();
        if (mapplsPin != null) {
            map.putString("mapplsPin", mapplsPin);
        }
        return map;
    }
}
