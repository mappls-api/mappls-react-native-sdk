/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, TextInput, Button, Keyboard} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import Toast from 'react-native-simple-toast';

class GeoCodeActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      lat: 28.67,
      lng: 77.65,
      label: undefined,
    };
  }

  async componentDidMount() {
    this.geoCodeApi('lucknow');
  }

  geoCodeApi(placeName) {
    MapplsGL.RestApi.geocode({address: placeName})
      .then(data => {
        console.log(data.results[0].eLoc);
        const longitude = data.results[0].longitude;
        const latitude = data.results[0].latitude;
        const eLoc = data.results[0].eLoc;
        this.setState({
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
          label: data.results[0].formattedAddress,
        });

        Toast.show(
          `Longitude :${longitude} Latitude :${latitude} Eloc :${eLoc}`,
          Toast.LONG,
        );
        console.log(this.state.label);
      })
      .catch(error => {
        Toast.show(error.message, Toast.SHORT);
      });
    
  }

  onClick() {
    if (this.state.query.trim().length > 0) {
      this.setState({
        markerLat: this.state.lat,
        markerLng: this.state.lng,
      });
      this.geoCodeApi(this.state.query);
      Keyboard.dismiss();
      // this.moveCamera(this.state.lng,this.state.lat);
    } else {
      Toast.show('please enter some value');
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 1,
            paddingRight: 1,
          }}>
          <TextInput
            placeholder="Enter address to get geocode details "
            style={{
              borderWidth: 1,
              borderRadius: 4,
              height: 40,
              padding: 10,
              margin: 5,
              minWidth: 200,
            }}
            onChangeText={text => this.setState({query: text})}
          />
          <Button title="call geocode" onPress={() => this.onClick()} />
        </View>
        <MapplsGL.MapView style={{flex: 1}}>
          <MapplsGL.Camera
            zoomLevel={12}
            animationMode="moveTo"
            ref={c => (this.camera = c)}
            centerCoordinate={[this.state.lng, this.state.lat]}
          />

          <MapplsGL.PointAnnotation
            id="markerId"
            key="23232"
            title="Marker"
            ref={r => this.pointAnnotationRef = r}
            coordinate={[this.state.lng, this.state.lat]}>
            {this.state.label && (
              <MapplsGL.Callout title={this.state.label} />
            )}
          </MapplsGL.PointAnnotation>
        </MapplsGL.MapView>
      </View>
    );
  }
}

export default GeoCodeActivity;
