import React from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import Toast from 'react-native-simple-toast'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, MapView } from 'mappls-map-react-native';
import styles from '../../constants/styles';
import colors from '../../constants/colors';



export default function MapLongTap() {
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
                    <Text style={styles.headerTitle}>Map Long Tap</Text>
                </View>
            </View>
            <MapView
                hideIndoorControl={() => {
                    console.log('HIDE Indoor Control');
                }}
                logoClickEnabled={false}
                onMapError={(error: any) => { console.log(error.code + ' ' + error.message) }}
                style={{ flex: 1 }}
                onLongPress={(feature: any) => {
                    onPress(feature);
                }}>
                <Camera
                    zoomLevel={12}
                    centerCoordinate={[77.1025, 28.7041]}
                />
            </MapView>

        </View>
    );
}

