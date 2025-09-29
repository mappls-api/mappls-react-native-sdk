import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Keyboard, Button, TextInput, Dimensions, ScrollView, Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast'
import { GeoCodeResponse } from 'mappls-map-react-native/src/modules/restApi/models/GeoCodeModel';
import { Callout, Camera, CameraRef, MapView, PointAnnotation, PointAnnotationRef, RestApi } from 'mappls-map-react-native';
import colors from '../../constants/colors';
import styles from '../../constants/styles';

export default function GeoCodeApi() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const [query, setQuery] = useState('lucknow');
    const [lat, setLat] = useState<number | undefined>(undefined);
    const [lng, setLng] = useState<number | undefined>(undefined);
    const [label, setLabel] = useState<string | undefined>(undefined);
    const [searchLayout, setSearchLayout] = useState({ y: 0, height: 0 });
    const [headerHeight, setHeaderHeight] = useState(0);
    const [bottomHeight, setBottomHeight] = useState(0);
    const screenHeight = Dimensions.get('window').height;
    const [bottomSelected, setBottomSelected] = useState<'response' | 'data'>('data');
    const [geoCodeResponse, setGeoCodeResponse] = useState<GeoCodeResponse | undefined>();
    const [latlngList, setLatLngList] = useState<[number, number] | null>(null);

    const cameraRef = useRef<CameraRef>(null);
    const pointAnnotationRef = useRef<PointAnnotationRef>(null);

    useFocusEffect(
        React.useCallback(() => {
            geoCodeApi('lucknow');

        }, [])
    );
    useEffect(() => {
        if (geoCodeResponse?.results != null) {
            setLatLngList(null)
            setLabel(undefined)
            const { longitude, latitude, formattedAddress } = geoCodeResponse?.results[0];
            setLatLngList([longitude, latitude])
            setLabel(formattedAddress);
            moveCamera(latitude, longitude);
        }
    }, [geoCodeResponse]);
    const geoCodeApi = async (placeName: string) => {
        try {
            const data = await RestApi.geocode({
                address: placeName,
            });
            if (!data?.results?.length) {
                console.error("No geocode results found");
                return;
            }
            setGeoCodeResponse(data)
            const { longitude, latitude, formattedAddress } = data.results[0];
            setLatLngList([longitude, latitude])
            setLabel(formattedAddress);
            moveCamera(latitude, longitude);
            Toast.show(
                `Longitude: ${longitude} Latitude: ${latitude}`,
                Toast.LONG
            );
        } catch (error: any) {
            Toast.show(error.message, Toast.SHORT);
        }
    };
    const moveCamera = (lat: number, lng: number) => {
        if (cameraRef.current) {
            cameraRef.current?.setCamera({ centerCoordinate: [lng, lat], zoomLevel: 12, animationDuration: 1000 });
        } else {
            console.log("moveCamera cameraRef else", lat)
        }
    };
    const onClick = () => {
        if (query.trim().length > 0) {
            geoCodeApi(query);
            Keyboard.dismiss();
        } else {
            Toast.show('Please enter some value', Toast.SHORT);
        }
    };

    return (
        <View style={{
            flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right,
            backgroundColor: colors.backgroundPrimary,
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
                    <Text style={styles.headerTitle}>GeoCode Api</Text>
                </View>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: colors.backgroundPrimary, // gives subtle container bg
                    padding: 8,
                    borderRadius: 8,
                    marginHorizontal: 5,
                    marginVertical: 8,
                }}
            >
                <TextInput
                    placeholder="Search..."
                    placeholderTextColor={colors.textSecondary}
                    style={{
                        flex: 1,
                        height: 44,
                        borderWidth: 1,
                        borderRadius: 6,
                        paddingHorizontal: 5,
                        borderColor: colors.strokeBorder,
                        color: colors.textPrimary,
                        fontSize: 14,
                    }}
                    value={query}
                    onChangeText={setQuery}
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: colors.accentPrimary,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderRadius: 6,
                        marginLeft: 8,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onPress={onClick}
                    activeOpacity={0.8}
                >
                    <Text style={{ color: colors.textPrimary, fontWeight: "600" }}>
                        Search
                    </Text>
                </TouchableOpacity>
            </View>


            <MapView
                onMapError={error => { console.log(error.code + ' ' + error.message) }}
                style={{ flex: 1 }}
            >
                <Camera
                    zoomLevel={12}
                    ref={cameraRef}

                />
                {latlngList && (
                    <PointAnnotation
                        id="markerId"
                        key="markerKey"
                        title="Marker"
                        ref={pointAnnotationRef}
                        coordinate={latlngList}
                    >
                        <Callout title={label || ''} />
                    </PointAnnotation>
                )}


            </MapView>

            {bottomSelected === 'response' && geoCodeResponse && (
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
                            {JSON.stringify(geoCodeResponse, null, 2)}
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

