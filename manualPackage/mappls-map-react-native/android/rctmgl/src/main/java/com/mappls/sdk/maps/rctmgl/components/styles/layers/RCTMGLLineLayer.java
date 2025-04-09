package com.mappls.sdk.maps.rctmgl.components.styles.layers;

import android.content.Context;

import com.mappls.sdk.maps.style.expressions.Expression;
import com.mappls.sdk.maps.style.layers.LineLayer;
import com.mappls.sdk.maps.rctmgl.components.mapview.RCTMGLMapView;
import com.mappls.sdk.maps.rctmgl.components.styles.RCTMGLStyle;
import com.mappls.sdk.maps.rctmgl.components.styles.RCTMGLStyleFactory;

/**
 * Created by nickitaliano on 9/18/17.
 */

public class RCTMGLLineLayer extends RCTLayer<LineLayer> {
    private String mSourceLayerID;

    public RCTMGLLineLayer(Context context) {
        super(context);
    }

    @Override
    protected void updateFilter(Expression expression) {
        mLayer.setFilter(expression);
    }

    @Override
    public void addToMap(RCTMGLMapView mapView) {
        super.addToMap(mapView);
    }

    @Override
    public LineLayer makeLayer() {
        LineLayer layer = new LineLayer(mID, mSourceID);

        if (mSourceLayerID != null) {
            layer.setSourceLayer(mSourceLayerID);
        }

        return layer;
    }

    @Override
    public void addStyles() {
        RCTMGLStyleFactory.setLineLayerStyle(mLayer, new RCTMGLStyle(getContext(), mReactStyle, mMap));
    }

    public void setSourceLayerID(String sourceLayerID) {
        mSourceLayerID = sourceLayerID;

        if (mLayer != null) {
            mLayer.setSourceLayer(mSourceLayerID);
        }
    }
}
