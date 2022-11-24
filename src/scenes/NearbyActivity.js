/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, FlatList, TextInput} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';
import Toast from 'react-native-simple-toast';
import {points} from '@turf/helpers';
import exampleIcon from '../assets/marker.png';
import {Button, Icon} from 'react-native-elements';

// const styles = {
//   icon: {
//     iconOptional: false,
//     iconImage: exampleIcon,
//     iconAllowOverlap: true,
//     iconSize: 0.1,
//     textField: 'hello',
//     textSize: 14,
//     textAnchor: '',
//     textColor: 'white',
//     textPadding: 20,
//   },
// };

class NearbyActivity extends Component {
  mapViewRef = null;
  annotationRef = [];
  constructor(props) {
    super(props);
    this.state = {
      placesList: '',
      visibleList: false,
      iconName: 'list',
      locations: [],
      keyword: 'coffee',
      nearByApiData: [],
      filter: undefined,
      featureCollection: {
        type: 'FeatureCollection',
        features: [],
      },
    };
  }

  async callNearby(lat, lng) {
    Toast.show('Please wait...', Toast.SHORT);
    let arr = [];
    
    try {
    let data = await MapplsGL.RestApi.nearby({
      keyword: this.state.keyword,
      location: `${lat},${lng}`,
      filter: this.state.filter,
    });
      // .then(data => {
        console.log(data);

        if (data.suggestedLocations) {
          const suggestedLocation = data.suggestedLocations;
          this.setMapplsPin(suggestedLocation)
          
          console.log(JSON.stringify(arr));
        }
      // })
      }catch(error) {
        Toast.show(error.message, Toast.SHORT);
      };
  
  }

  async setMapplsPin(suggestedLocation){
    let placeArr = [];
    let mapplsPinList = [];
    let data = await this.mapViewRef.getMapplsPinAssociation(suggestedLocation.map((item) => { return item.mapplsPin}));
    if(data === 0) {
      console.log("Success")
    }
    for (let i = 0; i < suggestedLocation.length; i++) {
      mapplsPinList.push(suggestedLocation[i].mapplsPin);
      placeArr.push(suggestedLocation[i].placeName);
    }
    
    console.log('getMapplsPinAssociation')
    this.setState({
      //  locations: arr,
      placesList: placeArr,
      nearByApiData: suggestedLocation
    });
    
    
  }

  componentDidMount() {
    Toast.show('Tap on map to get nearby ', Toast.SHORT);
  }

  //onPress of mapView
  onPress(event) {
    const {geometry, properties} = event;
    const longitude = geometry.coordinates[0];
    const latitude = geometry.coordinates[1];
    this.setState({
      featureCollection: {
        type: 'FeatureCollection',
        features: [],
      },
    });
    this.callNearby(latitude, longitude);
  }

  //onClick of specific marker
  onMarkerClick(e) {
    const f = e.nativeEvent.payload;
    console.log('marker click ' + JSON.stringify(f));
    console.log(f.properties.placeName);
    Toast.show(f.properties.placeName, Toast.SHORT);
  }

  //floating button click
  onfloatingButtonClick() {
    if (this.state.iconName === 'list') {
      this.setState({
        visibleList: true,
        iconName: 'map-marker',
      });
    } else if (this.state.iconName === 'map-marker') {
      this.setState({
        visibleList: false,
        iconName: 'list',
      });
    }
  }

  render() {
    const list =
      this.state.visibleList !== false ? (
        <View>
          <FlatList
            data={this.state.placesList}
            keyExtractor={(item, index) => item.key}
            renderItem={dataItem => (
              <Text key={dataItem.item.key}>{dataItem.item}</Text>
            )}
          />
        </View>
      ) : null;

    return (
      <View style={{flex: 1}}>
        <MapplsGL.MapView
          ref={ref => {this.mapViewRef = ref}}
          style={{flex: 1}}
          onPress={event => this.onPress(event)}>
          <MapplsGL.Camera
            animationMode="moveTo"
            zoomLevel={15}
            centerCoordinate={DEFAULT_CENTER_COORDINATE}
          />
          
              {this.state.nearByApiData.length > 0 &&
                this.state.nearByApiData.map((item, indx) => {
                  console.log(item.mapplsPin);
                  return (
                    
                     <MapplsGL.PointAnnotation
                     ref={el => this.annotationRef[indx] = el}
                        // selected={(data) => {
                        //   alert(JSON.stringify(data));
                        // }}
                        id = {`${indx}data`}
                        // onSelected={(data) => {
                        //   // alert(JSON.stringify(item));
                        //   this.setState({cardData : item, showGetDirectionsBox : true})
                        // }}
                        // onDeselected={() => {alert('on deselected')}}
                        mapplsPin={item.mapplsPin}
                        >
                          {/* <View style={styles.annotationContainer}>
                           <Image
                              source={{ uri: 'https://storage.googleapis.com/mobile-static-assets/poi_icons/car%20garage.png' }}
                              style={{ width: 30, height: 40 }}
                              onLoad={() => this.annotationRef[indx].refresh()}
                          />
                            </View> */}
                        </MapplsGL.PointAnnotation>
                      
                   
                  );
                })}
          {/* <MapplsGL.PointAnnotation
            id="markerId"
            title="Marker"
            mapplsPin={this.state.mapplsPin}>
              <MapplsGL.Callout title="xyz" />
          </MapplsGL.PointAnnotation> */}
          {/* <MapplsGL.ShapeSource
            id="symbolLocationSource"
            onPress={e => this.onMarkerClick(e)}
            hitbox={{width: 20, height: 20}}
            shape={this.state.featureCollection}>
            <MapplsGL.SymbolLayer
              id="symbolLocationSymbols"
              minZoomLevel={1}
              style={{
                iconImage: exampleIcon,
                visibility: 'visible',
                iconSize: 0.2,
                textField: ['get', 'placeName'],
                iconAnchor: 'top',
                textOffset: [0, -2.0],
                textSize: 12,
                iconAllowOverlap: true,
                textAllowOverlap: false,
                textOptional: true,
                textJustify: 'center',
                textColor: 'black',
                textHaloColor: 'white',
                textHaloWidth: 5,
              }}
            />
          </MapplsGL.ShapeSource> */}
        </MapplsGL.MapView>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
          }}>
          <TextInput
            style={{padding: 20, marginBottom: 10}}
            placeholder="keyword"
            value={this.state.keyword}
            onChangeText={text => this.setState({keyword: text})}
          />
          <TextInput
            style={{padding: 20}}
            placeholder="filter"
            value={this.state.filter}
            onChangeText={text => this.setState({filter: text})}
          />
        </View>
        {list}
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'transparent',
            position: 'absolute',
            top: '80%',
            left: '80%',
            zIndex: 10,
          }}>
          <Button
            icon={
              <Icon
                name={this.state.iconName}
                size={35}
                type="font-awesome"
                color="white"
              />
            }
            onPress={() => this.onfloatingButtonClick()}
          />
        </View>
      </View>
    );
  }
}

export default NearbyActivity;
