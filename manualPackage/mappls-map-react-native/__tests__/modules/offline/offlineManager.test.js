import {NativeModules, Platform} from 'react-native';

import MapplsGL from '../../../javascript';
import {OfflineModuleEventEmitter} from '../../../javascript/modules/offline/offlineManager';

describe('offlineManager', () => {
  const packOptions = {
    name: 'test',
    styleURL: 'mapbox://fake-style-url',
    bounds: [
      [0, 1],
      [2, 3],
    ],
    minZoom: 1,
    maxZoom: 22,
  };

  const mockOnProgressEvent = {
    type: 'offlinestatus',
    payload: {
      name: packOptions.name,
      state: MapplsGL.OfflinePackDownloadState.Active,
      progress: 50.0,
    },
  };

  const mockOnProgressCompleteEvent = {
    type: 'offlinestatus',
    payload: {
      name: packOptions.name,
      state: MapplsGL.OfflinePackDownloadState.Complete,
      progress: 100.0,
    },
  };

  const mockErrorEvent = {
    type: 'offlineerror',
    payload: {
      name: packOptions.name,
      message: 'unit test error',
    },
  };

  afterEach(async () => {
    const packs = await MapplsGL.offlineManager.getPacks();
    for (const pack of packs) {
      await MapplsGL.offlineManager.deletePack(pack.name);
    }

    jest.clearAllMocks();
  });

  it('should create pack', async () => {
    let offlinePack = await MapplsGL.offlineManager.getPack(packOptions.name);
    expect(offlinePack).toBeFalsy();

    await MapplsGL.offlineManager.createPack(packOptions);
    offlinePack = await MapplsGL.offlineManager.getPack(packOptions.name);
    expect(offlinePack).toBeTruthy();
  });

  it('should delete pack', async () => {
    await MapplsGL.offlineManager.createPack(packOptions);
    let offlinePack = await MapplsGL.offlineManager.getPack(packOptions.name);
    expect(offlinePack).toBeTruthy();

    await MapplsGL.offlineManager.deletePack(packOptions.name);
    offlinePack = await MapplsGL.offlineManager.getPack(packOptions.name);
    expect(offlinePack).toBeFalsy();
  });

  it('should set max tile count limit', () => {
    const expectedLimit = 2000;
    const spy = jest.spyOn(NativeModules.MGLOfflineModule, 'setTileCountLimit');
    MapplsGL.offlineManager.setTileCountLimit(expectedLimit);
    expect(spy).toHaveBeenCalledWith(expectedLimit);
    spy.mockRestore();
  });

  it('should set progress event throttle value', () => {
    const expectedThrottleValue = 500;
    const spy = jest.spyOn(
      NativeModules.MGLOfflineModule,
      'setProgressEventThrottle',
    );
    MapplsGL.offlineManager.setProgressEventThrottle(expectedThrottleValue);
    expect(spy).toHaveBeenCalledWith(expectedThrottleValue);
    spy.mockRestore();
  });

  describe('Events', () => {
    it('should subscribe to native events', async () => {
      const spy = jest.spyOn(OfflineModuleEventEmitter, 'addListener');
      const noop = () => {};
      await MapplsGL.offlineManager.createPack(packOptions, noop, noop);
      expect(spy).toHaveBeenCalledTimes(2);
      spy.mockClear();
    });

    it('should call progress listener', async () => {
      const listener = jest.fn();
      await MapplsGL.offlineManager.createPack(packOptions, listener);
      const expectedOfflinePack = await MapplsGL.offlineManager.getPack(
        packOptions.name,
      );
      MapplsGL.offlineManager._onProgress(mockOnProgressEvent);
      expect(listener).toHaveBeenCalledWith(
        expectedOfflinePack,
        mockOnProgressEvent.payload,
      );
    });

    it('should call error listener', async () => {
      const listener = jest.fn();
      await MapplsGL.offlineManager.createPack(packOptions, null, listener);
      const expectedOfflinePack = await MapplsGL.offlineManager.getPack(
        packOptions.name,
      );
      MapplsGL.offlineManager._onError(mockErrorEvent);
      expect(listener).toHaveBeenCalledWith(
        expectedOfflinePack,
        mockErrorEvent.payload,
      );
    });

    it('should not call listeners after unsubscribe', async () => {
      const listener = jest.fn();
      await MapplsGL.offlineManager.createPack(packOptions, listener, listener);
      MapplsGL.offlineManager.unsubscribe(packOptions.name);
      MapplsGL.offlineManager._onProgress(mockOnProgressEvent);
      MapplsGL.offlineManager._onError(mockErrorEvent);
      expect(listener).not.toHaveBeenCalled();
    });

    it('should unsubscribe from native events', async () => {
      const noop = () => {};

      await MapplsGL.offlineManager.createPack(packOptions, noop, noop);
      MapplsGL.offlineManager.unsubscribe(packOptions.name);

      expect(
        MapplsGL.offlineManager.subscriptionProgress.remove,
      ).toHaveBeenCalledTimes(1);
      expect(
        MapplsGL.offlineManager.subscriptionError.remove,
      ).toHaveBeenCalledTimes(1);
    });

    it('should unsubscribe event listeners once a pack download has completed', async () => {
      const listener = jest.fn();
      await MapplsGL.offlineManager.createPack(packOptions, listener, listener);

      expect(
        MapplsGL.offlineManager._hasListeners(
          packOptions.name,
          MapplsGL.offlineManager._progressListeners,
        ),
      ).toBeTruthy();

      expect(
        MapplsGL.offlineManager._hasListeners(
          packOptions.name,
          MapplsGL.offlineManager._errorListeners,
        ),
      ).toBeTruthy();

      MapplsGL.offlineManager._onProgress(mockOnProgressCompleteEvent);

      expect(
        MapplsGL.offlineManager._hasListeners(
          packOptions.name,
          MapplsGL.offlineManager._progressListeners,
        ),
      ).toBeFalsy();

      expect(
        MapplsGL.offlineManager._hasListeners(
          packOptions.name,
          MapplsGL.offlineManager._errorListeners,
        ),
      ).toBeFalsy();
    });
  });

  describe('Android', () => {
    beforeEach(() => (Platform.OS = 'android'));

    it('should set pack observer manually', async () => {
      const spy = jest.spyOn(NativeModules.MGLOfflineModule, 'setPackObserver');

      const name = `test-${Date.now()}`;
      const noop = () => {};
      const options = {...packOptions, name};
      await MapplsGL.offlineManager.createPack(options);
      await MapplsGL.offlineManager.subscribe(name, noop, noop);

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should not set pack observer manually during create flow', async () => {
      const spy = jest.spyOn(NativeModules.MGLOfflineModule, 'setPackObserver');

      const name = `test-${Date.now()}`;
      const noop = () => {};
      const options = {...packOptions, name};
      await MapplsGL.offlineManager.createPack(options, noop, noop);

      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('iOS', () => {
    beforeEach(() => (Platform.OS = 'ios'));

    it('should not set pack observer manually', async () => {
      const spy = jest.spyOn(NativeModules.MGLOfflineModule, 'setPackObserver');

      const name = `test-${Date.now()}`;
      const noop = () => {};
      const options = {...packOptions, name};
      await MapplsGL.offlineManager.createPack(options);
      await MapplsGL.offlineManager.subscribe(name, noop, noop);

      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });
  });
});
