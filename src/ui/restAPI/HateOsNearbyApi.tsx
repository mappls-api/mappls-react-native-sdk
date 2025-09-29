import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView, TextInput, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import Toast from 'react-native-simple-toast'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { bbox, lineString } from '@turf/turf';
import MarkerIcon from '../../assets/marker.png';
import { AutoSuggestAtlasResponse, ELocation, SuggestedSearchAtlas } from 'mappls-map-react-native/src/modules/restApi/models/AutoSuggestModel';
import { Camera, CameraRef, MapView, RestApi, ShapeSource, SymbolLayer } from 'mappls-map-react-native';
import colors from '../../constants/colors';
import styles from '../../constants/styles';

export interface SearchResultModel {
    type: SearchType;
    eLocation?: ELocation;
    suggestedSearchAtlas?: SuggestedSearchAtlas;
}
export enum SearchType {
    SEARCH,
    SUGGESTED_SEARCH
}

export default function HateOsNearbyApi() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const [query, setQuery] = useState('');
    const [placesList, setPlacesList] = useState<SearchResultModel[]>([]);
    const [progressBar, setProgressBar] = useState(false);
    const [showList, setShowList] = useState(false);
    const [hateOsNearbyList, setHateOsNearbyList] = useState<any>();
    const cameraRef = useRef<CameraRef>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [searchLayout, setSearchLayout] = useState({ y: 0, height: 0 });
    const [headerHeight, setHeaderHeight] = useState(0);
    const [bottomHeight, setBottomHeight] = useState(0);
    const screenHeight = Dimensions.get('window').height;
    const [bottomSelected, setBottomSelected] = useState<'response' | 'data'>('data');
    const [autoSuggestAtlasResponse, setAutoSuggestAtlasResponse] = useState<AutoSuggestAtlasResponse | undefined>();

    function mapSearchResults(autoSuggestAtlasResponse?: AutoSuggestAtlasResponse): SearchResultModel[] {
        const searchResults: SearchResultModel[] = [];

        // Suggested Searches
        (autoSuggestAtlasResponse?.suggestedSearches ?? []).forEach(it => {
            searchResults.push({
                type: SearchType.SUGGESTED_SEARCH,
                suggestedSearchAtlas: it,
            });
        });

        // Suggested Locations
        (autoSuggestAtlasResponse?.suggestedLocations ?? []).forEach(it => {
            searchResults.push({
                type: SearchType.SEARCH,
                eLocation: it,
            });
        });

        return searchResults;
    }
    // AutoSuggest API call
    const callAutoSuggest = (text: string) => {
        if (text.length <= 2) {
            setPlacesList([]);
            setProgressBar(false);
            setShowList(false);
            return;
        }

       RestApi.autoSuggest({ query: text, bridge: true })
            .then((data: AutoSuggestAtlasResponse) => {
                setAutoSuggestAtlasResponse(data)
                const result = mapSearchResults(data)
                setPlacesList(result);
                setProgressBar(false);
                setShowList(true);
               
            })
            .catch(err => {
                console.log(err.code, err.message);
                Toast.show(err.message, Toast.SHORT);
                setProgressBar(false);
                setShowList(false);
            });
    };

    const callHateOsNearbyApi = (searchResult: string) => {
        RestApi.hateosnearby({ hyperlink: searchResult })
            .then(res => {
                const suggestedLocations = res.suggestedLocations;
                const localHateOsArray = suggestedLocations?.map((location: any, i: number) => ({
                    type: 'Feature',
                    id: i,
                    properties: {
                        placeName: location.placeName,
                        placeAddress: location.placeAddress,
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [location.longitude, location.latitude],
                    },
                }));
                const localBoundArray = suggestedLocations?.map((loc: any) => [loc.longitude, loc.latitude]);
                if (localBoundArray) {
                    const bounds = bbox(lineString(localBoundArray));
                    cameraRef.current?.fitBounds(
                        [bounds[0], bounds[1]],
                        [bounds[2], bounds[3]],
                        [100, 30, 100, 30],  // padding
                        1000 // duration in ms
                    );
                }
                setHateOsNearbyList({
                    type: 'FeatureCollection',
                    features: localHateOsArray,
                });
            })
            .catch(err => {
                Toast.show(err.message, Toast.LONG);
                setHateOsNearbyList(undefined);
            });
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

    const renderSeparator = () => (
        <View
            style={{
                height: 1,
                backgroundColor: '#CED0CE',
                marginLeft: 30,
            }}
        />
    );

    const marker = hateOsNearbyList ? (
        <ShapeSource id="symbolLocationSource" shape={hateOsNearbyList}>
            <SymbolLayer id="symbolLocationSymbols" style={{
                iconImage: MarkerIcon,
                iconAllowOverlap: true,
                iconSize: 0.2,
                textField: ['get', 'placeName'],
                textOffset: [0, -2.0],
                textSize: 12,
                iconAnchor: 'top',
            }} />
        </ShapeSource>
    ) : null;

    const onPressPlace = (item: SearchResultModel) => {
        if (item.type == SearchType.SUGGESTED_SEARCH && item.suggestedSearchAtlas?.hyperLink) {
            callHateOsNearbyApi(item.suggestedSearchAtlas?.hyperLink);
            setProgressBar(false);
            setShowList(false);
        } else {
            Toast.show('You click on Search Item', Toast.SHORT);
            setProgressBar(false);
            setShowList(false);
        }

    };
    const renderList = () =>
        showList && placesList.length > 0 ? (
            <View
                style={{
                    position: 'absolute',
                    top: searchLayout.y + searchLayout.height,  // height of your search bar + margin
                    left: 0, // same as container marginHorizontal
                    right: 0,
                    bottom: 0, // fill till bottom
                    backgroundColor: '#0D1014',
                    zIndex: 40, // above other elements
                    borderRadius: 8,
                    marginVertical: 10,
                    marginHorizontal: 5

                }}
            >
                <FlatList
                    data={placesList}
                    ItemSeparatorComponent={renderSeparator}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => {
                        // Get display name & address depending on type
                        let title = "";
                        let subtitle = "";
                        { console.log("FlatList", showList + JSON.stringify(item)) }

                        if (item.type === SearchType.SUGGESTED_SEARCH && item.suggestedSearchAtlas) {
                            title = `${item.suggestedSearchAtlas.keyword} ${item.suggestedSearchAtlas.identifier}`;
                            subtitle = `${item.suggestedSearchAtlas.location}`;
                        } else if (item.type === SearchType.SEARCH && item.eLocation) {
                            title = item.eLocation.placeName;
                            subtitle = `Lat: ${item.eLocation.latitude}, Lng: ${item.eLocation.longitude}`;
                        }
                        { console.log("placesList", title) }
                        return (
                            <TouchableOpacity
                                style={{ paddingLeft: 10, paddingBottom: 10, paddingRight: 5, paddingTop: 8 }}
                                onPress={() => onPressPlace(item)}
                            >
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Image
                                        style={{ height: 20, width: 20 }}
                                        source={require("../../assets/marker.png")}
                                    />
                                    <View
                                        style={{
                                            flexDirection: "column",
                                            paddingStart: 10,
                                            paddingEnd: 5,
                                        }}
                                    >
                                        <Text style={{ fontSize: 16, color: "white" }}>{title}</Text>
                                        <Text style={{ color: "white", marginRight: 5 }}>{subtitle}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        ) : null;

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundPrimary, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>
            <View
                onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
                style={styles.header}
            >
                {/* Left side: Back button + Title */}
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Hate Os Nearby Api</Text>
                </View>
            </View>
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
                <ActivityIndicator
                    style={{ marginRight: 10 }}
                    animating={progressBar}
                    hidesWhenStopped
                    color="white"
                />
                {/* {renderList()} */}
            </View>
            {renderList()}
            <MapView
                onMapError={error => { console.log(error.code + ' ' + error.message) }}
                style={{ flex: 1 }}>
                <Camera
                    ref={cameraRef}
                    defaultSettings={{
                        centerCoordinate: [77.1025, 28.7041],
                        zoomLevel: 4,
                    }}
                />
                {marker}
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
