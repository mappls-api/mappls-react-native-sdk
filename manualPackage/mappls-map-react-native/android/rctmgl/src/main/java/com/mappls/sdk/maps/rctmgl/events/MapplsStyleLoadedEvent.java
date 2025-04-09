package com.mappls.sdk.maps.rctmgl.events;

import android.view.View;

import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.mappls.sdk.maps.rctmgl.events.constants.EventKeys;
import com.mappls.sdk.maps.rctmgl.events.constants.EventTypes;
import com.mappls.sdk.maps.style.model.MapplsStyle;

import java.util.List;

/**
 * * Created by Saksham on 21-06-2021.
 **/
public class MapplsStyleLoadedEvent extends AbstractEvent {

    List<MapplsStyle> mapplsStyles;

    public MapplsStyleLoadedEvent(View view, List<MapplsStyle> mapplsStyles) {
        super(view, EventTypes.DID_LOADED_MAPPLS_MAP_STYLES);
        this.mapplsStyles = mapplsStyles;
    }

    @Override
    public String getKey() {
        return EventKeys.MAP_STYLE_LOADED;
    }

    @Override
    public WritableMap getPayload() {
        WritableArray array = new WritableNativeArray();
        if(mapplsStyles != null) {
            for(MapplsStyle style: mapplsStyles) {
                WritableMap styleMap = new WritableNativeMap();
                styleMap.putString("name", style.getName());
                styleMap.putString("imageUrl", style.getImageUrl());
                styleMap.putString("displayName", style.getDisplayName());
                styleMap.putString("description", style.getDescription());
                array.pushMap(styleMap);
            }
        }
        WritableMap map = new WritableNativeMap();
        map.putArray("mappls_styles", array);
        return map;
    }
}
