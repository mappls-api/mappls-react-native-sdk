import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

import CameraActivity from './CameraActivity';
import AddCustomMakerActivity from './AddCustomMarkerActivity';
import NearbyWidgetActivity from './NearbyWidgetActivity';
import AddMarkerActivity from './AddMarkerActivity';
import AutoSuggestActivity from './AutoSuggestActivity';
import CurrentLocationActivity from './CurrentLocationActivity';
import DrawPolygonActivity from './DrawPolygonActivity';
import DrawPolylineActivity from './DrawPolylineActivity';
import GeoCodeActivity from './GeoCodeActivity';
import GetDirection from './GetDirection';
import GetDistance from './GetDistance';
import MapLongTapActivity from './MapLongTapActivity';
import MapTapActivity from './MapTapActivity';
import MarkerDragging from './MarkerDragging';
import NearbyActivity from './NearbyActivity';
import ReverseGeoCodeActivity from './ReverseGeoCodeActivity';
import SemiCircleActivity from './SemiCircleActivity';
import CameraElocActvity from './CameraElocActivity';
import AddElocMarkerActivity from './AddElocMarkerActivity';
import CameraElocBoundsActvity from './CameraElocBoundsActivity'
import TrackingAnimationActivity from './TrackingAnimationActivity'
import DirectionWidgetActivity from './DirectionWidgetActivity'
import PlacePickerWidgetActivity from './PlacePickerWidgetActivity'
import GeoFenceWidgetActivity from './GeoFenceWigetActivity'
import DrawGradientPolyline from './DrawGradientPolyline';
import MapStyleURL from './MapStyleURL';
import ClusteringActivity from './ClusteringActivity';
import GeoAnalyticsActvity from './GeoAnalyticsActivity';
import IndoorActivity  from './IndoorActivity';
import PoiAlongTheRouteActivity from './PoiAlongTheRouteActivity';
import HateOsNearbyActivity from './HateOsNearbyActivity';

const styles = StyleSheet.create({
  header: {
    marginTop: 48,
    fontSize: 24,
    textAlign: 'center',
  },
  exampleList: {
    flex: 1,
  },
  exampleListItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  exampleListItem: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exampleListLabel: {
    fontSize: 18,
  },
  exampleBackground: {
    flex: 1,
    backgroundColor: 'pink',
  },
});

class ExampleItem {
  constructor(label, Component) {
    this.label = label;
    this.Component = Component;
  }
}

const Examples = [
  new ExampleItem('Camera Features', CameraActivity),
  new ExampleItem('Camera Mappls Pin Features', CameraElocActvity),
  new ExampleItem('Camera Mappls Pin bounds', CameraElocBoundsActvity),
  new ExampleItem('Map Tap', MapTapActivity),
  new ExampleItem('Map Long Tap', MapLongTapActivity),
  new ExampleItem('Add Marker', AddMarkerActivity),
  new ExampleItem('Add Mappls Pin Marker', AddElocMarkerActivity),
  new ExampleItem('Add Custom Marker', AddCustomMakerActivity),
  new ExampleItem('Draw PolyLine', DrawPolylineActivity),
  new ExampleItem('Draw Polygon', DrawPolygonActivity),
  new ExampleItem('Draw Gradient Polyline', DrawGradientPolyline),
  new ExampleItem('Current Location', CurrentLocationActivity),
  new ExampleItem('Auto Suggest', AutoSuggestActivity),
  new ExampleItem('Geo Code', GeoCodeActivity),
  new ExampleItem('Reverse Geocode', ReverseGeoCodeActivity),
  new ExampleItem('Nearby', NearbyActivity),
  new ExampleItem('Get Direction', GetDirection),
  new ExampleItem('Get Distance', GetDistance),
  new ExampleItem('Marker Dragging', MarkerDragging),
  new ExampleItem('Semi Circle Polyline', SemiCircleActivity),
  new ExampleItem('Tracking Animation', TrackingAnimationActivity),
  new ExampleItem('Direction Widget Example', DirectionWidgetActivity),
  new ExampleItem('Nearby Widget Example', NearbyWidgetActivity),
  new ExampleItem('Place Picker Example', PlacePickerWidgetActivity),
  new ExampleItem('Geofence Example', GeoFenceWidgetActivity),
  new ExampleItem('Map Style URL Example', MapStyleURL),
  new ExampleItem('Clustering Example', ClusteringActivity),
  new ExampleItem('GeoAnalytics Example',GeoAnalyticsActvity),
  new ExampleItem('Indoor Example',IndoorActivity),
  new ExampleItem('Hateos Nearby Example',HateOsNearbyActivity),
  new ExampleItem('POI Along Route Example',PoiAlongTheRouteActivity),
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  onExamplePress(activeExamplePosition) {
    this.props.navigation.navigate('Demo', Examples[activeExamplePosition]);
  }

  renderItem({item, index}) {
    return (
      <View style={styles.exampleListItemBorder}>
        <TouchableOpacity onPress={() => this.onExamplePress(index)}>
          <View style={styles.exampleListItem}>
            <Text style={styles.exampleListLabel}>{item.label}</Text>
            <Icon name="keyboard-arrow-right" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          style={styles.exampleList}
          data={Examples}
          keyExtractor={item => item.label}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default Home;
