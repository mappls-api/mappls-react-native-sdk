import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';
import Toast from 'react-native-simple-toast';
import {point} from '@turf/helpers';
import exampleIcon from '../assets/marker.png';

const styles = {
  icon: {
    iconImage: exampleIcon,
    iconAllowOverlap: true,
    iconSize: 0.2,
    iconAnchor: 'bottom',
  },
};

class CustomMarkerActivity extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <MapplsGL.MapView style={{flex: 1}}>
          <MapplsGL.Camera
            zoomLevel={12}
            centerCoordinate={DEFAULT_CENTER_COORDINATE}
          />

          <MapplsGL.ShapeSource
            id="symbolLocationSource"
            shape={point(DEFAULT_CENTER_COORDINATE)}>
            <MapplsGL.SymbolLayer
              id="symbolLocationSymbols"
              minZoomLevel={1}
              style={styles.icon}
            />
          </MapplsGL.ShapeSource>
        </MapplsGL.MapView>
      </View>
    );
  }
}

export default CustomMarkerActivity;
