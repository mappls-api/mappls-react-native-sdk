import MapplsGL from "mappls-map-react-native";

export class MapplsNearbyApiSettings {
  keyword: string = 'Tea';
  customLocation: string = '28.550629,77.268859';
  page?: number;
  sortBy?:any;
  searchBy?:any;
  radius?: number = 3000;
  bounds?: string;
  pod?: any = MapplsGL.RestApi.NearbyCriteria.POD_CITY;
  filter?: string;
  enableExplain: boolean = false;
  enableRichData: boolean = false;
  userName?: string;

  static instance = new MapplsNearbyApiSettings();
}