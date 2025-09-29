import React from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import Toast from 'react-native-simple-toast'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, MapView } from 'mappls-map-react-native';
import styles from '../../constants/styles';



export default function PlaceTap() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const onPress = (mapplsPin: string) => {
        try {
            if (mapplsPin != undefined) {
                Toast.show(
                    `mapplsPin: ${mapplsPin}`,
                    Toast.SHORT,
                );
            }

        } catch (e) {
            console.log('Error handling onPress:', e);
        }
    }


    return (
        <View style={{ backgroundColor: '#0D1014', flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>

            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Place Tap</Text>
                </View>
            </View>
            <MapView
                onMapError={error => { console.log(error.code + ' ' + error.message) }}
                style={{ flex: 1 }}
                onPlaceClick={(mapplsPin: string) => {
                    onPress(mapplsPin);
                }}>
                <Camera
                    zoomLevel={12}
                    centerCoordinate={[77.1025, 28.7041]}
                />
            </MapView>

        </View>
    );
}
