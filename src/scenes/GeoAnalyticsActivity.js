import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';

class GeoAnalyticsActvity extends Component {
  state = {
    showGeoAnalytics: false,
    title: 'Show geoAnalytics',
  };

  async componentDidMount() {
    // const geoBounds = ["HARYANA",
    //     "UTTAR PRADESH",
    //     "ANDHRA PRADESH",
    //     "KERALA"]
    // MapplsGL.RestApi.mapmyIndiaGeoAnalyticsList({geoBound:geoBounds,geoBoundType:"stt_nme",attributes:['b_box'],api:'state'})
    // .then(res => {
    //   res.results.get_attr_values[0].get_attr_values[0].
    //   console.log(JSON.stringify(res))
    // })
    // .catch(err => console.log(err.message))
  }

  onPress = () => {
    this.setState(state => ({
      showGeoAnalytics: !state.showGeoAnalytics,
      title:
        state.title === 'Show geoAnalytics'
          ? 'Remove GeoAnalytics'
          : 'Show geoAnalytics',
    }));
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <MapplsGL.MapView
          onMapError={error => console.log(error.code + ' ' + error.message)}
          geoAnalyticsSelectedFeatures={e => console.log(e)}
          enableGeoAnalyticsInfoWindow={true}
          style={{flex: 1}}>
          <MapplsGL.Camera
            zoomLevel={4}
            followUserMode={MapplsGL.UserTrackingModes.FollowWithCourse}
            ref={c => (this.camera = c)}
            centerCoordinate={DEFAULT_CENTER_COORDINATE}
          />
          {this.state.showGeoAnalytics && (
            <MapplsGL.GeoAnalyticsLayer
              ref={r => (this.geo = r)}
              layerRequest={[
                {
                  geoBound: [
                    'HARYANA',
                    'UTTAR PRADESH',
                    'ANDHRA PRADESH',
                    'KERALA',
                  ],
                  propertyNames: ['stt_nme', 'stt_id', 't_p'],
                  styles: {
                    fillColor: '#3FFF83',
                    strokeColor: '#3f51b5',
                    strokeWidth: 10,
                  },
                },
                {
                  geoBound: ['MAHARASHTRA'],
                  propertyNames: ['stt_nme', 'stt_id', 't_p'],
                  styles: {
                    fillColor: '#FFFF83',
                    strokeColor: '#3f51b5',
                    strokeWidth: 1,
                  },
                },
              ]}
              geoboundType="stt_nme"
              showGeoAnalytics={MapplsGL.MapplsGeoAnalyticsType.STATE}
            />
          )}
          {this.state.showGeoAnalytics && (
            <MapplsGL.GeoAnalyticsLayer
              layerRequest={[
                {
                  geoBound: ['CHHATTISGARH'],
                  propertyNames: ['stt_nme', 'stt_id', 't_p'],
                  styles: {
                    fillColor: '#3fF893',
                    strokeColor: '#3f51b5',
                    strokeWidth: 1,
                  },
                },
              ]}
              geoboundType="stt_nme"
              showGeoAnalytics={
                MapplsGL.MapplsGeoAnalyticsType.SUB_DISTRICT
              }
            />
          )}
        </MapplsGL.MapView>
        <Button title={this.state.title} onPress={this.onPress} />
      </View>
    );
  }
}

export default GeoAnalyticsActvity;
