import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import Toast from 'react-native-simple-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, CameraRef, MapView } from 'mappls-map-react-native';
import styles from '../../constants/styles';
import colors from '../../constants/colors';

export default function CameraFeature() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const cameraRef = React.useRef<CameraRef>(null);
    const [bottomSelected, setBottomSelected] = useState<'Move' | 'Ease' | 'Animate'>('Move');

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

    const moveTo = () => {
        cameraRef.current?.moveTo([77.2315, 28.6129]);
        setBottomSelected('Move')
    };

    const easeTo = () => {
        cameraRef.current?.moveTo([78.6569, 22.9734], 1000);
        setBottomSelected('Ease')
    };

    const animateTo = () => {
        cameraRef.current?.flyTo([77.2295, 28.6149], 1000);
        setBottomSelected('Animate')
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
                    <Text style={styles.headerTitle}>Camera Feature</Text>
                </View>
            </View>
            <MapView
                onMapError={error => { console.log(error.code + ' ' + error.message) }}
                style={{ flex: 1 }}
                onPress={onPress}>
                <Camera
                    ref={cameraRef}
                    zoomLevel={12}
                    centerCoordinate={[77.1025, 28.7041]}
                />
            </MapView>

            {/* Buttons for camera movement */}
            <View style={{ flexDirection: 'row', height: 60, backgroundColor: '#0D1014', padding: 10 }}>
                <TouchableOpacity style={[styles.toggleBtn, bottomSelected === 'Move' ? styles.activeToggle : styles.inactiveToggle]} onPress={moveTo}>
                    <Text style={styles.text}>Move To</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.toggleBtn, bottomSelected === 'Ease' ? styles.activeToggle : styles.inactiveToggle]} onPress={easeTo}>
                    <Text style={styles.text}>Ease To</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.toggleBtn, bottomSelected === 'Animate' ? styles.activeToggle : styles.inactiveToggle]} onPress={animateTo}>
                    <Text style={styles.text}>Animate To</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
