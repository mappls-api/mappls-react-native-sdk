import React, {Component, useState} from 'react';
import {
  View,
  Button,
  TextInput,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import MapplsUIWidgets from 'mappls-search-widgets-react-native';
import Toast from 'react-native-simple-toast';
import PlaceSettings from '../singletons/PlaceSettings';

const PlacePickerWidgetActivity = () => {
  let instance = PlaceSettings.getInstance();
  const [placepickerVisible, setPlacePickerVisibility] = useState(false);
  const [resultText, setResultText] = useState('Result will show here');
  const [buttonCenter, setButtonCenter] = useState(null);
  const [placePickerLat, setPlacePickerLat] = useState(undefined);
  const [placePickerLng, setPlacePickerLng] = useState(undefined);
  const [plcePickerCenter, setPlacePickerCenter] = useState(undefined);

  function openPlacePicker() {
    setPlacePickerVisibility(true);
    if (
      placePickerLat == '' ||
      placePickerLat === undefined ||
      placePickerLng == '' ||
      placePickerLng === undefined
    ) {
      setPlacePickerCenter(undefined);
    } else {
      setPlacePickerCenter([
        parseFloat(placePickerLng),
        parseFloat(placePickerLat),
      ]);
    }
    // openSearchWidgetFunction();
  }

  //can use this function to open search widget directly
  async function openSearchWidgetFunction() {
    try  {
      const res = await MapmyIndiaUIWidgets.searchWidget({
        toolbarColor: '#F5F5F5',
        bridge: true,
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  function plcePickerResult(res) {
    if (res != null) {
      //ToastAndroid.show(res.poi, ToastAndroid.SHORT);
      Toast.show(res.poi, Toast.SHORT);
      setButtonCenter([parseFloat(res.lng), parseFloat(res.lat)]);
      setResultText(
        'Place Name: ' +
          res.poi +
          '\nAddress: ' +
          res.formatted_address +
          '\nCoordinates: [' +
          res.lat +
          ',' +
          res.lng +
          ']',
      );
    } else {
      Toast.show('no result found', Toast.SHORT);
    }
    setPlacePickerVisibility(false);
  }

  const picker = placepickerVisible ? (
    <MapplsUIWidgets.PlacePicker
      center={plcePickerCenter}
      zoom={10}
      searchWidgetProps={{
        location: instance.location,
        backgroundColor: instance.backgroundColor,
        toolbarColor: instance.toolbarColor,
        zoom: parseInt(instance.zoom),
        pod: instance.pod,
        tokenizeAddress: instance.tokenizeAddress,
        saveHistory: instance.saveHistory,
        historyCount: parseInt(instance.historyCount),
        attributionHorizontalAlignment: instance.attributionHorizontalAlignment,
        attributionVerticalAlignment: instance.attributionVerticalAlignment,
        logoSize: instance.logoSize,
        filter: instance.filter,
      }}
      // pickerImage={{
      //   uri: 'http://maps.google.com/mapfiles/ms/micons/blue.png',
      // }}
      resultCallback={res => plcePickerResult(res)}
    />
  ) : null;

  const button = !placepickerVisible ? (
    <View style={{margin: 10}}>
      <Text style={{...styles.label, color: 'black', fontSize: 20}}>
        If want to use default features of Place picker don't fill these boxes{' '}
      </Text>
      <Text style={styles.label}>Center Longitude</Text>
      {/* <TextInput
        style={styles.editTextSyles}
        placeholder="Enter Center Longitude"
        keyboardType="numeric"
        value={placePickerLng}
        multiline={false}
        onChangeText={text => setPlacePickerLng(text)}
      />
      <Text style={styles.label}>Center Latitude</Text>
      <TextInput
        style={{marginBottom: 10, ...styles.editTextSyles}}
        placeholder="Enter Center Latitude"
        keyboardType="numeric"
        value={placePickerLat}
        multiline={false}
        onChangeText={text => setPlacePickerLat(text)}
      /> */}
      <Button title="open place picker " onPress={() => openPlacePicker()} />
      <Text style={{fontSize: 20, marginTop: 20}}>{resultText}</Text>
    </View>
  ) : null;
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {picker}
        {button}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  editTextSyles: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
    padding: 5,
  },
  label: {
    color: 'grey',
    marginTop: 5,
    marginStart: 10,
  },
});
export default PlacePickerWidgetActivity;
