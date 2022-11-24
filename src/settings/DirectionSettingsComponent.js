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
import DirectionSettings from '../singletons/DirectionSettings';
import RadioGroup from '../components/RadioGroup';
import CheckboxGroup from '../components/CheckboxGroup';
import RNColorPicker from '../components/RNColorPicker';
import RNSwitch from '../components/RNSwitch';
import CustomView from '../components/CustomView';
import {
  DirectionsCriteria,
  PlaceOptionsConstants,
} from 'mappls-direction-widget-react-native';

const DirectionSettingsComponent = () => {
  let instance = DirectionSettings.getInstance();
  const [navigationEnabled, setnavigationEnabled] = useState(
    instance.showStartNavigation,
  );
  const [stepsEnabled, setStepsEnabled] = useState(instance.steps);
  const [alterRoutesEnabled, setAlterRoutesEnabled] = useState(
    instance.showAlternative,
  );
  const [destination, setDestination] = useState(instance.destination);
  const [resource, setResource] = useState(instance.resource);
  const [profile, setProfile] = useState(instance.profile);
  const [overView, setOverView] = useState(instance.overview);
  const [attribution, setAttribution] = useState(instance.attributions);
  const [excludes, setExcludes] = useState(instance.excludes);
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
  const [destinationType, setDestinationType] = useState('mapplsPin');
  const [showCustomView, setShowCustomView] = useState(false);

  //show and set background color
  const [showBackColorPicker, setBackShowColorPicker] = useState(false);
  const [backGroundColor, setBackGroundColor] = useState(
    instance.backgroundColor,
  );

  //show and set toolbar color
  const [showToolColorPicker, setShowToolColorPicker] = useState(false);
  const [toolbarColor, setToolbarColor] = useState(instance.toolbarColor);

  const resources = [
    {
      label: 'ROUTE',
      value: DirectionsCriteria.RESOURCE_ROUTE,
    },
    {
      label: 'ROUTE ETA',
      value: DirectionsCriteria.RESOURCE_ROUTE_ETA,
    },
    {
      label: 'ROUTE TRAFFIC',
      value: DirectionsCriteria.RESOURCE_ROUTE_TRAFFIC,
    },
  ];

  const overViews = [
    {
      label: 'FULL',
      value: DirectionsCriteria.OVERVIEW_FULL,
    },
    {
      label: 'NONE',
      value: DirectionsCriteria.OVERVIEW_FALSE,
    },
    {
      label: 'SIMPLIFIED',
      value: DirectionsCriteria.OVERVIEW_SIMPLIFIED,
    },
  ];

  const profiles = [
    {
      label: 'DRIVING',
      value: DirectionsCriteria.PROFILE_DRIVING,
    },
    {
      label: 'WALKING ',
      value: DirectionsCriteria.PROFILE_WALKING,
    },
    {
      label: 'BIKING',
      value: DirectionsCriteria.PROFILE_BIKING,
    },
    {
      label: 'TRUCKING',
      value: DirectionsCriteria.PROFILE_TRUCKING,
    },
  ];

  const attributions = [
    {
      label: 'CONGESTION',
      value: DirectionsCriteria.ATTRIBUTIONS_CONGESTION,
    },
    {
      label: 'DISTANCE ',
      value: DirectionsCriteria.ATTRIBUTIONS_DISTANCE,
    },
    {
      label: 'DURATION',
      value: DirectionsCriteria.ATTRIBUTIONS_DURATION,
    },
  ];

  const exludesOptions = [
    {
      label: 'FERRY',
      value: DirectionsCriteria.EXCLUDE_FERRY,
    },
    {
      label: 'MOTORWAY ',
      value: DirectionsCriteria.EXCLUDE_MOTORWAY,
    },
    {
      label: 'TOLL',
      value: DirectionsCriteria.EXCLUDE_TOLL,
    },
  ];

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
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="position"
      keyboardVerticalOffset={10}>
      <ScrollView>
        <View style={{flex: 1}}>
          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={style.label}>Destination</Text>
            <View style={{flexDirection: 'column'}}>
              <TouchableOpacity
                style={{backgroundColor: '#87ceeb', borderRadius: 10}}
                onPress={() => {
                  setDestinationType('mapplsPin');
                  setShowCustomView(true);
                }}>
                <Text style={{color: 'white', textAlign: 'center', padding: 5}}>
                  Eloc
                </Text>
              </TouchableOpacity>
              <CustomView
                type={destinationType}
                onRequestClose={() => setShowCustomView(false)}
                onButtonPress={(type, mEloc, mLng, mLat, mName, mAddress) => {
                  console.log(mEloc, mLat, mLng, type);
                  if (type === 'eloc') {
                    instance.destination = {
                      eloc: mEloc,
                      address: mAddress,
                      name: mName,
                    };
                  } else {
                    instance.destination = {
                      longitude: parseFloat(mLng),
                      latitude: parseFloat(mLat),
                      address: mAddress,
                      name: mName,
                    };
                  }
                  setShowCustomView(false);
                }}
                visible={showCustomView}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: '#87ceeb',
                  borderRadius: 10,
                  marginTop: 5,
                }}
                onPress={() => {
                  setDestinationType('location');
                  setShowCustomView(true);
                }}>
                <Text style={{color: 'white', textAlign: 'center', padding: 5}}>
                  Location
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
          <RNSwitch
            label="Show Start Navigation"
            onValueChange={value => {
              instance.showStartNavigation = value;
              setnavigationEnabled(instance.showStartNavigation);
            }}
            value={navigationEnabled}
          />
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
          <RNSwitch
            label="Show Alternative routes"
            onValueChange={value => {
              setAlterRoutesEnabled(value);
              instance.showAlternative = value;
            }}
            value={alterRoutesEnabled}
          />
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
          <RNSwitch
            label="Show Steps"
            onValueChange={value => {
              instance.steps = value;
              setStepsEnabled(value);
            }}
            value={stepsEnabled}
          />
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
          <RadioGroup
            label="Resources"
            data={resources}
            callback={e => (instance.resource = e.value)}
            index={resources.findIndex(x => x.value === resource) + 1}
          />
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
          <RadioGroup
            label="Profile"
            data={profiles}
            callback={e => (instance.profile = e.value)}
            index={profiles.findIndex(x => x.value === profile) + 1}
          />
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
          <RadioGroup
            label="OverView"
            data={overViews}
            callback={e => (instance.overview = e.value)}
            index={overViews.findIndex(x => x.value === overView) + 1}
          />
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
          <CheckboxGroup
            label="Attributions"
            data={attributions}
            selectedItems={attribution}
            callback={e => {
              //console.log(e)
              setAttribution(e);
              instance.attributions = e; //e.map((data) => data.value);
              //console.log(e.map((data) => data.value));
            }}
          />
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
          <CheckboxGroup
            label="Excludes(Andorid)"
            data={exludesOptions}
            selectedItems={excludes}
            callback={e => {
              setExcludes(e);
              instance.excludes = e; //e.map((data) => data.value);
              //console.log(e);
            }}
          />
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
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
                padding: 5,
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
                padding: 5,
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
                padding: 5,
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
                padding: 5,
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
                padding: 5,
                minWidth:150
              }}
            />
          </View>
          <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
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
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  label: {
    fontWeight: 'bold',
  },
});
export default DirectionSettingsComponent;
