import MapplsUIWidgets from 'mappls-search-widgets-react-native';

export default class MapplsPlacePickerWidgetSettings {
    static instance = new MapplsPlacePickerWidgetSettings();

    backgroundColor = '#FFFFFF';
    toolbarColor = '#FFFFFF';
    zoom?:number;
    pod?: string;
    tokenizeAddress:boolean = true;
    saveHistory:boolean = false;
    enableHyperLocal:boolean = false;
    enableBridge:boolean = false;
    enableTextSearch:boolean = false;
    deBounce?:number;
    historyCount?:number;
    attributionVerticalAlignment = MapplsUIWidgets.GRAVITY_TOP;
    attributionHorizontalAlignment = MapplsUIWidgets.GRAVITY_LEFT;
    logoSize = MapplsUIWidgets.SIZE_SMALL;
    location = [77.1025, 28.7041];
    filter = '';
}