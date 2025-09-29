import MapplsUIWidgets from 'mappls-search-widgets-react-native';

export default class PlaceSettings {
  private static myInstance: PlaceSettings = new PlaceSettings();

  backgroundColor: string = '#FFFFFF';
  toolbarColor: string = '#FFFFFF';
  zoom: string = '0';
  pod?: string;
  tokenizeAddress: boolean = true;
  saveHistory: boolean = false;
  enableHyperLocal: boolean = false;
  enableBridge: boolean = false;
  enableTextSearch: boolean = false;
  deBounce: string = '0';
  historyCount: string = '0';

  attributionVerticalAlignment: number = MapplsUIWidgets.GRAVITY_TOP;
  attributionHorizontalAlignment: number = MapplsUIWidgets.GRAVITY_LEFT;
  logoSize: number = MapplsUIWidgets.SIZE_SMALL;

  location: string = "28.7041,77.1025";
  filter: string = '';

  private constructor() {
    // private constructor to prevent direct instantiation
  }

  public static getInstance(): PlaceSettings {
    return this.myInstance;
  }
}
