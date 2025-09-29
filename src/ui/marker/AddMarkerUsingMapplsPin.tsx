import React from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Callout, Camera, MapView, PointAnnotation } from 'mappls-map-react-native';
import styles from '../../constants/styles';
import colors from '../../constants/colors';



export default function AddMarkerUsingMapplsPin() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();



    return (
        <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>
            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Add Marker Using Mappls Pin</Text>
                </View>
            </View>
            <MapView
                onMapError={error => { console.log(error.code + ' ' + error.message) }}
                style={{ flex: 1 }}
            >
                <Camera zoomLevel={15} centerMapplsPin="MMI000" />
                <PointAnnotation
                    id="markerId"
                    title="Marker"
                    mapplsPin="MMI000">
                    <Callout title="xyz" />
                </PointAnnotation>
            </MapView>

        </View>
    );
}
