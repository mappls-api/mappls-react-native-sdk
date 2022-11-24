/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
  Modal,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import Toast from 'react-native-simple-toast';
import {validateCoordinates} from '../utils/Validate';
import Polyline from 'mappls-polyline';
import {Platform} from 'react-native';

const layerStyles = {
  route: {
    lineColor: 'blue',
    lineCap: 'round',
    lineWidth: 3,
    lineOpacity: 0.84,
    lineJoin: 'round',
  },
};

class GetDirection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: '',
      duration: '',
      route: '',
      backW: 'blue',
      backD: 'blue',
      backB: 'blue',
      isVisible: false,
      sourceCoordinates: '77.202432,28.594475',
      destinationCoordinates: '77.186982,28.554676',
      center: [77.202432, 28.594475],
    };
  }

  callApi(setProfile) {
    const sCoordinates = this.state.sourceCoordinates.split(',');
    const dCoordinates = this.state.destinationCoordinates.split(',');

    MapplsGL.RestApi.direction({
      origin: this.state.sourceCoordinates,
      destination: this.state.destinationCoordinates,
      profile: setProfile,
      overview: MapplsGL.RestApi.DirectionsCriteria.OVERVIEW_FULL,
      geometries: 'polyline6',
    })
      .then(data => {
       
        console.log(JSON.stringify(data));

        let routeGeoJSON = Polyline.toGeoJSON(data.routes[0].geometry, 6);
        //let bound = bbox(routeGeoJSON);
        //console.log(JSON.stringify(routeGeoJSON));
        this.setState({
          distance: this.getFormattedDistance(data.routes[0].distance),
          duration: this.getFormattedDuration(data.routes[0].duration),
          route: routeGeoJSON,
          center: routeGeoJSON.coordinates[0],
        });
      })
      .catch(error => {
        console.log(error);
        // Toast.show(error.message, Toast.SHORT);
      });

  
  }

  componentDidMount() {
    this.callApi('driving');
    this.setState({
      backD: 'white',
    });
  }

  getFormattedDistance(distance) {
    if (distance / 1000 < 1) {
      return distance + 'mtr.';
    }
    let dis = distance / 1000;
    dis = dis.toFixed(2);
    return dis + 'Km.';
  }

  getFormattedDuration(duration) {
    let min = parseInt((duration % 3600) / 60);
    let hours = parseInt((duration % 86400) / 3600);
    let days = parseInt(duration / 86400);
    if (days > 0) {
      return (
        days +
        ' ' +
        (days > 1 ? 'Days' : 'Day') +
        ' ' +
        hours +
        ' ' +
        'hr' +
        (min > 0 ? ' ' + min + ' ' + 'min.' : '')
      );
    } else {
      return hours > 0
        ? hours + ' ' + 'hr' + (min > 0 ? ' ' + min + ' ' + 'min' : '')
        : min + ' ' + 'min.';
    }
  }

  onDrive() {
    this.setState({
      backD: 'white',
      backB: 'blue',
      backW: 'blue',
    });
    this.callApi('driving');
  }

  onBike() {
    this.setState({
      backD: 'blue',
      backB: 'white',
      backW: 'blue',
    });
    this.callApi('biking');
  }

  onWalk() {
    this.setState({
      backD: 'blue',
      backB: 'blue',
      backW: 'white',
    });
    this.callApi('walking');
  }

  //onClick of dialogue box get direction button
  onClick() {
    if (
      this.state.sourceCoordinates.includes(',') &&
      this.state.destinationCoordinates.includes(',')
    ) {
      const sCoordinates = this.state.sourceCoordinates.split(',');
      const dCoordinates = this.state.destinationCoordinates.split(',');

      if (
        validateCoordinates(sCoordinates[0], sCoordinates[1]) &&
        validateCoordinates(dCoordinates[0], dCoordinates[1])
      ) {
        Keyboard.dismiss();
        /* this.camera.fitBounds(
          [sCoordinates[0], sCoordinates[1]],
          [dCoordinates[0], dCoordinates[1]],
          40,
        ); */

        this.callApi('driving');
        this.setState({
          backD: 'white',
          backB: 'blue',
          backW: 'blue',
        });
      }
    } else {
      this.callApi('driving');
      this.setState({
        backD: 'white',
        backB: 'blue',
        backW: 'blue',
      });
      /* Toast.show(
        'please provide source and destination coordinates separated with comma(,)',
        Toast.SHORT,
      ); */
    }
    this.setState({
      isVisible: false,
    });
  }

  render() {
    const keyBoardBehaviour = Platform.OS === 'android' ? 'height' : 'padding';

    //Dialogue for custom source and destination
    const customDataView = (
      <Modal
        transparent={true}
        onRequestClose={() => this.setState({isVisible: false})}
        animationType="slide"
        visible={this.state.isVisible}>
        <KeyboardAvoidingView
          style={{flex: 1, justifyContent: 'flex-end'}}
          behavior={keyBoardBehaviour}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginBottom: 120,
              marginLeft: 10,
              marginRight: 10,
            }}>
            <View
              style={{
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
                  placeholder="Source:Lng,Lat OR mapplsPin"
                  style={{
                    borderWidth: 1,
                    margin: 3,
                    borderRadius: 5,
                    padding: 10,
                  }}
                  onChangeText={text =>
                    this.setState({
                      sourceCoordinates: text,
                    })
                  }
                />
                <TextInput
                  placeholder="Destination:Lng,Lat OR mapplsPin"
                  style={{
                    borderWidth: 1,
                    margin: 3,
                    borderRadius: 5,
                    padding: 10,
                  }}
                  onChangeText={text =>
                    this.setState({
                      destinationCoordinates: text,
                    })
                  }
                />
              </View>
              <Button
                title="get Direction"
                style={{flex: 1}}
                onPress={() => this.onClick()}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );

    const buttons = (
      <View
        style={{flexDirection: 'row', height: '10%', backgroundColor: 'blue'}}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: this.state.backD,
          }}
          onPress={() => this.onDrive()}>
          <Text style={style.text}>Driving</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: this.state.backB,
          }}
          onPress={() => this.onBike()}>
          <Text style={style.text}>Biking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: this.state.backW,
          }}
          onPress={() => this.onWalk()}>
          <Text style={style.text}>Walking</Text>
        </TouchableOpacity>
      </View>
    );

    if (this.state.route === '') {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator animating={true} />
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        {buttons}
        <MapplsGL.MapView style={{flex: 1}}>
          <MapplsGL.Camera
            zoomLevel={12}
            ref={c => (this.camera = c)}
            centerCoordinate={this.state.center}
          />

          <MapplsGL.ShapeSource id="routeSource" shape={this.state.route}>
            <MapplsGL.LineLayer id="routeFill" style={layerStyles.route} />
          </MapplsGL.ShapeSource>
        </MapplsGL.MapView>
        <Button
          title="Get direction with custom data"
          onPress={() => this.setState({isVisible: true})}
        />
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            height: '10%',
            alignItems: 'center',
            paddingLeft: 5,
          }}>
          <Text style={{color: 'red'}}>{this.state.distance}</Text>
          <Text>({this.state.duration})</Text>
        </View>
        {customDataView}
      </View>
    );
  }
}

const style = StyleSheet.create({
  buttons: {justifyContent: 'center', alignItems: 'center', flex: 1},
  text: {fontWeight: 'bold'},
});

export default GetDirection;
