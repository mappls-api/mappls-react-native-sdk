package com.mappls.sdk.maps.rctmgl.events;

import android.graphics.PointF;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.mappls.sdk.maps.rctmgl.components.annotation.RCTMGLPointAnnotation;
import com.mappls.sdk.maps.rctmgl.events.constants.EventKeys;
import com.mappls.sdk.maps.rctmgl.events.constants.EventTypes;
import com.mappls.sdk.maps.rctmgl.utils.ConvertUtils;
import com.mappls.sdk.maps.rctmgl.utils.GeoJSONUtils;
import com.mappls.sdk.maps.geometry.LatLng;

/**
 * Created by nickitaliano on 10/11/17.
 */

public class PointAnnotationClickEvent extends MapClickEvent {
    private RCTMGLPointAnnotation mView;
    private LatLng mTouchedLatLng;
    private PointF mScreenPoint;

    public PointAnnotationClickEvent(RCTMGLPointAnnotation view, @NonNull LatLng latLng, @NonNull PointF screenPoint, String eventType) {
        super(view, latLng, screenPoint, eventType);
        mView = view;
        mTouchedLatLng = latLng;
        mScreenPoint = screenPoint;
    }

    @Override
    public String getKey() {
        return getType().equals(EventTypes.ANNOTATION_SELECTED) ? EventKeys.POINT_ANNOTATION_SELECTED : EventKeys.POINT_ANNOTATION_DESELECTED;
    }

    @Override
    public WritableMap getPayload() {
        WritableMap properties = new WritableNativeMap();
        properties.putString("id", mView.getID());
        properties.putDouble("screenPointX", mScreenPoint.x);
        properties.putDouble("screenPointY", mScreenPoint.y);
        if(mTouchedLatLng != null) {
            return GeoJSONUtils.toPointFeature(mTouchedLatLng, properties);
        }

        return properties;
    }
}
