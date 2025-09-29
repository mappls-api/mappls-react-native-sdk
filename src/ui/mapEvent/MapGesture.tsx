import React, { forwardRef, useImperativeHandle, useReducer, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, MapView } from 'mappls-map-react-native';
import styles from '../../constants/styles';
import colors from '../../constants/colors';

type StatusRefType = {
    updateStatus: (label: string, value: string, hide: boolean) => void;
};

const StatusDisplay = forwardRef<StatusRefType>((props, ref) => {
    const labelRef = useRef('');
    const valueRef = useRef('');
    const hideRef = useRef(true);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useImperativeHandle(ref, () => ({
        updateStatus: (label: any, value: any, hide: any) => {
            const hasChanged =
                label !== labelRef.current ||
                value !== valueRef.current ||
                hide !== hideRef.current;

            if (hasChanged) {
                labelRef.current = label;
                valueRef.current = value;
                hideRef.current = hide;
                forceUpdate();
            }
        },
    }));

    if (hideRef.current) return null;

    return (
        <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{labelRef.current}</Text>
            <Text style={styles.statusText}>{valueRef.current}</Text>
        </View>
    );
});
export default function MapGesture() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const statusRef = useRef<StatusRefType>(null);

    const updateStatus = (label: any, coordinates: any) => {
        const [lng, lat] = coordinates ?? [];
        if (lat === undefined || lng === undefined) return;
        const value = `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;
        statusRef.current?.updateStatus(label, value, false); // <--- this is the call
    };


    return (
        <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>

            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Map Gesture</Text>
                </View>
            </View>

            <MapView
                onMapError={error => { console.log(error.code + ' ' + error.message) }}
                style={{ flex: 1 }}
                onRegionWillChange={(feature) => {
                    const [lng, lat] = feature?.geometry?.coordinates ?? [];
                    const value = `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;
                    // statusRef.current = { label: 'start moving...', value: value, hide: false };
                    updateStatus('start moving...', feature?.geometry?.coordinates)
                    console.log("start moving")
                }}
                onRegionIsChanging={(feature) => {
                    const [lng, lat] = feature?.geometry?.coordinates ?? [];
                    const value = `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;
                    // statusRef.current = { label: 'moving...', value: value, hide: false };
                    updateStatus('moving...', feature?.geometry?.coordinates)
                    console.log("moving")
                }}
                onRegionDidChange={(feature) => {
                    const [lng, lat] = feature?.geometry?.coordinates ?? [];
                    const value = `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;
                    // statusRef.current = { label: 'moved...', value: value, hide: false };
                    updateStatus('moved...', feature?.geometry?.coordinates)
                    console.log("moved")
                }}>
                <Camera
                    zoomLevel={12}
                    centerCoordinate={[77.1025, 28.7041]}
                />
            </MapView>
            {/* Bottom status text */}
            <StatusDisplay ref={statusRef} />
        </View>
    );
}
