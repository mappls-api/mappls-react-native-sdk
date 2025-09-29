import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { Camera, CameraRef, LineLayer, LineLayerStyle, MapView, RestApi, ShapeSource } from 'mappls-map-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import Toast from 'react-native-simple-toast'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { bbox } from '@turf/turf';
import Polyline from 'mappls-polyline';
import { DirectionsResponse } from 'mappls-map-react-native/src/modules/restApi/models/DirectionModel';
import { MapplsDirectionApiSettings } from '../../model/MapplsDirectionApiSettings';
import DeviceInfo from 'react-native-device-info';
import styles from '../../constants/styles';
import colors from '../../constants/colors';







export default function GetDirectionApi() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const instance = MapplsDirectionApiSettings.instance;
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [route, setRoute] = useState<any>('');
    const [sourceCoordinates, setSourceCoordinates] = useState('77.202432,28.594475');
    const [destinationCoordinates, setDestinationCoordinates] = useState('77.186982,28.554676');
    const cameraRef = useRef<CameraRef>(null);
    const [activeMode, setActiveMode] = useState('driving');
    const [selectedResource, setSelectedResource] = useState('route_adv');

    const [directionsResponse, setDirectionsResponse] = useState<DirectionsResponse | undefined>();
    const [selected, setSelected] = useState<'map' | 'list'>('map');
    const [bottomSelected, setBottomSelected] = useState<'response' | 'data'>('data');
    const [headerHeight, setHeaderHeight] = useState(0);
    const [bottomHeight, setBottomHeight] = useState(0);
    const screenHeight = Dimensions.get('window').height;

    const resource = [
        { id: 'route_adv', label: 'Non Traffic' },
        { id: 'route_traffic', label: 'Traffic' },
        { id: 'route_eta', label: 'Route ETA' }
    ];



    const getFormattedDistance = (dist: number) => {
        if (dist / 1000 < 1) return `${dist}mtr.`;
        return `${(dist / 1000).toFixed(2)}Km.`;
    };

    const getFormattedDuration = (dur: number) => {
        const min = Math.floor((dur % 3600) / 60);
        const hours = Math.floor((dur % 86400) / 3600);
        const days = Math.floor(dur / 86400);

        if (days > 0) {
            return `${days} ${days > 1 ? 'Days' : 'Day'} ${hours} hr${min > 0 ? ` ${min} min.` : ''}`;
        }
        return hours > 0 ? `${hours} hr${min > 0 ? ` ${min} min` : ''}` : `${min} min.`;
    };



    const callApi = async (setProfile: string) => {
        const androidId = await DeviceInfo.getUniqueId();
        const bearing =
            instance.bearing != null && instance.bearing > 0
                ? { angle: instance.bearing, tolerance: 90 }
                : undefined;

        console.log(`waypointIndices:: ${instance.waypointIndices}`)
        RestApi.direction({
            origin: instance.origin,
            destination: instance.destination,
            waypoints: instance.waypoints,
            profile: setProfile,
            isSort: instance.isSort,
            alternatives: instance.alternatives,
            resource: selectedResource,
            overview: instance.overview,
            geometries: instance.geometries,
            excludes: instance.excludes,
            annotations: instance.annotations,
            routeRefresh: instance.routeRefresh,
            deviceId: instance.routeRefresh === true ? androidId : '',
            

        })
            .then((data: any) => {
                const routeGeoJSON = Polyline.toGeoJSON(data.routes[0].geometry, 6);
                setDirectionsResponse(data)
                setDistance(getFormattedDistance(data.routes[0].distance));
                setDuration(getFormattedDuration(data.routes[0].duration));
                setRoute(routeGeoJSON);

                const bounds = bbox(routeGeoJSON);
                cameraRef.current?.fitBounds(
                    [bounds[0], bounds[1]],
                    [bounds[2], bounds[3]],
                    10,
                    40
                );
            })
            .catch((error: any) => {
                console.log(error);
                Toast.show(error.message || 'Error fetching directions', Toast.SHORT);
            });
    };

    const onDrive = () => {
        setActiveMode('driving');
        callApi('driving');
    };

    const onBike = () => {
        setActiveMode('biking');

        callApi('biking');
    };

    const onWalk = () => {
        setActiveMode('walking');
        setSelectedResource('route_adv')
        callApi('walking');
    };




    useFocusEffect(
        React.useCallback(() => {
            callApi('driving');
            setActiveMode('driving');

        }, [])
    );

    const buttons = (
        <View style={styles.transportContainer}>
            <TouchableOpacity
                style={[
                    styles.transportButton,
                ]}
                onPress={onDrive}
            >
                <Text style={[
                    styles.transportText,
                    activeMode === 'driving' && styles.activeText
                ]}>
                    Driving
                </Text>
                {activeMode === 'driving' && <View style={styles.activeIndicator} />}
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.transportButton,
                ]}
                onPress={onBike}
            >
                <Text style={[
                    styles.transportText,
                    activeMode === 'biking' && styles.activeText
                ]}>
                    Biking
                </Text>
                {activeMode === 'biking' && <View style={styles.activeIndicator} />}
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.transportButton,
                    activeMode === 'walking' && styles.activeButton
                ]}
                onPress={onWalk}
            >
                <Text style={[
                    styles.transportText,
                    activeMode === 'walking' && styles.activeText
                ]}>
                    Walking
                </Text>
                {activeMode === 'walking' && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
        </View>
    );


    const resourceButtons = (
        <View style={styles.radioGroup}>
            {resource.map((resource) => (
                <TouchableOpacity
                    key={resource.id}
                    style={styles.radioButton}
                    onPress={() => setSelectedResource(resource.id)}
                    activeOpacity={0.7}
                >
                    <View style={[
                        styles.radioOuter,
                        selectedResource === resource.id && styles.radioOuterActive
                    ]}>
                        {selectedResource === resource.id && (
                            <View style={styles.radioInner} />
                        )}
                    </View>
                    <Text style={[
                        styles.radioLabel,
                        selectedResource === resource.id && styles.radioLabelActive
                    ]}>
                        {resource.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );


    return (

        <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>
            <View
                onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
                style={styles.header}
            >
                {/* Left side: Back button + Title */}
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Direction Api</Text>
                </View>

                {/* Right side: Settings icon */}
                <TouchableOpacity onPress={() => navigation.navigate("DirectionApiSetting")}>
                    <Image
                        source={require('../../assets/settings.png')}
                        style={[styles.settingsIcon, { tintColor: 'white' }]}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            {buttons}
            {resourceButtons}
            <MapView
                onMapError={error => { console.log(error.code + ' ' + error.message) }}
                style={{ flex: 1 }}
            >
                <Camera
                    zoomLevel={12}
                    ref={cameraRef}
                />
                {route && (
                    <ShapeSource id="routeSource" shape={route}>
                        <LineLayer id="routeFill" style={layerStyles.route} />
                    </ShapeSource>
                )}
            </MapView>
            {/* Response/Data Display */}

            {bottomSelected === 'response' && directionsResponse && (
                <View style={[
                    styles.responseContainer,
                    {
                        height: screenHeight - headerHeight - bottomHeight, // dynamic height
                        marginTop: headerHeight,
                    },
                ]}>
                    <ScrollView contentContainerStyle={styles.responseContent}>
                        <Text style={styles.responseText}>
                            {JSON.stringify(directionsResponse, null, 2)}
                        </Text>
                    </ScrollView>
                </View>
            )}
            {distance && (<View style={styles.addressContainer}>
                <Text style={styles.addressText} numberOfLines={2}>
                    Distance: {distance}
                </Text>
                <Text style={styles.addressText}>Duration: {duration}</Text>
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
        lineCap: 'round',
        lineWidth: 3,
        lineOpacity: 0.84,
        lineJoin: 'round',
    } as LineLayerStyle,
};

