import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'; // Missing import
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { RootStackParamList } from '../utils/navigationUtils';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import MapTap from './mapEvent/MapTap';
import MapLongTap from './mapEvent/MapLongTap';
import MapStyleURL from './mapEvent/MapStyleURL';
import MapGesture from './mapEvent/MapGesture';
import MapTraffic from './mapEvent/MapTraffic';
import HeatMap from './mapLayer/HeatMap';
import IndoorMap from './mapLayer/IndoorMap';
import GeoAnalytics from './mapLayer/GeoAnalytics';
import CameraFeature from './camera/CameraFeature';
import CameraEloc from './camera/CameraEloc';
import CameraElocBounds from './camera/CameraElocBounds';
import CurrentLocation from './location/CurrentLocation';
import AddMarker from './marker/AddMarker';
import AddCustomMarker from './marker/AddCustomMarker';
import AddCustomInfoWindow from './marker/AddCustominfoWindow';
import MarkerDragging from './marker/MarkerDragging';
import AddMarkerUsingMapplsPin from './marker/AddMarkerUsingMapplsPin';
import AddMarkerView from './marker/AddMarkerView';
import ClusterMarker from './marker/ClusterMarker';
import DrawPolyline from './polyline/DrawPolyline';
import DrawPolygon from './polyline/DrawPolygon';
import DrawGradientPolyline from './polyline/DrawGradientPolyline';
import DrawCirclePolygon from './polyline/DrawCirclePolygon';
import DrawSemiCircle from './polyline/DrawSemiCircle';
import AnimateMarker from './animation/AnimateMarker';
import TrackingWidget from './widgets/TrackingWidget';
import PlaceAutoCompleteWidget from './widgets/PlaceAutoCompleteWidget';
import AutoSuggestApi from './restAPI/AutoSuggestApi';
import GeoCodeApi from './restAPI/GeoCodeApi';
import NearbyApi from './restAPI/NearbyApi';
import ReverseGeoCodeApi from './restAPI/ReverseGeoCodeApi';
import GetDirectionApi from './restAPI/GetDirectionApi';
import GetDistanceApi from './restAPI/GetDistanceApi';
import PoiAlongTheRouteApi from './restAPI/PoiAlongTheRouteApi';
import HateOsNearbyApi from './restAPI/HateOsNearbyApi';
import NearByApiSetting from '../settings/NearByApiSetting';
import DistanceApiSetting from '../settings/DistanceApiSetting';
import PoiAlongTheRouteApiSetting from '../settings/PoiAlongTheRouteApiSetting';
import NearByReportApi from './restAPI/NearByReportApi';
import TrackingWidgetSetting from '../settings/TrackingWidgetSetting';
import PlaceAutoCompleteSetting from '../settings/PlaceAutoCompleteSetting';
import PlacePickerWidget from './widgets/PlacePickerWidget';
import PlacePickerWidgetSetting from '../settings/PlacePickerWidgetSetting';
import PlaceTap from './mapEvent/PlaceTap';
import Digipin from './utility/Digipin';
import ListScreen from '../components/ListScreen';
import DirectionApiSetting from '../settings/DirectionApiSetting';
import DirectionWidget from './widgets/DirectionWidget';
import DirectionWidgetSetting from '../settings/DirectionWidgetSetting';
import NearByWidget from './widgets/NearByWidget';


const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ListScreen" component={ListScreen} />
          <Stack.Screen name="Digipin" component={Digipin} />
          <Stack.Screen name="MapTap" component={MapTap} />
          <Stack.Screen name="PlaceTap" component={PlaceTap} />
          <Stack.Screen name="MapLongTap" component={MapLongTap} />
          <Stack.Screen name="MapGesture" component={MapGesture} />
          <Stack.Screen name='MapStyleURL' component={MapStyleURL} />
          <Stack.Screen name='MapTraffic' component={MapTraffic} />
          <Stack.Screen name='HeatMap' component={HeatMap} />
          <Stack.Screen name='IndoorMap' component={IndoorMap} />
          <Stack.Screen name='GeoAnalytics' component={GeoAnalytics} />
          <Stack.Screen name='CameraFeature' component={CameraFeature} />
          <Stack.Screen name='CameraEloc' component={CameraEloc} />
          <Stack.Screen name='CameraElocBounds' component={CameraElocBounds} />
          <Stack.Screen name='CurrentLocation' component={CurrentLocation} />
          <Stack.Screen name='AddMarker' component={AddMarker} />
          <Stack.Screen name='AddCustomMarker' component={AddCustomMarker} />
          <Stack.Screen name='AddCustomInfoWindow' component={AddCustomInfoWindow} />
          <Stack.Screen name='MarkerDragging' component={MarkerDragging} />
          <Stack.Screen name='AddMarkerUsingMapplsPin' component={AddMarkerUsingMapplsPin} />
          <Stack.Screen name='AddMarkerView' component={AddMarkerView} />
          <Stack.Screen name='ClusterMarker' component={ClusterMarker} />
          <Stack.Screen name='DrawPolyline' component={DrawPolyline} />
          <Stack.Screen name='DrawPolygon' component={DrawPolygon} />
          <Stack.Screen name='DrawGradientPolyline' component={DrawGradientPolyline} />
          <Stack.Screen name='DrawCirclePolygon' component={DrawCirclePolygon} />
          <Stack.Screen name='DrawSemiCircle' component={DrawSemiCircle} />
          <Stack.Screen name='AnimateMarker' component={AnimateMarker} />
          <Stack.Screen name='TrackingWidget' component={TrackingWidget} />
          <Stack.Screen name='PlaceAutoCompleteWidget' component={PlaceAutoCompleteWidget} />
          <Stack.Screen name="AutoSuggestApi" component={AutoSuggestApi} />
          <Stack.Screen name="GeoCodeApi" component={GeoCodeApi} />
          <Stack.Screen name="NearbyApi" component={NearbyApi} />
          <Stack.Screen name="ReverseGeoCodeApi" component={ReverseGeoCodeApi} />
          <Stack.Screen name="GetDirectionApi" component={GetDirectionApi} />
          <Stack.Screen name="GetDistanceApi" component={GetDistanceApi} />
          <Stack.Screen name="PoiAlongTheRouteApi" component={PoiAlongTheRouteApi} />
          <Stack.Screen name="HateOsNearbyApi" component={HateOsNearbyApi} />
          <Stack.Screen name="NearByReportApi" component={NearByReportApi} />
          <Stack.Screen name="NearByApiSetting" component={NearByApiSetting} />
          <Stack.Screen name="DirectionApiSetting" component={DirectionApiSetting} />
          <Stack.Screen name="DistanceApiSetting" component={DistanceApiSetting} />
          <Stack.Screen name="PoiAlongTheRouteApiSetting" component={PoiAlongTheRouteApiSetting} />
          <Stack.Screen name="TrackingWidgetSetting" component={TrackingWidgetSetting} />
          <Stack.Screen name="PlaceAutoCompleteSetting" component={PlaceAutoCompleteSetting} />
          <Stack.Screen name="PlacePickerWidget" component={PlacePickerWidget} />
          <Stack.Screen name="PlacePickerWidgetSetting" component={PlacePickerWidgetSetting} />
          <Stack.Screen name='DirectionWidget' component={DirectionWidget} />
          <Stack.Screen name='DirectionWidgetSetting' component={DirectionWidgetSetting} />
          <Stack.Screen name='NearByWidget' component={NearByWidget} />


        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
