import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import Toast from 'react-native-simple-toast'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Value } from 'mappls-map-react-native/src/types/MapplsRNStyle';
import type { Feature, GeoJsonProperties, LineString } from 'geojson';
import { showCurvedPolyline } from '../../plugins/showCurvedPolyline';
import { validateCoordinates } from '../../plugins/validateCoordinates';
import { Camera, CameraRef, LineLayer, MapView, ShapeSource } from 'mappls-map-react-native';
import styles from '../../constants/styles';
import colors from '../../constants/colors';


const layerStyles = {
    route: {
        fillColor: 'blue',
        fillOpacity: 0.5,
        lineCap: "round" as Value<"round" | "butt" | "square", ["zoom"]>,  // cast the string properly
        fillAntialias: true,
        lineWidth: 5,
    },
};

export default function DrawSemiCircle() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const [route, setRoute] = useState<GeoJSON.Feature<GeoJSON.LineString> | undefined>();
    const [isVisible, setIsVisible] = useState(false);
    const [sourceCoordinates, setSourceCoordinates] = useState('28.7039, 77.101318');
    const [destinationCoordinates, setDestinationCoordinates] = useState('28.704248, 77.10237');
    const cameraRef = useRef<CameraRef>(null);

    const curvedPolyline = () => {
        const source = sourceCoordinates.split(',');
        const destination = destinationCoordinates.split(',');

        const location = showCurvedPolyline(
            [parseFloat(source[0]), parseFloat(source[1])],
            [parseFloat(destination[0]), parseFloat(destination[1])],
            0.5,
        );

        const feature: Feature<LineString, GeoJsonProperties> = {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: location,
            },
            properties: {},  // required by GeoJSON Feature type
        };
        console.log("curvedPolyline feature:::", feature.geometry.coordinates)
        setRoute(feature);
    };

    const onClick = () => {
        if (
            sourceCoordinates.includes(',') &&
            destinationCoordinates.includes(',')
        ) {
            const sCoordinates = sourceCoordinates.split(',');
            const dCoordinates = destinationCoordinates.split(',');

            console.log(sCoordinates[1] + ',' + sCoordinates[0])
            if (
                validateCoordinates(sCoordinates[1], sCoordinates[0]) &&
                validateCoordinates(dCoordinates[1], dCoordinates[0])
            ) {
                console.log(sCoordinates[1] + ',:::' + sCoordinates[0])
                cameraRef.current?.fitBounds(
                    [parseFloat(sCoordinates[1]), parseFloat(sCoordinates[0])],
                    [parseFloat(dCoordinates[1]), parseFloat(dCoordinates[0])],
                    50,
                    40,
                );
                curvedPolyline();
            }
        } else {
            Toast.show(
                'Please provide source and destination coordinates separated with comma (,)',
                Toast.SHORT,
            );
            setIsVisible(false);
        }


    };

    useEffect(() => {
        curvedPolyline();
    }, []);

    const renderCustomDataView = () => (
        <Modal transparent={true} animationType="fade" visible={isVisible}>
            <View
                style={{
                    position: 'absolute',
                    bottom: '79%',
                    elevation: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5,
                    borderWidth: 1,
                    borderColor: 'white',
                    backgroundColor: 'white',
                    borderRadius: 5,
                }}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <TextInput
                        placeholder="Source: Lat,Lng"
                        style={{ borderWidth: 1, margin: 3, borderRadius: 5, padding: 10 }}
                        keyboardType="numbers-and-punctuation"
                        onChangeText={setSourceCoordinates}
                    />
                    <TextInput
                        placeholder="Destination: Lat,Lng"
                        style={{ borderWidth: 1, margin: 3, borderRadius: 5, padding: 10 }}
                        keyboardType="numbers-and-punctuation"
                        onChangeText={setDestinationCoordinates}
                    />
                </View>
                <Button title="Draw Polyline" onPress={onClick} />
            </View>
        </Modal>
    );
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
                hideIndoorControl={() => {
                    console.log('HIDE Indoor Control');
                }}
                onMapError={error => { console.log(error.code + ' ' + error.message) }}
                style={{ flex: 1 }}
            >
                <Camera
                    zoomLevel={16}
                    centerCoordinate={[77.101318, 28.7039]}
                />
                {route && (
                    <ShapeSource id="routeSource" shape={route}>
                        <LineLayer id="routeFill" style={layerStyles.route} />
                    </ShapeSource>
                )}
            </MapView>
            {renderCustomDataView()}

            <Button
                title="Draw polyline on custom place"
                onPress={() => setIsVisible(true)}
            />
        </View>
    );
}

