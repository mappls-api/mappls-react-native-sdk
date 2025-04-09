package com.mappls.sdk.maps.rctmgl.components.camera;

import androidx.annotation.NonNull;

import com.mappls.sdk.maps.rctmgl.components.camera.constants.CameraMode;
import com.mappls.sdk.maps.MapplsMap;
import com.mappls.sdk.maps.camera.CameraUpdate;
import com.mappls.sdk.maps.constants.MapplsConstants;

import java.lang.ref.WeakReference;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.RunnableFuture;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

/**
 * Created by nickitaliano on 9/5/17.
 */

public class CameraUpdateItem implements RunnableFuture<Void> {
    private int mDuration;
    private MapplsMap.CancelableCallback mCallback;
    private CameraUpdate mCameraUpdate;
    private int mCameraMode;

    private boolean isCameraActionFinished;
    private boolean isCameraActionCancelled;

    private WeakReference<MapplsMap> mMap;

    public CameraUpdateItem(MapplsMap map, CameraUpdate update, int duration, MapplsMap.CancelableCallback callback, @CameraMode.Mode int cameraMode) {
        mCameraUpdate = update;
        mDuration = duration;
        mCallback = callback;
        mCameraMode = cameraMode;
        mMap = new WeakReference<>(map);
    }

    public int getDuration() {
        return mDuration;
    }

    @Override
    public void run() {
        final MapplsMap.CancelableCallback callback = new MapplsMap.CancelableCallback() {
            @Override
            public void onCancel() {
                handleCallbackResponse(true);
            }

            @Override
            public void onFinish() {
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
            map.moveCamera(mCameraUpdate, callback);
            return;
        }

        // On iOS a duration of -1 means default or dynamic duration (based on flight-path length)
        // On Android we can fallback to Mappls default duration as there is no such API
        int duration = mDuration < 0 ? MapplsConstants.ANIMATION_DURATION : mDuration;

        if (mCameraMode == CameraMode.FLIGHT) {
            map.animateCamera(mCameraUpdate, duration, callback);
        } else if (mCameraMode == CameraMode.LINEAR) {
            map.easeCamera(mCameraUpdate, duration, false, callback);
        } else if (mCameraMode == CameraMode.EASE) {
            map.easeCamera(mCameraUpdate, duration, true, callback);
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
    public Void get() throws InterruptedException, ExecutionException {
        return null;
    }

    @Override
    public Void get(long timeout, @NonNull TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException {
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
