import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';

class CameraElocBoundsActvity extends Component {
  fitBounds() {
    console.log('fit bounds clicked');
   this.camera.fitBoundsWithMapplsPin(['1T182A', 'MMI000', '122L55','11KDVO'],50,100);
  }

  render() {
    //custom buttons for different features
    const buttons = (
      <View
        style={{flexDirection: 'row', height: '10%', backgroundColor: 'blue'}}>
        <TouchableOpacity style={style.buttons} onPress={() => this.fitBounds()}>
          <Text style={style.text}>Fit Bounds</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={{flex: 1}}>
        <MapplsGL.MapView style={{flex: 1}}>
          <MapplsGL.Camera
            zoomLevel={14}
            ref={c => (this.camera = c)}
            centerMapplsPin="MMI000"
          />
          <MapplsGL.PointAnnotation id="1" mapplsPin="MMI000" />
          <MapplsGL.PointAnnotation id="2" mapplsPin="1T182A" />
          <MapplsGL.PointAnnotation id="3" mapplsPin="122L55" />
          <MapplsGL.PointAnnotation id="3" mapplsPin="11KDVO" />
        </MapplsGL.MapView>
        {buttons}
      </View>
    );
  }
}

const style = StyleSheet.create({
  buttons: {justifyContent: 'center', alignItems: 'center', flex: 1},
  text: {color: 'white', fontWeight: 'bold'},
});

export default CameraElocBoundsActvity;
