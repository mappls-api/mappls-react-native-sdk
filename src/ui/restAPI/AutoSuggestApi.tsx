import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity, Image, FlatList, SafeAreaView, ActivityIndicator, TextInput, Dimensions, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import Toast from 'react-native-simple-toast'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { point } from '@turf/helpers';
import { AutoSuggestAtlasResponse } from 'mappls-map-react-native/src/modules/restApi/models/AutoSuggestModel';
import { Camera, CameraRef, MapView, RestApi, ShapeSource, SymbolLayer } from 'mappls-map-react-native';
import colors from '../../constants/colors';
import styles from '../../constants/styles';


const MarkerIcon = require('../../assets/marker.png');

type PlaceItem = {
    name: string;
    coordinates: [number, number];
    address: string;
};
export default function AutoSuggestApi() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const cameraRef = useRef<CameraRef | null>(null);
    const [query, setQuery] = useState('');
    const [placesList, setPlacesList] = useState<PlaceItem[] | ''>('');
    const [selectedPlace, setSelectedPlace] = useState<[number, number] | ''>('');
    const [progressBar, setProgressBar] = useState(false);
    const [mounted, setMounted] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [searchLayout, setSearchLayout] = useState({ y: 0, height: 0 });
    const [headerHeight, setHeaderHeight] = useState(0);
    const [bottomHeight, setBottomHeight] = useState(0);
    const screenHeight = Dimensions.get('window').height;
    const [bottomSelected, setBottomSelected] = useState<'response' | 'data'>('data');
    const [autoSuggestAtlasResponse, setAutoSuggestAtlasResponse] = useState<AutoSuggestAtlasResponse | undefined>();

    useFocusEffect(
        React.useCallback(() => {
            setMounted(true);
            return () => {
                setMounted(false);
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
            };

        }, [])
    );

    const callAutoSuggest = async (text: string) => {
        if (text.length > 2) {
            const arr: PlaceItem[] = [];
            try {
                const data = await RestApi.autoSuggest({
                    query: text,
                });
                setAutoSuggestAtlasResponse(data)
                console.log(data);

                if (mounted) {
                    if (
                        data.suggestedLocations &&
                        data.suggestedLocations.length > 0
                    ) {
                        for (const loc of data.suggestedLocations) {
                            arr.push({
                                name: loc.placeName,
                                coordinates: [loc.longitude, loc.latitude],
                                address: loc.placeAddress,
                            });
                        }
                        setPlacesList(arr);
                        setProgressBar(false);

                    } else {
                        Toast.show('No suggestions found', Toast.SHORT);
                        setProgressBar(false);
                    }
                }
            } catch (error: any) {
                console.log(error.code, error.message);
                setProgressBar(false);
                Toast.show(error.message, Toast.SHORT);
            }
        } else {
            setPlacesList('');
            setProgressBar(false);
        }
    };

    const onTextChange = (text: string) => {
        setQuery(text);
        setProgressBar(true);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            console.log('calling');
            callAutoSuggest(text.trim());
        }, 2000);
    };

    const onPressPlace = (location: PlaceItem) => {
        cameraRef.current?.setCamera({
            centerCoordinate: location.coordinates,
            zoomLevel: 11,
            animationDuration: 500,
        });

        setSelectedPlace(location.coordinates);
        setQuery(location.name);
        setPlacesList('');
    };

    const renderSeparator = () => (
        <View
            style={{
                height: 1,
                backgroundColor: '#CED0CE',
                marginLeft: 30,
            }}
        />
    );

    const renderList = () =>
        placesList !== '' ? (
            <View
                style={{
                    flex: 1,
                    position: 'absolute',
                    top: searchLayout.y + searchLayout.height,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#0D1014',
                    zIndex: 40,
                    marginVertical: 10,
                    marginHorizontal: 5,
                    borderRadius: 8,
                }}
            >
                <FlatList
                    data={placesList}
                    ItemSeparatorComponent={renderSeparator}
                    keyExtractor={(item, index) => item.name + index}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{ paddingLeft: 10, paddingBottom: 10, paddingRight: 5 }}
                            onPress={() => onPressPlace(item)}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    style={{ height: 20, width: 20 }}
                                    source={require('../../assets/marker.png')}
                                />
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        paddingStart: 10,
                                        paddingEnd: 5,
                                    }}
                                >
                                    <Text style={{ fontSize: 16, color: 'white' }}>{item.name}</Text>
                                    <Text style={{ color: 'white', marginRight: 5 }}>{item.address}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        ) : null;


    const renderMarker = () =>
        selectedPlace !== '' ? (
            <ShapeSource
                id="symbolLocationSource"
                shape={point([selectedPlace[0], selectedPlace[1]])}
            >
                <SymbolLayer id="symbolLocationSymbols" style={{
                    iconImage: MarkerIcon,
                    iconSize: 0.2,
                }} />
            </ShapeSource>
        ) : null;

    return (
        <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right, backgroundColor: colors.backgroundPrimary, }}>
            <View
                onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
                style={styles.header}
            >
                {/* Left side: Back button + Title */}
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>AutoSuggest Api</Text>
                </View>

            </View>
            {/* Search bar */}
            <View
                onLayout={(e) => {
                    const { y, height } = e.nativeEvent.layout;
                    setSearchLayout({ y, height });
                }}
                style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderRadius: 4,
                    height: 40,
                    backgroundColor: colors.backgroundPrimary,
                    borderColor: colors.strokeBorder,
                    alignItems: 'center',
                    margin: 5,
                    paddingHorizontal: 10,
                    marginHorizontal: 10
                }}>
                <TextInput
                    style={{ flex: 1, color: 'white' }}
                    placeholder="Search place.."
                    placeholderTextColor={colors.textSecondary}
                    value={query}
                    onChangeText={onTextChange}
                />
                {progressBar && (
                    <ActivityIndicator
                        style={{ marginLeft: 10 }}
                        animating
                        color="white"
                    />
                )}
            </View>

            {renderList()}

            <MapView
                style={{ flex: 1 }}>
                <Camera
                    ref={cameraRef}
                    zoomLevel={selectedPlace !== '' ? 10 : 12}
                    centerCoordinate={selectedPlace !== '' ? selectedPlace : [77.1025, 28.7041]}
                />
                {renderMarker()}
            </MapView>
            {bottomSelected === 'response' && autoSuggestAtlasResponse && (
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
                            {JSON.stringify(autoSuggestAtlasResponse, null, 2)}
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

