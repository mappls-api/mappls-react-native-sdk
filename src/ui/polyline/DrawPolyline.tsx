import React from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Value } from 'mappls-map-react-native/src/types/MapplsRNStyle';
import type { Feature, LineString, GeoJsonProperties } from 'geojson';
import { Camera, LineLayer, MapView, ShapeSource } from 'mappls-map-react-native';
import styles from '../../constants/styles';
import colors from '../../constants/colors';

const layerStyles = {
    route: {
        lineColor: 'blue',
        lineCap: "round" as Value<"round" | "butt" | "square", ["zoom"]>,  // cast the string properly
        lineWidth: 3,
        lineOpacity: 0.84,
    },
};

export default function DrawPolyline() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const routeState: { route: Feature<LineString, GeoJsonProperties> } = {
        route: {
            type: "Feature", // literal type
            geometry: {
                type: "LineString", // literal type
                coordinates: [
                    [77.100462, 28.705436],
                    [77.100784, 28.705191],
                    [77.101514, 28.704646],
                    [77.101171, 28.704194],
                    [77.101066, 28.704083],
                    [77.101318, 28.7039],
                ],
            },
            properties: {},
        },
    };




    return (
        <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>

            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Draw Polyline</Text>
                </View>
            </View>
            <MapView
                hideIndoorControl={() => {
                    console.log('HIDE Indoor Control');
                }}
                onMapError={error => { console.log(error.code + ' ' + error.message) }}
                style={{ flex: 1 }}
            >
                <Camera
                    zoomLevel={16}
                    centerCoordinate={[77.100462, 28.705436]}
                />
                <ShapeSource id="routeSource" shape={routeState.route}>
                    <LineLayer id="routeFill" style={layerStyles.route} />
                </ShapeSource>
            </MapView>

        </View>
    );
}

