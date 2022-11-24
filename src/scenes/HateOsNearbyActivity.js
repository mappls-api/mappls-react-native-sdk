/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import {point} from '@turf/helpers';
import exampleIcon from '../assets/marker.png';
import Toast from 'react-native-simple-toast';
import {bbox, lineString} from '@turf/turf';

const styles = {
  icon: {
    iconImage: exampleIcon,
    iconAllowOverlap: true,
    iconSize: 0.2,
    textField: ['get', 'placeName'],
    textOffset: [0, -2.0],
    textSize: 12,
    iconAnchor: 'top',
  },
};

class HateOsNearbyActivity extends Component {
  constructor(props) {
    super(props);
    this.timeout = 0;
    this.state = {
      query: '',
      placesList: '',
      selectedPlace: '',
      progressBar: false,
      showList: false,
      mounted: false,
      hateOsNearbyList: undefined,
    };
  }

  componentDidMount() {
    this.setState({
      mounted: true,
    });
  }

  //api call for auto suggest
  callAutoSuggest(text) {
    if (text.length > 2) {
      let arr = [];
      MapplsGL.RestApi.autoSuggest({
        query: text,
        bridge: true,
      })
        .then(data => {
          console.log(data.suggestedSearches);
          //let data = JSON.parse(response);
          if (this.state.mounted) {
            if (
              data.suggestedSearches !== undefined &&
              data.suggestedSearches.length > 0
            ) {
              for (let i = 0; i < data.suggestedSearches.length; i++) {
                arr.push([
                  `${data.suggestedSearches[i].keyword} ${data.suggestedSearches[i].identifier} ${data.suggestedSearches[i].location}`,
                  data.suggestedSearches[i].hyperLink,
                ]);
              }
              this.setState({
                placesList: arr,
                progressBar: false,
                showList: true,
              });
            } else {
              Toast.show('No suggestions found', Toast.SHORT);
              this.setState({
                progressBar: false,
                showList: false,
              });
            }
          }
        })
        .catch(error => {
          console.log(error.code, error.message);
          this.setState({
            progressBar: false,
            listFshowListlex: false,
          });
          Toast.show(error.message, Toast.SHORT);
        });
    } else if (text.length <= 2) {
      this.setState({
        placesList: '',
        progressBar: false,
        showList: false,
      });
    }
  }

  callHateOsNearbyApi = hyper => {
    MapplsGL.RestApi.hateosnearby({hyperlink: hyper})
      .then(res => {
        const suggestedLocations = res.suggestedLocations;
        console.log(res);
        const localHateOsArray = [];
        const localBoundArray = [];
        for (let i = 0; i < suggestedLocations.length; i++) {
          const location = suggestedLocations[i];
          localBoundArray.push([location.longitude, location.latitude]);
          localHateOsArray.push({
            type: 'Feature',
            id: i,
            properties: {
              placeName: location.placeName,
              placeAddress: location.placeAddress,
            },
            geometry: {
              coordinates: [location.longitude, location.latitude],
              type: 'Point',
            },
          });
        }
        const bounds = bbox(lineString(localBoundArray));
        this.camera.fitBounds(
          [bounds[0], bounds[1]],
          [bounds[2], bounds[3]],
          50,
        );
        this.setState({
          hateOsNearbyList: {
            type: 'FeatureCollection',
            features: localHateOsArray,
          },
        });
      })
      .catch(err => {
        Toast.show(err.message, Toast.LONG);
        this.setState({
          hateOsNearbyList: undefined,
        });
      });
  };

  componentWillUnmount() {
    this.setState({
      mounted: true,
    });
    clearTimeout(this.timeout);
  }

  //on InputBox text changing
  onTextChange(text) {
    this.setState({
      query: text,
      progressBar: true,
    });

    //api method  called only when user will stop typing for two second
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      console.log('calling');
      this.callAutoSuggest(text.trim());
    }, 2000);
  }

  //onList item selection
  onPress(hyperLink) {
    this.setState({
      showList: false,
    });
    this.callHateOsNearbyApi(hyperLink);
  }

  //line separator for autosuggest list
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#CED0CE',
          marginLeft: 30,
        }}
      />
    );
  };

  render() {
    const list = this.state.showList ? (
      <View
        style={{
          flex: 1,
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          zIndex: 40,
        }}>
        <FlatList
          data={this.state.placesList}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => item[0] + index}
          renderItem={dataItem => (
            <TouchableOpacity
              key={dataItem.item}
              style={{paddingLeft: 10, paddingBottom: 10, paddingRight: 5}}
              onPress={() => this.onPress(dataItem.item[1])}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../assets/marker.png')}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    paddingStart: 10,
                    paddingEnd: 5,
                  }}>
                  <Text style={{fontSize: 16}}>{dataItem.item[0]}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    ) : null;

    //only place marker if place is selected
    const marker = this.state.hateOsNearbyList ? (
      <MapplsGL.ShapeSource
        id="symbolLocationSource"
        shape={this.state.hateOsNearbyList}>
        <MapplsGL.SymbolLayer
          id="symbolLocationSymbols"
          style={styles.icon}
        />
      </MapplsGL.ShapeSource>
    ) : null;

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', paddingLeft: 5, paddingRight: 5}}>
          <TextInput
            style={{flex: 1, height: 50, padding: 10}}
            placeholder="Search place.."
            value={this.state.query}
            onChangeText={text => this.onTextChange(text)}
          />
          <ActivityIndicator
            animating={this.state.progressBar}
            hidesWhenStopped={true}
            color="blue"
          />
        </View>
        {list}
        <MapplsGL.MapView style={{flex: 1}}>
          <MapplsGL.Camera
            zoomLevel={4}
            animationMode="moveTo"
            ref={c => (this.camera = c)}
            centerCoordinate={[78.6569, 22.9734]}
          />
          {marker}
        </MapplsGL.MapView>
      </View>
    );
  }
}

export default HateOsNearbyActivity;
