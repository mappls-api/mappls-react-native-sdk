package com.mappls.sdk.maps.rctmgl.events;

import android.graphics.PointF;
import androidx.annotation.NonNull;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import com.mappls.sdk.geoanalytics.MapplsGeoAnalyticsDetail;
import com.mappls.sdk.maps.rctmgl.events.constants.EventKeys;
import com.mappls.sdk.maps.rctmgl.events.constants.EventTypes;
import com.mappls.sdk.maps.geometry.LatLng;

import java.util.List;
import java.util.Map;

/**
 * Created by nickitaliano on 8/23/17.
 */

public class GeoAnalyticsClickEvent extends AbstractEvent {
    private List<MapplsGeoAnalyticsDetail> list;

    public GeoAnalyticsClickEvent(View view,List<MapplsGeoAnalyticsDetail> list) {
        super(view, EventTypes.GEO_ANALYTICS_LAYER_PRESS);
        this.list = list;
    }

//    public MapClickEvent(View view, @NonNull LatLng latLng, @NonNull PointF screenPoint) {
//        this(view, latLng, screenPoint, EventTypes.MAP_CLICK);
//    }
//
//    public MapClickEvent(View view, @NonNull LatLng latLng, @NonNull PointF screenPoint, String eventType) {
//        super(view, eventType);
//        mTouchedLatLng = latLng;
//        mScreenPoint = screenPoint;
//    }

    @Override
    public String getKey() {
        String eventType = getType();

        if (eventType.equals(EventTypes.GEO_ANALYTICS_LAYER_PRESS)) {
            return EventKeys.GEO_ANALYTICS_LAYER_PRESS;
        }

        return EventKeys.GEO_ANALYTICS_LAYER_PRESS;
    }

    @Override
    public WritableMap getPayload() {
        WritableMap properties = new WritableNativeMap();

        WritableArray features = Arguments.createArray();

        for (MapplsGeoAnalyticsDetail detail: list){
            WritableMap feature = new WritableNativeMap();
            feature.putString("type",detail.getType());
            //feature.putString("id",detail.getId());


            WritableMap propertiesMap = Arguments.createMap();
            for (String key: detail.getProperties().keySet() ){
              propertiesMap.putString(key,detail.getProperties().get(key).toString());
            }

            feature.putMap("properties", propertiesMap);
            features.pushMap(feature);
        }

        properties.putArray("results",features);
        return properties;
    }
}

