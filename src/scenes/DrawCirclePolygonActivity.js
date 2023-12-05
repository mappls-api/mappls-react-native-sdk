import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
 import { circle,point,feature } from '@turf/turf';



const layerStyles = {
    route: {
      fillColor: 'blue',
      fillOpacity: 0.5,
    },
  };
  
  class DrawCirclePolygonActivity extends Component {
    constructor(props) {
      super(props);
      this.state = {
        featureCollection: null,
      };
    }
    componentDidMount() {
        const center = [77.22263216972351, 28.62292461876685]; 
        const radius = 800; // Example radius in kilometers
    
        var options = {steps: 100, units: 'meters', properties: {foo: 'bar'}};
        var circlePolygon = circle(center, radius, options);
    
        // Set the new feature collection in the state
        this.setState({ featureCollection: circlePolygon });
      }
  
    render() {
        const { featureCollection } = this.state;
      return (
        <View style={{flex: 1}}>
          <MapplsGL.MapView style={{flex: 1}}>
         <MapplsGL.Camera
              zoomLevel={14}
              animationMode="moveTo"
              centerCoordinate={[77.22263216972351, 28.62292461876685]}
            />
            <MapplsGL.ShapeSource
              id="routeSource"
              shape={featureCollection}>
               <MapplsGL.FillLayer
              id="routeFill"
              style={{
                fillColor: 'blue',
                fillOpacity: 0.5,
                fillAntialias: true,
              }}
            />
            </MapplsGL.ShapeSource> 
          </MapplsGL.MapView>
        </View>
      );
    }
  }
  
  export default DrawCirclePolygonActivity;