package com.mappls.sdk.maps.rctmgl.events;

import android.view.View;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.mappls.sdk.maps.rctmgl.events.constants.EventKeys;
import com.mappls.sdk.maps.rctmgl.events.constants.EventTypes;

public class MapReinitEvent extends AbstractEvent{

    private long reinitAfter;
    private int code;
    private String message;

    public MapReinitEvent(View view, long reinitAfter, int code, String message) {
        super(view, EventTypes.WILL_REINIT_MAP);
        this.reinitAfter = reinitAfter;
        this.code = code;
        this.message = message;
    }

    @Override
    public String getKey() {
        return EventKeys.MAP_REINIT;
    }

    @Override
    public WritableMap getPayload() {
        WritableMap properties = new WritableNativeMap();
        properties.putInt("reinitAfter", (int)reinitAfter);
        properties.putInt("code", code);
        properties.putString("message", message);
        return properties;
    }
}
