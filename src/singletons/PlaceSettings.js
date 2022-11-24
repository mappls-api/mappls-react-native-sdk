import 
    MapplsUIWidgets
 from 'mappls-search-widgets-react-native';

export default class PlaceSettings {
  static myInstance = new PlaceSettings();

  backgroundColor = '#FFFFFF';
  toolbarColor = '#FFFFFF';
  zoom = '0';
  pod = undefined;
  tokenizeAddress = true;
  saveHistory = false;
  historyCount = '0';
  attributionVerticalAlignment = MapplsUIWidgets.GRAVITY_TOP;
  attributionHorizontalAlignment = MapplsUIWidgets.GRAVITY_LEFT;
  logoSize = MapplsUIWidgets.SIZE_SMALL;
  location = [];
  filter = '';

  static getInstance() {
    return this.myInstance;
  }
}
