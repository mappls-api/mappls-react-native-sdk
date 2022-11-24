import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import MapplsGL from 'mappls-map-react-native';

const layerStyles = {
  route: {
    lineColor: 'blue',
    lineCap: "round",
    lineWidth: 3,
    lineOpacity: 0.84,
  },
};

class DrawPolylineActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [77.100462, 28.705436],
            [77.100784, 28.705191],
            [77.101514, 28.704646],
            [77.101171, 28.704194],
            [77.101066, 28.704083],
            [77.101318, 28.7039],
          ],
        },
      },
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapplsGL.MapView style={{flex: 1}}>
          <MapplsGL.Camera
            zoomLevel={16}
            centerCoordinate={[77.100462, 28.705436]}
          />

          <MapplsGL.ShapeSource id="routeSource" shape={this.state.route}>
            <MapplsGL.LineLayer id="routeFill" style={layerStyles.route} />
          </MapplsGL.ShapeSource>
        </MapplsGL.MapView>
      </View>
    );
  }
}

export default DrawPolylineActivity;
