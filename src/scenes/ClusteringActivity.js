import React, {Component} from 'react';
import {View} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';
import exampleIcon from '../assets/marker.png';

const layerStyles = {
  singlePoint: {
    iconImage: exampleIcon,
    iconAllowOverlap: true,
    iconSize: 0.2,
    iconAnchor: 'bottom',
    iconPitchAlignment: 'map',
  },

  clusteredPoints: {
    circlePitchAlignment: 'map',

    circleColor: [
      'step',
      ['get', 'point_count'],
      '#51bbd6',
      100,
      '#f1f075',
      750,
      '#f28cb1',
    ],

    circleRadius: ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],

    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
  },

  clusterCount: {
    textField: '{point_count}',
    textSize: 12,
    textPitchAlignment: 'map',
  },
};
class ClusteringActivity extends Component {
  state = {
    clusterData: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            id: 1,
            title: 'M 1.8 - 27km NE of Indio, CA',
          },
          geometry: {
            type: 'Point',
            coordinates: [77.391, 28.5355],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 2,
            title: 'M 0.4 - 9km WNW of Cobb, CA',
          },
          geometry: {
            type: 'Point',
            coordinates: [78.391, 28.5355],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 3,
            title: 'M 0.5 - 31 km SSE of Mina, Nevada',
          },
          geometry: {
            type: 'Point',
            coordinates: [80.2707, 13.0827],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 4,
            title: 'M 3.8 - 4km ENE of Talmage, CA',
          },
          geometry: {
            type: 'Point',
            coordinates: [78.2207, 11.1827],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 5,
            title: 'M 4.2 - 55 km S of Whites City, New Mexico',
          },
          geometry: {
            type: 'Point',
            coordinates: [79.2207, 11.1827],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 6,
            title: 'M 2.3 - 1 km SSE of Magas Arriba, Puerto Rico',
          },
          geometry: {
            type: 'Point',
            coordinates: [72.8777, 19.076],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 8,
            title: 'M 1.3 - 11 km S of Tyonek, Alaska',
          },
          geometry: {
            type: 'Point',
            coordinates: [72.8777, 20.076],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 9,
            title: 'M 1.3 - 11 km S of Tyonek, India',
          },
          geometry: {
            type: 'Point',
            coordinates: [73.8777, 20.076],
          },
        },
      ],
    },
  };

  async onMarkerClick(e) {
    const f = e.features;
    console.log(JSON.stringify(f));
    this.camera.setCamera()

    // if (!f.properties.cluster) {
    //   //show or hide a custom view  and use marker properties to show data in that view
    //   console.log('marker click ' + JSON.stringify(f));
    //   console.log('markerID: ' + f.properties.id);
    // } else {
    //   console.log(f);
    //   this.camera.setCamera({
    //     zoomLevel: 6,
    //     animationDuration: 1000,
    //     centerCoordinate: [
    //       f.geometry.coordinates[0],
    //       f.geometry.coordinates[1],
    //     ],
    //   });
    // }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapplsGL.MapView ref={r => (this.map = r)} style={{flex: 1}}>
          <MapplsGL.Camera
            ref={r => (this.camera = r)}
            animationMode="moveTo"
            zoomLevel={3}
            centerCoordinate={DEFAULT_CENTER_COORDINATE}
          />

          <MapplsGL.ShapeSource
            id="earthquakes"
            cluster={true}
            clusterRadius={50}
            
            shape={this.state.clusterData}
            onPress={e => this.onMarkerClick(e)}>
            <MapplsGL.SymbolLayer
              id="pointCount"
              style={layerStyles.clusterCount}
            />

            <MapplsGL.CircleLayer
              id="clusteredPoints"
              belowLayerID="pointCount"
              filter={['has', 'point_count']}
              style={layerStyles.clusteredPoints}
            />
            <MapplsGL.SymbolLayer
              id="singlePoint"
              filter={['!', ['has', 'point_count']]}
              style={layerStyles.singlePoint}
            />
          </MapplsGL.ShapeSource>
        </MapplsGL.MapView>
      </View>
    );
  }
}

export default ClusteringActivity;
