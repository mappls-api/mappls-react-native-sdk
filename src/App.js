import React, {Component} from 'react';
import {View, Text, LogBox} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {IS_ANDROID} from './utils/index';

import Home from './scenes/Home';
import Demo from './scenes/Demo';
import DirectionSettingsComponent from './settings/DirectionSettingsComponent';
import PlacePickerSettingsComponent from './settings/PlacePickerSettingsComponent';
import GeoFenceSettingsComponent from './settings/GeoFenceSettingsComponent';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Warning: Each',
  'VirtualizedLists should never be nested',
  '`new NativeEventEmitter()` was',
  "Warning: Can't perform a React state update",
]);

const Stack = createStackNavigator();


const atlasClientId ='';
const atlasClientSecret ='';
const mapSDKKey = '';
const restAPIKey = '';

// for map sdk
MapplsGL.setMapSDKKey(mapSDKKey); //place your mapsdkKey
MapplsGL.setRestAPIKey(restAPIKey); //your restApiKey
MapplsGL.setAtlasClientId(atlasClientId); //your atlasClientId key
MapplsGL.setAtlasClientSecret(atlasClientSecret); //your atlasClientSecret key

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingAndroidPermission: IS_ANDROID,
      isAndroidPermissionGranted: false,
    };
  }

  async componentDidMount() {
    if (IS_ANDROID) {
      const isGranted = await MapplsGL.requestAndroidLocationPermissions();
      this.setState({
        isAndroidPermissionGranted: isGranted,
        isFetchingAndroidPermission: false,
      });
    }
  }

  render() {
    if (IS_ANDROID && !this.state.isAndroidPermissionGranted) {
      if (this.state.isFetchingAndroidPermission) {
        return null;
      }
      return (
        <View style={{flex: 1}}>
          <Text>
            You need to accept location permissions in order to use this sample
            application.Please relaunch application and accept all permissions.
          </Text>
        </View>
      );
    }
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Vector SDK sample',
              headerStyle: {
                backgroundColor: 'blue',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Demo"
            component={Demo}
            options={({route}) => ({title: route.params.label})}
          />
           <Stack.Screen
            name="Direction Settings"
            component={DirectionSettingsComponent}
          />
          <Stack.Screen
            name="PlacePicker Settings"
            component={PlacePickerSettingsComponent}
          />
          <Stack.Screen
            name="Geofence Settings"
            component={GeoFenceSettingsComponent}
          /> 
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
