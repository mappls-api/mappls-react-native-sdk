import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';

import Toast from 'react-native-simple-toast';
import {Alert} from 'react-native';
import { call } from 'react-native-reanimated';

class AddMarkerActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [77.1560724, 28.5425071],
    };
  }



  async onPress(event) {
    const {geometry, properties} = event;
    let longitude = geometry.coordinates[0];
    let latitude = geometry.coordinates[1];
    this.setState({
      location: [longitude, latitude],
    });
    try {
      const detail = await MapplsGL.RestApi.placeDetail({mapplsPin: "2sev87"})
      console.log(detail)
    } catch(e) {

    }
    // Toast.show(this.state.label,Toast.SHORT);
  }

  render() {
    const HackMarker = ({children}) =>
      Platform.select({
        ios: children,
        android: (
          <Text
            style={{
              lineHeight: 88, // there is some weird gap, add 40+ pixels
              backgroundColor: '#dcdcde',
            }}>
            {children}
          </Text>
        ),
      });

    return (
      <View style={{flex: 1}}>
        <MapplsGL.MapView
          style={{flex: 1}}
          showIndoorControl={event => console.log(event.initialFloor + " : " + event.floors)}
          hideIndoorControl={()=>{console.log("HIDE Indoor Control")}}
          layerControlEnabled={true}
          indoorLayerPosition="bottomRight"
          onPress={event => this.onPress(event)}
          onMapError={error =>console.log(error)}>
          <MapplsGL.Camera
            zoomLevel={16}
            animationMode="flyTo"
            centerCoordinate={[77.1560724, 28.5425071]}
          />

          <MapplsGL.PointAnnotation
            id="markerId"
            title="Marker"
            onSelected={() => {}}
            onDeselected={()=> {}}
            coordinate={this.state.location}>
            <MapplsGL.Callout title="xyz" />
          </MapplsGL.PointAnnotation>
        </MapplsGL.MapView>
      </View>
    );
  }

}

export default AddMarkerActivity;
