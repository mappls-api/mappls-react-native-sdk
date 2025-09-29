import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { Camera, CameraRef, MapView, PointAnnotation } from 'mappls-map-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import Toast from 'react-native-simple-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import styles from '../../constants/styles';

export default function CameraElocBounds() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const cameraRef = React.useRef<CameraRef>(null);



    const fitBounds = () => {
        cameraRef.current?.fitBoundsWithMapplsPin(['1T182A', 'MMI000', '122L55', '11KDVO'], [50, 10, 50, 10], 100);
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
                    <Text style={styles.headerTitle}>Camera Eloc Bounds</Text>
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
                    ref={cameraRef}
                    zoomLevel={14}
                    centerMapplsPin="MMI000"
                />

                <PointAnnotation id="1" mapplsPin="MMI000" />
                <PointAnnotation id="2" mapplsPin="1T182A" />
                <PointAnnotation id="3" mapplsPin="122L55" />
                <PointAnnotation id="3" mapplsPin="11KDVO" />
            </MapView>

            {/* Buttons for camera movement */}
            <View style={{ flexDirection: 'row', height: 60, backgroundColor: '#0D1014' }}>
                <TouchableOpacity style={style.buttons} onPress={fitBounds}>
                    <Text style={style.text}>Fit Bounds</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const style = StyleSheet.create({
    buttons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 14,
    },
});