import React, {Component} from 'react';
import {View} from 'react-native';
import MapplsGL from 'mappls-map-react-native';

class IndoorActivity extends Component {
  
  render() {

    return (
      <View style={{flex: 1}}>
        <MapplsGL.MapView
          style={{flex: 1}}
          showIndoorControl={event => console.log(event.initialFloor + " : " + event.floors)}
          hideIndoorControl={()=>{console.log("HIDE Indoor Control")}}
          layerControlEnabled={true}
          indoorLayerPosition="bottomRight"
          onMapError={error =>console.log(error)}>
          <MapplsGL.Camera
            zoomLevel={16}
            animationMode="moveTo"
            centerCoordinate={[77.1560724, 28.5425071]}
          />
        </MapplsGL.MapView>
      </View>
    );
  }

}

export default IndoorActivity;
