import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';
import exampleIcon from '../assets/marker.png';
import Toast from 'react-native-simple-toast';

class AddElocMarkerActivity extends Component {
  



  render() {
    return (
      <View style={{flex: 1}}>
        <MapplsGL.MapView
          style={{flex: 1}}>
          <MapplsGL.Camera zoomLevel={15} centerMapplsPin="MMI000" />

          <MapplsGL.PointAnnotation
            id="markerId"
            title="Marker"
            draggable={true}
            mapplsPin="MMI000">

            <MapplsGL.Callout title="xyz" />
          </MapplsGL.PointAnnotation>
        </MapplsGL.MapView>
      </View>
    );
  }
}

export default AddElocMarkerActivity;
