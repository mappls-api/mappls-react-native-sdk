package com.mappls.sdk.maps.rctmgl.components.annotation;

import android.content.Context;
import android.graphics.PointF;
import android.graphics.Bitmap;
import android.view.View;
import androidx.annotation.NonNull;

import com.mappls.sdk.geojson.Point;
import com.mappls.sdk.maps.geometry.LatLng;
import com.mappls.sdk.maps.Style;
import com.mappls.sdk.plugin.annotation.Symbol;
import com.mappls.sdk.plugin.annotation.SymbolManager;
import com.mappls.sdk.plugin.annotation.SymbolOptions;
import com.mappls.sdk.maps.MapplsMap;
import com.mappls.sdk.maps.rctmgl.components.AbstractMapFeature;
import com.mappls.sdk.maps.rctmgl.components.mapview.RCTMGLMapView;
import com.mappls.sdk.maps.rctmgl.events.PointAnnotationClickEvent;
import com.mappls.sdk.maps.rctmgl.events.PointAnnotationDragEvent;
import com.mappls.sdk.maps.rctmgl.events.constants.EventTypes;
import com.mappls.sdk.maps.rctmgl.utils.GeoJSONUtils;
import com.mappls.sdk.maps.rctmgl.utils.BitmapUtils;

public class RCTMGLPointAnnotation extends AbstractMapFeature implements View.OnLayoutChangeListener {
    private Context mContext;
    private RCTMGLPointAnnotationManager mManager;
    private Symbol mAnnotation;
    private MapplsMap mMap;
    private RCTMGLMapView mMapView;

    private boolean mHasChildren;

    private Point mCoordinate;
    private String mMapplsPin;
    private String mID;
    private String mTitle;
    private String mSnippet;

    private Float[] mAnchor;
    private boolean mIsSelected;
    private boolean mDraggable;

    private View mChildView;
    private Bitmap mChildBitmap;
    private String mChildBitmapId;

    private View mCalloutView;
    private Symbol mCalloutSymbol;
    private Bitmap mCalloutBitmap;
    private String mCalloutBitmapId;

    private static final String MARKER_IMAGE_ID = "MARKER_IMAGE_ID";

    public RCTMGLPointAnnotation(Context context, RCTMGLPointAnnotationManager manager) {
        super(context);
        mContext = context;
        mManager = manager;
    }

    @Override
    public void addView(View childView, int childPosition) {
        if (childView instanceof RCTMGLCallout) {
            mCalloutView = childView;
        } else {
            mChildView = childView;
        }
        childView.addOnLayoutChangeListener(this);
        if (mMapView != null) {
            mMapView.offscreenAnnotationViewContainer().addView(childView);
        }
    }

    @Override
    public void removeView(View childView) {
        if (mChildView != null) {
            mMap.getStyle(new Style.OnStyleLoaded() {
                @Override
                public void onStyleLoaded(@NonNull Style style) {
                    style.removeImage(mChildBitmapId);
                    mChildView = null;
                    mCalloutView = null;
                    mChildBitmap = null;
                    mChildBitmapId = null;
                    updateOptions();
                }
            });
        }
        if (mMapView != null) {
            mMapView.offscreenAnnotationViewContainer().removeView(childView);
        }
    }

    @Override
    public void addToMap(RCTMGLMapView mapView) {
        mMapView = mapView;
        mMap = mapView.getMapplsMap();
        makeMarker();

        if (mChildView != null) {
            if (!mChildView.isAttachedToWindow()) {
                mMapView.offscreenAnnotationViewContainer().addView(mChildView);
            }
            addBitmapToStyle(mChildBitmap, mChildBitmapId);
            updateOptions();
        }
        if (mCalloutView != null) {
            if (!mCalloutView.isAttachedToWindow()) {
                mMapView.offscreenAnnotationViewContainer().addView(mCalloutView);
            }
            addBitmapToStyle(mCalloutBitmap, mCalloutBitmapId);
        }
    }

    @Override
    public void removeFromMap(RCTMGLMapView mapView) {
        RCTMGLMapView map = (mMapView != null) ? mMapView : mapView;
        if (map == null) {
            return;
        }

        if (mAnnotation != null) {
            map.getSymbolManager().clear(mAnnotation);
        }
        if (mChildView != null) {
            map.offscreenAnnotationViewContainer().removeView(mChildView);
        }
        if (mCalloutView != null) {
            map.offscreenAnnotationViewContainer().removeView(mCalloutView);
        }
    }

    @Override
    public void onLayoutChange(View v, int left, int top, int right, int bottom, int oldLeft, int oldTop,
            int oldRight, int oldBottom) {
        if (left == 0 && top == 0 && right == 0 && bottom == 0) {
            return;
        }
        if (left != oldLeft || right != oldRight || top != oldTop || bottom != oldBottom) {
            refreshBitmap(v, left, top, right, bottom);
        }
    }

    private void refreshBitmap(View v, int left, int top, int right, int bottom) {
        Bitmap bitmap = BitmapUtils.viewToBitmap(v, left, top, right, bottom);
        String bitmapId = Integer.toString(v.getId());
        addBitmapToStyle(bitmap, bitmapId);
        if (v instanceof RCTMGLCallout) {
            mCalloutBitmap = bitmap;
            mCalloutBitmapId = bitmapId;
        } else {
            if (bitmap != null) {
                mChildBitmap = bitmap;
                mChildBitmapId = bitmapId;
                updateOptions();
            }
        }
    }

    private void refreshBitmap(View v) {
        refreshBitmap(v, v.getLeft(), v.getTop(), v.getRight(), v.getBottom());
    }

    public LatLng getLatLng() {
        return GeoJSONUtils.toLatLng(mCoordinate);
    }

    public long getMapboxID() {
        return mAnnotation == null ? -1 : mAnnotation.getId();
    }

    public String getID() {
        return mID;
    }

    public void setID(String id) {
        mID = id;
    }

    public View getCalloutView() {
        return mCalloutView;
    }

    public void setMapplsPin(String mapplsPin) {
        if(mapplsPin == null) {
            return;
        }
        mCoordinate = null;
        mMapplsPin = mapplsPin;
        if (mAnnotation != null) {
            mAnnotation.setMapplsPin(mapplsPin);
            mMapView.getSymbolManager().update(mAnnotation);
        }
        if (mCalloutSymbol != null) {
            mCalloutSymbol.setMapplsPin(mapplsPin);
            mMapView.getSymbolManager().update(mCalloutSymbol);
        }
    }
    public void setCoordinate(Point point) {
        if(point == null) {
            return;
        }
        mCoordinate = point;
        mMapplsPin = null;

        if (mAnnotation != null) {
            mAnnotation.setPosition(GeoJSONUtils.toLatLng(point));
            mMapView.getSymbolManager().update(mAnnotation);
        }
        if (mCalloutSymbol != null) {
            mCalloutSymbol.setPosition(GeoJSONUtils.toLatLng(point));
            mMapView.getSymbolManager().update(mCalloutSymbol);
        }
    }

    public void setAnchor(float x, float y) {
        mAnchor = new Float[]{x, y};

        if (mAnnotation != null) {
            updateAnchor();
            mMapView.getSymbolManager().update(mAnnotation);
        }
    }

    public void setDraggable(Boolean draggable) {
        mDraggable = draggable;
        if (mAnnotation != null) {
            mAnnotation.setDraggable(draggable);
            mMapView.getSymbolManager().update(mAnnotation);
        }
    }

    public Symbol getMarker() {
        return mAnnotation;
    }

    public void onSelect(boolean shouldSendEvent) {
        if (mCalloutView != null) {
            makeCallout();
        }
        if (shouldSendEvent) {
            mManager.handleEvent(makeEvent(true));
        }
    }

    public void onDeselect() {
        mManager.handleEvent(makeEvent(false));
        if (mCalloutSymbol != null) {
            mMapView.getSymbolManager().clear(mCalloutSymbol);
        }
    }

    public void onDragStart() {
        LatLng latLng = mAnnotation.getPosition();
        if(latLng != null) {
            mCoordinate = Point.fromLngLat(latLng.getLongitude(), latLng.getLatitude());
        }
        mManager.handleEvent(makeDragEvent(EventTypes.ANNOTATION_DRAG_START));
    }

    public void onDrag() {
        LatLng latLng = mAnnotation.getPosition();
        mCoordinate = Point.fromLngLat(latLng.getLongitude(), latLng.getLatitude());
        mManager.handleEvent(makeDragEvent(EventTypes.ANNOTATION_DRAG));
    }

    public void onDragEnd() {
        LatLng latLng = mAnnotation.getPosition();
        mCoordinate = Point.fromLngLat(latLng.getLongitude(), latLng.getLatitude());
        mManager.handleEvent(makeDragEvent(EventTypes.ANNOTATION_DRAG_END));
    }

    public void makeMarker() {
        SymbolOptions options = new SymbolOptions()
            .draggable(mDraggable)
            .iconSize(1.0f)
            .symbolSortKey(10.0f);
        if(mCoordinate != null) {
            options.geometry(mCoordinate);
        } else {
            options.mapplsPin(mMapplsPin);
        }
        SymbolManager symbolManager = mMapView.getSymbolManager();
        if (symbolManager != null) {
            mAnnotation = symbolManager.create(options);
            updateOptions();
        }
    }

    private void updateOptions() {
        if (mAnnotation != null) {
            updateIconImage();
            updateAnchor();
            mMapView.getSymbolManager().update(mAnnotation);
        }
    }

    private void updateIconImage() {
        if (mChildView != null) {
            if (mChildBitmapId != null) {
                mAnnotation.setIconImage(mChildBitmapId);
            }
        } else {
            mAnnotation.setIconImage(MARKER_IMAGE_ID);
            mAnnotation.setIconAnchor("bottom");
        }
    }

    private void updateAnchor() {
        if (mAnchor != null && mChildView != null && mChildBitmap != null) {
            int w = mChildBitmap.getWidth();
            int h = mChildBitmap.getHeight();
            final float scale = getResources().getDisplayMetrics().density;
            w = (int) (w / scale);
            h = (int) (h / scale);
            mAnnotation.setIconAnchor("top-left");
            mAnnotation.setIconOffset(new PointF(w * mAnchor[0] * -1, h * mAnchor[1] * -1));
        }
    }

    private void makeCallout() {
        float yOffset = -28f;
        if (mChildView != null) {
            if (mChildBitmap != null) {
                float scale = getResources().getDisplayMetrics().density;
                int h = (int) mChildBitmap.getHeight() / 2;
                h = (int) (h / scale);
                yOffset = (float) h * -1;
            }
        }
        SymbolOptions options = new SymbolOptions()
            .icon(mCalloutBitmapId)
            .iconSize(1.0f)
            .iconAnchor("bottom")
            .iconOffset(new Float[] {0f, yOffset})
            .symbolSortKey(11.0f)
            .draggable(false);
        if(mCoordinate != null) {
            options.geometry(mCoordinate);
        } else {
            options.mapplsPin(mMapplsPin);
        }
        SymbolManager symbolManager = mMapView.getSymbolManager();
        if (symbolManager != null) {
            mCalloutSymbol = symbolManager.create(options);
        }
    }

    private void addBitmapToStyle(final Bitmap bitmap, final String bitmapId) {
        if (mMap != null && bitmapId != null && bitmap != null) {
            mMap.getStyle(new Style.OnStyleLoaded() {
                @Override
                public void onStyleLoaded(@NonNull Style style) {
                    style.addImage(bitmapId, bitmap);
                }
            });
        }
    }

    private PointAnnotationClickEvent makeEvent(boolean isSelect) {
        String type = isSelect ? EventTypes.ANNOTATION_SELECTED : EventTypes.ANNOTATION_DESELECTED;
        LatLng latLng = GeoJSONUtils.toLatLng(mCoordinate);
        PointF screenPos;
        if(latLng != null) {
            screenPos = getScreenPosition(latLng);
        } else {
            screenPos = getScreenPosition();
        }
        return new PointAnnotationClickEvent(this, latLng, screenPos, type);
    }

    private PointAnnotationDragEvent makeDragEvent(String type) {
        LatLng latLng = GeoJSONUtils.toLatLng(mCoordinate);
        PointF screenPos;
        if(latLng != null) {
            screenPos = getScreenPosition(latLng);
        } else {
            screenPos = getScreenPosition();
        }
        return new PointAnnotationDragEvent(this, latLng, screenPos, type);
    }

    private float getDisplayDensity() {
        return mContext.getResources().getDisplayMetrics().density;
    }

    private PointF getScreenPosition() {
        int[] loc = new int[2];
        getLocationOnScreen(loc);
        return new PointF((float) loc[0], (float) loc[1]);
    }

    private PointF getScreenPosition(LatLng latLng) {
        PointF screenPos = mMap.getProjection().toScreenLocation(latLng);
        float density = getDisplayDensity();
        screenPos.x /= density;
        screenPos.y /= density;
        return screenPos;
    }

    public void refresh() {
        if (mChildView != null) {
            refreshBitmap(mChildView);
        }
    }
}
