import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity, Image, FlatList, SafeAreaView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, GeoAnalyticsLayer, MapplsGeoAnalyticsType, MapView, UserTrackingMode } from 'mappls-map-react-native';
import styles from '../../constants/styles';
import colors from '../../constants/colors';



export default function GeoAnalytics() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const [geoState, setGeoState] = useState({
        showGeoAnalytics: false,
        title: 'Show geoAnalytics',
    });

    const onPress = () => {
        setGeoState(state => ({
            showGeoAnalytics: !state.showGeoAnalytics,
            title:
                state.title === 'Show geoAnalytics'
                    ? 'Remove GeoAnalytics'
                    : 'Show geoAnalytics',
        }));
    };


    return (
        <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>

            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>GeoAnalytics</Text>
                </View>
            </View>
            <MapView
                onMapError={error => console.log(error.code + ' ' + error.message)}
                geoAnalyticsSelectedFeatures={e => console.log(e)}
                enableGeoAnalyticsInfoWindow={true}
                style={{ flex: 1 }}>
                <Camera
                    zoomLevel={12}
                    followUserMode={UserTrackingMode.FollowWithCourse}
                    centerCoordinate={[77.1025, 28.7041]}
                />
                {geoState.showGeoAnalytics && (
                    <GeoAnalyticsLayer
                        layerRequest={[
                            {
                                geoBound: ['HARYANA', 'UTTAR PRADESH', 'ANDHRA PRADESH', 'KERALA'],
                                propertyNames: ['stt_nme', 'stt_id', 't_p'],
                                attribute: 'stt_nme', // Replace with the actual attribute if different
                                query: '', // Or any relevant query string if needed
                                styles: {
                                    fillColor: '#3FFF83',
                                    strokeColor: '#3f51b5',
                                    strokeWidth: 40,
                                    labelColor: '#000000',
                                },
                            },
                            {
                                geoBound: ['MAHARASHTRA'],
                                propertyNames: ['stt_nme', 'stt_id', 't_p'],
                                attribute: 'stt_nme', // Replace with the actual attribute
                                query: '', // Replace with an actual query if needed
                                styles: {
                                    fillColor: '#FFFF83',
                                    strokeColor: '#3f51b5',
                                    strokeWidth: 1,
                                    labelColor: '#000000',
                                },
                            },
                        ]}

                        geoboundType="stt_nme"
                        showGeoAnalytics={MapplsGeoAnalyticsType.STATE}
                    />
                )}
                {geoState.showGeoAnalytics && (
                    <GeoAnalyticsLayer
                        layerRequest={[
                            {
                                geoBound: ['CHHATTISGARH'],
                                attribute: 'stt_nme',
                                query: '',
                                propertyNames: ['stt_nme', 'stt_id', 't_p'],
                                styles: {
                                    fillColor: '#3fF893',
                                    strokeColor: '#3f51b5',
                                    strokeWidth: 1,
                                    labelColor: '#000000',
                                },
                            },
                        ]}
                        geoboundType="stt_nme"
                        showGeoAnalytics={
                            MapplsGeoAnalyticsType.SUB_DISTRICT
                        }
                    />
                )}
            </MapView>
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>{geoState.title}</Text>
                </TouchableOpacity>
            </View>
            {/* <Button title={geoState.title} onPress={onPress} /> */}
        </View>
    );
}
