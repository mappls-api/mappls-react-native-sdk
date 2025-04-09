package com.mappls.sdk.maps.rctmgl.modules;

import android.location.Location;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;
import com.mappls.sdk.maps.rctmgl.events.EventEmitter;
import com.mappls.sdk.maps.rctmgl.events.IEvent;
import com.mappls.sdk.maps.rctmgl.events.LocationEvent;
import com.mappls.sdk.maps.rctmgl.location.LocationManager;
import com.mappls.sdk.maps.location.engine.LocationEngineCallback;
import com.mappls.sdk.maps.location.engine.LocationEngineResult;

@ReactModule(name = RCTMGLLocationModule.REACT_CLASS)
public class RCTMGLLocationModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "RCTMGLLocationModule";
    public static final String LOCATION_UPDATE = "MapboxUserLocationUpdate";

    private boolean isEnabled;
    private float mMinDisplacement;
    private boolean isPaused;

    private LocationManager locationManager;

    private LifecycleEventListener lifecycleEventListener = new LifecycleEventListener() {
        @Override
        public void onHostResume() {
            if (isEnabled) {
                startLocationManager();
            }
        }

        @Override
        public void onHostPause() {
            pauseLocationManager();
        }

        @Override
        public void onHostDestroy() {
            stopLocationManager();
        }
    };

    private LocationManager.OnUserLocationChange onUserLocationChangeCallback = new LocationManager.OnUserLocationChange() {
        @Override
        public void onLocationChange(Location location) {
            LocationEvent locationEvent = new LocationEvent(location);

            RCTNativeAppEventEmitter emitter = EventEmitter.getModuleEmitter(getReactApplicationContext());
            if (emitter != null) {
                emitter.emit(LOCATION_UPDATE, locationEvent.getPayload());
            }
        }
    };

    public RCTMGLLocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        locationManager = LocationManager.getInstance(reactContext);
        reactContext.addLifecycleEventListener(lifecycleEventListener);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }


    @ReactMethod
    public void start(float minDisplacement) {
        isEnabled = true;
        mMinDisplacement = minDisplacement;
        startLocationManager();
    }

    @ReactMethod
    public void setMinDisplacement(float minDisplacement) {
        if (mMinDisplacement == minDisplacement) return;
        mMinDisplacement = minDisplacement;
        if (isEnabled) {

            // set minimal displacement in the manager
            locationManager.setMinDisplacement(mMinDisplacement);

            // refresh values in location engine request
            locationManager.enable();
        }
    }

    @ReactMethod
    public void stop() {
        stopLocationManager();
    }

    @ReactMethod
    public void pause() {
        pauseLocationManager();
    }

    @ReactMethod
    public void getLastKnownLocation(final Promise promise) {
        locationManager.getLastKnownLocation(
          new LocationEngineCallback<LocationEngineResult>() {
              public void onSuccess(LocationEngineResult result) {
                  Location location = result.getLastLocation();
                  if (result.getLastLocation() != null) {
                      LocationEvent locationEvent = new LocationEvent(location);
                      promise.resolve(locationEvent.getPayload());
                  } else {
                      promise.resolve(null);
                  }
              }
              public void onFailure(@NonNull Exception exception) {
                  promise.reject(exception);
              }
          }
        );
    }

    @ReactMethod
    public void addListener(String eventName) {
        // Set up any upstream listeners or background tasks as necessary
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Remove upstream listeners, stop unnecessary background tasks
    }

    private void startLocationManager() {
        locationManager.addLocationListener(onUserLocationChangeCallback);
        locationManager.setMinDisplacement(mMinDisplacement);
        locationManager.enable();
        isPaused = false;
    }

    private void pauseLocationManager() {
        if (isPaused) {
            return;
        }
        locationManager.disable();
        isPaused = true;
    }

    private void stopLocationManager() {
        if (!isEnabled) {
            return;
        }
        locationManager.removeLocationListener(onUserLocationChangeCallback);
        locationManager.dispose();
        isEnabled = false;
        isPaused = false;
    }
}
