package com.mappls.sdk.maps.rctmgl.events;

import android.view.View;

import com.mappls.sdk.maps.rctmgl.events.constants.EventKeys;
import com.mappls.sdk.maps.rctmgl.events.constants.EventTypes;


public class IndoorControlHideEvent extends AbstractEvent {


    public IndoorControlHideEvent(View view) {
        super(view, EventTypes.HIDE_INDOOR_CONTROL);
    }

    @Override
    public String getKey() {
        return EventKeys.HIDE_INDOOR_CONTROL;
    }
}
