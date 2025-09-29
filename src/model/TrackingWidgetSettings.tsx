export default class TrackingWidgetSettings {
  private static myInstance: TrackingWidgetSettings = new TrackingWidgetSettings();

  latentViz: 'jump' | 'route' | 'fly' = 'jump';
  polylineRefresh: boolean = true;
  enableDestinationRouteConnector: boolean = false;
  routeChangeBuffer: number = 50;
  speedInMillis: number = 5000;
  cameraZoomLevel: number = 15;
  fitBoundsPadding: number = 80;
  fitBoundsDuration: number = 1000;
  latentVizRadius: number = 500;
  enableSimulation: boolean = false;
  maxSimDistance: number = 1000;
  simSpeed: number = 5;
  showRiderOnOrigin: boolean = true;
  etaRefresh: boolean = false;
  etaRefreshDuration: number = 3000;

  removeViaPointIndex?: string;
  addViaPointIndex?: string;
  viaPointLatlng?: string;
  lastRiderLocation?: [number, number];

  private constructor() {}

  static getInstance(): TrackingWidgetSettings {
    return this.myInstance;
  }
}
