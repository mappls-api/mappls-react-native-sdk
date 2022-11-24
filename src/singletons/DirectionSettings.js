import {
  DirectionsCriteria,
  PlaceOptionsConstants,
} from 'mappls-direction-widget-react-native';

export default class DirectionSettings {
  static myInstance = new DirectionSettings();

  destination = null;
  showStartNavigation = true;
  showAlternative = false;
  steps = true;
  resource = DirectionsCriteria.RESOURCE_ROUTE_ETA;
  profile = DirectionsCriteria.PROFILE_DRIVING;
  overview = DirectionsCriteria.OVERVIEW_FULL;
  excludes = [];
  attributions = [];
  destination = {};
  source = null;
  backgroundColor = '#FFFFFF';
  toolbarColor = '#FFFFFF';
  zoom = '0';
  pod = undefined;
  tokenizeAddress = true;
  saveHistory = false;
  historyCount = '0';
  attributionVerticalAlignment = PlaceOptionsConstants.GRAVITY_TOP;
  attributionHorizontalAlignment = PlaceOptionsConstants.GRAVITY_LEFT;
  logoSize = PlaceOptionsConstants.SIZE_SMALL;
  location = [];
  filter = '';

  static getInstance() {
    return this.myInstance;
  }
}
