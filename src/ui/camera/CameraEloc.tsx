import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import Toast from 'react-native-simple-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, CameraRef, MapView } from 'mappls-map-react-native';
import colors from '../../constants/colors';
import styles from '../../constants/styles';

export default function CameraEloc() {
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
        cameraRef.current?.moveWithMapplsPin('2T7S17');
    };

    const easeTo = () => {
        cameraRef.current?.moveWithMapplsPin('5EU4EZ', 1000);
    };

    const animateTo = () => {
        cameraRef.current?.flyWithMapplsPin("IB3BR9", 1000);
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
            <View
                style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Camera Eloc</Text>
                </View>

            </View>
            <MapView
                hideIndoorControl={() => {
                    console.log('HIDE Indoor Control');
                }}
                onMapError={error => { console.log(error.code + ' ' + error.message) }}
                style={{ flex: 1 }}
                onPress={onPress}>
                <Camera
                    ref={cameraRef}
                    zoomLevel={12}
                    centerMapplsPin="MMI000"
                />
            </MapView>

            {/* Buttons for camera movement */}
            <View style={{ flexDirection: 'row', height: 60, backgroundColor: colors.backgroundPrimary, padding: 10 }}>
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

// const styles = StyleSheet.create({

//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 16,
//     },
//     headerTitle: {
//         color: colors.headerTitle,
//         fontSize: 18,
//         fontWeight: '600',
//         marginLeft: 12,
//     },
//      activeToggle: {
//         borderWidth: 1,
//         borderColor: '#1BCBAC',
//         borderRadius: 30,
//     },
//     activeToggleText: {
//         color: '#1BCBAC',
//     },
//     inactiveToggleText: {
//         color: '#fff',
//     },
//     responseContent: {
//         padding: 16,
//     },
//     responseContainer: {
//         position: 'absolute',
//         top: 0, // start from top
//         left: 0, // start from left
//         right: 0, // fill width
//         bottom: 0, // fill height (we will adjust with marginTop if needed)
//         backgroundColor: 'rgba(0,0,0,0.9)',
//         overflow: 'hidden',
//         padding: 16, // optional padding inside
//         zIndex: 10,
//     },
//     responseText: {
//         color: '#fff',
//         fontSize: 14,
//     },
//     bottomToggleContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         padding: 5,
//         borderTopWidth: 1,
//         borderColor: '#1E2230',
//         backgroundColor: '#1E2230',
//     },
//     toggleBtn: {
//         flex: 1,
//         borderRadius: 30,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingVertical: 5,
//         marginHorizontal: 5,
//     },
//     addressContainer: {
//         backgroundColor: '#1E2230',
//         padding: 8,
//         margin: 0,
//         borderRadius: 0,
//         borderWidth: 0,
//         borderColor: '#333',
//     },
//     addressText: {
//         color: '#FFF',
//         textAlign: 'left',
//     },
//     inactiveToggle: { borderColor: '#fff', borderWidth: 1, borderRadius: 20, },
//     transportContainer: {
//         flexDirection: 'row',
//         backgroundColor: '#0D1014',
//         borderBottomWidth: 1,
//         borderColor: '#7e7c7cff',
//         borderWidth: 1,
//         paddingVertical: 5,
//         marginHorizontal: 16,

//     },
//     transportButton: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         flex: 1,
//         paddingVertical: 10,
//         position: 'relative',
//     },
//     activeButton: {
//         // backgroundColor: '#252A32',
//     },
//     transportText: {
//         color: '#8A8F9C',
//         fontSize: 14,
//         fontWeight: '500',
//     },
//     activeText: {
//         color: '#1BCBAC',
//         fontWeight: '600',
//     },
//      text: {
//         color: 'white',
//         fontSize: 14,
//     },
// });
