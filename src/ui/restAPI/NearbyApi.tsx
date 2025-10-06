import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Dimensions,
    Image,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import Toast from 'react-native-simple-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NearbyAtlasResponse } from 'mappls-map-react-native/src/modules/restApi/models/NearbyModel';
import { MapplsNearbyApiSettings } from '../../model/MapplsNearbyApiSettings';
import { bbox, lineString } from '@turf/turf';
import { Camera, CameraRef, MapView, PointAnnotation, PointAnnotationRef, RestApi } from 'mappls-map-react-native';
import styles from '../../constants/styles';
const MarkerIcon = require('../../assets/settings.png');

export default function NearbyApi() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const instance = MapplsNearbyApiSettings.instance;
    const mapViewRef = useRef<any>(null);
    const cameraRef = useRef<CameraRef>(null);
    const annotationRef = useRef<(PointAnnotationRef | null)[]>([]);
    const [placesList, setPlacesList] = useState<string[]>([]);
    const [visibleList, setVisibleList] = useState(false);
    const [iconName, setIconName] = useState<'list' | 'map-marker'>('list');
    const [keyword, setKeyword] = useState('coffee');
    const [nearByApiData, setNearByApiData] = useState<any[]>([]);
    const [nearbyAtlasResponse, setNearbyAtlasResponse] = useState<NearbyAtlasResponse | undefined>();
    const [selected, setSelected] = useState<'map' | 'list'>('map');
    const [bottomSelected, setBottomSelected] = useState<'response' | 'data'>('data');
    const [headerHeight, setHeaderHeight] = useState(0);
    const [bottomHeight, setBottomHeight] = useState(0);
    const screenHeight = Dimensions.get('window').height;

    const callNearby = async () => {
        Toast.show('Please wait...', Toast.SHORT);

        try {
            let data = await RestApi.nearby({
                keyword: instance.keyword,
                location: instance.customLocation,
                page: instance.page,
                radius: instance.radius,
                pod: instance.pod,
                bounds: instance.bounds,
                filter: instance.filter,
                searchBy: instance.searchBy,
                sortBy: instance.sortBy,
                explain: instance.enableExplain,
                richData: instance.enableRichData,
                userName: instance.userName
            });
            setNearbyAtlasResponse(data)
            if (data?.suggestedLocations) {
                const localBoundArray = data.suggestedLocations?.map((loc: any) => [loc.longitude, loc.latitude]);
                if (localBoundArray) {
                    const bounds = bbox(lineString(localBoundArray));
                    cameraRef.current?.fitBounds([bounds[0], bounds[1]], [bounds[2], bounds[3]], [100, 0, 100, 0], 1000);

                }
                setMapplsPin(data.suggestedLocations);
            }
        } catch (error: any) {
            Toast.show(error.message, Toast.SHORT);
        }
    };

    const setMapplsPin = async (suggestedLocation: any[]) => {
        const placeArr: string[] = [];
        await mapViewRef.current?.getMapplsPinAssociation(
            suggestedLocation.map((item) => item.mapplsPin)
        );

        suggestedLocation.forEach((loc) => {
            placeArr.push(loc.placeName);
        });

        setPlacesList(placeArr);
        setNearByApiData(suggestedLocation);
    };


    useFocusEffect(
        React.useCallback(() => {
            Toast.show('Tap on map to get nearby ', Toast.SHORT);
            callNearby();

        }, [])
    );
    useEffect(() => {
        if (!visibleList) {
            callNearby();
        }
    }, [visibleList])

    const onPressMap = (event: any) => {
        const { geometry } = event;
        const longitude = geometry.coordinates[0];
        const latitude = geometry.coordinates[1];
        instance.customLocation = `${latitude},${longitude}`
        callNearby();
    };

    const renderPlaceItem = ({ item }: { item: string }) => (
        <View style={styles.placeItem}>
            <Text style={styles.placeText}>{item}</Text>
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

            <View
                onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
                style={styles.header}
            >
                {/* Left side: Back button + Title */}
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Nearby Places Api</Text>
                </View>

                {/* Right side: Settings icon */}
                <TouchableOpacity onPress={() => navigation.navigate("NearByApiSetting")}>
                    <Image
                        source={MarkerIcon}
                        style={[styles.settingsIcon, { tintColor: 'white' }]}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
  {/* Map / List Toggle */}
            <View style={[styles.toggleContainer]}>
                <TouchableOpacity
                    style={[styles.toggleBtn, selected === 'map' && styles.activeBtn]}
                    onPress={() => {
                        setSelected('map')
                        setVisibleList(false);
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
                    <FlatList
                        data={placesList}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={renderPlaceItem}
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
                        onPress={onPressMap}
                    >
                        <Camera zoomLevel={12} ref={cameraRef}
                        />
                        {nearByApiData.length > 0 &&
                            nearByApiData.map((item, indx) => (
                                <PointAnnotation
                                    key={`${indx}data`}
                                    ref={(el: PointAnnotationRef | null) => {
                                        annotationRef.current[indx] = el;
                                    }}
                                    id={`${indx}data`}
                                    mapplsPin={item.mapplsPin}
                                >
                                    <View style={styles.annotationMarker} />
                                </PointAnnotation>
                            ))}
                    </MapView>
                </View>
            )}

          
            {bottomSelected === 'response' && nearbyAtlasResponse && (
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
                            {JSON.stringify(nearbyAtlasResponse, null, 2)}
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


