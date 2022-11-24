import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import { DEFAULT_CENTER_COORDINATE } from '../utils/index';
import Toast from 'react-native-simple-toast';

class MapTapActivity extends Component {

  async onPress(event)  {
    
    const { geometry, properties } = event;
    const longitude = geometry.coordinates[0];
    const latitude = geometry.coordinates[1];
    
    Toast.show(
      'Longitude :' + longitude + ' Latitude :' + latitude,
      Toast.SHORT,
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapplsGL.MapView
          ref={m => (this.mapView = m)}
          hideIndoorControl={() => {
            console.log('HIDE Indoor Control');
          }}
          onMapError={error => console.log(error.code + ' ' + error.message)}
          style={{ flex: 1 }}
          onPress={event => this.onPress(event)}>
          <MapplsGL.Camera
            zoomLevel={12}
            ref={c => (this.camera = c)}
            centerCoordinate={DEFAULT_CENTER_COORDINATE}
          />
        </MapplsGL.MapView>
      </View>
    );
  }
}

export default MapTapActivity;
