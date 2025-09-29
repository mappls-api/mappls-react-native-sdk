import { RestApi } from "mappls-map-react-native";

export class MapplsPoiAlongTheRouteApiSettings {
  origin: string = '77.202432,28.550791';
  destination: string = '77.186982,28.554676';
  category: string = 'FODCOF';
  buffer?: number = 300;
  geometries?: string = RestApi.POICriteria.GEOMETRY_POLYLINE6;
  page?: number = 1;
  sort: boolean = false;

  static instance = new MapplsPoiAlongTheRouteApiSettings();
}