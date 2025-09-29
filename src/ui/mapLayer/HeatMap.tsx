import React, { useRef } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { Camera, CameraRef, Expression, HeatmapLayer, MapView, ShapeSource } from 'mappls-map-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { FeatureCollection, Geometry } from 'geojson';
import styles from '../../constants/styles';
import colors from '../../constants/colors';

const layerStyles = {
    clusteredPoints: {
        circlePitchAlignment: ['literal', 'map'] as Expression,
        circleColor: [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1',
        ] as Expression,
        circleRadius: [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40,
        ] as Expression,
        circleOpacity: 0.84,
        circleStrokeWidth: 2,
        circleStrokeColor: 'white',
    },

    heatmap: {
        heatmapColor: [
            'interpolate',
            ['linear'],
            ['heatmap-density'], // Fixed: Use hyphenated expression name
            0, 'rgba(33,102,172,0)',
            0.2, 'rgb(9, 77, 116)',
            0.4, 'rgb(209,229,240)',
            0.6, 'rgb(239, 123, 56)',
            0.8, 'rgb(192, 66, 17)',
            1, 'rgb(178,24,43)',
        ] as Expression,
        heatmapWeight: ['get', 'mag'] as Expression,
        heatmapIntensity: ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3] as Expression,
        heatmapRadius: ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20] as Expression,
        heatmapOpacity: 0.8,
    },
    clusterCount: {
        textField: '{point_count}',
        textSize: 12,
        textPitchAlignment: 'map' as 'map' | 'viewport' | 'auto',
    },
};

export default function HeatMap() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();

    const cameraRef = useRef<CameraRef>(null);

    const state = {
        clusterData: {
            type: 'FeatureCollection',
            features: [

                {
                    type: 'Feature',
                    properties: {
                        id: 1,
                        title: 'M 1.8 - 27km NE of Indio, CA',
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [77.391, 28.5355],
                    },
                },
                {
                    type: 'Feature',
                    properties: {
                        id: 2,
                        title: 'M 0.4 - 9km WNW of Cobb, CA',
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [78.391, 28.5355],
                    },
                },
                {
                    type: 'Feature',
                    properties: {
                        id: 3,
                        title: 'M 0.5 - 31 km SSE of Mina, Nevada',
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [80.2707, 13.0827],
                    },
                },
                {
                    type: 'Feature',
                    properties: {
                        id: 4,
                        title: 'M 3.8 - 4km ENE of Talmage, CA',
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [78.2207, 11.1827],
                    },
                },
                {
                    type: 'Feature',
                    properties: {
                        id: 5,
                        title: 'M 4.2 - 55 km S of Whites City, New Mexico',
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [79.2207, 11.1827],
                    },
                },
                {
                    type: 'Feature',
                    properties: {
                        id: 6,
                        title: 'M 2.3 - 1 km SSE of Magas Arriba, Puerto Rico',
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [72.8777, 19.076],
                    },
                },
                {
                    type: 'Feature',
                    properties: {
                        id: 8,
                        title: 'M 1.3 - 11 km S of Tyonek, Alaska',
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [72.8777, 20.076],
                    },
                },
                {
                    type: 'Feature',
                    properties: {
                        id: 9,
                        title: 'M 1.3 - 11 km S of Tyonek, India',
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [73.8777, 20.076],
                    },
                },
            ],
        } as FeatureCollection<Geometry>,
    };


    return (
        <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>

            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Heat Map</Text>
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
                    ref={cameraRef}
                    zoomLevel={4}
                    animationMode="moveTo"
                    centerCoordinate={[77.1025, 28.7041]}
                />
                <ShapeSource
                    id="earthquakes"
                    shape={state.clusterData}
                >
                    <HeatmapLayer
                        id='HeatMapLayer'
                        style={layerStyles.heatmap}
                        filter={['!', ['has', 'point_count']]}
                    />

                </ShapeSource>
            </MapView>

        </View>
    );
}

