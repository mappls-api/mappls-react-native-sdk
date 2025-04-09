import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  NativeModules,
  requireNativeComponent,
  Platform,
} from 'react-native';
import {debounce} from 'debounce';

import {makePoint, makeLatLngBounds} from '../utils/geoUtils';
import {
  isFunction,
  isNumber,
  toJSONString,
  isAndroid,
  viewPropTypes,
} from '../utils';
import {getFilter} from '../utils/filterUtils';
import IndoorView from '../utils/MapViewIndoor';
// import Logger from '../utils/Logger';

import NativeBridgeComponent from './NativeBridgeComponent';

const MapplsGL = NativeModules.MGLModule;
if (MapplsGL == null) {
  console.error(
    'Native part of Mappls React Native libraries were not registered properly, double check our native installation guides.',
  );
}

export const NATIVE_MODULE_NAME = 'RCTMGLMapView';

export const ANDROID_TEXTURE_NATIVE_MODULE_NAME = 'RCTMGLAndroidTextureMapView';

const styles = StyleSheet.create({
  matchParent: {flex: 1},
});

// const defaultStyleURL = MapplsGL.StyleURL.Street;

/**
 * MapView backed by Mappls Native GL
 */
class MapView extends NativeBridgeComponent(React.Component) {
  static propTypes = {
    ...viewPropTypes,

    /**
     * The distance from the edges of the map view’s frame to the edges of the map view’s logical viewport.
     */
    contentInset: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.number,
    ]),

    /**
     * Style for wrapping React Native View
     */
    style: PropTypes.any,

    /**
     *  @deprecated Style URL for map - notice, if non is set it _will_ default to `MapplsGL.StyleURL.Street`
     */
    styleURL: PropTypes.string,

    /**
     * Mappls Style for map
     */
     mapplsStyle: PropTypes.string,

     /**
      * indoor layer position on map
      */

     indoorLayerPosition: PropTypes.oneOf(['topLeft','topRight','bottomLeft','bottomRight']),


    /**
     * iOS: The preferred frame rate at which the map view is rendered.
     * The default value for this property is MGLMapViewPreferredFramesPerSecondDefault,
     * which will adaptively set the preferred frame rate based on the capability of
     * the user’s device to maintain a smooth experience. This property can be set to arbitrary integer values.
     *
     * Android: The maximum frame rate at which the map view is rendered, but it can't excess the ability of device hardware.
     * This property can be set to arbitrary integer values.
     */
    preferredFramesPerSecond: PropTypes.number,

    /**
     * Automatically change the language of the map labels to the system’s preferred language,
     * this is not something that can be toggled on/off
     */
    localizeLabels: PropTypes.bool,

    /**
     * Enable/Disable zoom on the map
     */
    zoomEnabled: PropTypes.bool,

    /**
     * Enable/Disable scroll on the map
     */
    scrollEnabled: PropTypes.bool,

    /**
     * Enable/Disable pitch on map
     */
    pitchEnabled: PropTypes.bool,

    /**
     * Enable/Disable rotation on map
     */
    rotateEnabled: PropTypes.bool,

    /**
     * The Mappls terms of service, which governs the use of Mapbox-hosted vector tiles and styles,
     * [requires](https://www.mapbox.com/help/how-attribution-works/) these copyright notices to accompany any map that features Mapbox-designed styles, OpenStreetMap data, or other Mappls data such as satellite or terrain data.
     * If that applies to this map view, do not hide this view or remove any notices from it.
     *
     * You are additionally [required](https://www.mapbox.com/help/how-mobile-apps-work/#telemetry) to provide users with the option to disable anonymous usage and location sharing (telemetry).
     * If this view is hidden, you must implement this setting elsewhere in your app. See our website for [Android](https://www.mapbox.com/android-docs/map-sdk/overview/#telemetry-opt-out) and [iOS](https://www.mapbox.com/ios-sdk/#telemetry_opt_out) for implementation details.
     *
     * Enable/Disable attribution on map. For iOS you need to add MGLMapboxMetricsEnabledSettingShownInApp=YES
     * to your Info.plist
     */
    attributionEnabled: PropTypes.bool,

    /**
     * Adds attribution offset, e.g. `{top: 8, left: 8}` will put attribution button in top-left corner of the map
     */
    attributionPosition: PropTypes.oneOfType([
      PropTypes.shape({top: PropTypes.number, left: PropTypes.number}),
      PropTypes.shape({top: PropTypes.number, right: PropTypes.number}),
      PropTypes.shape({bottom: PropTypes.number, left: PropTypes.number}),
      PropTypes.shape({bottom: PropTypes.number, right: PropTypes.number}),
    ]),

    /**
     * MapView's tintColor
     */
    tintColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

    /**
     * Enable/Disable the logo on the map.
     */
    logoEnabled: PropTypes.bool,


    /**
     * required to show indoor layer
     */
     layerControlEnabled:PropTypes.bool,

    /**
     * Adds logo offset, e.g. `{top: 8, left: 8}` will put the logo in top-left corner of the map
     */
    logoPosition: PropTypes.oneOfType([
      PropTypes.shape({top: PropTypes.number, left: PropTypes.number}),
      PropTypes.shape({top: PropTypes.number, right: PropTypes.number}),
      PropTypes.shape({bottom: PropTypes.number, left: PropTypes.number}),
      PropTypes.shape({bottom: PropTypes.number, right: PropTypes.number}),
    ]),

    /**
     * Enable/Disable the compass from appearing on the map
     */
    compassEnabled: PropTypes.bool,

    /**
     * Change corner of map the compass starts at. 0: TopLeft, 1: TopRight, 2: BottomLeft, 3: BottomRight
     */
    compassViewPosition: PropTypes.number,

    /**
     * Add margins to the compass with x and y values
     */
    compassViewMargins: PropTypes.object,

    /**
     * [Android only] Enable/Disable use of GLSurfaceView insted of TextureView.
     */
    surfaceView: PropTypes.bool,

    /**
     * Map press listener, gets called when a user presses the map
     */
    onPress: PropTypes.func,

    /**
     * Map long press listener, gets called when a user long presses the map
     */
    onLongPress: PropTypes.func,

    /**
     * Map error listener, gets called when a error occured
     */
    onMapError: PropTypes.func,


    /**
     * Map error listener, gets called when a error occured
     */
     onPlaceClick: PropTypes.func,

    /**
     * Map available style listener, 
     */
     didLoadedMapplsMapsStyles: PropTypes.func,

     onMapReinit: PropTypes.func,


     showIndoorControl: PropTypes.func,
 
     hideIndoorControl:PropTypes.func,
 
    /**
     * This event is triggered whenever the currently displayed map region is about to change.
     *
     * @param {PointFeature} feature - The geojson point feature at the camera center, properties contains zoomLevel, visibleBounds
     */
    onRegionWillChange: PropTypes.func,

    /**
     * This event is triggered whenever the currently displayed map region is changing.
     *
     * @param {PointFeature} feature - The geojson point feature at the camera center, properties contains zoomLevel, visibleBounds
     */
    onRegionIsChanging: PropTypes.func,

    /**
     * This event is triggered whenever the currently displayed map region finished changing
     *
     * @param {PointFeature} feature - The geojson point feature at the camera center, properties contains zoomLevel, visibleBounds
     */
    onRegionDidChange: PropTypes.func,

    /**
     * This event is triggered when the map is about to start loading a new map style.
     */
    onWillStartLoadingMap: PropTypes.func,

    /**
     * This is triggered when the map has successfully loaded a new map style.
     */
    onDidFinishLoadingMap: PropTypes.func,

    /**
     * This event is triggered when the map has failed to load a new map style.
     */
    onDidFailLoadingMap: PropTypes.func,

    /**
     * This event is triggered when the map will start rendering a frame.
     */
    onWillStartRenderingFrame: PropTypes.func,

    /**
     * This event is triggered when the map finished rendering a frame.
     */
    onDidFinishRenderingFrame: PropTypes.func,

    /**
     * This event is triggered when the map fully finished rendering a frame.
     */
    onDidFinishRenderingFrameFully: PropTypes.func,

    /**
     * This event is triggered when the map will start rendering the map.
     */
    onWillStartRenderingMap: PropTypes.func,

    /**
     * This event is triggered when the map finished rendering the map.
     */
    onDidFinishRenderingMap: PropTypes.func,

    /**
     * This event is triggered when the map fully finished rendering the map.
     */
    onDidFinishRenderingMapFully: PropTypes.func,

    /**
     * This event is triggered when the user location is updated.
     */
    onUserLocationUpdate: PropTypes.func,

    /**
     * This event is triggered when a style has finished loading.
     */
    onDidFinishLoadingStyle: PropTypes.func,

    /**
     * The emitted frequency of regionwillchange events
     */
    regionWillChangeDebounceTime: PropTypes.number,

    /**
     * The emitted frequency of regiondidchange events
     */
    regionDidChangeDebounceTime: PropTypes.number,

    enableGeoAnalyticsInfoWindow: PropTypes.bool,

    anchorRotateOrZoomGesturesToCenter: PropTypes.bool,

    geoAnalyticsSelectedFeatures: PropTypes.func,

    enableTraffic: PropTypes.bool,

    enableTrafficClosure: PropTypes.bool,

    enableTrafficFreeFlow: PropTypes.bool,

    enableTrafficNonFreeFlow: PropTypes.bool,

    enableTrafficStopIcon: PropTypes.bool,

    logoClickEnabled: PropTypes.bool

  };

  static defaultProps = {
    localizeLabels: false,
    scrollEnabled: true,
    pitchEnabled: true,
    rotateEnabled: true,
    attributionEnabled: true,
    logoEnabled: true,
    logoClickEnabled: true,
    surfaceView: false,
    regionWillChangeDebounceTime: 10,
    regionDidChangeDebounceTime: 500,
    layerControlEnabled:true,
    enableTraffic: false,
    enableTrafficClosure: true,
    enableTrafficFreeFlow: true,
    enableTrafficNonFreeFlow: true,
    enableTrafficStopIcon:true,
  };

  constructor(props) {
    super(props, NATIVE_MODULE_NAME);

    // this.logger = Logger.sharedInstance();
    // this.logger.start();

    this.state = {
      isReady: null,
      region: null,
      width: 0,
      height: 0,
      isUserInteraction: false,
      showIndoorControl:false,
      indoorData:undefined,
      currentFloor:undefined,
    };

    this._onPress = this._onPress.bind(this);
    this._onLongPress = this._onLongPress.bind(this);
    this._onMapError = this._onMapError.bind(this);
    this._onPlaceClick = this._onPlaceClick.bind(this);
    this._didLoadedMapplsMapsStyles = this._didLoadedMapplsMapsStyles.bind(this);
    this._onMapReinit = this._onMapReinit.bind(this);
    this._showIndoorControl = this._showIndoorControl.bind(this);
    this._hideIndoorControl = this._hideIndoorControl.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onLayout = this._onLayout.bind(this);
    this._geoAnalyticsSelectedFeatures = this._geoAnalyticsSelectedFeatures.bind(this);

    // debounced map change methods
    this._onDebouncedRegionWillChange = debounce(
      this._onRegionWillChange.bind(this),
      props.regionWillChangeDebounceTime,
      true,
    );

    this._onDebouncedRegionDidChange = debounce(
      this._onRegionDidChange.bind(this),
      props.regionDidChangeDebounceTime,
    );
  }

  componentDidMount() {
    this._setHandledMapChangedEvents(this.props);
  }

  componentWillUnmount() {
    this._onDebouncedRegionWillChange.clear();
    this._onDebouncedRegionDidChange.clear();
    // this.logger.stop();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this._setHandledMapChangedEvents(nextProps);
  }

  _setHandledMapChangedEvents(props) {
    if (isAndroid()) {
      const events = [];

      if (props.onRegionWillChange) {
        events.push(MapplsGL.EventTypes.RegionWillChange);
      }
      if (props.onRegionIsChanging) {
        events.push(MapplsGL.EventTypes.RegionIsChanging);
      }
      if (props.onRegionDidChange) {
        events.push(MapplsGL.EventTypes.RegionDidChange);
      }
      if (props.onUserLocationUpdate) {
        events.push(MapplsGL.EventTypes.UserLocationUpdated);
      }
      if (props.onWillStartLoadingMap) {
        events.push(MapplsGL.EventTypes.WillStartLoadingMap);
      }
      if (props.onDidFinishLoadingMap) {
        events.push(MapplsGL.EventTypes.DidFinishLoadingMap);
      }
      if (props.onDidFailLoadingMap) {
        events.push(MapplsGL.EventTypes.DidFailLoadingMap);
      }
      if (props.onWillStartRenderingFrame) {
        events.push(MapplsGL.EventTypes.WillStartRenderingFrame);
      }
      if (props.onDidFinishRenderingFrame) {
        events.push(MapplsGL.EventTypes.DidFinishRenderingFrame);
      }
      if (props.onDidFinishRenderingFrameFully) {
        events.push(MapplsGL.EventTypes.DidFinishRenderingFrameFully);
      }
      if (props.onWillStartRenderingMap) {
        events.push(MapplsGL.EventTypes.WillStartRenderingMap);
      }
      if (props.onDidFinishRenderingMap) {
        events.push(MapplsGL.EventTypes.DidFinishRenderingMap);
      }
      if (props.onDidFinishRenderingMapFully) {
        events.push(MapplsGL.EventTypes.DidFinishRenderingMapFully);
      }
      if (props.onDidFinishLoadingStyle) {
        events.push(MapplsGL.EventTypes.DidFinishLoadingStyle);
      }

      this._runNativeCommand(
        'setHandledMapChangedEvents',
        this._nativeRef,
        events,
      );
    }
  }

  /**
   * Converts a geographic coordinate to a point in the given view’s coordinate system.
   *
   * @example
   * const pointInView = await this._map.getPointInView([-37.817070, 144.949901]);
   *
   * @param {Array<Number>} coordinate - A point expressed in the map view's coordinate system.
   * @return {Array}
   */
  async getPointInView(coordinate) {
    const res = await this._runNativeCommand(
      'getPointInView',
      this._nativeRef,
      [coordinate],
    );
    return res.pointInView;
  }


  async getMapplsPinAssociation(mapplsPins) {
    if(Platform.OS === 'ios') {
    const res = await this._runNativeCommand(
      'getMapplsPinAssociation',
      this._nativeRef,
      [mapplsPins],
    );
    return res.status;
    }
    return 0;
  }

  /**
   * Converts a point in the given view’s coordinate system to a geographic coordinate.
   *
   * @example
   * const coordinate = await this._map.getCoordinateFromView([100, 100]);
   *
   * @param {Array<Number>} point - A point expressed in the given view’s coordinate system.
   * @return {Array}
   */
  async getCoordinateFromView(point) {
    const res = await this._runNativeCommand(
      'getCoordinateFromView',
      this._nativeRef,
      [point],
    );
    return res.coordinateFromView;
  }

  /**
   * The coordinate bounds(ne, sw) visible in the users’s viewport.
   *
   * @example
   * const visibleBounds = await this._map.getVisibleBounds();
   *
   * @return {Array}
   */
  async getVisibleBounds() {
    const res = await this._runNativeCommand(
      'getVisibleBounds',
      this._nativeRef,
    );
    return res.visibleBounds;
  }

  async isEnableTraffic() {
    const res = await this._runNativeCommand(
      'getEnableTraffic',
      this._nativeRef,
    );
    return res.isEnableTraffic;
  }

  async isEnableTrafficClosure () {
    const res = await this._runNativeCommand(
      'getEnableTrafficClosure',
      this._nativeRef,
    );
    return res.isEnableTrafficClosure;
  }

  async isEnableTrafficFreeFlow() {
    const res = await this._runNativeCommand(
      'getEnableTrafficFreeFlow',
      this._nativeRef,
    );
    return res.isEnableTrafficFreeFlow;
  }

  async isEnableTrafficNonFreeFlow() {
    const res = await this._runNativeCommand(
      'getEnableTrafficNonFreeFlow',
      this._nativeRef,
    );
    return res.isEnableTrafficNonFreeFlow;
  }

  async isEnableTrafficStopIcon() {
    const res = await this._runNativeCommand(
      'getEnableTrafficStopIcon',
      this._nativeRef,
    );
    return res.isEnableTrafficStopIcon;
  }

  /**
   * Returns an array of rendered map features that intersect with a given point.
   *
   * @example
   * this._map.queryRenderedFeaturesAtPoint([30, 40], ['==', 'type', 'Point'], ['id1', 'id2'])
   *
   * @param  {Array<Number>} coordinate - A point expressed in the map view’s coordinate system.
   * @param  {Array=} filter - A set of strings that correspond to the names of layers defined in the current style. Only the features contained in these layers are included in the returned array.
   * @param  {Array=} layerIDs - A array of layer id's to filter the features by
   * @return {FeatureCollection}
   */
  async queryRenderedFeaturesAtPoint(coordinate, filter = [], layerIDs = []) {
    if (!coordinate || coordinate.length < 2) {
      throw new Error('Must pass in valid coordinate[lng, lat]');
    }

    const res = await this._runNativeCommand(
      'queryRenderedFeaturesAtPoint',
      this._nativeRef,
      [coordinate, getFilter(filter), layerIDs],
    );

    if (isAndroid()) {
      return JSON.parse(res.data);
    }

    return res.data;
  }

  /**
   * Returns an array of rendered map features that intersect with the given rectangle,
   * restricted to the given style layers and filtered by the given predicate.
   *
   * @example
   * this._map.queryRenderedFeaturesInRect([30, 40, 20, 10], ['==', 'type', 'Point'], ['id1', 'id2'])
   *
   * @param  {Array<Number>} bbox - A rectangle expressed in the map view’s coordinate system.
   * @param  {Array=} filter - A set of strings that correspond to the names of layers defined in the current style. Only the features contained in these layers are included in the returned array.
   * @param  {Array=} layerIDs -  A array of layer id's to filter the features by
   * @return {FeatureCollection}
   */
  async queryRenderedFeaturesInRect(bbox, filter = [], layerIDs = []) {
    if (!bbox || bbox.length !== 4) {
      throw new Error(
        'Must pass in a valid bounding box[top, right, bottom, left]',
      );
    }
    const res = await this._runNativeCommand(
      'queryRenderedFeaturesInRect',
      this._nativeRef,
      [bbox, getFilter(filter), layerIDs],
    );

    if (isAndroid()) {
      return JSON.parse(res.data);
    }

    return res.data;
  }

  /**
   * Takes snapshot of map with current tiles and returns a URI to the image
   * @param  {Boolean} writeToDisk If true will create a temp file, otherwise it is in base64
   * @return {String}
   */
  async takeSnap(writeToDisk = false) {
    const res = await this._runNativeCommand('takeSnap', this._nativeRef, [
      writeToDisk,
    ]);
    return res.uri;
  }

  /**
   * Returns the current zoom of the map view.
   *
   * @example
   * const zoom = await this._map.getZoom();
   *
   * @return {Number}
   */

  async getZoom() {
    const res = await this._runNativeCommand('getZoom', this._nativeRef);
    return res.zoom;
  }

  /**
   * Returns the map's geographical centerpoint
   *
   * @example
   * const center = await this._map.getCenter();
   *
   * @return {Array<Number>} Coordinates
   */
  async getCenter() {
    const res = await this._runNativeCommand('getCenter', this._nativeRef);
    return res.center;
  }

  /**
   * Sets the visibility of all the layers referencing the specified `sourceLayerId` and/or `sourceId`
   *
   * @example
   * await this._map.setSourceVisibility(false, 'composite', 'building')
   *
   * @param {boolean} visible - Visibility of the layers
   * @param {String} sourceId - Identifier of the target source (e.g. 'composite')
   * @param {String=} sourceLayerId - Identifier of the target source-layer (e.g. 'building')
   */
  setSourceVisibility(visible, sourceId, sourceLayerId = undefined) {
    this._runNativeCommand('setSourceVisibility', this._nativeRef, [
      visible,
      sourceId,
      sourceLayerId,
    ]);
  }

  loadMap() {
    console.log('loadMap');
    this._runNativeCommand('loadMap', this._nativeRef)
  }

  /**
   * Show the attribution and telemetry action sheet.
   * If you implement a custom attribution button, you should add this action to the button.
   */
  showAttribution() {
    return this._runNativeCommand('showAttribution', this._nativeRef);
  }

  _createStopConfig(config = {}) {
    const stopConfig = {
      mode: isNumber(config.mode) ? config.mode : MapplsGL.CameraModes.Ease,
      pitch: config.pitch,
      heading: config.heading,
      duration: config.duration || 2000,
      zoom: config.zoom,
    };

    if (config.centerCoordinate) {
      stopConfig.centerCoordinate = toJSONString(
        makePoint(config.centerCoordinate),
      );
    }

    if (config.bounds && config.bounds.ne && config.bounds.sw) {
      const {ne, sw, paddingLeft, paddingRight, paddingTop, paddingBottom} =
        config.bounds;
      stopConfig.bounds = toJSONString(makeLatLngBounds(ne, sw));
      stopConfig.boundsPaddingTop = paddingTop || 0;
      stopConfig.boundsPaddingRight = paddingRight || 0;
      stopConfig.boundsPaddingBottom = paddingBottom || 0;
      stopConfig.boundsPaddingLeft = paddingLeft || 0;
    }

    return stopConfig;
  }

  _onPress(e) {
    if (isFunction(this.props.onPress)) {
      this.props.onPress(e.nativeEvent.payload);
    }
  }

  _onLongPress(e) {
    if (isFunction(this.props.onLongPress)) {
      this.props.onLongPress(e.nativeEvent.payload);
    }
  }

  _onMapError(e) {
    if (isFunction(this.props.onMapError)) {
      this.props.onMapError(e.nativeEvent.payload);
    }
  }

  _onPlaceClick(e) {
    if (isFunction(this.props.onPlaceClick)) {
      this.props.onPlaceClick(e.nativeEvent.payload.mapplsPin);
    }
  }

  _didLoadedMapplsMapsStyles(e) {
    if (isFunction(this.props.didLoadedMapplsMapsStyles)) {
      this.props.didLoadedMapplsMapsStyles(e.nativeEvent.payload.mappls_styles);
    }
  }

  _onMapReinit(e) {
    if(isFunction(this.props.onMapReinit)) {
      this.props.onMapReinit(e.nativeEvent.payload);
    }
  }

  _showIndoorControl(e) {
    if(isFunction(this.props.showIndoorControl)) {
      this.props.showIndoorControl(e.nativeEvent.payload)
      this.setState({
        showIndoorControl:true,
        indoorData:e.nativeEvent.payload
      })
    }
  }

  _hideIndoorControl() {
    if(isFunction(this.props.hideIndoorControl)) {
      this.props.hideIndoorControl();
    }
    this.setState({showIndoorControl:false})
  }

  _onRegionWillChange(payload) {
    if (isFunction(this.props.onRegionWillChange)) {
      this.props.onRegionWillChange(payload);
    }
    this.setState({isUserInteraction: payload.properties.isUserInteraction});
  }

  _onRegionDidChange(payload) {
    if (isFunction(this.props.onRegionDidChange)) {
      this.props.onRegionDidChange(payload);
    }
    this.setState({region: payload});
  }

  _onChange(e) {
    const {regionWillChangeDebounceTime, regionDidChangeDebounceTime} =
      this.props;
    const {type, payload} = e.nativeEvent;
    let propName = '';

    switch (type) {
      case MapplsGL.EventTypes.RegionWillChange:
        if (regionWillChangeDebounceTime > 0) {
          this._onDebouncedRegionWillChange(payload);
        } else {
          propName = 'onRegionWillChange';
        }
        break;
      case MapplsGL.EventTypes.RegionIsChanging:
        propName = 'onRegionIsChanging';
        break;
      case MapplsGL.EventTypes.RegionDidChange:
        if (regionDidChangeDebounceTime > 0) {
          this._onDebouncedRegionDidChange(payload);
        } else {
          propName = 'onRegionDidChange';
        }
        break;
      case MapplsGL.EventTypes.UserLocationUpdated:
        propName = 'onUserLocationUpdate';
        break;
      case MapplsGL.EventTypes.WillStartLoadingMap:
        propName = 'onWillStartLoadingMap';
        break;
      case MapplsGL.EventTypes.DidFinishLoadingMap:
        propName = 'onDidFinishLoadingMap';
        break;
      case MapplsGL.EventTypes.DidFailLoadingMap:
        propName = 'onDidFailLoadingMap';
        break;
      case MapplsGL.EventTypes.WillStartRenderingFrame:
        propName = 'onWillStartRenderingFrame';
        break;
      case MapplsGL.EventTypes.DidFinishRenderingFrame:
        propName = 'onDidFinishRenderingFrame';
        break;
      case MapplsGL.EventTypes.DidFinishRenderingFrameFully:
        propName = 'onDidFinishRenderingFrameFully';
        break;
      case MapplsGL.EventTypes.WillStartRenderingMap:
        propName = 'onWillStartRenderingMap';
        break;
      case MapplsGL.EventTypes.DidFinishRenderingMap:
        propName = 'onDidFinishRenderingMap';
        break;
      case MapplsGL.EventTypes.DidFinishRenderingMapFully:
        propName = 'onDidFinishRenderingMapFully';
        break;
      case MapplsGL.EventTypes.DidFinishLoadingStyle:
        propName = 'onDidFinishLoadingStyle';
        break;
      default:
        console.warn('Unhandled event callback type', type);
    }

    if (propName.length) {
      this._handleOnChange(propName, payload);
    }
  }

  _onLayout(e) {
    this.setState({
      isReady: true,
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  }

  _handleOnChange(propName, payload) {
    if (isFunction(this.props[propName])) {
      this.props[propName](payload);
    }
  }

  _geoAnalyticsSelectedFeatures(e){
    if(isFunction(this.props.geoAnalyticsSelectedFeatures)) {
      this.props.geoAnalyticsSelectedFeatures(e.nativeEvent.payload.results)
    }
  }

  _getCenterCoordinate() {
    if (!this.props.centerCoordinate) {
      return;
    }
    return toJSONString(makePoint(this.props.centerCoordinate));
  }

  _getVisibleCoordinateBounds() {
    if (!this.props.visibleCoordinateBounds) {
      return;
    }
    return toJSONString(
      makeLatLngBounds(
        this.props.visibleCoordinateBounds[0],
        this.props.visibleCoordinateBounds[1],
      ),
    );
  }

  _getContentInset() {
    if (!this.props.contentInset) {
      return;
    }

    if (!Array.isArray(this.props.contentInset)) {
      return [this.props.contentInset];
    }

    return this.props.contentInset;
  }

  _setNativeRef(nativeRef) {
    this._nativeRef = nativeRef;
    super._runPendingNativeCommands(nativeRef);
  }

  setNativeProps(props) {
    if (this._nativeRef) {
      this._nativeRef.setNativeProps(props);
    }
  }

  _setFloor(floor){
    this.setNativeProps({floor})
  }

  _setStyleURL(props) {
    // // user set a styleURL, no need to alter props
    // if (props.styleURL) {
    //   return;
    // }

    // // user set styleJSON pass it to styleURL
    // if (props.styleJSON && !props.styleURL) {
    //   props.styleURL = props.styleJSON;
    // }

    // // user neither set styleJSON nor styleURL
    // // set defaultStyleUrl
    // if (!props.styleJSON || !props.styleURL) {
    //   props.styleURL = defaultStyleURL;
    // }
  }

  render() {
    const props = {
      ...this.props,
      contentInset: this._getContentInset(),
      style: styles.matchParent,
    };

    this._setStyleURL(props);

    const callbacks = {
      ref: nativeRef => this._setNativeRef(nativeRef),
      onPress: this._onPress,
      onLongPress: this._onLongPress,
      onMapError: this._onMapError,
      onMapReinit: this._onMapReinit,
      onPlaceClick: this._onPlaceClick,
      onGeoAnalyticsSelectedFeatures: this._geoAnalyticsSelectedFeatures,
      onDidLoadedMapplsMapsStyles:this._didLoadedMapplsMapsStyles,
      onShowIndoorControl: this._showIndoorControl,
      onHideIndoorControl: this._hideIndoorControl,
      onMapChange: this._onChange,
      onAndroidCallback: isAndroid() ? this._onAndroidCallback : undefined,
    };

    let mapView = null;
    if (isAndroid() && !this.props.surfaceView && this.state.isReady) {
      mapView = (
        <RCTMGLAndroidTextureMapView {...props} {...callbacks}>
          {this.props.children}
        </RCTMGLAndroidTextureMapView>
      );
    } else if (this.state.isReady) {
      mapView = (
        <RCTMGLMapView {...props} {...callbacks}>
          {this.props.children}
        </RCTMGLMapView>
      );
    }

    return (
      <View
        onLayout={this._onLayout}
        style={this.props.style}
        testID={mapView ? null : this.props.testID}>
        {mapView}
        {this.state.showIndoorControl && props.layerControlEnabled && <IndoorView floorData ={this.state.indoorData} position={this.props.indoorLayerPosition} onFloorPress={(floor) => this._setFloor(floor)} />}
      </View>
    );
  }
}

const RCTMGLMapView = requireNativeComponent(NATIVE_MODULE_NAME, MapView, {
  nativeOnly: {onMapChange: true, onAndroidCallback: true},
});

let RCTMGLAndroidTextureMapView;
if (isAndroid()) {
  RCTMGLAndroidTextureMapView = requireNativeComponent(
    ANDROID_TEXTURE_NATIVE_MODULE_NAME,
    MapView,
    {
      nativeOnly: {onMapChange: true, onAndroidCallback: true},
    },
  );
}

export default MapView;
