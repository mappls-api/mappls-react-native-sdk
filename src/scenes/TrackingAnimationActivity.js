import MapplsGL from 'mappls-map-react-native';
// import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {point} from '@turf/helpers';
import {lineString as makeLineString} from '@turf/helpers';
import RouteSimulator from '../utils/RouteSimulator';
import carIcon from '../assets/car.png';
import bearing from '@turf/bearing';
import bbox from '@turf/bbox';
import Polyline from 'mappls-polyline';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    borderRadius: 3,
  },
  buttonCnt: {
    backgroundColor: 'transparent',
    bottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    left: 0,
    position: 'absolute',
    right: 0,
  },
});

const layerStyles = {
  origin: {
    circleRadius: 10,
    circleColor: 'white',
  },
  destination: {
    circleRadius: 10,
    circleColor: 'green',
  },
  route: {
    lineColor: 'red',
    lineCap: "round",
    lineWidth: 5,
    lineOpacity: 0.84,
  },
  progress: {
    lineColor: '#314ccd',
    lineWidth: 5,
  },
};

let routeSimulator;
class TrackingAnimationActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: null,
      currentPoint: null,
      routeSimulator: null,
      bearing: 0,
      sourceCoordinates: '77.202432,28.594475',
      destinationCoordinates: '77.186982,28.554676',
      routeCoordinates: [],
      isMounted:false
    };

    this.onStart = this.onStart.bind(this);
  }

  async componentDidMount() {
    this.callApi();
    this.setState({
      isMounted:true
    })
  }

  callApi() {
    MapplsGL.RestApi.direction({
      origin: this.state.sourceCoordinates,
      destination: this.state.destinationCoordinates,
      resource: 'route_eta',
      profile: 'driving',
      overview: 'simplified',
    }).then(response => {
      console.log(Polyline.toGeoJSON(response.routes[0].geometry, 6))
      this.setState({
        route: Polyline.toGeoJSON(response.routes[0].geometry, 6),
        routeCoordinates: Polyline.toGeoJSON(response.routes[0].geometry, 6).coordinates,
      });
    }).catch(e => {

    });
    
  }

  componentWillUnmount() {
    this.setState({
      isMounted:false
    })
    if (this.state.routeSimulator) {
      this.state.routeSimulator.stop();
    }
  }

  renderOrigin() {
    if (!this.state.route) {
      return null;
    }

    let backgroundColor = 'red';

    if (this.state.currentPoint) {
      backgroundColor = '#314ccd';
    }

    const style = [layerStyles.origin, {circleColor: backgroundColor}];

    return (
      <MapplsGL.ShapeSource
        id="origin"
        shape={point(this.state.routeCoordinates[0])}>
        <MapplsGL.Animated.CircleLayer
          id="originInnerCircle"
          style={style}
        />
      </MapplsGL.ShapeSource>
    );
  }

  renderRoute() {
    if (!this.state.route) {
      return null;
    }

    return (
      <MapplsGL.ShapeSource id="routeSource" shape={this.state.route}>
        <MapplsGL.LineLayer
          id="routeFill"
          style={layerStyles.route}
          belowLayerID="originInnerCircle"
        />
      </MapplsGL.ShapeSource>
    );
  }

  renderCurrentPoint() {
    if (!this.state.currentPoint) {
      return;
    }
    return (
      <MapplsGL.ShapeSource
        id="symbolLocationSource"
        shape={this.state.currentPoint}>
        <MapplsGL.SymbolLayer
          id="symbolLocationSymbols"
          minZoomLevel={1}
          style={{
            iconRotationAlignment: 'map',
            iconImage: carIcon,
            iconIgnorePlacement: true,
            iconAllowOverlap: true,
            iconAnchor: 'center',
            iconRotate: ["get", "bearing"],
            iconSize: 0.07,
          }}
        />
      </MapplsGL.ShapeSource>
    );
  }

  renderProgressLine() {
    if (!this.state.currentPoint) {
      return null;
    }

    const {nearestIndex} = this.state.currentPoint.properties;
    const coords = this.state.route.coordinates.filter(
      (c, i) => i <= nearestIndex,
    );
    coords.push(this.state.currentPoint.geometry.coordinates);

    if (coords.length < 2) {
      return null;
    }

    const lineString = makeLineString(coords);
    return (
      <MapplsGL.Animated.ShapeSource id="progressSource" shape={lineString}>
        <MapplsGL.Animated.LineLayer
          id="progressFill"
          style={layerStyles.progress}
          aboveLayerID="routeFill"
        />
      </MapplsGL.Animated.ShapeSource>
    );
  }

  onStart() {
    const bounds = bbox(this.state.route);
    this.camera.fitBounds(
      [bounds[0], bounds[1]],
      [bounds[2], bounds[3]],
      0,
      40,
    );
     routeSimulator = new RouteSimulator(this.state.route, 0.02,this.state.isMounted);

    routeSimulator.addListener(currentPoint => {
      if (this.state.currentPoint&& this.state.isMounted==true) {
        let prevPoint = this.state.currentPoint;
        let bear = bearing(prevPoint, currentPoint);
        currentPoint.properties.bearing = bear + 180;
      }

      this.setState({currentPoint});
    });
    routeSimulator.start();

    this.setState({routeSimulator});
  }


  componentWillUnmount(){
     if (routeSimulator) {
       routeSimulator.stop();
     }
    
  }
  renderActions() {
    if (this.state.routeSimulator) {
      return null;
    }
    return (
      <View style={styles.buttonCnt}>
        <Button
          raised
          title="Start"
          onPress={this.onStart}
          style={styles.button}
          disabled={!this.state.route}
        />
      </View>
    );
  }

  renderDestination() {
    if (!this.state.route) {
      return null;
    }

    return (
      <MapplsGL.ShapeSource
        id="destination"
        shape={point(this.state.routeCoordinates[this.state.routeCoordinates.length - 1])}>
        <MapplsGL.CircleLayer
          id="destinationInnerCircle"
          style={layerStyles.destination}
        />
      </MapplsGL.ShapeSource>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapplsGL.MapView style={{flex: 1}}>
          <MapplsGL.Camera
            zoomLevel={16}
            ref={c => (this.camera = c)}
            centerCoordinate={[77.202432, 28.594475]}
          />

          {this.renderOrigin()}
          {this.renderRoute()}
          {this.renderCurrentPoint()}
          {this.renderProgressLine()}
          {this.renderDestination()}
        </MapplsGL.MapView>
        {this.renderActions()}
      </View>
    );
  }
}

export default TrackingAnimationActivity;
