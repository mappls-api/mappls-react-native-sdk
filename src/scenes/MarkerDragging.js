import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';
import Toast from 'react-native-simple-toast';
import exampleIcon from '../assets/marker.png';

class MarkerDragging extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <MapplsGL.MapView style={{flex: 1}}>
          <MapplsGL.Camera
            zoomLevel={12}
            animationMode ="moveTo"
            centerCoordinate={DEFAULT_CENTER_COORDINATE}
          />

          <MapplsGL.PointAnnotation
            id="marker"
            title="xyz"
            draggable={true}
            ref={ref => (this.annotationRef = ref)}      
            coordinate={DEFAULT_CENTER_COORDINATE}>
              
            {/* <Image
              source={exampleIcon}
              style={{height: 50, width: 50}}
              onLoad={() => {
                console.log("IMAGE LOADED");
                this.annotationRef.refresh();
              }}
            /> */}
          </MapplsGL.PointAnnotation>
        </MapplsGL.MapView>
      </View>
    );
  }
}

export default MarkerDragging;
