import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity, Image, FlatList, SafeAreaView, ScrollView, TextInput, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapplsDistanceApiSettings } from '../model/MapplsDistanceApiSettings';
import colors from '../constants/colors';
import styles from '../constants/styles';



export default function DistanceApiSetting() {
    const instance = MapplsDistanceApiSettings.instance;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const [origin, setOrigin] = useState(instance.origin);
    const [destination, setDestination] = useState(instance.destination);
    const [fallbackSpeed, setFallbackSpeed] = useState(String(instance.fallbackSpeed || ''));
    const [fallbackCoordinate, setFallbackCoordinate] = useState<string>(instance.fallbackCoordinate ?? '');




    return (
        <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>

            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Distance Api Setting</Text>
                </View>
            </View>
            {/* Scrollable content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Origin Location</Text>
                    <TextInput
                        style={styles.input}
                        value={origin.toString()}
                        onChangeText={setOrigin}
                        placeholder="Enter Origin"
                        placeholderTextColor={colors.textSecondary}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.origin = origin;
                    }}>
                        <Text style={styles.buttonText}>Save Origin Location</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Destination Location</Text>
                    <TextInput
                        style={styles.input}
                        value={destination.toString()}
                        onChangeText={setDestination}
                        placeholder="Enter Destination"
                        placeholderTextColor={colors.textSecondary}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.origin = origin;
                    }}>
                        <Text style={styles.buttonText}>Save Destination Location</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </View>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#0D1014',
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 16,
//     },
//     headerTitle: {
//         color: '#FFFFFF',
//         fontSize: 18,
//         fontWeight: '600',
//         marginLeft: 12,
//     },
//     scrollContent: {
//         padding: 10
//     },
//     toggleRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginVertical: 12,
//     },
//     label: {
//         color: '#EEE',
//         fontSize: 14,
//         marginBottom: 6,
//     },
//     inputGroup: {
//         marginBottom: 20,
//         borderWidth: 1,
//         borderColor: '#333',
//         borderRadius: 8,
//         padding: 12,
//         backgroundColor: '#1A1D22',
//     },
//     input: {
//         backgroundColor: '#0D1014',
//         color: '#fff',
//         padding: 10,
//         borderRadius: 6,
//         borderWidth: 1,
//         borderColor: '#333',
//         marginBottom: 10,
//     },
//     button: {
//         backgroundColor: '#0D1014',
//         paddingVertical: 10,
//         borderRadius: 6,
//         borderWidth: 1,
//         borderColor: '#21D0B2',
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#21D0B2',
//         fontWeight: '600',
//     },
//     radioRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 10,
//     },
//     radioCircle: {
//         width: 18,
//         height: 18,
//         borderRadius: 9,
//         borderWidth: 2,
//         borderColor: '#777',
//         marginRight: 10,
//     },
//     radioSelected: {
//         borderColor: '#21D0B2',
//         backgroundColor: '#21D0B2',
//     },
//     radioLabel: {
//         color: '#EEE',
//         fontSize: 14,
//     },

// });
