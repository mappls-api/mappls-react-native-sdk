import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';
import Polyline from 'mappls-polyline';
import {bbox, lineString} from '@turf/turf';

const layerStyles = {
  route: {
    lineColor: 'blue',
    lineCap: 'round',
    lineWidth: 3,
    lineOpacity: 0.84,
    lineJoin: 'round',
  },
};


class PoiAlongTheRouteActivity extends Component {


  state = {
    poiResponse: undefined,
    route: '',
  }

  componentDidMount() {
    this.callDirectionApi();
  }

  callDirectionApi = () => {
    MapplsGL.RestApi.direction({
      origin: '77.202432,28.594475',
      destination: '77.186982,28.554676',
      geometries: 'polyline6'
    })
      .then(response => {
        console.log(JSON.stringify(response));
        let routeGeoJSON = Polyline.toGeoJSON(response.routes[0].geometry, 6);
        this.setState({
          route:routeGeoJSON,
        })
        this.callPoiAlongTheRoute('FODCOF', response.routes[0].geometry);
        // const bounds = bbox(lineString([[77.202432,28.594475],[77.186982,28.554676]]));
        // this.camera.zoomTo(1)
        // // this.camera.fitBounds(
        // //   [bounds[0], bounds[1]],
        // //   [bounds[2], bounds[3]],
        // //   50,
        // // );
      })
      .catch(error => console.log(error.message));
  };

  callPoiAlongTheRoute = (keyword, path) => {
    MapplsGL.RestApi.POIAlongRoute({
      path: path,
      category: keyword,
      buffer: 300,
      geometries: 'polyline6',
      page: 1,
    })
      .then(res => {
        console.log(res);
        const bounds = bbox(lineString([[77.202432,28.594475],[77.186982,28.554676]]));
        this.camera.fitBounds(
          [bounds[0], bounds[1]],
          [bounds[2], bounds[3]],
          100,
        );
        this.setState({
          poiResponse: res.suggestedPOIs,
        })
      })
      .catch(err => {
        this.setState({
          poiResponse: undefined,
        })
        console.log(err.message)
      });
  };

  render() {
   if(!this.state.route){
       return (
             <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
             <ActivityIndicator size="large" />
            </View>
)
   }

    const markers = this.state.poiResponse && (this.state.poiResponse.map((item) => {
      return (
        <MapplsGL.PointAnnotation id={`${item.latitude}`} coordinate={[item.longitude,item.latitude]} >
        <MapplsGL.Callout title={item.poi}/>
        </MapplsGL.PointAnnotation>
      );
    }))

    return (
      <View style={style.root}>
        <MapplsGL.MapView
          onMapError={error => console.log(error.code + ' ' + error.message)}
          style={style.root}>
          <MapplsGL.Camera
            zoomLevel={12}
            ref={c => (this.camera = c)}
            centerCoordinate={DEFAULT_CENTER_COORDINATE}
          />
          {markers}
          <MapplsGL.ShapeSource id="routeSource" shape={this.state.route}>
            <MapplsGL.LineLayer id="routeFill" style={layerStyles.route} />
          </MapplsGL.ShapeSource>
        </MapplsGL.MapView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  root: {flex: 1},
});

export default PoiAlongTheRouteActivity;
