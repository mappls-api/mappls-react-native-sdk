/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import {point} from '@turf/helpers';
import exampleIcon from '../assets/marker.png';
import Toast from 'react-native-simple-toast';

const styles = {
  icon: {
    iconImage: exampleIcon,
    iconAllowOverlap: true,
    iconSize: 0.2,
    iconAnchor: 'bottom',
  },
};

class AutoSuggestActivity extends Component {
  constructor(props) {
    super(props);
    this.timeout = 0;
    this.state = {
      query: '',
      placesList: '',
      selectedPlace: '',
      progressBar: false,
      mapFlex: 1,
      mounted: false,
    };
    this.callAutoSuggest("Mapmy");
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
      })
        .then(data => {
          console.log(data);
          //let data = JSON.parse(response);
          if (this.state.mounted) {
            console.log(data.suggestedLocations[0]);
            if (
              data.suggestedLocations !== undefined &&
              data.suggestedLocations.length > 0
            ) {
              for (let i = 0; i < data.suggestedLocations.length; i++) {
                arr.push([
                  data.suggestedLocations[i].placeName,
                  [
                    parseFloat(data.suggestedLocations[i].longitude),
                    parseFloat(data.suggestedLocations[i].latitude),
                  ],
                  data.suggestedLocations[i].addr,
                ]);
              }
              this.setState({
                placesList: arr,
                progressBar: false,
                mapFlex: 0,
              });
            } else {
              Toast.show('No suggestions found', Toast.SHORT);
              this.setState({
                progressBar: false,
              });
            }
          }
        })
        .catch(error => {
          console.log(error.code, error.message);
          this.setState({
            progressBar: false,
          });
          Toast.show(error.message, Toast.SHORT);
        });
      
    } else if (text.length <= 2) {
      this.setState({
        placesList: '',
        progressBar: false,
        mapFlex: 1,
      });
    }
  }

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
  onPress(location) {
    // this.camera.zoomTo(13, 1000);
    // this.camera.moveTo(location);
    this.camera.setCamera({
      centerCoordinate: location,
      zoomLevel: 11,
      animationDuration: 500,
    });
    console.log([location[0], location[1]]);
    this.setState({
      selectedPlace: [location[0], location[1]],
      placesList: '',
      mapFlex: 1,
    });
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
    const list =
      this.state.placesList != '' ? (
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
            keyExtractor={(item, index) => item[0]+index}
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
                    <Text style={{color: 'grey', marginRight: 5}}>
                      {dataItem.item[2]}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : null;

    //only place marker if place is selected
    const marker =
      this.state.selectedPlace != '' ? (
        <MapplsGL.ShapeSource
          id="symbolLocationSource"
          shape={point([
            this.state.selectedPlace[0],
            this.state.selectedPlace[1],
          ])}>
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

export default AutoSuggestActivity;
