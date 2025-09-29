import MapplsGL from "mappls-map-react-native";
import { MapplsLocation } from "mappls-map-react-native/src/modules/restApi/models/TripCostEstimationModel";

export interface Location {
    latitude: number;
    longitude: number;
}

export class MapplsDirectionApiSettings {
  origin: string = '77.202432,28.594475';
  destination: string = '77.186982,28.554676';
  waypoints?:string[];
  excludes?: string[];
  annotations?: string[];
  overview: string = MapplsGL.RestApi.DirectionsCriteria.OVERVIEW_FULL;
  steps: boolean = false;
  alternatives: boolean = false;
  approaches?: string[];
  bearing?: number;
  waypointIndices?: number[];
  waypointNames?: string[];
  waypointTargets?:Location[];
  bannerInstructions: boolean= false;
  geometries: string =  MapplsGL.RestApi.DirectionsCriteria.GEOMETRY_POLYLINE6;
  isSort: boolean = false;
  lessVerbose: boolean = false;
  profile?: string;
  radiuses?: number;
  resource?: string;
  routeRefresh: boolean = false;
  deviceId?: string;
  roundaboutExits: boolean = false;
  sessionId?: string;
  voiceInstructions: boolean=false;
  voiceUnits?: string;
  skipWaypoints: boolean=false;
  dateTime?: number;
  static instance = new MapplsDirectionApiSettings();
}