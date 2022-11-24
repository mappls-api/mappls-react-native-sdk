import MapplsGeoFence from 'mappls-geofence-widget-react-native';

export default class GeoFenceSettings {
  static instance = new GeoFenceSettings();

  circleFillColor = '#D81B60';
  circleOutlineWidth = 1;
  circleFillOutlineColor = '#511050';
  draggingLineColor = '#000000';
  maxRadius = 1000;
  minRadius = 25;
  polygonDrawingLineColor = '#000000';
  polygonFillColor = '#D81B60';
  polygonFillOutlineColor = '#511050';
  polygonOutlineWidth = 1;
  polygonCreationMode = MapplsGeoFence.POLYGON_CREATION_MODE_DRAW;
  toolbarTitle = 'Mappls Geofence';
  toolbarColor = '#e7392a';
  toolbarTintColor = '#FFFFFF';
  simplifyOnIntersection = false;
  initialiseGeoFence = {
    isPolygon: true,
  };

  static getInstance() {
    return this.instance;
  }
}
