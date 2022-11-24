import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import MapplsGeoFence from 'mappls-geofence-widget-react-native';
import React, {Component} from 'react';
import GeoFenceSettings from '../singletons/GeoFenceSettings';

export default class GeoFenceWidgetActivity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  openGeofence() {
       let instance = GeoFenceSettings.getInstance();
       MapplsGeoFence.openGeoFenceWidget({
        circleFillColor: instance.circleFillColor,
        circleFillOutlineColor: instance.circleFillOutlineColor,
        circleOutlineWidth: instance.circleOutlineWidth,
        draggingLineColor: instance.draggingLineColor,
        maxRadius: instance.maxRadius,
        minRadius: instance.minRadius,
        polygonDrawingLineColor: instance.polygonDrawingLineColor,
        polygonFillColor: instance.polygonFillColor,
        polygonFillOutlineColor: instance.polygonFillOutlineColor,
        polygonOutlineWidth: instance.polygonOutlineWidth,
        polygonCreationMode: instance.polygonCreationMode,
        toolbarTitle: instance.toolbarTitle,
        toolbarColor: instance.toolbarColor,
        toolbarTintColor: instance.toolbarTintColor,
        simplifyOnIntersection: instance.simplifyOnIntersection,
        initialiseGeoFence: instance.initialiseGeoFence,
      })
        .then(e => {
          this.setState({data: JSON.stringify(e)});
        })
        .catch(err => console.log('error catch search:', err.message));
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TouchableOpacity
          style={style.buttons}
          onPress={() => {
            this.openGeofence();
          }}>
          <Text style={style.text}>Open Geofence Widget</Text>
        </TouchableOpacity>

        <View style={{height: 40}} />

        <Text>{this.state.data}</Text>
      </View>
    );
  }
}
const style = StyleSheet.create({
  buttons: {justifyContent: 'center', alignItems: 'center'},
  text: {color: 'black', fontWeight: 'bold'},
});
