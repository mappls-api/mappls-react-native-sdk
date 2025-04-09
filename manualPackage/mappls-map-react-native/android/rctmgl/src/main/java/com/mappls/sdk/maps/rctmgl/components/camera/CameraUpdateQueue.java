package com.mappls.sdk.maps.rctmgl.components.camera;

import com.mappls.sdk.maps.rctmgl.components.mapview.RCTMGLMapView;

import java.util.LinkedList;
import java.util.Queue;


/**
 * Created by nickitaliano on 9/5/17.
 */

public class CameraUpdateQueue {
    private Queue<CameraStop> mQueue;

    private OnCompleteAllListener mCompleteListener;

    public interface OnCompleteAllListener {
        void onCompleteAll();
    }

    public CameraUpdateQueue() {
        mQueue = new LinkedList<>();
    }

    public void offer(CameraStop item) {
        mQueue.offer(item);
    }

    public int size() {
        return mQueue.size();
    }

    public boolean isEmpty() {
        return mQueue.isEmpty();
    }

    public void flush() {
        while (mQueue.size() > 0) {
            mQueue.remove();
        }
        mQueue = new LinkedList<>();
    }

    public void setOnCompleteAllListener(OnCompleteAllListener listener) {
        mCompleteListener = listener;
    }

    public void execute(RCTMGLMapView map) {
        if (mQueue.isEmpty()) {
            if (mCompleteListener != null) {
                mCompleteListener.onCompleteAll();
            }
            return;
        }

        final CameraStop stop = mQueue.poll();
        if (stop == null) {
            return;
        }

        if(stop.isMapplsPinStrategyEnabled()) {
            CameraMapplsPinUpdateItem item = stop.toCameraMapplsPinUpdate(map);
            item.run();
        } else {
            CameraUpdateItem item = stop.toCameraUpdate(map);
            item.run();
        }
        execute(map);
    }
}
