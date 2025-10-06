
import { ImageSourcePropType } from 'react-native';
import React, { Component, ReactElement } from 'react';
import MapEventIcon from '../assets/MapEventIcon';
import MapLayerIcon from '../assets/MapLayerIcon';
import CameraIcon from '../assets/CameraIcon';
import MarkerIcon from '../assets/MarkerIcon';
import LocationIcon from '../assets/LocationIcon';
import PolylineIcon from '../assets/PolylineIcon';
import RestAPIIcon from '../assets/RestAPIIcon';
import AnimationIcon from '../assets/AnimationIcon';
import WidgetsIcon from '../assets/WidgetsIcon';

export type RootStackParamList = {
    Splash: undefined;
    Home: undefined;
    ListScreen: { title: string; data: ComponentItem[] };
    MapEvents: undefined;
    MapLayer: undefined;
    Camera: undefined;
    Marker: undefined;
    Location: undefined;
    Polyline: undefined;
    RestApi: undefined;
    Utilities: undefined;
    Animation: undefined;
    Widgets: undefined;
    MapTap: undefined;
    PlaceTap: undefined;
    MapLongTap: undefined;
    MapGesture: undefined;
    MapStyleURL: undefined;
    MapTraffic: undefined;
    HeatMap: undefined;
    IndoorMap: undefined;
    GeoAnalytics: undefined;
    CameraFeature: undefined;
    CameraEloc: undefined;
    CameraElocBounds: undefined;
    CurrentLocation: undefined;
    AddMarker: undefined;
    AddCustomMarker: undefined;
    AddCustomInfoWindow: undefined;
    MarkerDragging: undefined;
    AddMarkerUsingMapplsPin: undefined;
    AddMarkerView: undefined;
    ClusterMarker: undefined;
    DrawPolyline: undefined;
    DrawPolygon: undefined;
    DrawGradientPolyline: undefined;
    DrawCirclePolygon: undefined;
    DrawSemiCircle: undefined;
    AnimateMarker: undefined;
    TrackingWidget: undefined;
    PlaceAutoCompleteWidget: undefined;
    PlacePickerWidget: undefined;
    AutoSuggestApi: undefined;
    GeoCodeApi: undefined;
    NearbyApi: undefined;
    ReverseGeoCodeApi: undefined;
    GetDirectionApi: undefined;
    GetDistanceApi: undefined;
    PoiAlongTheRouteApi: undefined;
    HateOsNearbyApi: undefined;
    NearByReportApi: undefined;
    NearByApiSetting: undefined;
    AutoSuggestApiSetting: undefined;
    GeoCodeApiSetting: undefined;
    DirectionApiSetting: undefined;
    ReverseGeoCodeApiSetting: undefined;
    DistanceApiSetting: undefined;
    PoiAlongTheRouteApiSetting: undefined;
    WeatherApiSetting: undefined;
    PlaceAutoCompleteSetting: undefined;
    TrackingWidgetSetting: undefined;
    PlacePickerWidgetSetting: undefined;
    Digipin: undefined;
    DirectionWidgetSetting: undefined;
    DirectionWidget: undefined;
    NearByWidget:undefined;
};

export const menuItems = [
    { id: '1', title: 'Map Events', icon: <MapEventIcon />, screen: 'MapEvents' as keyof RootStackParamList },
    { id: '2', title: 'Map Layers', icon: <MapLayerIcon />, screen: 'MapLayer' as keyof RootStackParamList },
    { id: '3', title: 'Camera', icon: <CameraIcon />, screen: 'Camera' as keyof RootStackParamList },
    { id: '4', title: 'Marker', icon: <MarkerIcon />, screen: 'Marker' as keyof RootStackParamList },
    { id: '5', title: 'Location', icon: <LocationIcon />, screen: 'Location' as keyof RootStackParamList },
    { id: '6', title: 'Polyline', icon: <PolylineIcon />, screen: 'Polyline' as keyof RootStackParamList },
    { id: '7', title: 'Rest API Call', icon: <RestAPIIcon />, screen: 'RestApi' as keyof RootStackParamList },
    { id: '8', title: 'Animation', icon: <AnimationIcon />, screen: 'Animation' as keyof RootStackParamList },
    { id: '9', title: 'Custom Widgets', icon: <WidgetsIcon />, screen: 'Widgets' as keyof RootStackParamList },
    { id: '10', title: 'Utilities', icon: <WidgetsIcon />, screen: 'Utilities' as keyof RootStackParamList },
];

export interface ComponentItem {
    title: string;
    subtitle: string;
    IconComponent?: ReactElement<{
        width?: number;
        height?: number;
        style?: React.CSSProperties;
    }>;
    image: ImageSourcePropType;
    screen?: keyof RootStackParamList;
}



export const mapEventsData: ComponentItem[] = [
    {
        title: 'Map Tap',
        subtitle: 'Single tap event on map',
        image: require('../assets/map.png'),
        screen: 'MapTap',
    },
    {
        title: 'Map Long Tap',
        subtitle: 'Long Press event on map',
        image: require('../assets/map.png'),
        screen: 'MapLongTap',
    },
    {
        title: 'Map Gesture',
        subtitle: 'Map events and Map panning',
        image: require('../assets/map.png'),
        screen: 'MapGesture',

    },
    {
        title: 'Map Style URL',
        subtitle: 'Check out the diverse map styles Mappls Offer',
        image: require('../assets/map.png'),
        screen: 'MapStyleURL',
    },
    {
        title: 'Map Traffic',
        subtitle: 'Visualize Traffic services on Map',
        image: require('../assets/map.png'),
        screen: 'MapTraffic',
    },
    {
        title: 'Place Tap',
        subtitle: 'place tap event on map',
        image: require('../assets/map.png'),
        screen: 'PlaceTap',
    },

];

export const mapLayerData: ComponentItem[] = [
    {
        title: 'Heat Map',
        subtitle: 'Add and visualize data in Heat Style',
        image: require('../assets/map.png'),
        screen: 'HeatMap',
    },
    {
        title: 'Indoor Map',
        subtitle: 'Mappls Indoor Widgets to focus on multi-store buildings structure and floor wise data on map.',
        image: require('../assets/map.png'),
        screen: 'IndoorMap',
    },
    {
        title: 'GeoAnalytics Plugin',
        subtitle: 'Visualize Administrative Layers on Map as WMS Layers Available with Mappls Database.',
        image: require('../assets/map.png'),
        screen: 'GeoAnalytics',
    },
];

export const cameraData: ComponentItem[] = [
    {
        title: 'Camera Feature',
        subtitle: 'Explore camera features like Move Camera, Ease Camera & Animate Camera',
        image: require('../assets/map.png'),
        screen: 'CameraFeature',
    },
    {
        title: 'Camera Mappls Pin Features',
        subtitle: 'To change the current location icon and tracking mode',
        image: require('../assets/map.png'),
        screen: 'CameraEloc',
    },
    {
        title: 'Camera Mappls Pin bounds',
        subtitle: 'Animate, Move or ease camera using mappls pin',
        image: require('../assets/map.png'),
        screen: 'CameraElocBounds',
    },
];

export const markerData: ComponentItem[] = [
    {
        title: 'Add a Marker',
        subtitle: 'Add a marker and visualize it on map',
        image: require('../assets/map.png'),
        screen: 'AddMarker'
    },
    {
        title: 'Add Custom Marker',
        subtitle: 'Add a custom marker and visualize it on map',
        image: require('../assets/map.png'),
        screen: 'AddCustomMarker'
    },
    {
        title: 'Add Custom Info Window',
        subtitle: 'Add a custom information window',
        image: require('../assets/map.png'),
        screen: 'AddCustomInfoWindow'
    },
    {
        title: 'Marker Dragging',
        subtitle: 'Marker dragging functionality',
        image: require('../assets/map.png'),
        screen: 'MarkerDragging'
    },
    {
        title: 'Add Marker Using Mappls Pin',
        subtitle: 'Add a marker using mappls pin functionality',
        image: require('../assets/map.png'),
        screen: 'AddMarkerUsingMapplsPin'
    },
    {
        title: 'Add Marker View',
        subtitle: 'Add an marker view (Info window) to your markers',
        image: require('../assets/map.png'),
        screen: 'AddMarkerView'
    },
    {
        title: 'Cluster Marker',
        subtitle: 'Add cluster markers on a map',
        image: require('../assets/map.png'),
        screen: 'ClusterMarker'
    },
];

export const locationData: ComponentItem[] = [
    {
        title: 'Current Location',
        subtitle: 'Camera options for Location rendering and tracking modes',
        image: require('../assets/map.png'),
        screen: 'CurrentLocation'
    },


];

export const polylineData: ComponentItem[] = [
    {
        title: 'Draw Polyline',
        subtitle: 'Draw a Polyline with the given list of location coordinates (Lat/Long)',
        image: require('../assets/map.png'),
        screen: 'DrawPolyline'
    },
    {
        title: 'Polyline with gradient color',
        subtitle: 'Draw a Polyline with the given list of location coordinates (Lat/Long) with color gradient',
        image: require('../assets/map.png'),
        screen: 'DrawGradientPolyline'
    },
    {
        title: 'Circle polyline',
        subtitle: 'Functionality to draw a Semi circle polyline on map',
        image: require('../assets/map.png'),
        screen: 'DrawCirclePolygon'
    },
    {
        title: 'Draw SemiCircle Polyline',
        subtitle: 'Functionality to draw snake motion polyline on map',
        image: require('../assets/map.png'),
        screen: 'DrawSemiCircle'
    },
    {
        title: 'Draw Polygon',
        subtitle: 'Functionality to draw and plot a polygon on the map',
        image: require('../assets/map.png'),
        screen: 'DrawPolygon',
    },
];

export const restApiData: ComponentItem[] = [
    {
        title: 'AutoSuggest Api',
        subtitle: 'API call request for Autosuggest, displaying results of the searched place',
        image: require('../assets/map.png'),
        screen: 'AutoSuggestApi'
    },
    {
        title: 'GeoCodeApi',
        subtitle: 'API Call request for Geocode, displaying results of the results',
        image: require('../assets/map.png'),
        screen: 'GeoCodeApi'
    },
    {
        title: 'NearbyApi',
        subtitle: 'API Call request for NearBy API, displaying its results',
        image: require('../assets/map.png'),
        screen: 'NearbyApi'
    },
    {
        title: 'ReverseGeoCodeApi',
        subtitle: 'API Call request for Rev-Geocode, displaying its results',
        image: require('../assets/map.png'),
        screen: 'ReverseGeoCodeApi'
    },
    {
        title: 'GetDirectionApi',
        subtitle: 'API Call request for get direction , displaying its results',
        image: require('../assets/map.png'),
        screen: 'GetDirectionApi'
    },
    {
        title: 'GetDistanceApi',
        subtitle: 'API Call request for get distance, displaying its results',
        image: require('../assets/map.png'),
        screen: 'GetDistanceApi'
    },
    {
        title: 'PoiAlongTheRouteApi',
        subtitle: 'API Call request for NearBy API, displaying its results.',
        image: require('../assets/map.png'),
        screen: 'PoiAlongTheRouteApi'
    },
    {
        title: 'HateOsNearbyApi',
        subtitle: 'API Call request for POI Along the Route, displaying its results',
        image: require('../assets/map.png'),
        screen: 'HateOsNearbyApi'
    },
    {
        title: 'NearBy Report Api',
        subtitle: 'API Call request for NearBy Report, displaying its results',
        image: require('../assets/map.png'),
        screen: 'NearByReportApi'
    },


];
export const animationData: ComponentItem[] = [
    {
        title: 'Animate Car',
        subtitle: 'Animation of an car icon on predefined route',
        image: require('../assets/map.png'),
        screen: 'AnimateMarker'
    },

];

export const widgetsData: ComponentItem[] = [

    {
        title: 'Place Autocomplete Widget',
        subtitle: 'Location search functionality and UI to search a place',
        image: require('../assets/map.png'),
        screen: 'PlaceAutoCompleteWidget'
    },
    {
        title: 'Tracking Widget',
        subtitle: 'Mappls Tracking Widget to track result on map',
        image: require('../assets/map.png'),
        screen: 'TrackingWidget'
    },

    {
        title: 'Place Picker Widget',
        subtitle: 'Place Picker to search and choose a specific location',
        image: require('../assets/map.png'),
        screen: 'PlacePickerWidget'
    },
    {
        title: 'Direction Widget',
        subtitle: 'DirectionWidget to show Route on map',
        image: require('../assets/map.png'),
        screen:'DirectionWidget'
    },
    // {
    //     title: 'GeoFence Widget',
    //     subtitle: 'Highly customizable UI widget to create/edit geofence widget',
    //     image: require('../assets/map.png'),
    // },
    {
        title: 'Nearby Widget',
        subtitle: 'Mappls Nearby Widget to search nearby result on map',
        image: require('../assets/map.png'),
        screen:'NearByWidget'
    },
    // {
    //     title: 'Feedback Widget',
    //     subtitle: 'Mappls Feedback Widget to give Feedback',
    //     image: require('../assets/map.png'),
    // },

];

export const utilitiData: ComponentItem[] = [

    {
        title: 'Get Digipin',
        subtitle: 'Get Digipin on map',
        image: require('../assets/map.png'),
        screen: 'Digipin'
    },


];

export const screenDataMap: Record<string, ComponentItem[]> = {
    MapEvents: mapEventsData,
    MapLayer: mapLayerData,
    Camera: cameraData,
    Marker: markerData,
    Location: locationData,
    Polyline: polylineData,
    RestApi: restApiData,
    Animation: animationData,
    Widgets: widgetsData,   // typo fixed: widgetsData not widgetData
    Utilities: utilitiData, // typo fixed: utilitiData not utilityData
};
export interface Location {
    latitude: number;
    longitude: number;
}
