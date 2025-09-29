
export class MapplsDistanceApiSettings {
  origin: string = '77.268935,28.594475';
  destination: string = '77.2002561,28.6129131';
  fallbackSpeed?: number;
  fallbackCoordinate?: string;

  static instance = new MapplsDistanceApiSettings();
}