import {
  Animated as RNAnimated,
  NativeModules,
  PermissionsAndroid,
} from 'react-native';

import { isAndroid } from './utils';
import MapView from './components/MapView';
import Light from './components/Light';
import PointAnnotation from './components/PointAnnotation';
import Annotation from './components/annotations/Annotation'; // eslint-disable-line import/no-cycle
import Callout from './components/Callout';
import UserLocation from './components/UserLocation'; // eslint-disable-line import/no-cycle
import Camera from './components/Camera';
import VectorSource from './components/VectorSource';
import ShapeSource from './components/ShapeSource';
import RasterSource from './components/RasterSource';
import ImageSource from './components/ImageSource';
import Images from './components/Images';
import FillLayer from './components/FillLayer';
import FillExtrusionLayer from './components/FillExtrusionLayer';
import HeatmapLayer from './components/HeatmapLayer';
import LineLayer from './components/LineLayer';
import CircleLayer from './components/CircleLayer';
import SymbolLayer from './components/SymbolLayer';
import RasterLayer from './components/RasterLayer';
import BackgroundLayer from './components/BackgroundLayer';
import locationManager from './modules/location/locationManager';
import offlineManager from './modules/offline/offlineManager';
import snapshotManager from './modules/snapshot/snapshotManager';
import MarkerView from './components/MarkerView';
import Animated from './utils/animated/Animated';
import AnimatedMapPoint from './utils/animated/AnimatedPoint';
import AnimatedShape from './utils/animated/AnimatedShape';
import AnimatedCoordinatesArray from './utils/animated/AnimatedCoordinatesArray';
import AnimatedExtractCoordinateFromArray from './utils/animated/AnimatedExtractCoordinateFromArray';
import AnimatedRouteCoordinatesArray from './utils/animated/AnimatedRouteCoordinatesArray';
import Style from './components/Style';
import Logger from './utils/Logger';
import RestApi from './modules/restApi/RestApi'
import GeoAnalyticsLayer from './components/GeoAnalyticsLayer';

const MapplsGL = { ...NativeModules.MGLModule };

// static methods
MapplsGL.setClusterId = function (clusterId, vin) {
  if (vin) {
    MapplsGL.settingClusterId(clusterId, vin);
  } else {
    MapplsGL.settingClusterId(clusterId, null);
  }

}

MapplsGL.requestAndroidLocationPermissions = async function () {
  if (isAndroid()) {
    const res = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);

    if (!res) {
      return false;
    }

    const permissions = Object.keys(res);
    for (const permission of permissions) {
      if (res[permission] === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
    }

    return false;
  }

  throw new Error('You should only call this method on Android!');
};

MapplsGL.UserTrackingModes = Camera.UserTrackingModes;
MapplsGL.MapplsGeoAnalyticsType = GeoAnalyticsLayer.MapplsGeoAnalyticsType;

// components
MapplsGL.MapView = MapView;
MapplsGL.Light = Light;
MapplsGL.PointAnnotation = PointAnnotation;
MapplsGL.Callout = Callout;
MapplsGL.UserLocation = UserLocation;
MapplsGL.Camera = Camera;
MapplsGL.Style = Style;

// annotations
MapplsGL.Annotation = Annotation;
MapplsGL.MarkerView = MarkerView;

// sources
MapplsGL.VectorSource = VectorSource;
MapplsGL.ShapeSource = ShapeSource;
MapplsGL.RasterSource = RasterSource;
MapplsGL.ImageSource = ImageSource;
MapplsGL.Images = Images;

// layers
MapplsGL.FillLayer = FillLayer;
MapplsGL.FillExtrusionLayer = FillExtrusionLayer;
MapplsGL.HeatmapLayer = HeatmapLayer;
MapplsGL.LineLayer = LineLayer;
MapplsGL.CircleLayer = CircleLayer;
MapplsGL.SymbolLayer = SymbolLayer;
MapplsGL.RasterLayer = RasterLayer;
MapplsGL.BackgroundLayer = BackgroundLayer;
MapplsGL.GeoAnalyticsLayer = GeoAnalyticsLayer;

// modules
MapplsGL.locationManager = locationManager;
MapplsGL.offlineManager = offlineManager;
MapplsGL.snapshotManager = snapshotManager;
MapplsGL.RestApi = RestApi;

// animated
MapplsGL.Animated = Animated;

// utils
MapplsGL.AnimatedPoint = AnimatedMapPoint;
MapplsGL.AnimatedCoordinatesArray = AnimatedCoordinatesArray;
MapplsGL.AnimatedExtractCoordinateFromArray =
  AnimatedExtractCoordinateFromArray;
MapplsGL.AnimatedRouteCoordinatesArray = AnimatedRouteCoordinatesArray;
MapplsGL.AnimatedShape = AnimatedShape;
MapplsGL.Logger = Logger;

const { LineJoin } = MapplsGL;

export {
  MapView,
  Light,
  PointAnnotation,
  Callout,
  UserLocation,
  Camera,
  Annotation,
  MarkerView,
  VectorSource,
  ShapeSource,
  RasterSource,
  ImageSource,
  Images,
  FillLayer,
  FillExtrusionLayer,
  HeatmapLayer,
  LineLayer,
  CircleLayer,
  SymbolLayer,
  RasterLayer,
  BackgroundLayer,
  GeoAnalyticsLayer,
  locationManager,
  offlineManager,
  snapshotManager,
  AnimatedMapPoint,
  AnimatedCoordinatesArray,
  AnimatedShape,
  Animated,
  LineJoin,
  Logger,
  Style,
};

export default MapplsGL;
