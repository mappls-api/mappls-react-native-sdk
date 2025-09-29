import MapplsGL from "mappls-map-react-native";

export class MapplsGeoCodeApiSettings {
  podFilter:any = MapplsGL.RestApi.GeoCodingCriteria.POD_CITY;
  itemCount?: number;
  bias?: number;
  bound?: string;
  scores?: boolean = false;
  static instance = new MapplsGeoCodeApiSettings();
}