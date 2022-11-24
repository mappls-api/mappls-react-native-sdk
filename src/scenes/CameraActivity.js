import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';

class CameraActvity extends Component {
  moveTo() {
    this.camera.moveTo([77.1512, 28.8043]);
  }

  easeTo() {
    this.camera.moveTo([77.2312, 28.8343], 2000);
  }

  animateTo() {
    this.camera.flyTo([77.3453, 28.9633], 2000);
  }

  async componentDidMount() {
  

    // MapplsGL.RestApi.nearbyReports({
    //     topLeft: [77.28, 28.53],
    //     bottomRight: [77.53, 28.98],
    //   })
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err));
  }

  render() {
    //custom buttons for different features
    const buttons = (
      <View
        style={{flexDirection: 'row', height: '10%', backgroundColor: 'blue'}}>
        <TouchableOpacity style={style.buttons} onPress={() => this.moveTo()}>
          <Text style={style.text}>Move To</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.buttons} onPress={() => this.easeTo()}>
          <Text style={style.text}>Ease To</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.buttons}
          onPress={() => this.animateTo()}>
          <Text style={style.text}>Animate To</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={{flex: 1}}>
        <MapplsGL.MapView
          ref={m => (this.mapview = m)}
          onMapError={error => console.log(error.code + ' ' + error.message)}
          onPlaceClick={mapplsPin => console.log('mapplsPin',mapplsPin)}
          style={{flex: 1}}>
          <MapplsGL.Camera
            zoomLevel={12}
            // maxZoomLevel={12}
            // minZoomLevel={5}
            ref={c => (this.camera = c)}
            centerCoordinate={DEFAULT_CENTER_COORDINATE}
          />
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

export default CameraActvity;
