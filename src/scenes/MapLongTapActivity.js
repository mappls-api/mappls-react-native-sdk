import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';
import Toast from 'react-native-simple-toast';

class MapLongTapActivity extends Component {


  onLongPress(event){
     const {geometry,properties} =event;
      const longitude=geometry.coordinates[0];
      const latitude=geometry.coordinates[1];
      Toast.show("Longitude :"+longitude+" Latitude :"+latitude,Toast.SHORT);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapplsGL.MapView style={{flex: 1}} onLongPress={(event)=>this.onLongPress(event)}>
          <MapplsGL.Camera
            zoomLevel={12}
            centerCoordinate={DEFAULT_CENTER_COORDINATE}
          />
        </MapplsGL.MapView>
      </View>
    );
  }
}

export default MapLongTapActivity;
