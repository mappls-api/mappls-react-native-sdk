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
import colors from '../../constants/colors';



export default function IndoorMap() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const onPress = (event: any) => {
        try {
            const { geometry } = event;
            const [longitude, latitude] = geometry?.coordinates || [];
            if (latitude && longitude) {
                console.log(`Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`);
                Toast.show(
                    `Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`,
                    Toast.SHORT,
                );
            } else {
                console.log('Invalid coordinates:', geometry);
            }
        } catch (e) {
            console.log('Error handling onPress:', e);
        }
    }


    return (
        <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>
            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Indoor Map</Text>
                </View>
            </View>
            <MapView
                style={{ flex: 1 }}
                onShowIndoorControl={(event) => { console.log(event.initialFloor + " : " + event.floors) }}
                hideIndoorControl={() => { console.log("HIDE Indoor Control") }}
                showIndoorControl={true}
                layerControlEnabled={true}
                indoorLayerPosition="bottomRight"
                onMapError={error => console.log(error)}>
                <Camera
                    zoomLevel={16}
                    animationMode="moveTo"
                    centerCoordinate={[77.1560724, 28.5425071]}
                />
            </MapView>
        </View>
    );
}
