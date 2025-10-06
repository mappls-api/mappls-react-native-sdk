import { DirectionsCriteria, PlaceOptionsConstants } from "mappls-direction-widget-react-native";
import MapplsGL from "mappls-map-react-native";
import { MapplsLocation } from "mappls-map-react-native/src/modules/restApi/models/TripCostEstimationModel";

export interface Location {
  latitude: number;
  longitude: number;
}
export interface DestinationLocationProps {
  longitude: number,
  latitude: number,
  address: string,
  name: string,
}
export interface DestinationMapplsPinProps {
  address: string;
  name: string;
  mapplsPin: string;
}

export class MapplsDirectionWidgetSettings {
  destination: DestinationLocationProps | DestinationMapplsPinProps = {
    latitude: 28.61304383557751,
    longitude: 77.22946678077993,
    name: 'India Gate',
    address: 'Kartavya Path, India Gate, New Delhi, Delhi 110001'
  };
  source: DestinationLocationProps | DestinationMapplsPinProps ={
      latitude: 28.55114023387744,
    longitude: 77.26905628448787,
    name: 'MapMyIndia',
    address: '237, Okhla Industrial Estate Phase 3 Rd'
  }
  excludes?: DirectionsCriteria[];
  annotations?: string[];
  overview: DirectionsCriteria = DirectionsCriteria.OVERVIEW_FULL;
  steps: boolean = true;
  alternatives: boolean = true;
  geometries: string = MapplsGL.RestApi.DirectionsCriteria.GEOMETRY_POLYLINE6;
  isSort: boolean = true;
  resource = DirectionsCriteria.RESOURCE_ROUTE_ETA;
  showStartNavigation: boolean = true;
  showAlternative = true;
  profile = DirectionsCriteria.PROFILE_DRIVING;



  static instance = new MapplsDirectionWidgetSettings();
}