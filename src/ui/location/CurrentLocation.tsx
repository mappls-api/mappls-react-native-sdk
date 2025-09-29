import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity, Image, FlatList, SafeAreaView, PermissionsAndroid, Platform, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import Toast from 'react-native-simple-toast'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Camera, CameraRef, Location, LocationManager, MapView, UserLocation } from 'mappls-map-react-native';
import styles from '../../constants/styles';
import colors from '../../constants/colors';


export default function CurrentLocation() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const cameraRef = useRef<CameraRef>(null);
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [isMapReady, setIsMapReady] = useState(false);
    const [userLocation, setUserLocation] = useState<Location>();

    // Check and request location permissions
    useEffect(() => {
        async function requestLocationPermission(): Promise<void> {
            try {
                if (Platform.OS === 'android') {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Permission',
                            message: 'This app needs access to your location',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        }
                    );
                    setHasLocationPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
                } else {
                    const permissionResult = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

                    if (permissionResult === RESULTS.DENIED) {
                        const requestResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
                        setHasLocationPermission(requestResult === RESULTS.GRANTED);
                    } else {
                        setHasLocationPermission(permissionResult === RESULTS.GRANTED);
                    }
                }
            } catch (err) {
                console.warn('Permission error:', err);
                Toast.show('Error requesting location permission', Toast.SHORT);
            }
        }

        requestLocationPermission();
    }, []);

    useEffect(() => {
        if (hasLocationPermission) {
            console.log("LocationManager ", 'start');
            try {
                LocationManager.start();
            } catch (e) {
                console.error('Error starting LocationManager:', e);
            }
            console.log("LocationManager ", 'start');
            const locationCallback = (location: Location) => {
                console.log("LocationManager listener triggered:", location);
                updateLocation(location);
            };

            LocationManager.addListener(locationCallback);

            return () => {
                console.log("LocationManager ", 'stop');
                LocationManager.removeListener(locationCallback);
                LocationManager.stop();
            };
        }
    }, [hasLocationPermission]);



    const updateLocation = (location: Location) => {
        try {
            setUserLocation(location);
            console.log('Raw location data:', JSON.stringify(location, null, 2));
            cameraRef.current?.setCamera({
                centerCoordinate: [location.coords.longitude, location.coords.latitude],
                zoomLevel: 12,
                animationDuration: 500
            });
            Toast.show(
                `Lat: ${location.coords.latitude.toFixed(6)}, Long: ${location.coords.longitude.toFixed(6)}`,
                Toast.SHORT,
            );
        } catch (error) {
            console.warn('Location update error:', error);
        }
    };

    const handleMapLoaded = () => {
        console.log('Map loaded successfully');
        setIsMapReady(true);

    };

    const handleMapError = (error: any) => {
        console.error('Map error:', error);
        Toast.show(`Map error: ${error.message}`, Toast.LONG);
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.backgroundPrimary,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right
        }}>
            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Current Location</Text>
                </View>
            </View>


            <MapView
                style={{ flex: 1, }} // Hide map until ready
                onDidFinishLoadingMap={handleMapLoaded}
                onMapError={handleMapError}
            >
                <Camera
                    ref={cameraRef}
                    defaultSettings={{
                        zoomLevel: 12,
                        centerCoordinate: [77.1025, 28.7041]
                    }}
                />
                {hasLocationPermission && isMapReady && (
                    console.log('Permission:', hasLocationPermission + ',' + isMapReady),
                    <UserLocation
                        animated={true}
                        showsUserHeadingIndicator={false}
                        visible={true}
                        androidRenderMode={"compass"}
                    />
                )}
            </MapView>

        </View>
    );
}

