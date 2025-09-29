import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Value } from 'mappls-map-react-native/src/types/MapplsRNStyle';
import type { FeatureCollection, Polygon } from 'geojson';
import { Camera, FillLayer, MapView, ShapeSource } from 'mappls-map-react-native';
import styles from '../../constants/styles';
import colors from '../../constants/colors';


const layerStyles = {
    route: {
        fillColor: 'blue',
        fillOpacity: 0.5,
        lineCap: "round" as Value<"round" | "butt" | "square", ["zoom"]>,  // cast the string properly
        fillAntialias: true,
    },
};

export default function DrawPolygon() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const [polygon] = useState<FeatureCollection<Polygon>>({
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [77.22541093826294, 28.62279277116736],
                            [77.2253143787384, 28.622943454124695],
                            [77.22508907318115, 28.623301325281613],
                            [77.22432732582092, 28.624732797710298],
                            [77.2232973575592, 28.62426192077618],
                            [77.22246050834656, 28.625787554378423],
                            [77.2214949131012, 28.62545794405804],
                            [77.22147345542908, 28.624130074856158],
                            [77.2215485572815, 28.623885217708224],
                            [77.22169876098633, 28.62377220652426],
                            [77.2218918800354, 28.623725118495024],
                            [77.22218155860901, 28.623743953709262],
                            [77.22263216972351, 28.62292461876685],
                            [77.2222352027893, 28.622726847305533],
                            [77.22195625305176, 28.62257616403732],
                            [77.22202062606812, 28.62240664510208],
                            [77.22159147262573, 28.621898086654085],
                            [77.22177386283875, 28.62154021071402],
                            [77.22197771072388, 28.62128592969956],
                            [77.22359776496887, 28.62194517550276],
                            [77.22476720809937, 28.622529075471636],
                            [77.22541093826294, 28.62279277116736],
                        ],
                    ],
                },
                properties: {},
            },
        ],
    });




    return (
        <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>

            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Draw Polygon</Text>
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
                    zoomLevel={15}
                    centerCoordinate={[77.22263216972351, 28.62292461876685]}
                />
                <ShapeSource
                    id="routeSource"
                    shape={polygon}>
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

