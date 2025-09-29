import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Dimensions, ScrollView, Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import Toast from 'react-native-simple-toast'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DistanceResponse } from 'mappls-map-react-native/src/modules/restApi/models/DistanceModel';
import { MapplsDistanceApiSettings } from '../../model/MapplsDistanceApiSettings';
import { Camera, CameraRef, MapView, RestApi } from 'mappls-map-react-native';
import styles from '../../constants/styles';
import colors from '../../constants/colors';



export default function GetDistanceApi() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
     const instance = MapplsDistanceApiSettings.instance;
    const [distance, setDistance] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const cameraRef = useRef<CameraRef>(null);
    const [activeMode, setActiveMode] = useState('driving');
    const [selectedResource, setSelectedResource] = useState(RestApi.DirectionsCriteria.RESOURCE_DISTANCE);
    const [distanceResponse, setDistanceResponse] = useState<DistanceResponse | undefined>();
    const [bottomSelected, setBottomSelected] = useState<'response' | 'data'>('data');
    const [headerHeight, setHeaderHeight] = useState(0);
    const [bottomHeight, setBottomHeight] = useState(0);
    const screenHeight = Dimensions.get('window').height;

    const resource = [
        { id: RestApi.DirectionsCriteria.RESOURCE_DISTANCE, label: 'Distance' },
        { id: RestApi.DirectionsCriteria.RESOURCE_DISTANCE_TRAFFIC, label: 'Distance Traffic' },
        { id: RestApi.DirectionsCriteria.RESOURCE_DISTANCE_ETA, label: 'Distance ETA' }
    ];

    const getDistanceApi = (setProfile: string) => {
        console.log(`distance1${[instance.origin, instance.destination]}`, `${selectedResource},:: ${setProfile}`);
        RestApi.distance({
            coordinates: [instance.origin, instance.destination],
            resource: selectedResource,
            profile: setProfile,

        })
            .then((data: any) => {
                if (data.results) {
                    console.log(`distance${data.results.distances[0][1]}`, getFormattedDistance(data.results.distances[0][1]));

                    setDistanceResponse(data)
                    setDistance(getFormattedDistance(data.results.distances[0][1]));
                    setDuration(getFormattedDuration(data.results.durations[0][1]));
                } else {
                    Toast.show('No data found', Toast.SHORT);
                }
            })
            .catch((error: any) => {
                console.log(error);
                Toast.show(error.message, Toast.SHORT);
            });
    };
    const getFormattedDistance = (dist: number) => {
        if (dist / 1000 < 1) return `${dist} mtr.`;
        return `${(dist / 1000).toFixed(2)} Km.`;
    };

    const getFormattedDuration = (dur: number) => {
        const min = Math.floor((dur % 3600) / 60);
        const hours = Math.floor((dur % 86400) / 3600);
        const days = Math.floor(dur / 86400);

        if (days > 0) {
            return `${days} ${days > 1 ? 'Days' : 'Day'} ${hours} hr${min > 0 ? ` ${min} min.` : ''}`;
        }
        return hours > 0
            ? `${hours} hr${min > 0 ? ` ${min} min` : ''}`
            : `${min} min.`;
    };


    const onDrive = () => {
        setActiveMode('driving');
        getDistanceApi('driving');
    };

    const onBike = () => {
        setActiveMode('biking');
        getDistanceApi('biking');
    };

    const onWalk = () => {
        setActiveMode('walking');
        setSelectedResource(RestApi.DirectionsCriteria.RESOURCE_DISTANCE)
        getDistanceApi('walking');
    };

    useFocusEffect(
        React.useCallback(() => {
            getDistanceApi('driving');
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
                    <Text style={styles.headerTitle}>Distance Api</Text>
                </View>

                {/* Right side: Settings icon */}
                <TouchableOpacity onPress={() => navigation.navigate("DistanceApiSetting")}>
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
                    centerCoordinate={[77.202432, 28.594475]}
                />

            </MapView>
            {/* Response/Data Display */}

            {bottomSelected === 'response' && distanceResponse && (
                <View style={[
                    styles.responseContainer,
                    {
                        height: screenHeight - headerHeight - bottomHeight, // dynamic height
                        marginTop: headerHeight,
                    },
                ]}>
                    <ScrollView contentContainerStyle={styles.responseContent}>
                        <Text style={styles.responseText}>
                            {JSON.stringify(distanceResponse, null, 2)}
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
