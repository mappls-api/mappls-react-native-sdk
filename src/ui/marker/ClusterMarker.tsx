import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { Camera, CameraRef, CircleLayer, Expression, MapView, ShapeSource, SymbolLayer } from 'mappls-map-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import styles from '../../constants/styles';
const MarkerIcon = require('../../assets/marker.png');
const layerStyles = {
    singlePoint: {
        iconImage: MarkerIcon,
        iconAllowOverlap: true,
        iconSize: 0.2,
        iconAnchor: ['literal', 'bottom'] as Expression,
        iconPitchAlignment: ['literal', 'map'] as Expression,
    },

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

    clusterCount: {
        textField: '{point_count}',
        textSize: 12,
        textPitchAlignment: ['literal', 'map'] as Expression,
    },
};

const initialClusterData: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: { id: 1, title: 'M 1.8 - 27km NE of Indio, CA' },
            geometry: { type: 'Point', coordinates: [77.391, 28.5355] },
        },
        {
            type: 'Feature',
            properties: { id: 2, title: 'M 0.4 - 9km WNW of Cobb, CA' },
            geometry: { type: 'Point', coordinates: [78.391, 28.5355] },
        },
        {
            type: 'Feature',
            properties: { id: 3, title: 'M 0.5 - 31 km SSE of Mina, Nevada' },
            geometry: { type: 'Point', coordinates: [80.2707, 13.0827] },
        },
        {
            type: 'Feature',
            properties: { id: 4, title: 'M 3.8 - 4km ENE of Talmage, CA' },
            geometry: { type: 'Point', coordinates: [78.2207, 11.1827] },
        },
        {
            type: 'Feature',
            properties: { id: 5, title: 'M 4.2 - 55 km S of Whites City, New Mexico' },
            geometry: { type: 'Point', coordinates: [79.2207, 11.1827] },
        },
        {
            type: 'Feature',
            properties: { id: 6, title: 'M 2.3 - 1 km SSE of Magas Arriba, Puerto Rico' },
            geometry: { type: 'Point', coordinates: [72.8777, 19.076] },
        },
        {
            type: 'Feature',
            properties: { id: 8, title: 'M 1.3 - 11 km S of Tyonek, Alaska' },
            geometry: { type: 'Point', coordinates: [72.8777, 20.076] },
        },
        {
            type: 'Feature',
            properties: { id: 9, title: 'M 1.3 - 11 km S of Tyonek, India' },
            geometry: { type: 'Point', coordinates: [73.8777, 20.076] },
        },
    ],
};

export default function ClusterMarker() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const [clusterData] = useState<GeoJSON.FeatureCollection>(initialClusterData);
    const cameraRef = useRef<CameraRef>(null);

    const onMarkerClick = useCallback((e: any) => {
        const features = e.features;
        const feature = features[0];

        if (!feature.properties.cluster) {
            console.log('Single marker clicked:', feature);
        } else {
            const coordinates = feature.geometry.coordinates;
            const zoomLevel = feature.properties.point_count > 100 ? 6 : 8;

            cameraRef.current?.setCamera({
                centerCoordinate: coordinates,
                zoomLevel,
                animationDuration: 1000,
            });

            console.log('Cluster clicked:', feature);
        }
    }, []);


    return (
        <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>

            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Cluster Marker</Text>
                </View>
            </View>
            <MapView
                style={{ flex: 1 }}
                onDidFinishLoadingMap={() => console.log("onDidFinishLoadingMap")}
            >
                <Camera
                    ref={cameraRef}
                    zoomLevel={4}
                    animationMode="moveTo"
                    centerCoordinate={[77.01775095884524, 28.38361801036934]}
                />
                <ShapeSource
                    id="earthquakes"
                    shape={clusterData}
                    cluster
                    clusterRadius={50}
                    onPress={onMarkerClick}
                >
                    <SymbolLayer
                        id="pointCount"
                        style={layerStyles.clusterCount}
                    />

                    <CircleLayer
                        id="clusteredPoints"
                        belowLayerID="pointCount"
                        filter={['has', 'point_count']}
                        style={layerStyles.clusteredPoints}
                    />

                    <SymbolLayer
                        id="singlePoint"
                        filter={['!', ['has', 'point_count']]}
                        style={layerStyles.singlePoint}
                    />
                </ShapeSource>
            </MapView>

        </View>
    );
}

