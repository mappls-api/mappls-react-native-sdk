import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import DirectionSingleton from '../singletons/DirectionSettings';
import RadioGroup from '../components/RadioGroup';
import CheckboxGroup from '../components/CheckboxGroup';
import RNColorPicker from '../components/RNColorPicker';
import RNSwitch from '../components/RNSwitch';
import CustomView from '../components/CustomView';
import {
  DirectionsCriteria,
  PlaceOptionsConstants,
} from 'mappls-direction-widget-react-native';
import PlaceSettings from '../singletons/PlaceSettings';

const PlacePickerSettingsComponent = () => {
  let instance = PlaceSettings.getInstance();
 
  const [zoom, setZoom] = useState(instance.zoom);
  const [pod, setPod] = useState(instance.pod);
  const [tokenizeAddress, setTokenizeAddress] = useState(
    instance.tokenizeAddress,
  );
  const [saveHistory, setSaveHistory] = useState(instance.saveHistory);
  const [historyCount, setHistoryCount] = useState(instance.historyCount);
  const [
    attributionVerticalAlignment,
    setAttributionVerticalAlignment,
  ] = useState(instance.attributionVerticalAlignment);
  const [
    attributionHorizontalAlignment,
    setAttributionHorizontalAlignment,
  ] = useState(instance.attributionHorizontalAlignment);
  const [logoSize, setLogoSize] = useState(instance.logoSize);
  const [location, setLocation] = useState(instance.location);
  const [filter, setFilter] = useState(instance.filter);

  //show and set background color
  const [showBackColorPicker, setBackShowColorPicker] = useState(false);
  const [backGroundColor, setBackGroundColor] = useState(
    instance.backgroundColor,
  );

  //show and set toolbar color
  const [showToolColorPicker, setShowToolColorPicker] = useState(false);
  const [toolbarColor, setToolbarColor] = useState(instance.toolbarColor);

  const pods = [
    {
      label: 'SUB LOCALITY',
      value: PlaceOptionsConstants.POD_SUB_LOCALITY,
    },
    {
      label: 'LOCALITY ',
      value: PlaceOptionsConstants.POD_LOCALITY,
    },
    {
      label: 'CITY',
      value: PlaceOptionsConstants.POD_CITY,
    },
    {
      label: 'VILLAGE',
      value: PlaceOptionsConstants.POD_VILLAGE,
    },
    {
      label: 'SUB DISTRICT',
      value: PlaceOptionsConstants.POD_SUB_DISTRICT,
    },
    {
      label: 'DISTRICT',
      value: PlaceOptionsConstants.POD_DISTRICT,
    },
    {
      label: 'STATE',
      value: PlaceOptionsConstants.POD_STATE,
    },
    {
      label: 'SUB SUB LOCALITY',
      value: PlaceOptionsConstants.POD_SUB_SUB_LOCALITY,
    },
  ];

  const verticalAlignments = [
    {
      label: 'GRAVITY TOP',
      value: PlaceOptionsConstants.GRAVITY_TOP,
    },
    {
      label: 'GRAVITY BOTTOM',
      value: PlaceOptionsConstants.GRAVITY_BOTTOM,
    },
  ];

  const horizontalAlignments = [
    {
      label: 'GRAVITY LEFT',
      value: PlaceOptionsConstants.GRAVITY_LEFT,
    },
    {
      label: 'GRAVITY CENTER',
      value: PlaceOptionsConstants.GRAVITY_CENTER,
    },
    {
      label: 'GRAVITY RIGHT',
      value: PlaceOptionsConstants.GRAVITY_RIGHT,
    },
  ];
  const logoSizes = [
    {
      label: 'SMALL',
      value: PlaceOptionsConstants.SIZE_SMALL,
    },
    {
      label: 'MEDIUM',
      value: PlaceOptionsConstants.SIZE_MEDIUM,
    },
    {
      label: 'LARGE',
      value: PlaceOptionsConstants.SIZE_LARGE,
    },
  ];

  return (
      <ScrollView>
        <View style={{flex: 1}}>
          <Text
            style={{
              width: '100%',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              fontStyle: 'italic',
              textAlign: 'center',
            }}>
            Search Place Options
          </Text>
          <TouchableOpacity onPress={() => setBackShowColorPicker(true)}>
            <View
              style={{
                margin: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={style.label}>Set BackGround Color</Text>

              <View
                style={{
                  height: 30,
                  width: 60,
                  borderColor: 'black',
                  borderWidth: 1,
                  backgroundColor: backGroundColor,
                  borderRadius: 10,
                }}
              />

              <RNColorPicker
                visible={showBackColorPicker}
                onRequestClose={() => {}}
                defaultColor={backGroundColor}
                onColorSelected={e => {
                  setBackShowColorPicker(false);
                  setBackGroundColor(e);
                  instance.backgroundColor = e;
                }}
              />
            </View>
          </TouchableOpacity>
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
          <TouchableOpacity onPress={() => setShowToolColorPicker(true)}>
            <View
              style={{
                margin: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={style.label}>Set Toolbar BackGround Color</Text>

              <View
                style={{
                  height: 30,
                  width: 60,
                  borderColor: 'black',
                  borderWidth: 1,
                  backgroundColor: toolbarColor,
                  borderRadius: 10,
                }}
              />

              <RNColorPicker
                visible={showToolColorPicker}
                onRequestClose={() => {}}
                defaultColor={toolbarColor}
                onColorSelected={e => {
                  setShowToolColorPicker(false);
                  setToolbarColor(e);
                  instance.toolbarColor = e;
                }}
              />
            </View>
          </TouchableOpacity>
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={style.label}>Zoom</Text>
            <TextInput
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={text => {
                setZoom(text);
                instance.zoom = text;
              }}
              value={zoom}
              style={{
                borderColor: 'black',
                borderWidth: 1,
                width: 40,
                padding:10
              }}
            />
          </View>
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
          <RadioGroup
            label="POD"
            data={pods}
            callback={e => (instance.pod = e.value)}
            index={pods.findIndex(x => x.value === pod) + 1}
          />
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
          <RNSwitch
            label="Tokenize Address"
            onValueChange={value => {
              instance.tokenizeAddress = value;
              setTokenizeAddress(value);
            }}
            value={tokenizeAddress}
          />
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
          <RNSwitch
            label="Save History(Android)"
            onValueChange={value => {
              instance.saveHistory = value;
              setSaveHistory(value);
            }}
            value={saveHistory}
          />
          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={style.label}>History Count(Android)</Text>
            <TextInput
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={text => {
                setHistoryCount(text);
                instance.historyCount = text;
              }}
              value={historyCount}
              style={{
                borderColor: 'black',
                borderWidth: 1,
                width: 40,
                padding:10
              }}
            />
          </View>
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={style.label}>Location</Text>
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={text => {
                let mLocation = location;
                setLocation([text, mLocation[1]]);
                instance.location[0] = parseFloat(text);
              }}
              value={location[0] != undefined ? location[0].toString() : null}
              placeholder="longitude"
              style={{
                borderColor: 'black',
                borderWidth: 1,
                padding:10,
                minWidth:100
              }}
            />
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={text => {
                let mLocation = location;
                setLocation([mLocation[0], text]);
                instance.location[1] = parseFloat(text);
              }}
              placeholder="latitude"
              value={location[1] != undefined ? location[1].toString() : null}
              style={{
                borderColor: 'black',
                borderWidth: 1,
                padding:10,
                minWidth:100
              }}
            />
          </View>
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={style.label}>Filter</Text>
            <TextInput
              onChangeText={text => {
                setFilter(text);
                instance.filter = text;
              }}
              placeholder="EX: cop:YMCZ0J"
              value={filter}
              style={{
                borderColor: 'black',
                borderWidth: 1,
                padding:10,
                minWidth:150
              }}
            />
          </View>
          <RadioGroup
            label="Attribution Vertical Alignment"
            data={verticalAlignments}
            callback={e => (instance.attributionVerticalAlignment = e.value)}
            index={
              verticalAlignments.findIndex(
                x => x.value === attributionVerticalAlignment,
              ) + 1
            }
          />
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
          <RadioGroup
            label="Attribution Horizontal Alignment"
            data={horizontalAlignments}
            callback={e => (instance.attributionHorizontalAlignment = e.value)}
            index={
              horizontalAlignments.findIndex(
                x => x.value === attributionHorizontalAlignment,
              ) + 1
            }
          />
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
          <RadioGroup
            label="Logo Size"
            data={logoSizes}
            callback={e => (instance.logoSize = e.value)}
            index={logoSizes.findIndex(x => x.value === logoSize) + 1}
          />
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
        </View>
      </ScrollView>
  );
};

const style = StyleSheet.create({
  label: {
    fontWeight: 'bold',
  },
});
export default PlacePickerSettingsComponent;
