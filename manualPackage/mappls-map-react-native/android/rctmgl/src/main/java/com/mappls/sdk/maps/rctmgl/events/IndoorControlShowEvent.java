package com.mappls.sdk.maps.rctmgl.events;

import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.mappls.sdk.maps.rctmgl.events.constants.EventKeys;
import com.mappls.sdk.maps.rctmgl.events.constants.EventTypes;

public class IndoorControlShowEvent extends AbstractEvent{

    private int initialFloor;
    private int selectedFloor;
    private int floors;

    public IndoorControlShowEvent(View view, int initialFloor, int selectedFloor, int floors) {
        super(view, EventTypes.SHOW_INDOOR_CONTROL);
        this.initialFloor = initialFloor;
        this.selectedFloor = selectedFloor;
        this.floors = floors;
    }

    @Override
    public String getKey() {
        return EventKeys.SHOW_INDOOR_CONTROL;
    }

    @Override
    public WritableMap getPayload() {
        WritableMap payload = Arguments.createMap();
        payload.putInt("initialFloor", initialFloor);
        payload.putInt("selectedFloor", selectedFloor);
        payload.putInt("floors", floors);
        return payload;
    }
}
