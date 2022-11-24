/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';
//import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import RNSwitch from '../components/RNSwitch';

class MapStyleURL extends Component {
  state = {
    mmiStyle: null,
    styleData: null,
    saveLastSelected: false,
    bottomSheetIntraction: true,
  };

  bottomSheet = () => {
    return (
      <BottomSheet ref={r => (this.sheetRef = r)} snapPoints={['25%', '100%']}>
        <BottomSheetFlatList
          data={this.state.styleData}
          style={{backgroundColor: 'white'}}
          keyExtractor={(item, index) => item.key}
          renderItem={dataItem => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                padding: 10,
              }}
              onPress={() => {
                this.setState({
                  mmiStyle: dataItem.item.name,
                });
              }}>
              <View style={{flex: 1.5}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  {dataItem.item.displayName}
                </Text>
                <Text>{dataItem.item.description}</Text>
              </View>
              <Image
                style={{height: 80, width: 100, flex: 1}}
                source={{uri: dataItem.item.imageUrl}}
              />
            </TouchableOpacity>
          )}
        />
      </BottomSheet>
    );
  };

  componentDidMount() {
    MapplsGL.isShowLastSelectedStyle().then(value => {
      this.setState({
        saveLastSelected: value,
      });
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapplsGL.MapView
          mapplsStyle={this.state.mmiStyle}
          onMapError={(e) => console.log(e)}
          onDidFinishLoadingMap ={() => console.log("MAP LOADED")}
          didLoadedMapplsMapsStyles={data => {
            console.log('STYLE DATA: :', data);
            this.setState({
              styleData: data,
            });
            //this.sheetRef.close();
          }}
          style={{flex: 1}}>
          <MapplsGL.Camera
            zoomLevel={4}
            animationMode="moveTo"
            centerCoordinate={DEFAULT_CENTER_COORDINATE}
          />
        </MapplsGL.MapView>
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 5,
          }}>
          <RNSwitch
            label="Save Last Style"
            onValueChange={value => {
              console.log(value);
              this.setState({
                saveLastSelected: value,
              });
              MapplsGL.setShowLastSelectedStyle(value);
            }}
            value={this.state.saveLastSelected}
          />
        </View>
        {this.bottomSheet()}
      </View>
    );
  }
}

export default MapStyleURL;
