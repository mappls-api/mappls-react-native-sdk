import React, {Component} from 'react';
import {Text, View, Modal, TextInput, Button,SafeAreaView} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import {showCurvedPolyline} from '../utils/SemiPolylineHelper';
import {validateCoordinates} from '../utils/Validate';
import Toast from 'react-native-simple-toast';

const layerStyles = {
  route: {
    lineColor: 'blue',
    lineCap: MapplsGL.LineJoin.Round,
    lineWidth: 3,
    lineOpacity: 0.84,
  },
};

class GetDirection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: '',
      isVisible: 'false',
      sourceCoordinates: '28.7039, 77.101318',
      destinationCoordinates: '28.704248, 77.10237',
    };
  }

  curvedPolyline() {
    const source = this.state.sourceCoordinates.split(',');
    const destination = this.state.destinationCoordinates.split(',');
    const location = showCurvedPolyline(
      [source[0], source[1]],
      [destination[0], destination[1]],
      0.5,
    );
    this.setState({
      route: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: location,
        },
      },
    });
    console.log(location);
  }

  componentDidMount() {
    this.curvedPolyline();
  }

  onClick() {
    if (
      this.state.sourceCoordinates.includes(',') &&
      this.state.destinationCoordinates.includes(',')
    ) {
      const sCoordinates = this.state.sourceCoordinates.split(',');
      const dCoordinates = this.state.destinationCoordinates.split(',');

      if (
        validateCoordinates(sCoordinates[1], sCoordinates[0]) &&
        validateCoordinates(dCoordinates[1], dCoordinates[0])
      ) {
        this.camera.fitBounds(
          [parseFloat(sCoordinates[1]), parseFloat(sCoordinates[0])],
          [parseFloat(dCoordinates[1]), parseFloat(dCoordinates[0])],
          50,
          40,
        );
        this.curvedPolyline();
        
      }
    } else {
      Toast.show(
        'please provide source and destination coordinates separated with comma(,)',
        Toast.LONG,
      );
    }
    this.setState({isVisible: false});
  }

  render() {
    if (this.state.route === '') {
      return null;
    }

    //Dialogue for custom source and destination
    const customDataView = (
      <Modal
        transparent={true}
        animationType="fade"
        visible={this.state.isVisible}>
        <View
          style={{
            position: 'absolute',
            bottom: '50%',
            elevation: 5,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 5,

            borderWidth: 1,
            borderColor: 'white',
            backgroundColor: 'white',
            borderRadius: 5,
          }}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <TextInput
              placeholder="Source:Lat,Lng"
              style={{borderWidth: 1, margin: 3, borderRadius: 5,padding:10}}
              keyboardType="numbers-and-punctuation"
              onChangeText={text =>
                this.setState({
                  sourceCoordinates: text,
                })
              }
            />
            <TextInput
              placeholder="Destination:Lat,Lng"
              style={{borderWidth: 1, margin: 3, borderRadius: 5,padding:10}}
              keyboardType="numbers-and-punctuation"
              onChangeText={text =>
                this.setState({
                  destinationCoordinates: text,
                })
              }
            />
          </View>
          <Button
            title="Draw Polyline"
            style={{flex: 1}}
            onPress={() => this.onClick()}
          />
        </View>
      </Modal>
    );

    return (
      <SafeAreaView style={{flex:1}}>
      <View style={{flex: 1}}>
        <MapplsGL.MapView
          style={{flex: 1}}
          onLongPress={event => this.onLongPress(event)}>
          <MapplsGL.Camera
            zoomLevel={16}
            ref={c => (this.camera = c)}
            centerCoordinate={[77.101318, 28.7039]}
          />

          <MapplsGL.ShapeSource id="routeSource" shape={this.state.route}>
            <MapplsGL.LineLayer id="routeFill" style={layerStyles.route} />
          </MapplsGL.ShapeSource>
        </MapplsGL.MapView>
        {customDataView}
        <Button
          title="Draw polyline on custom place"
          onPress={() => this.setState({isVisible: true})}
        />
      </View>
      </SafeAreaView>
    );
  }
}

export default GetDirection;
