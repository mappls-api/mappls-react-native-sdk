import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity, Image, FlatList, SafeAreaView, ActivityIndicator, TextInput, Dimensions, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { bbox } from '@turf/turf';
import Polyline from 'mappls-polyline';
import { POIAlongRouteResponse } from 'mappls-map-react-native/src/modules/restApi/models/POIAlongRouteResponse';
import { MapplsPoiAlongTheRouteApiSettings } from '../../model/MapplsPoiAlongTheRouteApiSettings';
import { Camera, CameraRef, LineLayer, MapView, PointAnnotation, RestApi, ShapeSource } from 'mappls-map-react-native';
import styles from '../../constants/styles';



export default function PoiAlongTheRouteApi() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const [poiResponse, setPoiResponse] = useState<POI[] | undefined>(undefined);
    const [route, setRoute] = useState<any>(null);
    const mapViewRef = useRef<any>(null);
    const cameraRef = useRef<CameraRef>(null);
    const [visibleList, setVisibleList] = useState(false);
    const [pOIAlongRouteResponse, setPOIAlongRouteResponse] = useState<POIAlongRouteResponse | undefined>();
    const [selected, setSelected] = useState<'map' | 'list'>('map');
    const [bottomSelected, setBottomSelected] = useState<'response' | 'data'>('data');
    const [headerHeight, setHeaderHeight] = useState(0);
    const [bottomHeight, setBottomHeight] = useState(0);
    const screenHeight = Dimensions.get('window').height;
    const instance = MapplsPoiAlongTheRouteApiSettings.instance;


    const callPoiAlongTheRoute = useCallback((path: string) => {
        RestApi.POIAlongRoute({
            path: path,
            category: instance.category,
            buffer: instance.buffer,
            geometries: instance.geometries,
            page: instance.page,
            sort: instance.sort
        })
            .then((res: any) => {

                setPOIAlongRouteResponse(res)
                console.log("callPoiAlongTheRoute", JSON.stringify(res))
                setPoiResponse(res.suggestedPOIs);
            })
            .catch((err: any) => {
                setPoiResponse(undefined);
                console.log(err.message);
            });
    }, []);

    const callDirectionApi = useCallback(() => {
        RestApi.direction({
            origin: instance.origin,
            destination: instance.destination,
            geometries: instance.geometries,
        })
            .then((response: any) => {
                const routeGeoJSON = Polyline.toGeoJSON(response.routes[0].geometry, 6)

                setRoute(routeGeoJSON);
                callPoiAlongTheRoute(response.routes[0].geometry);
                console.log("routeGeoJSON", `${JSON.stringify(routeGeoJSON)}`)
                const bounds = bbox(routeGeoJSON);
                console.log("routeGeoJSON", `${[bounds[0], bounds[1]]},${[bounds[2], bounds[3]]}`)
                cameraRef.current?.fitBounds(
                    [bounds[0], bounds[1]],
                    [bounds[2], bounds[3]],
                    [100, 30, 100, 30],  // padding
                    1000 // duration in ms
                );


            })
            .catch((error: any) => console.log(error.message));
    }, [callPoiAlongTheRoute]);



    useFocusEffect(
        React.useCallback(() => {
            callDirectionApi();

        }, [])
    );

    const renderPOIItem = ({ item }: { item: POI }) => (
        <View style={styles.placeItem}>
            <Text style={styles.title}>{item.poi}</Text>
            <Text style={styles.placeText}>{item.address}</Text>
        </View>
    );

    return (
        <View
            style={[
                {
                    flex: 1,
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                },
            ]}
        >
            {/* Header */}
            <View
                onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
                style={styles.header}
            >
                {/* Left side: Back button + Title */}
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>POI Along the route</Text>
                </View>

                {/* Right side: Settings icon */}
                <TouchableOpacity onPress={() => navigation.navigate("PoiAlongTheRouteApiSetting")}>
                    <Image
                        source={require('../../assets/settings.png')}
                        style={[styles.settingsIcon, { tintColor: 'white' }]}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            {/* Map / List Toggle */}
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[styles.toggleBtn, selected === 'map' && styles.activeBtn]}
                    onPress={() => {
                        setSelected('map')
                        setVisibleList(false);
                        callDirectionApi();
                    }}
                >
                    <Text style={[styles.toggleText, selected === 'map' && styles.activeText]}>
                        Map View
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.toggleBtn, selected === 'list' && styles.activeBtn]}
                    onPress={() => {
                        setSelected('list')
                        setVisibleList(true);
                    }}
                >
                    <Text style={[styles.toggleText, selected === 'list' && styles.activeText]}>
                        List View
                    </Text>
                </TouchableOpacity>
            </View>

            {visibleList && (
                <View style={styles.placesListContainer}>
                    <FlatList<POI>
                        data={poiResponse || []}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={renderPOIItem}
                        contentContainerStyle={{ paddingBottom: 10 }}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            )}

            {!visibleList && (
                <View style={styles.mapWrapper}>
                    <MapView
                        ref={mapViewRef}
                        onMapError={(error) => {
                            console.log(error.code + ' ' + error.message);
                        }}
                        style={{ flex: 1, }}
                    // onPress={onPressMap}
                    >

                        <Camera zoomLevel={12} ref={cameraRef} />
                        {poiResponse?.map((item, index) => {
                            if (!item.latitude || !item.longitude) return null;
                            return (
                                <PointAnnotation
                                    key={`${item.latitude}-${item.longitude}-${index}`}
                                    id={`${item.latitude}-${item.longitude}-${index}`}
                                    coordinate={[item.longitude, item.latitude]}
                                >
                                    <View />
                                </PointAnnotation>
                            );
                        })}

                        {route && route !== null &&
                            <ShapeSource id="routeSource" shape={route}>
                                <LineLayer id="routeFill" style={layerStyles.route} />
                            </ShapeSource>}

                    </MapView>
                </View>
            )}
            {bottomSelected === 'response' && pOIAlongRouteResponse && (
                <View
                    style={[
                        styles.responseContainer,
                        {
                            height: screenHeight - headerHeight - bottomHeight, // dynamic height
                            marginTop: headerHeight,
                        },
                    ]}
                >
                    <ScrollView contentContainerStyle={{ padding: 10, }} >
                        <Text style={styles.responseText}>
                            {JSON.stringify(pOIAlongRouteResponse, null, 2)}
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
const layerStyles = {
    route: {
        lineColor: 'blue',
        lineCap: 'round' as const,
        lineWidth: 3,
        lineOpacity: 0.84,
        lineJoin: 'round' as const,
    },
};

interface POI {
    latitude: number;
    longitude: number;
    poi: string;
    address: string;
    key: string;
}
