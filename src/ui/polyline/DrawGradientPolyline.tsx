import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Expression } from 'mappls-map-react-native/src/types/MapplsRNStyle';
import type { Feature, LineString, GeoJsonProperties } from 'geojson';
import { Camera, LineLayer, MapView, ShapeSource } from 'mappls-map-react-native';
import styles from '../../constants/styles';
import colors from '../../constants/colors';

const layerStyles = {
    route: {
        lineColor: ['literal', 'red'] as Expression, // Valid expression
        lineCap: ['literal', 'round'] as Expression, // Required for TypeScript
        lineJoin: ['literal', 'round'] as Expression,
        lineWidth: 14,
        lineGradient: [
            'interpolate',
            ['linear'],
            ['line-progress'],
            0,
            'red',
            0.1,
            'royalblue',
            0.3,
            'cyan',
            0.5,
            'lime',
            0.7,
            'yellow',
            1,
            'red',
        ] as any,
    },
};



export default function DrawGradientPolyline() {
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
                    <Text style={styles.headerTitle}>Draw Gradient Polyline</Text>
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
