import React from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { point } from '@turf/helpers';
import { Camera, MapView, ShapeSource, SymbolLayer } from 'mappls-map-react-native';
import styles from '../../constants/styles';
import colors from '../../constants/colors';
const MarkerIcon = require('../../assets/marker.png');



export default function AddCustomMarker() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();



    return (
        <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>

            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Add Custom Marker</Text>
                </View>
            </View>
            <MapView
                onMapError={error => { console.log(error.code + ' ' + error.message) }}
                style={{ flex: 1 }}
            >
                <Camera
                    zoomLevel={12}
                    centerCoordinate={[77.1025, 28.7041]}
                />
                <ShapeSource
                    id="symbolLocationSource"
                    shape={point([77.1025, 28.7041])}>
                    <SymbolLayer
                        id="symbolLocationSymbols"
                        minZoomLevel={1}
                        style={{
                            iconImage: MarkerIcon,
                            iconSize: 0.2,
                        }}
                    />
                </ShapeSource>
            </MapView>

        </View>
    );
}

