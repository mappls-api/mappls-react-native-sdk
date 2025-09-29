import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Callout, Camera, MapView, PointAnnotation } from 'mappls-map-react-native';
import styles from '../../constants/styles';
import colors from '../../constants/colors';

export default function AddCustomInfoWindow() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();

    const [calloutCoordinate, setCalloutCoordinate] = useState<[number, number] | null>(null);

    const coordinates: [number, number][] = [
        [77.391, 28.5355],
        [78.391, 28.5355],
        [82.987289, 25.311684],
        [72.8777, 19.076],
    ];
    const renderCallout = (point: [number, number]) => {
        if (
            calloutCoordinate &&
            point[0] === calloutCoordinate[0] &&
            point[1] === calloutCoordinate[1]
        ) {
            return (
                <Callout
                    title={`Coordinates: ${point[0]}, ${point[1]}`}
                />
            );
        }
        return <></>;
    };

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.backgroundPrimary,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right
        }}>

            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Add Custom Info Window</Text>
                </View>
            </View>
            <MapView
                onMapError={error => {
                    console.log(error.code + ' ' + error.message);
                }}
                style={{ flex: 1 }}
            >
                <Camera
                    zoomLevel={4}
                    centerCoordinate={[77.391, 28.5355]}
                />

                {coordinates.map((point, index) => (
                    <PointAnnotation
                        key={index}
                        id={`marker-${index}`}
                        coordinate={point}
                        onSelected={() => setCalloutCoordinate(point)}
                        onDeselected={() => setCalloutCoordinate(null)}
                    >
                        {renderCallout(point)}
                    </PointAnnotation>
                ))}
            </MapView>
        </View>
    );
}
