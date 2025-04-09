package com.mappls.sdk.maps.rctmgl.components.geoAnalytics;

import android.content.Context;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.mappls.sdk.geoanalytics.GeoAnalyticsAppearanceOption;
import com.mappls.sdk.geoanalytics.MapplsGeoAnalyticsRequest;
import com.mappls.sdk.geoanalytics.MapplsGeoAnalyticsType;
import com.mappls.sdk.maps.rctmgl.components.AbstractMapFeature;
import com.mappls.sdk.maps.rctmgl.components.mapview.RCTMGLMapView;

import java.util.ArrayList;
import java.util.List;

public class RCTMGLGeoAnalytics extends AbstractMapFeature {

    private RCTMGLMapView mapView;
    ArrayList<LayerRequest> layerRequests = new ArrayList<>();
    List<MapplsGeoAnalyticsRequest> nativeRequest = new ArrayList<>();
    private String geoBoundType = null;
    private MapplsGeoAnalyticsType showGeoAnalytics = null;




    public RCTMGLGeoAnalytics(Context context) {
        super(context);
    }

    @Override
    public void addView(View child, int index) {
        super.addView(child, index);
    }

    @Override
    public void removeView(View view) {
        super.removeView(view);
    }

    @Override
    public void addToMap(RCTMGLMapView mapView) {
      this.mapView = mapView;
      setupGeoAnalytics();
    }

    @Override
    public void removeFromMap(RCTMGLMapView mapView) {
        removeGeoAnalytics(showGeoAnalytics);
    }


    private void setupGeoAnalytics(){

        for (int i =0; i<layerRequests.size();i++){
            MapplsGeoAnalyticsRequest.Builder mRequestBuilder =  MapplsGeoAnalyticsRequest.builder();
            LayerRequest mRequest = layerRequests.get(i);

            if (mRequest.getAttribute()!=null){
            mRequestBuilder.attribute(mRequest.getAttribute());
        }
        if (mRequest.getGeoBound()!=null){
            mRequestBuilder.geoBound(mRequest.getGeoBound());
        }
        if (geoBoundType!=null){
            mRequestBuilder.geoboundType(geoBoundType);
        }
        if (mRequest.getPropertyNames()!=null){
            mRequestBuilder.propertyNames(mRequest.getPropertyNames());
        }
        if (mRequest.getQuery()!=null){
            mRequestBuilder.query(mRequest.getQuery());
        }

        if (mRequest.getStyleRequest()!= null){
            mRequestBuilder.style(setUpGeoAnalyticsStyle(mRequest.getStyleRequest()));
        }

        nativeRequest.add(mRequestBuilder.build());

        }
        if (showGeoAnalytics!=null){
            mapView.getGeoAnalyticsPlugin().showGeoAnalytics(showGeoAnalytics, nativeRequest);
        }
    }


    private GeoAnalyticsAppearanceOption setUpGeoAnalyticsStyle(StyleRequest styleRequest){
        GeoAnalyticsAppearanceOption styleOptions = new GeoAnalyticsAppearanceOption();
        if(styleRequest.getLabelColor() != null){
            styleOptions.labelColor(styleRequest.getLabelColor());
        }

        if(styleRequest.getLabelSize()!=null){
            styleOptions.labelSize(styleRequest.getLabelSize());
        }

        if(styleRequest.getFillColor() != null){
            styleOptions.fillColor(styleRequest.getFillColor());
        }
        if(styleRequest.getPointSize() != null){
            styleOptions.pointSize(styleRequest.getPointSize());
        }

        if(styleRequest.getStrokeColor()!=null){
            styleOptions.strokeColor(styleRequest.getStrokeColor());
        }

        if(styleRequest.getStrokeWidth()!=null){
            styleOptions.strokeWidth(styleRequest.getStrokeWidth());
        }

        if(styleRequest.getFillOpacity()!=null){
            styleOptions.fillOpacity(styleRequest.getFillOpacity());
        }
       return styleOptions;
    }

    public void showGeoAnalytics(MapplsGeoAnalyticsType type){
        this.showGeoAnalytics = type;
    }

    public void removeGeoAnalytics(MapplsGeoAnalyticsType type){
        mapView.getGeoAnalyticsPlugin().removeGeoAnalytics(type);
    }

    public void  setLayerRequest(ReadableArray request){
     for (int i =0;i<request.size();i++){
       ReadableMap mLayerRequest =   request.getMap(i);
       String attribute = mLayerRequest.getString("attribute");
       String query = mLayerRequest.getString("query");
       ReadableArray  mGeoBounds = mLayerRequest.isNull("geoBound")?Arguments.createArray(): mLayerRequest.getArray("geoBound");
       String [] geoBounds = new String[mGeoBounds.size()];

         for (int j=0;j<mGeoBounds.size();j++){
             geoBounds[j] = mGeoBounds.getString(j);
         }

         ReadableArray  mPropertyNames = mLayerRequest.isNull("propertyNames")?Arguments.createArray(): mLayerRequest.getArray("propertyNames");
         String [] propertyNames = new String[mPropertyNames.size()];

         for (int j=0;j<mPropertyNames.size();j++){
             propertyNames[j] = mPropertyNames.getString(j);
         }

          ReadableMap mStyles = mLayerRequest.getMap("styles");
          String labelColor = mStyles.getString("labelColor");
          String fillColor = mStyles.getString("fillColor");
          String  strokeColor = mStyles.getString("strokeColor");
          Integer pointSize = mStyles.hasKey("pointSize")? mStyles.getInt("pointSize"): 1;
          Integer labelSize = mStyles.hasKey("labelSize")? mStyles.getInt("labelSize"):null;
          Double strokeWidth =mStyles.hasKey("strokeWidth") ? mStyles.getDouble("strokeWidth"):null;
          Double fillOpacity = mStyles.hasKey("fillOpacity") ? mStyles.getDouble("fillOpacity") :null;

         StyleRequest mStyle = new StyleRequest();
         mStyle.setLabelColor(labelColor);
         mStyle.setLabelSize(labelSize);
         mStyle.setFillColor(fillColor);
         mStyle.setPointSize(pointSize);
         mStyle.setStrokeColor(strokeColor);
         mStyle.setStrokeWidth(strokeWidth);
         mStyle.setFillOpacity(fillOpacity);


         LayerRequest mRequest = new LayerRequest();
         mRequest.setAttribute(attribute);
         mRequest.setQuery(query);
         mRequest.setGeoBound(geoBounds);
         mRequest.setPropertyNames(propertyNames);
         mRequest.setStyleRequest(mStyle);

       layerRequests.add(mRequest);
     }

    }
    public void  setGeoboundType(String geoboundType){
        this.geoBoundType = geoboundType;
    }

}
