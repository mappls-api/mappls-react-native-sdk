import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  ScrollView, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import Toast from 'react-native-simple-toast'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NearbyReportResponse } from 'mappls-map-react-native/src/modules/restApi/models/NearbyReportsModel';
import { bbox, lineString } from '@turf/turf';
import { Camera, CameraRef, MapView, MapViewRef, PointAnnotation, RestApi } from 'mappls-map-react-native';
import styles from '../../constants/styles';
import colors from '../../constants/colors';




export default function NearByReportApi() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    // const instance = MapplsGeoCodeApiSettings.instance;
    const [headerHeight, setHeaderHeight] = useState(0);
    const [bottomHeight, setBottomHeight] = useState(0);
    const screenHeight = Dimensions.get('window').height;
    const [bottomSelected, setBottomSelected] = useState<'response' | 'data'>('data');
    const [nearByReports, setNearByReportsResponse] = useState<NearbyReportResponse | undefined>();
    const [latlngList, setLatLngList] = useState<number[][]>([]);
    const [boxLayout, setBoxLayout] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

    const cameraRef = useRef<CameraRef>(null);
    const mapRef = useRef<MapViewRef>(null);
    const radius = 0.05; // ~5 km depending on latitude
    const center = [77.1025, 28.7041]; // [lng, lat]

    const topLeft: [number, number] = [center[0] - radius, center[1] + radius];
    const bottomRight: [number, number] = [center[0] + radius, center[1] - radius];


    useFocusEffect(
        React.useCallback(() => {
            if (boxLayout && mapRef.current) {
                callNearbyReportsApi();
            }

        }, [boxLayout,mapRef])
    );
    useEffect(() => {
        if (nearByReports?.reports) {
            setLatLngList([]);
            const coords: any = nearByReports?.reports.map((report: any) => [report.longitude, report.latitude]);
            setLatLngList(coords);
        }
    }, [nearByReports]);
    const callNearbyReportsApi = async () => {
        try {
            if (!mapRef.current || !boxLayout) return;

            // Top-left corner
            const topLeft = await mapRef.current.getCoordinateFromView([
                boxLayout.x,
                boxLayout.y
            ]);

            // Bottom-right corner
            const bottomRight = await mapRef.current.getCoordinateFromView([
                boxLayout.x + boxLayout.width,
                boxLayout.y + boxLayout.height
            ]);

            const data = await RestApi.nearbyReports({
                topLeft: topLeft, //[77.45, 28.56],
                bottomRight: bottomRight// [77.56, 29.45]
            });
            if (!data?.reports?.length) {
                console.error("No near by Reports results found");
                return;
            }
            setNearByReportsResponse(data)
            const coords: any = data.reports.map((report: any) => [report.longitude, report.latitude]);
            setLatLngList(coords);
            if (coords.length > 1) {
                const bounds = bbox(lineString(coords)); // turf.js
                cameraRef.current?.fitBounds(
                    [bounds[0], bounds[1]], // southwest
                    [bounds[2], bounds[3]], // northeast
                    100                 // duration ms
                );
            } else if (coords.length === 1) {
                // only one marker → center on it
                cameraRef.current?.setCamera({
                    centerCoordinate: coords[0],
                    zoomLevel: 4
                });
            }
        } catch (error: any) {
            Toast.show(error.message, Toast.SHORT);
        }
    };

    return (
        <View style={{
            flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right,
            backgroundColor:colors.backgroundPrimary,
        }}>
            <View
                onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
                style={styles.header}
            >
                {/* Left side: Back button + Title */}
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Nearby Reports Api</Text>
                </View>
            </View>

            <MapView
                ref={mapRef}
                onMapError={error => { console.log(error.code + ' ' + error.message) }}
                style={{ flex: 1 }}
            >
                <Camera
                    ref={cameraRef}
                    defaultSettings={{
                        centerCoordinate: [77.22263216972351, 28.62292461876685],
                        zoomLevel: 15,
                    }}
                />
                {latlngList.map((coord, index) => (

                    <PointAnnotation
                        key={`marker-${index}`}
                        id={`marker-${index}`}
                        coordinate={coord}
                        title="Marker"
                    >
                        <View />
                    </PointAnnotation>
                ))}

            </MapView>
            <View style={styles.selectionBox} onLayout={(event) => setBoxLayout(event.nativeEvent.layout)} />
            {bottomSelected === 'response' && nearByReports && (
                <View
                    style={[
                        styles.responseContainer,
                        {
                            width: '100%',
                            height: screenHeight - headerHeight - bottomHeight, // dynamic height
                            marginTop: headerHeight,
                        },
                    ]}
                >
                    <ScrollView contentContainerStyle={{ padding: 10, }} >
                        <Text style={styles.responseText}>
                            {JSON.stringify(nearByReports, null, 2)}
                        </Text>
                    </ScrollView>
                </View>
            )}
            <View
                onLayout={(event) => setBottomHeight(event.nativeEvent.layout.height)}
                style={styles.bottomToggleContainer}>
                <TouchableOpacity
                    style={[
                        styles.toggleBtn,
                        bottomSelected === 'response' ? styles.activeToggle : styles.inactiveToggle
                    ]}
                    onPress={() => setBottomSelected('response')}
                >
                    <Text style={[bottomSelected === 'response' ? styles.activeToggleText : styles.inactiveToggleText]}>
                        Show Response
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.toggleBtn, bottomSelected === 'data' ? styles.activeToggle : styles.inactiveToggle]}
                    onPress={() => setBottomSelected('data')}
                >
                    <Text style={[bottomSelected === 'data' ? styles.activeToggleText : styles.inactiveToggleText]}>
                        Show Data
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

