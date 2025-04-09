package com.mappls.sdk.maps.rctmgl.events;

import android.view.View;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.mappls.sdk.maps.rctmgl.events.constants.EventKeys;
import com.mappls.sdk.maps.rctmgl.events.constants.EventTypes;

/**
 * Created by Saksham on 08-02-2021
 */

public class MapErrorEvent extends AbstractEvent {

    private int code;
    private String message;

    public MapErrorEvent(View view, int code, String message) {
        super(view, EventTypes.DID_FAIL_LOADING_MAP);
        this.code = code;
        this.message = message;
    }

    @Override
    public String getKey() {
        return EventKeys.MAP_ERROR;
    }

    @Override
    public WritableMap getPayload() {
        WritableMap properties = new WritableNativeMap();
        properties.putInt("code", code);
        properties.putString("message", message);
        return properties;
    }
}
