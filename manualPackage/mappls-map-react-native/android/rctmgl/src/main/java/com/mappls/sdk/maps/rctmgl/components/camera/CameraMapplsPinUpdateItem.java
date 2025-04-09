package com.mappls.sdk.maps.rctmgl.components.camera;

import com.mappls.sdk.maps.MapplsMap;
import com.mappls.sdk.maps.camera.CameraMapplsPinBoundUpdate;
import com.mappls.sdk.maps.camera.CameraMapplsPinUpdate;
import com.mappls.sdk.maps.constants.MapplsConstants;
import com.mappls.sdk.maps.rctmgl.components.camera.constants.CameraMode;

import java.lang.ref.WeakReference;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.RunnableFuture;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

/**
 * Created by Saksham on 27-01-2021
 */

public class CameraMapplsPinUpdateItem implements RunnableFuture<Void> {

    private CameraMapplsPinUpdate cameraMapplsPinUpdate;
    private CameraMapplsPinBoundUpdate cameraMapplsPinBoundUpdate;
    private int mDuration;
    private MapplsMap.CancelableCallback mCallback;
    private int mCameraMode;

    private boolean isCameraActionFinished;
    private boolean isCameraActionCancelled;

    private WeakReference<MapplsMap> mMap;

    public CameraMapplsPinUpdateItem(MapplsMap map, CameraMapplsPinUpdate cameraMapplsPinUpdate, int duration, MapplsMap.CancelableCallback callback, @CameraMode.Mode int cameraMode) {
        this.cameraMapplsPinUpdate = cameraMapplsPinUpdate;
        this.mDuration = duration;
        this.mCallback = callback;
        this.mCameraMode = cameraMode;
        mMap = new WeakReference<>(map);
    }

    public CameraMapplsPinUpdateItem(MapplsMap map, CameraMapplsPinBoundUpdate cameraMapplsPinBoundUpdate, int duration, MapplsMap.CancelableCallback callback, @CameraMode.Mode int cameraMode) {
       this.cameraMapplsPinBoundUpdate = cameraMapplsPinBoundUpdate;
        this.mDuration = duration;
        this.mCallback = callback;
        this.mCameraMode = cameraMode;
        mMap = new WeakReference<>(map);
    }

    @Override
    public void run() {
        final MapplsMap.CancelableCallback callback = new MapplsMap.CancelableCallback() {
            @Override
            public void onCancel() {
//                if(cameraMapplsPinPosition != null) {
//                    if(cameraMapplsPincPosition.bearing >= 0) {
//                        mMap.get().moveCamera(CameraUpdateFactory.bearingTo(cameraMapplsPinPosition.bearing));
//                    }
//                    if(cameraMapplsPinPosition.tilt >= 0) {
//                        mMap.get().moveCamera(CameraUpdateFactory.tiltTo(cameraMapplsPinPosition.tilt));
//                    }
//                }
                handleCallbackResponse(true);
            }

            @Override
            public void onFinish() {
//                if(cameraMapplsPinPosition != null) {
//                    if(cameraMapplsPinPosition.bearing >= 0) {
//                        mMap.get().moveCamera(CameraUpdateFactory.bearingTo(cameraMapplsPinPosition.bearing));
//                    }
//                    if(cameraMapplsPinPosition.tilt >= 0) {
//                        mMap.get().moveCamera(CameraUpdateFactory.tiltTo(cameraMapplsPinPosition.tilt));
//                    }
//                }
                handleCallbackResponse(false);
            }
        };

        MapplsMap map = mMap.get();
        if (map == null) {
            isCameraActionCancelled = true;
            return;
        }

        // animateCamera / easeCamera only allows positive duration
        if (mDuration == 0 || mCameraMode == CameraMode.NONE) {
            if(cameraMapplsPinUpdate != null) {
                map.moveCamera(cameraMapplsPinUpdate, callback);
            } else {
                map.moveCamera(cameraMapplsPinBoundUpdate,callback);
            }
            return;
        }

        // On iOS a duration of -1 means default or dynamic duration (based on flight-path length)
        // On Android we can fallback to Mappls default duration as there is no such API
        int duration = mDuration < 0 ? MapplsConstants.ANIMATION_DURATION : mDuration;

        if (mCameraMode == CameraMode.FLIGHT) {
            if(cameraMapplsPinUpdate != null) {
                map.animateCamera(cameraMapplsPinUpdate, duration, callback);

            } else {
                map.animateCamera(cameraMapplsPinBoundUpdate,duration,callback);
                //map.animateCamera(mMapplsPinList, mBoundsPaddingLeft, mBoundsPaddingTop, mBoundsPaddingRight, mBoundsPaddingBottom, duration, callback);
            }
        } else if (mCameraMode == CameraMode.LINEAR) {
            if(cameraMapplsPinUpdate != null) {
                map.easeCamera(cameraMapplsPinUpdate, duration, false, callback);

            } else {
                map.easeCamera(cameraMapplsPinBoundUpdate,duration,callback);
            }
        } else if (mCameraMode == CameraMode.EASE) {
           if(cameraMapplsPinUpdate != null) {
                map.easeCamera(cameraMapplsPinUpdate, duration, true, callback);

            } else {
                map.easeCamera(cameraMapplsPinBoundUpdate,duration,callback);
            }
        }
    }

    @Override
    public boolean cancel(boolean mayInterruptIfRunning) {
        return false;
    }

    @Override
    public boolean isCancelled() {
        return isCameraActionCancelled;
    }

    @Override
    public boolean isDone() {
        return isCameraActionFinished;
    }

    @Override
    public Void get() throws ExecutionException, InterruptedException {
        return null;
    }

    @Override
    public Void get(long timeout, TimeUnit unit) throws ExecutionException, InterruptedException, TimeoutException {
        return null;
    }


    private void handleCallbackResponse(boolean isCancel) {
        if (mCallback == null) {
            return;
        }

        isCameraActionCancelled = isCancel;
        isCameraActionFinished = !isCancel;

        if (isCancel) {
            mCallback.onCancel();
        } else {
            mCallback.onFinish();
        }
    }
}
