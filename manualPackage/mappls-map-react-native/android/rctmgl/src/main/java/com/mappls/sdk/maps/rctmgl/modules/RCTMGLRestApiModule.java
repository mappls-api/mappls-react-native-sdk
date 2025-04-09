package com.mappls.sdk.maps.rctmgl.modules;

import android.annotation.SuppressLint;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.module.annotations.ReactModule;
import com.google.gson.Gson;
import com.mappls.sdk.geoanalytics.MapplsGeoAnalyticsType;
import com.mappls.sdk.geoanalytics.listing.MapplsGeoAnalyticsList;
import com.mappls.sdk.geoanalytics.listing.MapplsGeoAnalyticsListManager;
import com.mappls.sdk.geoanalytics.listing.model.GeoAnalyticsListResponse;
import com.mappls.sdk.geojson.Point;
import com.mappls.sdk.services.api.OnResponseCallback;
import com.mappls.sdk.services.api.PlaceResponse;
import com.mappls.sdk.services.api.alongroute.MapplsPOIAlongRoute;
import com.mappls.sdk.services.api.alongroute.MapplsPOIAlongRouteManager;
import com.mappls.sdk.services.api.alongroute.POICriteria;
import com.mappls.sdk.services.api.alongroute.models.POIAlongRouteResponse;
import com.mappls.sdk.services.api.autosuggest.AutoSuggestCriteria;
import com.mappls.sdk.services.api.autosuggest.MapplsAutoSuggest;
import com.mappls.sdk.services.api.autosuggest.MapplsAutosuggestManager;
import com.mappls.sdk.services.api.autosuggest.model.AutoSuggestAtlasResponse;
import com.mappls.sdk.services.api.costestimation.MapplsCostEstimation;
import com.mappls.sdk.services.api.costestimation.MapplsCostEstimationManager;
import com.mappls.sdk.services.api.costestimation.model.CostEstimationResponse;
import com.mappls.sdk.services.api.directions.DirectionsCriteria;
import com.mappls.sdk.services.api.directions.MapplsDirectionManager;
import com.mappls.sdk.services.api.directions.MapplsDirections;
import com.mappls.sdk.services.api.directions.models.DirectionsResponse;
import com.mappls.sdk.services.api.directions.models.DirectionsRoute;
import com.mappls.sdk.services.api.directions.models.RouteOptions;
import com.mappls.sdk.services.api.directions.predictive.MapplsDirectionDateTimeCurrent;
import com.mappls.sdk.services.api.directions.predictive.MapplsDirectionDateTimeSpecified;
import com.mappls.sdk.services.api.directionsrefresh.MapplsDirectionsRefresh;
import com.mappls.sdk.services.api.directionsrefresh.MapplsDirectionsRefreshManager;
import com.mappls.sdk.services.api.distance.MapplsDistanceMatrix;
import com.mappls.sdk.services.api.distance.MapplsDistanceMatrixManager;
import com.mappls.sdk.services.api.distance.models.DistanceResponse;
import com.mappls.sdk.services.api.event.catmaster.MapplsCategoryMaster;
import com.mappls.sdk.services.api.event.catmaster.MapplsCategoryMasterManager;
import com.mappls.sdk.services.api.event.catmaster.model.ReportMasterResponse;
import com.mappls.sdk.services.api.event.nearby.MapplsNearbyReport;
import com.mappls.sdk.services.api.event.nearby.MapplsNearbyReportManager;
import com.mappls.sdk.services.api.event.nearby.model.NearbyReportResponse;
import com.mappls.sdk.services.api.event.route.MapplsRouteSummary;
import com.mappls.sdk.services.api.event.route.MapplsRouteSummaryManager;
import com.mappls.sdk.services.api.event.route.model.RouteReportSummaryResponse;
import com.mappls.sdk.services.api.feedback.MapplsFeedback;
import com.mappls.sdk.services.api.feedback.MapplsFeedbackManager;
import com.mappls.sdk.services.api.fuleCost.MapplsFuelCost;
import com.mappls.sdk.services.api.fuleCost.MapplsFuelCostManager;
import com.mappls.sdk.services.api.fuleCost.models.FuelCostResponse;
import com.mappls.sdk.services.api.generateotp.MapplsGenerateOTP;
import com.mappls.sdk.services.api.generateotp.MapplsGenerateOtpManager;
import com.mappls.sdk.services.api.geocoding.GeoCodeResponse;
import com.mappls.sdk.services.api.geocoding.GeoCodingCriteria;
import com.mappls.sdk.services.api.geocoding.MapplsGeoCoding;
import com.mappls.sdk.services.api.geocoding.MapplsGeoCodingManager;
import com.mappls.sdk.services.api.hateaosnearby.MapplsHateosNearby;
import com.mappls.sdk.services.api.hateaosnearby.MapplsHateosNearbyManager;
import com.mappls.sdk.services.api.nearby.MapplsNearby;
import com.mappls.sdk.services.api.nearby.MapplsNearbyManager;
import com.mappls.sdk.services.api.nearby.NearbyCriteria;
import com.mappls.sdk.services.api.nearby.model.NearbyAtlasResponse;
import com.mappls.sdk.services.api.placedetail.MapplsPlaceDetail;
import com.mappls.sdk.services.api.placedetail.MapplsPlaceDetailManager;
import com.mappls.sdk.services.api.placedetail.model.PlaceDetailResponse;
import com.mappls.sdk.services.api.reversegeocode.MapplsReverseGeoCode;
import com.mappls.sdk.services.api.reversegeocode.MapplsReverseGeoCodeManager;
import com.mappls.sdk.services.api.session.SessionCriteria;
import com.mappls.sdk.services.api.session.devicelist.MapplsClusterLinkedDevices;
import com.mappls.sdk.services.api.session.devicelist.MapplsClusterLinkedDevicesManager;
import com.mappls.sdk.services.api.session.devicelist.model.Device;
import com.mappls.sdk.services.api.session.endsession.MapplsEndSession;
import com.mappls.sdk.services.api.session.endsession.MapplsEndSessionManager;
import com.mappls.sdk.services.api.session.removedevice.MapplsDeleteClusterLinkedDevice;
import com.mappls.sdk.services.api.session.removedevice.MapplsDeleteClusterLinkedDeviceManager;
import com.mappls.sdk.services.api.textsearch.MapplsTextSearch;
import com.mappls.sdk.services.api.textsearch.MapplsTextSearchManager;
import com.mappls.sdk.services.api.traffic.MapplsRoadTrafficDetail;
import com.mappls.sdk.services.api.traffic.MapplsRoadTrafficDetailManager;
import com.mappls.sdk.services.api.traffic.model.TrafficRoadDetailResponse;
import com.mappls.sdk.services.api.transit.MapplsTransitPlanner;
import com.mappls.sdk.services.api.transit.MapplsTransitPlannerManager;
import com.mappls.sdk.services.api.transit.model.TransitPlannerResponse;
import com.mappls.sdk.services.api.tripoptimisation.MapplsTripOptimisation;
import com.mappls.sdk.services.api.tripoptimisation.MapplsTripOptimisationManager;
import com.mappls.sdk.services.api.tripoptimisation.model.TripOptimisationResponse;
import com.mappls.sdk.services.api.weather.MapplsWeather;
import com.mappls.sdk.services.api.weather.MapplsWeatherManager;
import com.mappls.sdk.services.api.weather.model.WeatherResponse;
import com.mappls.sdk.services.api.whitelist.MapplsWhitelist;
import com.mappls.sdk.services.api.whitelist.MapplsWhitelistManager;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@ReactModule(name = RCTMGLRestApiModule.REACT_CLASS)
public class RCTMGLRestApiModule extends ReactContextBaseJavaModule {

    static final String REACT_CLASS = "RCTMGLRestApiModule";
    static final String REQUIRED_CODE = "REQUIRED PARAMETER";
    public RCTMGLRestApiModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {

        Map<String, Object> autosuggestConstants = new HashMap<>();
        autosuggestConstants.put("POD_CITY", AutoSuggestCriteria.POD_CITY);
        autosuggestConstants.put("POD_DISTRICT", AutoSuggestCriteria.POD_DISTRICT);
        autosuggestConstants.put("POD_LOCALITY", AutoSuggestCriteria.POD_LOCALITY);
        autosuggestConstants.put("POD_STATE", AutoSuggestCriteria.POD_STATE);
        autosuggestConstants.put("POD_SUB_DISTRICT", AutoSuggestCriteria.POD_SUB_DISTRICT);
        autosuggestConstants.put("POD_SUB_LOCALITY", AutoSuggestCriteria.POD_SUB_LOCALITY);
        autosuggestConstants.put("POD_SUB_SUB_LOCALITY", AutoSuggestCriteria.POD_SUB_SUB_LOCALITY);
        autosuggestConstants.put("POD_VILLAGE", AutoSuggestCriteria.POD_VILLAGE);
        autosuggestConstants.put("POD_POI", AutoSuggestCriteria.POD_POI);

        Map<String, Object> geoCodeConstants = new HashMap<>();
        geoCodeConstants.put("BIAS_DEFAULT", GeoCodingCriteria.BIAS_DEFAULT);
        geoCodeConstants.put("BIAS_RURAL", GeoCodingCriteria.BIAS_RURAL);
        geoCodeConstants.put("BIAS_URBAN", GeoCodingCriteria.BIAS_URBAN);

        geoCodeConstants.put("POD_CITY", GeoCodingCriteria.POD_CITY);
        geoCodeConstants.put("POD_DISTRICT", GeoCodingCriteria.POD_DISTRICT);
        geoCodeConstants.put("POD_HOUSE_NAME", GeoCodingCriteria.POD_HOUSE_NAME);
        geoCodeConstants.put("POD_HOUSE_NUMBER", GeoCodingCriteria.POD_HOUSE_NUMBER);
        geoCodeConstants.put("POD_LOCALITY", GeoCodingCriteria.POD_LOCALITY);
        geoCodeConstants.put("POD_PINCODE", GeoCodingCriteria.POD_PINCODE);
        geoCodeConstants.put("POD_POI", GeoCodingCriteria.POD_POINT_OF_INTEREST);
        geoCodeConstants.put("POD_STATE", GeoCodingCriteria.POD_STATE);
        geoCodeConstants.put("POD_STREET", GeoCodingCriteria.POD_STREET);
        geoCodeConstants.put("POD_SUB_DISTRICT", GeoCodingCriteria.POD_SUB_DISTRICT);
        geoCodeConstants.put("POD_SUB_LOCALITY", GeoCodingCriteria.POD_SUB_LOCALITY);
        geoCodeConstants.put("POD_SUB_SUB_LOCALITY", GeoCodingCriteria.POD_SUB_SUB_LOCALITY);
        geoCodeConstants.put("POD_VILLAGE", GeoCodingCriteria.POD_VILLAGE);

        Map<String, Object> nearbyConstants = new HashMap<>();
        nearbyConstants.put("DISTANCE_ASCENDING", NearbyCriteria.DISTANCE_ASCENDING);
        nearbyConstants.put("DISTANCE_DESCENDING", NearbyCriteria.DISTANCE_DESCENDING);
        nearbyConstants.put("NAME_ASCENDING", NearbyCriteria.NAME_ASCENDING);
        nearbyConstants.put("NAME_DESCENDING", NearbyCriteria.NAME_DESCENDING);

        nearbyConstants.put("DISTANCE", NearbyCriteria.DISTANCE);
        nearbyConstants.put("IMPORTANCE", NearbyCriteria.IMPORTANCE);

        nearbyConstants.put("POD_SUB_LOCALITY", NearbyCriteria.POD_SUB_LOCALITY);
        nearbyConstants.put("POD_LOCALITY", NearbyCriteria.POD_LOCALITY);
        nearbyConstants.put("POD_CITY", NearbyCriteria.POD_CITY);
        nearbyConstants.put("POD_STATE", NearbyCriteria.POD_STATE);

        Map<String, Object> directionConstants = new HashMap<>();
        directionConstants.put("EXCLUDE_TUNNEL", DirectionsCriteria.EXCLUDE_TUNNEL);
        directionConstants.put("EXCLUDE_RESTRICTED", DirectionsCriteria.EXCLUDE_RESTRICTED);
        directionConstants.put("EXCLUDE_MOTORWAY", DirectionsCriteria.EXCLUDE_MOTORWAY);
        directionConstants.put("EXCLUDE_FERRY", DirectionsCriteria.EXCLUDE_FERRY);
        directionConstants.put("EXCLUDE_TOLL", DirectionsCriteria.EXCLUDE_TOLL);

        directionConstants.put("ANNOTATION_SPEED", DirectionsCriteria.ANNOTATION_SPEED);
        directionConstants.put("ANNOTATION_NODES", DirectionsCriteria.ANNOTATION_NODES);
        directionConstants.put("ANNOTATION_MAXSPEED", DirectionsCriteria.ANNOTATION_MAXSPEED);
        directionConstants.put("ANNOTATION_DURATION", DirectionsCriteria.ANNOTATION_DURATION);
        directionConstants.put("ANNOTATION_DISTANCE", DirectionsCriteria.ANNOTATION_DISTANCE);
        directionConstants.put("ANNOTATION_BASE_DURATION", DirectionsCriteria.ANNOTATION_BASE_DURATION);
        directionConstants.put("ANNOTATION_CONGESTION", DirectionsCriteria.ANNOTATION_CONGESTION);
        directionConstants.put("ANNOTATION_SPEED_LIMIT", DirectionsCriteria.ANNOTATION_SPEED_LIMIT);
        directionConstants.put("ANNOTATION_TOLL_ROAD", DirectionsCriteria.ANNOTATION_TOLL_ROAD);

        directionConstants.put("OVERVIEW_FALSE", DirectionsCriteria.OVERVIEW_FALSE);
        directionConstants.put("OVERVIEW_SIMPLIFIED", DirectionsCriteria.OVERVIEW_SIMPLIFIED);
        directionConstants.put("OVERVIEW_FULL", DirectionsCriteria.OVERVIEW_FULL);

        directionConstants.put("PROFILE_WALKING", DirectionsCriteria.PROFILE_WALKING);
        directionConstants.put("PROFILE_TRUCKING", DirectionsCriteria.PROFILE_TRUCKING);
        directionConstants.put("PROFILE_BIKING", DirectionsCriteria.PROFILE_BIKING);
        directionConstants.put("PROFILE_DRIVING", DirectionsCriteria.PROFILE_DRIVING);

        directionConstants.put("RESOURCE_ROUTE_TRAFFIC", DirectionsCriteria.RESOURCE_ROUTE_TRAFFIC);
        directionConstants.put("RESOURCE_ROUTE", DirectionsCriteria.RESOURCE_ROUTE);
        directionConstants.put("RESOURCE_ROUTE_ETA", DirectionsCriteria.RESOURCE_ROUTE_ETA);
        directionConstants.put("RESOURCE_DISTANCE", DirectionsCriteria.RESOURCE_DISTANCE);
        directionConstants.put("RESOURCE_DISTANCE_ETA", DirectionsCriteria.RESOURCE_DISTANCE_ETA);
        directionConstants.put("RESOURCE_DISTANCE_TRAFFIC", DirectionsCriteria.RESOURCE_DISTANCE_TRAFFIC);
        directionConstants.put("RESOURCE_ROUTE_PREDICTIVE", DirectionsCriteria.RESOURCE_ROUTE_PREDICTIVE);
        directionConstants.put("RESOURCE_DISTANCE_PREDICTIVE", DirectionsCriteria.RESOURCE_DISTANCE_PREDICTIVE);

        directionConstants.put("APPROACH_CURB", DirectionsCriteria.APPROACH_CURB);
        directionConstants.put("APPROACH_UNRESTRICTED", DirectionsCriteria.APPROACH_UNRESTRICTED);

        directionConstants.put("DESTINATION_ANY", DirectionsCriteria.DESTINATION_ANY);
        directionConstants.put("DESTINATION_LAST", DirectionsCriteria.DESTINATION_LAST);

        directionConstants.put("GEOMETRY_POLYLINE", DirectionsCriteria.GEOMETRY_POLYLINE);
        directionConstants.put("GEOMETRY_POLYLINE6", DirectionsCriteria.GEOMETRY_POLYLINE6);
        directionConstants.put("GEOMETRY_COORDINATES", DirectionsCriteria.GEOMETRY_COORDINATES);

        directionConstants.put("IMPERIAL", DirectionsCriteria.IMPERIAL);
        directionConstants.put("METRIC", DirectionsCriteria.METRIC);

        directionConstants.put("SOURCE_ANY", DirectionsCriteria.SOURCE_ANY);
        directionConstants.put("SOURCE_FIRST", DirectionsCriteria.SOURCE_FIRST);

        directionConstants.put("ROUTE_TYPE_OPTIMAL", DirectionsCriteria.ROUTE_TYPE_OPTIMAL);
        directionConstants.put("ROUTE_TYPE_SHORTEST", DirectionsCriteria.ROUTE_TYPE_SHORTEST);

        directionConstants.put("DISTANCE_ROUTE_TYPE_OPTIMAL", DirectionsCriteria.DISTANCE_ROUTE_TYPE_OPTIMAL);
        directionConstants.put("DISTANCE_ROUTE_TYPE_SHORTEST", DirectionsCriteria.DISTANCE_ROUTE_TYPE_SHORTEST);

        directionConstants.put("SPECIFIED_ARRIVAL", DirectionsCriteria.SPECIFIED_ARRIVAL);
        directionConstants.put("SPECIFIED_DEPARTURE", DirectionsCriteria.SPECIFIED_DEPARTURE);

        directionConstants.put("DATE_TIME_SPECIFIED", 0);
        directionConstants.put("DATE_TIME_CURRENT", 1);


        Map<String, Object> poiConstants = new HashMap<>();
        poiConstants.put("GEOMETRY_BASE64", POICriteria.GEOMETRY_BASE64);
        poiConstants.put("GEOMETRY_POLYLINE5", POICriteria.GEOMETRY_POLYLINE5);
        poiConstants.put("GEOMETRY_POLYLINE6", POICriteria.GEOMETRY_POLYLINE6);
        poiConstants.put("GEOMETRY_COORDINATES", POICriteria.GEOMETRY_COORDINATES);

        Map<String, Object> sessionConstants = new HashMap<>();
        sessionConstants.put("SESSION_TYPE_GLOBAL", SessionCriteria.SESSION_TYPE_GLOBAL);
        sessionConstants.put("SESSION_TYPE_NAVIGATION", SessionCriteria.SESSION_TYPE_NAVIGATION);

        Map<String, Object> geoanalyticsLayerTypeConstants = new HashMap<>();
        geoanalyticsLayerTypeConstants.put("STATE", MapplsGeoAnalyticsType.STATE.getName());
        geoanalyticsLayerTypeConstants.put("DISTRICT", MapplsGeoAnalyticsType.DISTRICT.getName());
        geoanalyticsLayerTypeConstants.put("SUB_DISTRICT", MapplsGeoAnalyticsType.SUB_DISTRICT.getName());
        geoanalyticsLayerTypeConstants.put("WARD", MapplsGeoAnalyticsType.WARD.getName());
        geoanalyticsLayerTypeConstants.put("LOCALITY", MapplsGeoAnalyticsType.LOCALITY.getName());
        geoanalyticsLayerTypeConstants.put("PANCHAYAT", MapplsGeoAnalyticsType.PANCHAYAT.getName());
        geoanalyticsLayerTypeConstants.put("BLOCK", MapplsGeoAnalyticsType.BLOCK.getName());
        geoanalyticsLayerTypeConstants.put("PINCODE", MapplsGeoAnalyticsType.PINCODE.getName());
        geoanalyticsLayerTypeConstants.put("TOWN", MapplsGeoAnalyticsType.TOWN.getName());
        geoanalyticsLayerTypeConstants.put("CITY", MapplsGeoAnalyticsType.CITY.getName());
        geoanalyticsLayerTypeConstants.put("VILLAGE", MapplsGeoAnalyticsType.VILLAGE.getName());
        geoanalyticsLayerTypeConstants.put("SUB_LOCALITY", MapplsGeoAnalyticsType.SUB_LOCALITY.getName());
        geoanalyticsLayerTypeConstants.put("SUB_SUB_LOCALITY", MapplsGeoAnalyticsType.SUB_SUB_LOCALITY.getName());

        return MapBuilder.<String, Object>builder()
                .put("AutoSuggestCriteria", autosuggestConstants)
                .put("GeoCodingCriteria", geoCodeConstants)
                .put("NearbyCriteria", nearbyConstants)
                .put("DirectionsCriteria", directionConstants)
                .put("POICriteria", poiConstants)
                .put("SessionCriteria", sessionConstants)
                .put("GeoAnalyticsType", geoanalyticsLayerTypeConstants)
                .build();
    }

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void reverseGeocode(ReadableMap readableMap, final Promise promise) {
        double latitude;
        if (readableMap.hasKey("latitude")) {
            latitude = readableMap.getDouble("latitude");
        } else {
            promise.reject(REQUIRED_CODE, "Please provide latitude parameter");
            //failureCallback.invoke("Please provide latitude parameter");
            return;
        }
        double longitude;
        if (readableMap.hasKey("longitude")) {
            longitude = readableMap.getDouble("longitude");
        } else {
            promise.reject(REQUIRED_CODE, "PPlease provide longitude parameter");
            //failureCallback.invoke("Please provide longitude parameter");
            return;
        }
        MapplsReverseGeoCode.Builder builder = MapplsReverseGeoCode.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            builder.baseUrl(readableMap.getString("baseUrl"));
        }
        builder.setLocation(latitude, longitude);

        if (readableMap.hasKey("lang")) {
            builder.lang(readableMap.getString("lang"));
        }


        MapplsReverseGeoCodeManager.newInstance(builder.build()).call(new OnResponseCallback<PlaceResponse>() {
            @Override
            public void onSuccess(PlaceResponse placeResponse) {
                promise.resolve(new Gson().toJson(placeResponse));
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @ReactMethod
    public void autoSuggest(ReadableMap readableMap, final Promise promise) {

        MapplsAutoSuggest.Builder mBuilder = MapplsAutoSuggest.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            mBuilder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("query") && !readableMap.isNull("query")) {
            mBuilder.query(readableMap.getString("query"));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide query parameter");
            //failureCallback.invoke("Please provide query parameter");
            return;
        }

        if (readableMap.hasKey("filter")) {
            mBuilder.filter(readableMap.getString("filter"));
        }

        if (readableMap.hasKey("pod")) {
            mBuilder.pod(readableMap.getString("pod"));
        }
        if (readableMap.hasKey("location") && !readableMap.isNull("location")) {
            ReadableMap location = readableMap.getMap("location");
            if (location.hasKey("latitude") && location.hasKey("longitude")) {
                mBuilder.setLocation(location.getDouble("latitude"), location.getDouble("longitude"));
            }
        }
        if (readableMap.hasKey("tokenizeAddress")) {
            boolean tokenizeAddress = readableMap.getBoolean("tokenizeAddress");
            if (tokenizeAddress) {
                mBuilder.tokenizeAddress(true);
            }
        }
        if (readableMap.hasKey("zoom")) {
            mBuilder.zoom(readableMap.getDouble("zoom"));
        }

        if (readableMap.hasKey("bridge") && !readableMap.isNull("bridge")) {
            mBuilder.bridge(readableMap.getBoolean("bridge"));
        }

        if (readableMap.hasKey("hyperLocal") && !readableMap.isNull("hyperLocal")) {
            mBuilder.hyperLocal(readableMap.getBoolean("hyperLocal"));
        }

        if (readableMap.hasKey("responseLang") && !readableMap.isNull("hyperLocal")) {
            mBuilder.responseLang(readableMap.getString("responseLang"));
        }

        if (readableMap.hasKey("explain") && !readableMap.isNull("explain")) {
            mBuilder.explain(readableMap.getBoolean("explain"));
        }

        MapplsAutosuggestManager.newInstance(mBuilder.build()).call(new OnResponseCallback<AutoSuggestAtlasResponse>() {
            @Override
            public void onSuccess(AutoSuggestAtlasResponse autoSuggestAtlasResponse) {
                promise.resolve(new Gson().toJson(autoSuggestAtlasResponse));
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }


    @ReactMethod
    public void geocode(ReadableMap readableMap, final Promise promise) {
        MapplsGeoCoding.Builder mBuilder = MapplsGeoCoding.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            mBuilder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("address") && !readableMap.isNull("address")) {
            mBuilder.setAddress(readableMap.getString("address"));
        } else {
            promise.reject(REQUIRED_CODE, "please provide address parameter");
            //failureCallback.invoke("please provide address parameter");
            return;
        }
        if (readableMap.hasKey("bias")) {
            mBuilder.bias(readableMap.getInt("bias"));
        }
        if (readableMap.hasKey("bound")) {
            mBuilder.bound(readableMap.getString("bound"));
        }
        if (readableMap.hasKey("itemCount")) {
            mBuilder.itemCount(readableMap.getInt("itemCount"));
        }
        if (readableMap.hasKey("podFilter")) {
            mBuilder.podFilter(readableMap.getString("podFilter"));
        }
        if (readableMap.hasKey("scores")) {
            mBuilder.scores(readableMap.getBoolean("scores"));
        }
        MapplsGeoCodingManager.newInstance(mBuilder.build()).call(new OnResponseCallback<GeoCodeResponse>() {
            @Override
            public void onSuccess(GeoCodeResponse geoCodeResponse) {
                promise.resolve(new Gson().toJson(geoCodeResponse));
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @ReactMethod
    public void textSearch(ReadableMap readableMap, final Promise promise) {
        MapplsTextSearch.Builder mBuilder = MapplsTextSearch.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            mBuilder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("query") && !readableMap.isNull("query")) {
            mBuilder.query(readableMap.getString("query"));
        } else {
            promise.reject(REQUIRED_CODE, "please provide query parameter");
            //failureCallback.invoke("please provide query parameter");
            return;
        }
        if (readableMap.hasKey("bridge")) {
            mBuilder.bridge(readableMap.getBoolean("bridge"));
        }
        if (readableMap.hasKey("explain")) {
            mBuilder.explain(readableMap.getBoolean("explain"));
        }
        if (readableMap.hasKey("filter")) {
            mBuilder.filter(readableMap.getString("filter"));
        }

        if (readableMap.hasKey("location")) {
            if (readableMap.hasKey("latitude") && readableMap.hasKey("longitude")) {
                mBuilder.setLocation(readableMap.getDouble("latitude"), readableMap.getDouble("longitude"));
            }
        }

        if (readableMap.hasKey("username")) {
            mBuilder.username(readableMap.getString("username"));
        }

        MapplsTextSearchManager.newInstance(mBuilder.build()).call(new OnResponseCallback<AutoSuggestAtlasResponse>() {
            @Override
            public void onSuccess(AutoSuggestAtlasResponse autoSuggestAtlasResponse) {
                promise.resolve(new Gson().toJson(autoSuggestAtlasResponse));
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @ReactMethod
    public void placeDetail(ReadableMap readableMap, final Promise promise) {
        MapplsPlaceDetail.Builder mBuilder = MapplsPlaceDetail.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            mBuilder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("mapplsPin") && !readableMap.isNull("mapplsPin")) {
            mBuilder.mapplsPin(readableMap.getString("mapplsPin"));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide mappls pin parameter");
            //failureCallback.invoke("Please provide mappls pin parameter");
            return;
        }

        MapplsPlaceDetailManager.newInstance(mBuilder.build()).call(new OnResponseCallback<PlaceDetailResponse>() {
            @Override
            public void onSuccess(PlaceDetailResponse placeDetailResponse) {
                promise.resolve(new Gson().toJson(placeDetailResponse));
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }


    @ReactMethod
    public void POIAlongRoute(ReadableMap readableMap, final Promise promise) {
        MapplsPOIAlongRoute.Builder mBuilder = MapplsPOIAlongRoute.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            mBuilder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("category") && !readableMap.isNull("category")) {
            mBuilder.category(readableMap.getString("category"));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide category parameter");
            //failureCallback.invoke("Please provide category parameter");
            return;
        }

        if (readableMap.hasKey("path") && !readableMap.isNull("path")) {
            mBuilder.path(readableMap.getString("path"));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide path parameter");
            //failureCallback.invoke("Please provide path parameter");
            return;
        }
        if (readableMap.hasKey("buffer")) {
            mBuilder.buffer(readableMap.getInt("buffer"));
        }

        if (readableMap.hasKey("geometries")) {
            mBuilder.geometries(readableMap.getString("geometries"));
        }
        if (readableMap.hasKey("page")) {
            mBuilder.page(readableMap.getInt("page"));
        }
        if (readableMap.hasKey("sort")) {
            mBuilder.sort(readableMap.getBoolean("sort"));
        }

        MapplsPOIAlongRouteManager.newInstance(mBuilder.build()).call(new OnResponseCallback<POIAlongRouteResponse>() {
            @Override
            public void onSuccess(POIAlongRouteResponse poiAlongRouteResponse) {
                promise.resolve(new Gson().toJson(poiAlongRouteResponse));
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @ReactMethod
    public void nearby(ReadableMap readableMap, final Promise promise) {
        MapplsNearby.Builder mBuilder = MapplsNearby.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            mBuilder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("keyword") && !readableMap.isNull("keyword")) {
            mBuilder.keyword(readableMap.getString("keyword"));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide keyword parameter");
            //failureCallback.invoke("Please provide keyword parameter");
            return;
        }
        if (readableMap.hasKey("location") && !readableMap.isNull("location")) {
            String location = readableMap.getString("location");
            if (location.contains(",")) {
                String[] locationArray = location.split(",");
                mBuilder.setLocation(Double.parseDouble(locationArray[0]), Double.parseDouble(locationArray[1]));
            } else {
                mBuilder.setLocation(location);
            }
        } else {
            promise.reject(REQUIRED_CODE, "Please provide location parameter");
            //failureCallback.invoke("Please provide location parameter");
            return;
        }
        if (readableMap.hasKey("bounds")) {
            mBuilder.bounds(readableMap.getString("bounds"));
        }
        if (readableMap.hasKey("filter")) {
            mBuilder.filter(readableMap.getString("filter"));
        }
        if (readableMap.hasKey("page")) {
            mBuilder.page(readableMap.getInt("page"));
        }
        if (readableMap.hasKey("pod")) {
            mBuilder.pod(readableMap.getString("pod"));
        }
        if (readableMap.hasKey("radius")) {
            mBuilder.radius(readableMap.getInt("radius"));
        }
        if (readableMap.hasKey("searchBy")) {
            mBuilder.searchBy(readableMap.getString("searchBy"));
        }
        if (readableMap.hasKey("sortBy")) {
            mBuilder.sortBy(readableMap.getString("sortBy"));
        }
        if (readableMap.hasKey("explain")) {
            mBuilder.explain(readableMap.getBoolean("explain"));
        }
        if (readableMap.hasKey("richData")) {
            mBuilder.richData(readableMap.getBoolean("richData"));
        }
        if (readableMap.hasKey("userName")) {
            mBuilder.userName(readableMap.getString("userName"));
        }

        MapplsNearbyManager.newInstance(mBuilder.build()).call(new OnResponseCallback<NearbyAtlasResponse>() {
            @Override
            public void onSuccess(NearbyAtlasResponse nearbyAtlasResponse) {
                promise.resolve(new Gson().toJson(nearbyAtlasResponse));
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @ReactMethod
    public void directionRefresh(ReadableMap readableMap, final Promise promise) {
        MapplsDirectionsRefresh.Builder mBuilder = MapplsDirectionsRefresh.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            mBuilder.baseUrl(readableMap.getString("baseUrl"));
        }
        if(readableMap.hasKey("route")) {
            DirectionsRoute directionsRoute = DirectionsRoute.fromJson(readableMap.getString("route"));
            if(directionsRoute.routeOptions() != null) {
                RouteOptions routeOptions = directionsRoute.routeOptions();
                if(routeOptions.requestUuid() != null) {
                    mBuilder.requestId(routeOptions.requestUuid());
                } else {
                    promise.reject(REQUIRED_CODE, "Request Id not available");
                    return;
                }
                if(routeOptions.sessionId() != null) {
                    mBuilder.sessionId(routeOptions.sessionId());
                } else {
                    promise.reject(REQUIRED_CODE, "Session Id not available");
                    return;
                }
                mBuilder.profile(routeOptions.profile());
                mBuilder.isSort(routeOptions.isSort());
            }
        } else {
            promise.reject(REQUIRED_CODE, "Please provide route parameter");
            return;
        }
        if(readableMap.hasKey("tripType")) {
            mBuilder.tripType(readableMap.getInt("tripType"));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide tripType parameter");
            return;
        }
        if(readableMap.hasKey("nodeIndex")) {
            mBuilder.nodeIndex((long) readableMap.getInt("nodeIndex"));
        }
        if(readableMap.hasKey("routeIndex")) {
            mBuilder.routeIndex(readableMap.getInt("routeIndex"));
        }
        if(readableMap.hasKey("isRefresh")) {
            mBuilder.isRefresh(readableMap.getBoolean("isRefresh"));
        }
        MapplsDirectionsRefreshManager.newInstance(mBuilder.build()).call(new OnResponseCallback<DirectionsRoute>() {
            @Override
            public void onSuccess(DirectionsRoute directionsRoute) {
                promise.resolve(directionsRoute.toJson());
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @SuppressLint("WrongConstant")
    @ReactMethod
    public void direction(ReadableMap readableMap, final Promise promise) {
        MapplsDirections.Builder mBuilder = MapplsDirections.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            mBuilder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("origin")) {
            String origin = readableMap.getString("origin");
            if (origin.contains(",")) {
                String[] location = origin.split(",");
                mBuilder.origin(Point.fromLngLat(Double.parseDouble(location[0]), Double.parseDouble(location[1])));
            } else {
                mBuilder.origin(origin);
            }
        } else {
            promise.reject(REQUIRED_CODE, "Please provide origin parameter");
            //failureCallback.invoke("Please provide origin parameter");
            return;
        }
        if (readableMap.hasKey("destination")) {
            String destination = readableMap.getString("destination");
            if (destination.contains(",")) {
                String[] location = destination.split(",");
                mBuilder.destination(Point.fromLngLat(Double.parseDouble(location[0]), Double.parseDouble(location[1])));
            } else {
                mBuilder.destination(destination);
            }
        } else {
            promise.reject(REQUIRED_CODE, "Please provide destination parameter");
            //failureCallback.invoke("Please provide destination parameter");
            return;
        }
        if (readableMap.hasKey("waypoints") && !readableMap.isNull("waypoints")) {
            ReadableArray waypointsArray = readableMap.getArray("waypoints");
            for (int i = 0; i < waypointsArray.size(); i++) {

                String wayPoint = waypointsArray.getString(i);
                if (wayPoint.contains(",")) {
                    String[] location = wayPoint.split(",");
                    mBuilder.addWaypoint(Point.fromLngLat(Double.parseDouble(location[0]), Double.parseDouble(location[1])));
                } else {
                    mBuilder.addWaypoint(wayPoint);
                }
            }
        }
        if (readableMap.hasKey("excludes")) {
            ReadableArray excludesArray = readableMap.getArray("excludes");
            String[] excludes = new String[excludesArray.size()];
            for (int i = 0; i < excludesArray.size(); i++) {
                excludes[i] = excludesArray.getString(i);
            }
            mBuilder.excludes(excludes);
        }
        if (readableMap.hasKey("annotations")) {
            ReadableArray annotationsArray = readableMap.getArray("annotations");
            String[] annotations = new String[annotationsArray.size()];
            for (int i = 0; i < annotationsArray.size(); i++) {
                annotations[i] = annotationsArray.getString(i);
            }
            mBuilder.annotations(annotations);
        }
        if (readableMap.hasKey("overview")) {
            mBuilder.overview(readableMap.getString("overview"));
        }
        if (readableMap.hasKey("steps")) {
            mBuilder.steps(readableMap.getBoolean("steps"));
        }
        if (readableMap.hasKey("alternatives")) {
            mBuilder.alternatives(readableMap.getBoolean("alternatives"));
        }
        if (readableMap.hasKey("approaches")) {
            ReadableArray approachesArray = readableMap.getArray("approaches");
            String[] approaches = new String[approachesArray.size()];
            for (int i = 0; i < approachesArray.size(); i++) {
                approaches[i] = approachesArray.getString(i);
            }
            mBuilder.addApproaches(approaches);
        }
        if (readableMap.hasKey("bearing")) {
            ReadableMap bearing = readableMap.getMap("bearing");
            if (bearing.hasKey("angle") && bearing.hasKey("tolerance")) {
                mBuilder.addBearing(bearing.getDouble("angle"), bearing.getDouble("tolerance"));
            }
        }
        if (readableMap.hasKey("waypointIndices")) {
            ReadableArray waypointIndicesArray = readableMap.getArray("waypointIndices");
            Integer[] waypointIndices = new Integer[waypointIndicesArray.size()];
            for (int i = 0; i < waypointIndicesArray.size(); i++) {
                waypointIndices[i] = waypointIndicesArray.getInt(i);
            }
            mBuilder.addWaypointIndices(waypointIndices);
        }
        if (readableMap.hasKey("waypointNames")) {
            ReadableArray waypointNamesArray = readableMap.getArray("waypointNames");
            String[] waypointNames = new String[waypointNamesArray.size()];
            for (int i = 0; i < waypointNamesArray.size(); i++) {
                waypointNames[i] = waypointNamesArray.getString(i);
            }
            mBuilder.addWaypointNames(waypointNames);
        }
        if (readableMap.hasKey("waypointTargets")) {
            ReadableArray waypointTargetsArray = readableMap.getArray("waypointTargets");
            Point[] waypointTargets = new Point[waypointTargetsArray.size()];
            for (int i = 0; i < waypointTargetsArray.size(); i++) {
                ReadableMap waypointTargetsMap = waypointTargetsArray.getMap(i);
                if (waypointTargetsMap.hasKey("latitude") && waypointTargetsMap.hasKey("longitude")) {
                    waypointTargets[i] = Point.fromLngLat(waypointTargetsMap.getDouble("longitude"), waypointTargetsMap.getDouble("longitude"));
                }
            }
            mBuilder.addWaypointTargets(waypointTargets);
        }
        if (readableMap.hasKey("bannerInstructions")) {
            mBuilder.bannerInstructions(readableMap.getBoolean("bannerInstructions"));
        }
        if (readableMap.hasKey("roundaboutExits")) {
            mBuilder.roundaboutExits(readableMap.getBoolean("roundaboutExits"));
        }
        if (readableMap.hasKey("instructions")) {
            mBuilder.instructions(readableMap.getBoolean("instructions"));
        }
        if (readableMap.hasKey("geometries")) {
            mBuilder.geometries(readableMap.getString("geometries"));
        }
        if (readableMap.hasKey("isSort")) {
            mBuilder.isSort(readableMap.getBoolean("isSort"));
        }
        if (readableMap.hasKey("lessVerbose")) {
            mBuilder.lessVerbose(readableMap.getBoolean("lessVerbose"));
        }
        if (readableMap.hasKey("profile")) {
            mBuilder.profile(readableMap.getString("profile"));
        }
        if (readableMap.hasKey("radiuses")) {
            ReadableArray radiusesArray = readableMap.getArray("radiuses");
            double[] radiuses = new double[radiusesArray.size()];
            for (int i = 0; i < radiusesArray.size(); i++) {
                radiuses[i] = radiusesArray.getDouble(i);
            }
            mBuilder.radiuses(radiuses);
        }
        if (readableMap.hasKey("resource")) {
            mBuilder.resource(readableMap.getString("resource"));
        }
        if (readableMap.hasKey("routeRefresh")) {
            mBuilder.routeRefresh(readableMap.getBoolean("routeRefresh"));
        }
        if (readableMap.hasKey("deviceId")) {
            mBuilder.deviceId(readableMap.getString("deviceId"));
        }
        if (readableMap.hasKey("sessionId")) {
            mBuilder.sessionId(readableMap.getString("sessionId"));
        }
        if (readableMap.hasKey("skipWaypoints")) {
            mBuilder.skipWaypoints(readableMap.getBoolean("skipWaypoints"));
        }
        if (readableMap.hasKey("routeType")) {
            mBuilder.routeType(readableMap.getInt("routeType"));
        }
        if (readableMap.hasKey("dateTime")) {
            ReadableMap dateTimeMap = readableMap.getMap("dateTime");
            if (dateTimeMap.hasKey("type")) {
                int type = dateTimeMap.getInt("type");
                if (type == 1) {
                    mBuilder.dateTime(new MapplsDirectionDateTimeCurrent());
                } else {
                    mBuilder.dateTime(new MapplsDirectionDateTimeSpecified(dateTimeMap.getInt("specifiedType"), (long) dateTimeMap.getInt("timeStamp")));
                }
            }
        }

        MapplsDirectionManager.newInstance(mBuilder.build()).call(new OnResponseCallback<DirectionsResponse>() {
            @Override
            public void onSuccess(DirectionsResponse directionsResponse) {
                promise.resolve(directionsResponse.toJson());
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @ReactMethod
    public void distance(ReadableMap readableMap, final Promise promise) {
        MapplsDistanceMatrix.Builder mBuilder = MapplsDistanceMatrix.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            mBuilder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("coordinates")) {
            ReadableArray coordinatesArray = readableMap.getArray("coordinates");
            if (coordinatesArray.size() >= 2) {
                for (int i = 0; i < coordinatesArray.size(); i++) {
                    String coordinate = coordinatesArray.getString(i);
                    if (coordinate.contains(",")) {
                        String[] location = coordinate.split(",");
                        mBuilder.coordinate(Point.fromLngLat(Double.parseDouble(location[0]), Double.parseDouble(location[1])));
                    } else {
                        mBuilder.coordinate(coordinate);
                    }
                }
            } else {
                promise.reject(REQUIRED_CODE, "Please provide atleast two coordinates");
            }
        } else {
            promise.reject(REQUIRED_CODE, "Please provide coordinates");
            //failureCallback.invoke("Please provide coordinates");
        }
        if (readableMap.hasKey("profile")) {
            mBuilder.profile(readableMap.getString("profile"));
        }
        if (readableMap.hasKey("resource")) {
            mBuilder.resource(readableMap.getString("resource"));
        }
        if (readableMap.hasKey("routeType")) {
            mBuilder.routeType(readableMap.getInt("routeType"));
        }
        if (readableMap.hasKey("fallbackSpeed")) {
            mBuilder.fallbackSpeed(readableMap.getDouble("fallbackSpeed"));
        }
        if (readableMap.hasKey("fallbackCoordinate")) {
            mBuilder.fallbackCoordinate(readableMap.getString("fallbackCoordinate"));
        }

        if (readableMap.hasKey("dateTime")) {
            ReadableMap dateTimeMap = readableMap.getMap("dateTime");
            if (dateTimeMap.hasKey("type")) {
                int type = dateTimeMap.getInt("type");
                if (type == 1) {
                    mBuilder.dateTime(new MapplsDirectionDateTimeCurrent());
                } else {
                    mBuilder.dateTime(new MapplsDirectionDateTimeSpecified(dateTimeMap.getInt("specifiedType"), (long) dateTimeMap.getInt("timeStamp")));
                }
            }
        }
        MapplsDistanceMatrixManager.newInstance(mBuilder.build()).call(new OnResponseCallback<DistanceResponse>() {
            @Override
            public void onSuccess(DistanceResponse distanceResponse) {
                promise.resolve(distanceResponse.toJson());
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @ReactMethod
    public void hateosnearby(ReadableMap readableMap, final Promise promise) {

        MapplsHateosNearby.Builder mBuilder = MapplsHateosNearby.builder();


        if (readableMap.hasKey("hyperlink") && !readableMap.isNull("hyperlink")) {
            mBuilder.hyperlink(readableMap.getString("hyperlink"));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide hyperlink");
        }

        MapplsHateosNearbyManager.newInstance(mBuilder.build()).call(new OnResponseCallback<NearbyAtlasResponse>() {
            @Override
            public void onSuccess(NearbyAtlasResponse nearbyAtlasResponse) {
                promise.resolve(new Gson().toJson(nearbyAtlasResponse));
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @ReactMethod
    public void feedback(ReadableMap readableMap, final Promise promise) {
        MapplsFeedback.Builder mBuilder = MapplsFeedback.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            mBuilder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("typedKeyword")) {
            mBuilder.typedKeyword(readableMap.getString("typedKeyword"));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide typed keyword");
        }
        if (readableMap.hasKey("index")) {
            mBuilder.index(readableMap.getInt("index"));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide index");
        }
        if (readableMap.hasKey("appVersion")) {
            mBuilder.appVersion(readableMap.getString("appVersion"));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide appVersion");
        }
        if (readableMap.hasKey("locationName")) {
            mBuilder.locationName(readableMap.getString("locationName"));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide locationName");
        }
        if (readableMap.hasKey("userName")) {
            mBuilder.userName(readableMap.getString("userName"));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide userName");
        }
        if (readableMap.hasKey("latitude")) {
            mBuilder.latitude(readableMap.getDouble("latitude"));
        }
        if (readableMap.hasKey("longitude")) {
            mBuilder.longitude(readableMap.getDouble("longitude"));
        }
        if (readableMap.hasKey("mapplsPin")) {
            mBuilder.mapplsPin(readableMap.getString("mapplsPin"));
        }
        MapplsFeedbackManager.newInstance(mBuilder.build()).call(new OnResponseCallback<Void>() {
            @Override
            public void onSuccess(Void unused) {
                promise.resolve("success");
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @ReactMethod
    public void clusterLinkedDevices(ReadableMap readableMap, final Promise promise) {

        MapplsClusterLinkedDevices.Builder mapplsDeviceBuilder = MapplsClusterLinkedDevices.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            mapplsDeviceBuilder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("clusterId") && !readableMap.isNull("clusterId")) {
            mapplsDeviceBuilder.clusterId(readableMap.getString("clusterId"));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide clusterId");
        }
        if (readableMap.hasKey("sessionType") && !readableMap.isNull("sessionType")) {
            mapplsDeviceBuilder.sessionType(readableMap.getString("sessionType"));
        } else {
            mapplsDeviceBuilder.sessionType(SessionCriteria.SESSION_TYPE_GLOBAL);
        }


        MapplsClusterLinkedDevicesManager.newInstance(mapplsDeviceBuilder.build()).call(new OnResponseCallback<List<Device>>() {
            @Override
            public void onSuccess(List<Device> devices) {
                promise.resolve(new Gson().toJson(devices));
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }


    @ReactMethod
    public void deleteClusterLinkedDevice(ReadableMap readableMap, final Promise promise) {

        MapplsDeleteClusterLinkedDevice.Builder mBuilder = MapplsDeleteClusterLinkedDevice.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            mBuilder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("linkedDevice") && !readableMap.isNull("linkedDevice")) {
            mBuilder.linkedDevice(readableMap.getString("linkedDevice"));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide linkedDevice");
        }

        if (readableMap.hasKey("clusterId") && !readableMap.isNull("clusterId")) {
            mBuilder.clusterId(readableMap.getString("clusterId"));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide clusterId");
        }
        if (readableMap.hasKey("sessionType") && !readableMap.isNull("sessionType")) {
            mBuilder.sessionType(Objects.requireNonNull(readableMap.getString("sessionType")));
        } else {
            mBuilder.sessionType(SessionCriteria.SESSION_TYPE_GLOBAL);
        }
        MapplsDeleteClusterLinkedDeviceManager.newInstance(mBuilder.build()).call(new OnResponseCallback<Void>() {
            @Override
            public void onSuccess(Void unused) {
                promise.resolve("success");
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @ReactMethod
    public void endSession(ReadableMap readableMap, final Promise promise) {

        MapplsEndSession.Builder mSessionBuilder = MapplsEndSession.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            mSessionBuilder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("clusterId") && !readableMap.isNull("clusterId")) {
            mSessionBuilder.clusterId(readableMap.getString("clusterId"));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide clusterId");
        }
        if (readableMap.hasKey("sessionType") && !readableMap.isNull("sessionType")) {
            mSessionBuilder.sessionType(Objects.requireNonNull(readableMap.getString("sessionType")));
        } else {
            mSessionBuilder.sessionType(SessionCriteria.SESSION_TYPE_GLOBAL);
        }
        MapplsEndSessionManager.newInstance(mSessionBuilder.build()).call(new OnResponseCallback<Void>() {
            @Override
            public void onSuccess(Void unused) {
                promise.resolve("success");
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @ReactMethod
    public void geoAnalyticsList(ReadableMap readableMap, final Promise promise) {

        MapplsGeoAnalyticsList.Builder mBuilder = MapplsGeoAnalyticsList.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            mBuilder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("api") && !readableMap.isNull("api")) {
            mBuilder.api(Objects.requireNonNull(readableMap.getString("api")));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide api parameter");
        }

        if (readableMap.hasKey("geoBoundType") && !readableMap.isNull("geoBoundType")) {
            mBuilder.geoBoundType(Objects.requireNonNull(readableMap.getString("geoBoundType")));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide geoBoundType parameter");
        }
        if (readableMap.hasKey("geoBound") && !readableMap.isNull("geoBound")) {
            ReadableArray geoBoundArray = readableMap.getArray("geoBound");
            String[] geoBound = new String[geoBoundArray.size()];
            for (int i = 0; i < geoBoundArray.size(); i++) {
                geoBound[i] = geoBoundArray.getString(i);
            }
            mBuilder.geoBound(geoBound);
        } else {
            promise.reject(REQUIRED_CODE, "Please provide geoBound parameter");
        }
        if (readableMap.hasKey("attributes") && !readableMap.isNull("attributes")) {

            String attributes = readableMap.getString("attributes");

            //use below code when attributes will become as array.
            // ReadableArray attributesArray = readableMap.getArray("attributes");
            // String[]  attributes = new String[attributesArray.size()];
            // for (int i =0;i<attributesArray.size();i++){
            //     attributes[i]= attributesArray.getString(i);
            // }
            mBuilder.attributes(attributes);
        } else {
            promise.reject(REQUIRED_CODE, "Please provide attributes parameter");
        }

        MapplsGeoAnalyticsListManager.newInstance(mBuilder.build()).call(new OnResponseCallback<GeoAnalyticsListResponse>() {
            @Override
            public void onSuccess(GeoAnalyticsListResponse geoAnalyticsListResponse) {
                promise.resolve(new Gson().toJson(geoAnalyticsListResponse));
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @ReactMethod
    public void roadTrafficDetail(ReadableMap readableMap, final Promise promise) {

        MapplsRoadTrafficDetail.Builder mBuilder = MapplsRoadTrafficDetail.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            mBuilder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("location") && !readableMap.isNull("location")) {

            ReadableMap location = readableMap.getMap("location");
            if (location.hasKey("latitude") && !location.isNull("latitude") && location.hasKey("longitude") && !location.isNull("longitude")) {
                mBuilder.latitude(location.getDouble("latitude"));
                mBuilder.longitude(location.getDouble("longitude"));
            } else {
                promise.reject(REQUIRED_CODE, "Please provide latitude or longitude parameter");
            }
        } else {
            promise.reject(REQUIRED_CODE, "Please provide location parameter");
        }


        if (readableMap.hasKey("radius") && !readableMap.isNull("radius")) {
            Double radius = readableMap.getDouble("radius");
            mBuilder.radius(radius.longValue());
        }

        MapplsRoadTrafficDetailManager.newInstance(mBuilder.build()).call(new OnResponseCallback<TrafficRoadDetailResponse>() {
            @Override
            public void onSuccess(TrafficRoadDetailResponse trafficRoadDetailResponse) {
                promise.resolve(new Gson().toJson(trafficRoadDetailResponse));
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });

    }

    @ReactMethod
    public void generateOtp(String userHandle, final Promise promise) {
        if (userHandle == null) {
            promise.reject(REQUIRED_CODE, "Please provide userHandle parameter");
            return;
        }

        MapplsGenerateOTP generateOTP = MapplsGenerateOTP.builder()
                .userHandle(userHandle)
                .build();
        MapplsGenerateOtpManager.newInstance(generateOTP).call(new OnResponseCallback<String>() {
            @Override
            public void onSuccess(String response) {
                promise.resolve(response);
            }

            @Override
            public void onError(int code, String message) {
                promise.reject(String.valueOf(code), message);
            }
        });
    }

    @ReactMethod
    public void whiteList(ReadableMap readableMap, final Promise promise) {

        if (!readableMap.hasKey("url") || readableMap.isNull("url")) {
            promise.reject(REQUIRED_CODE, "Please provide url parameter");
            return;
        }

        if (!readableMap.hasKey("userHandle") || readableMap.isNull("userHandle")) {
            promise.reject(REQUIRED_CODE, "Please provide userHandle parameter");
            return;
        }

        if (!readableMap.hasKey("otp") || readableMap.isNull("otp")) {
            promise.reject(REQUIRED_CODE, "Please provide otp parameter");
            return;
        }

        String url = readableMap.getString("url");
        String userHandle = readableMap.getString("userHandle");
        String otp = readableMap.getString("otp");

        MapplsWhitelist whitelist = MapplsWhitelist.builder()
                .refLocation(url)
                .userHandle(userHandle)
                .otp(otp)
                .build();
        MapplsWhitelistManager.newInstance(whitelist).call(new OnResponseCallback<Void>() {
            @Override
            public void onSuccess(Void unused) {
                promise.resolve(null);
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @ReactMethod
    public void nearbyReports(ReadableMap readableMap, final Promise promise) {


        if (!readableMap.hasKey("topLeft") || readableMap.isNull("topLeft")) {
            promise.reject(REQUIRED_CODE, "Please provide topLeft parameter");
            return;
        }

        if (!readableMap.hasKey("bottomRight") || readableMap.isNull("bottomRight")) {
            promise.reject(REQUIRED_CODE, "Please provide bottomRight parameter");
            return;
        }


        ReadableArray topLeft = readableMap.getArray("topLeft");
        ReadableArray bottomRight = readableMap.getArray("bottomRight");

        Double topLng = topLeft.getDouble(0);
        Double topLat = topLeft.getDouble(1);

        Double bottomLng = bottomRight.getDouble(0);
        Double bottomLat = bottomRight.getDouble(1);

        MapplsNearbyReport.Builder mBuilder = MapplsNearbyReport.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            mBuilder.baseUrl(readableMap.getString("baseUrl"));
        }
        mBuilder.topLeft(Point.fromLngLat(topLng, topLat));
        mBuilder.bottomRight(Point.fromLngLat(bottomLng, bottomLat));

        MapplsNearbyReportManager.newInstance(mBuilder.build()).call(new OnResponseCallback<NearbyReportResponse>() {
            @Override
            public void onSuccess(NearbyReportResponse nearbyReportResponse) {
                promise.resolve(new Gson().toJson(nearbyReportResponse));
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @ReactMethod
    public void weather(ReadableMap readableMap, final Promise promise) {

        MapplsWeather.Builder builder = MapplsWeather.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            builder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("location") && !readableMap.isNull("location")) {

            ReadableMap location = readableMap.getMap("location");
            if (location.hasKey("latitude") && !location.isNull("latitude") && location.hasKey("longitude") && !location.isNull("longitude")) {
                builder.location(location.getDouble("latitude"), location.getDouble("longitude"));
            } else {
                promise.reject(REQUIRED_CODE, "Please provide latitude or longitude parameter");
            }
        } else {
            promise.reject(REQUIRED_CODE, "Please provide location parameter");
        }
        if (readableMap.hasKey("theme") && !readableMap.isNull("theme")) {
            builder.theme(readableMap.getString("theme"));
        }
        if (readableMap.hasKey("size") && !readableMap.isNull("size")) {
            builder.size(readableMap.getString("size"));
        }
        if (readableMap.hasKey("tempUnit") && !readableMap.isNull("tempUnit")) {
            builder.tempUnit(readableMap.getString("tempUnit"));
        }
        if (readableMap.hasKey("unitType") && !readableMap.isNull("unitType")) {
            builder.unitType(readableMap.getString("unitType"));
        }
        if (readableMap.hasKey("unit") && !readableMap.isNull("unit")) {
            builder.unit(readableMap.getInt("unit"));
        }

        MapplsWeatherManager.newInstance(builder.build()).call(new OnResponseCallback<WeatherResponse>() {
            @Override
            public void onSuccess(WeatherResponse weatherResponse) {
                promise.resolve(new Gson().toJson(weatherResponse));
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @ReactMethod
    public void tripCostEstimation(ReadableMap readableMap, final Promise promise) {
        MapplsCostEstimation.Builder builder = MapplsCostEstimation.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            builder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("routeId") && !readableMap.isNull("routeId")) {
            builder.routeId(readableMap.getString("routeId"));
        }
        if (readableMap.hasKey("routeIndex") && !readableMap.isNull("routeIndex")) {
            builder.routeIndex(readableMap.getInt("routeIndex"));
        }
        if (readableMap.hasKey("vehicleType") && !readableMap.isNull("vehicleType")) {
            builder.vehicleType(readableMap.getString("vehicleType"));
        }
        if (readableMap.hasKey("isTollEnabled") && !readableMap.isNull("isTollEnabled")) {
            builder.isTollEnabled(readableMap.getBoolean("isTollEnabled"));
        }
        if (readableMap.hasKey("vehicleFuelType") && !readableMap.isNull("vehicleFuelType")) {
            builder.vehicleFuelType(readableMap.getString("vehicleFuelType"));
        }
        if (readableMap.hasKey("fuelEfficiency") && !readableMap.isNull("fuelEfficiency")) {
            builder.fuelEfficiency(readableMap.getInt("fuelEfficiency"));
        }
        if (readableMap.hasKey("fuelEfficiencyUnit") && !readableMap.isNull("fuelEfficiencyUnit")) {
            builder.fuelEfficiencyUnit(readableMap.getString("fuelEfficiencyUnit"));
        }
        if (readableMap.hasKey("fuelPrice") && !readableMap.isNull("fuelPrice")) {
            builder.fuelPrice(readableMap.getDouble("fuelPrice"));
        }
        if (readableMap.hasKey("distance") && !readableMap.isNull("distance")) {
            builder.distance(readableMap.getDouble("distance"));
        }
        if (readableMap.hasKey("latitude") && !readableMap.isNull("latitude")) {
            builder.latitude(readableMap.getDouble("latitude"));
        }
        if (readableMap.hasKey("longitude") && !readableMap.isNull("longitude")) {
            builder.longitude(readableMap.getDouble("longitude"));
        }

        MapplsCostEstimationManager.newInstance(builder.build()).call(new OnResponseCallback<CostEstimationResponse>() {
            @Override
            public void onSuccess(CostEstimationResponse costEstimationResponse) {
                promise.resolve(new Gson().toJson(costEstimationResponse));
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @ReactMethod
    public void eventCategoryMaster(ReadableMap readableMap, final Promise promise) {
        MapplsCategoryMaster.Builder builder = MapplsCategoryMaster.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            builder.baseUrl(readableMap.getString("baseUrl"));
        }
        MapplsCategoryMasterManager.newInstance(builder.build()).call(new OnResponseCallback<ReportMasterResponse>() {

            @Override
            public void onSuccess(ReportMasterResponse reportMasterResponse) {
                promise.resolve(new Gson().toJson(reportMasterResponse));
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });

    }

    @ReactMethod
    public void routeReportSummary(ReadableMap readableMap, final Promise promise) {
        MapplsRouteSummary.Builder builder = MapplsRouteSummary.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            builder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("routeId") && !readableMap.isNull("routeId")) {
            builder.routeId(readableMap.getString("routeId"));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide routeId parameter");
        }
        if (readableMap.hasKey("routeIndex")) {
            builder.routeIdx(readableMap.getInt("routeIndex"));
        }
        if (readableMap.hasKey("currentNode")) {
            builder.currentNode(readableMap.getString("currentNode"));
        }
        if (readableMap.hasKey("isGroup")) {
            builder.isGroup(readableMap.getInt("isGroup"));
        }
        if (readableMap.hasKey("categories")) {
            ReadableArray categoriesArray = readableMap.getArray("categories");
            String[] categories = new String[categoriesArray.size()];
            for (int i = 0; i < categoriesArray.size(); i++) {
                categories[i] = categoriesArray.getString(i);
            }
            builder.categories(categories);
        }

        MapplsRouteSummaryManager.newInstance(builder.build()).call(new OnResponseCallback<RouteReportSummaryResponse>() {
            @Override
            public void onSuccess(RouteReportSummaryResponse routeReportSummaryResponse) {
                promise.resolve(new Gson().toJson(routeReportSummaryResponse));
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @ReactMethod
    public void fuelCost(ReadableMap readableMap, final Promise promise) {
        MapplsFuelCost.Builder builder = MapplsFuelCost.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            builder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("location") && !readableMap.isNull("location")) {

            ReadableMap location = readableMap.getMap("location");
            if (location.hasKey("latitude") && !location.isNull("latitude") && location.hasKey("longitude") && !location.isNull("longitude")) {
                builder.location(location.getDouble("latitude"), location.getDouble("longitude"));
            } else {
                promise.reject(REQUIRED_CODE, "Please provide latitude or longitude parameter");
            }
        } else {
            promise.reject(REQUIRED_CODE, "Please provide location parameter");
        }

        MapplsFuelCostManager.newInstance(builder.build()).call(new OnResponseCallback<FuelCostResponse>() {

            @Override
            public void onSuccess(FuelCostResponse fuelCostResponse) {
                promise.resolve(new Gson().toJson(fuelCostResponse));
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @ReactMethod
    public void transitPlanner(ReadableMap readableMap, final Promise promise) {
        MapplsTransitPlanner.Builder builder = MapplsTransitPlanner.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            builder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("origin") && !readableMap.isNull("origin")) {
            builder.origin(readableMap.getString("origin"));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide origin parameter");
        }
        if (readableMap.hasKey("destination") && !readableMap.isNull("destination")) {
            builder.destination(readableMap.getString("destination"));
        } else {
            promise.reject(REQUIRED_CODE, "Please provide destination parameter");
        }

        if(readableMap.hasKey("mode") && !readableMap.isNull("mode")) {
            builder.mode(readableMap.getString("mode"));
        }
        if(readableMap.hasKey("date")) {
            builder.date(readableMap.getString("date"));
        }
        if(readableMap.hasKey("time")) {
            builder.time(readableMap.getString("time"));
        }
        if(readableMap.hasKey("arriveBy")) {
            builder.arriveBy(readableMap.getBoolean("arriveBy"));
        }
        if(readableMap.hasKey("optimalRoute")) {
            builder.optimalRoute(readableMap.getBoolean("optimalRoute"));
        }
        if(readableMap.hasKey("searchWindow")) {
            builder.searchWindow(readableMap.getInt("searchWindow"));
        }
        if(readableMap.hasKey("maxTransfers")) {
            builder.maxTransfers(readableMap.getInt("maxTransfers"));
        }
        if(readableMap.hasKey("showIntermediateStops")) {
            builder.showIntermediateStops(readableMap.getBoolean("showIntermediateStops"));
        }
        if(readableMap.hasKey("walkSpeed")) {
            builder.walkSpeed(readableMap.getDouble("walkSpeed"));
        }

        MapplsTransitPlannerManager.newInstance(builder.build()).call(new OnResponseCallback<TransitPlannerResponse>() {
            @Override
            public void onSuccess(TransitPlannerResponse transitPlannerResponse) {
                promise.resolve(new Gson().toJson(transitPlannerResponse));
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

    @ReactMethod
    public void tripOptimisation(ReadableMap readableMap, final Promise promise) {
        MapplsTripOptimisation.Builder builder = MapplsTripOptimisation.builder();
        if(readableMap.hasKey("baseUrl") && readableMap.getString("baseUrl") != null) {
            builder.baseUrl(readableMap.getString("baseUrl"));
        }
        if (readableMap.hasKey("origin")) {
            String origin = readableMap.getString("origin");
            if (origin.contains(",")) {
                String[] location = origin.split(",");
                builder.origin(Point.fromLngLat(Double.parseDouble(location[0]), Double.parseDouble(location[1])));
            } else {
                builder.origin(origin);
            }
        } else {
            promise.reject(REQUIRED_CODE, "Please provide origin parameter");
            //failureCallback.invoke("Please provide origin parameter");
            return;
        }
        if (readableMap.hasKey("destination")) {
            String destination = readableMap.getString("destination");
            if (destination.contains(",")) {
                String[] location = destination.split(",");
                builder.destination(Point.fromLngLat(Double.parseDouble(location[0]), Double.parseDouble(location[1])));
            } else {
                builder.destination(destination);
            }
        } else {
            promise.reject(REQUIRED_CODE, "Please provide destination parameter");
            //failureCallback.invoke("Please provide destination parameter");
            return;
        }
        if (readableMap.hasKey("waypoints") && !readableMap.isNull("waypoints")) {
            ReadableArray waypointsArray = readableMap.getArray("waypoints");
            for (int i = 0; i < waypointsArray.size(); i++) {

                String wayPoint = waypointsArray.getString(i);
                if (wayPoint.contains(",")) {
                    String[] location = wayPoint.split(",");
                    builder.addWayPoint(Point.fromLngLat(Double.parseDouble(location[0]), Double.parseDouble(location[1])));
                } else {
                    builder.addWayPoint(wayPoint);
                }
            }
        }

        if(readableMap.hasKey("overview") && !readableMap.isNull("overview")) {
            builder.overview(readableMap.getString("overview"));
        }
        if(readableMap.hasKey("geometries") && !readableMap.isNull("geometries")) {
            builder.geometries(readableMap.getString("geometries"));
        }
        if(readableMap.hasKey("steps")) {
            builder.steps(readableMap.getBoolean("steps"));
        }
        if(readableMap.hasKey("sourceType")) {
            builder.sourceType(readableMap.getString("sourceType"));
        }
        if(readableMap.hasKey("destinationType")) {
            builder.destinationType(readableMap.getString("destinationType"));
        }
        if(readableMap.hasKey("roundTrip")) {
            builder.roundTrip(readableMap.getBoolean("roundTrip"));
        }
        if(readableMap.hasKey("lessVerbose")) {
            builder.lessVerbose(readableMap.getBoolean("lessVerbose"));
        }
        if(readableMap.hasKey("continueStraight")) {
            builder.continueStraight(readableMap.getBoolean("continueStraight"));
        }
        MapplsTripOptimisationManager.newInstance(builder.build()).call(new OnResponseCallback<TripOptimisationResponse>() {
            @Override
            public void onSuccess(TripOptimisationResponse tripOptimisationResponse) {
                promise.resolve(new Gson().toJson(tripOptimisationResponse));
            }

            @Override
            public void onError(int i, String s) {
                promise.reject(String.valueOf(i), s);
            }
        });
    }

}