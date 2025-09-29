import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { Camera, FillLayer, MapView, ShapeSource } from 'mappls-map-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Value } from 'mappls-map-react-native/src/types/MapplsRNStyle';
import type { Feature, Polygon } from 'geojson';
import { circle, Units } from '@turf/turf';
import styles from '../../constants/styles';
import colors from '../../constants/colors';


export default function DrawCirclePolygon() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const [featureCollection, setFeatureCollection] = useState<Feature<Polygon> | undefined>(undefined);
    useEffect(() => {
        const center: [number, number] = [77.22263216972351, 28.62292461876685];
        const radius = 800; // in meters
        const options: {
            steps: number;
            units: Units;
            properties: { foo: string };
        } = {
            steps: 100,
            units: 'meters',
            properties: { foo: 'bar' }
        };
        const circlePolygon = circle(center, radius, options);
        setFeatureCollection(circlePolygon);
    }, []);




    return (
        <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>

            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Draw Circle Polyline</Text>
                </View>
            </View>
            <MapView

                onMapError={error => { console.log(error.code + ' ' + error.message) }}
                style={{ flex: 1 }}
            >
                <Camera
                    zoomLevel={14}
                    centerCoordinate={[77.22263216972351, 28.62292461876685]}
                />
                <ShapeSource
                    id="routeSource"
                    shape={featureCollection}>
                    <FillLayer
                        id="routeFill"
                        style={{
                            fillColor: 'blue',
                            fillOpacity: 0.5,
                            fillAntialias: true,
                        }}
                    />
                </ShapeSource>
            </MapView>

        </View>
    );
}

