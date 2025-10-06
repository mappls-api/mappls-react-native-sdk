import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, getCoordinateFromDigipin, getDigipinFromCoordinate, MapView } from 'mappls-map-react-native';
import styles from '../../constants/styles';
import colors from '../../constants/colors';



export default function Digipin() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const [selectedDigipin, setSelectedDigipin] = useState("latlng");
    const [latLng, setLatLng] = useState<string>('');
    const [digipin, setDigipin] = useState<string>('');
    const [digipinValue, setDigipinValue] = useState('')
    const [latLngValue, setLatLngValue] = useState<number[] | null>(null);

    const digipinOption = [
        { id: 'latlng', label: 'Latitude/Longi' },
        { id: 'digipin', label: 'Digipin' },

    ];

    const onSubmit = async () => {
        if (selectedDigipin === "latlng") {
            const [latitude, longitide] = latLng.split(",");
            const lat = parseFloat(latitude.trim());
            const lng = parseFloat(longitide.trim());
            if (!isNaN(lat) && !isNaN(lng)) {
                try {
                    const digipin = await getDigipinFromCoordinate([lng, lat]);
                    console.log("Generated Digipin:", digipin);
                    setDigipinValue(digipin)
                    // you can also set it into state
                    // setDigipin(digipin);
                } catch (error) {
                    console.error("Error getting Digipin:", error);
                }
            }
        } else {

            if (digipin != '' || digipin != undefined) {
                try {
                    const cord = await getCoordinateFromDigipin(digipin);
                    console.log("Generated Digipin:", cord);
                    setLatLngValue(cord)
                } catch (error) {
                    console.error("Error getting Digipin:", error);
                }
            }
        }

    }

    const radioButtons = (
        <View style={[styles.radioGroup,{ justifyContent: 'space-evenly',}]}>
            {digipinOption.map((pin) => (
                <TouchableOpacity
                    key={pin.id}
                    style={styles.radioButton}
                    onPress={() => setSelectedDigipin(pin.id)}
                    activeOpacity={0.7}
                >
                    <View style={[
                        styles.radioOuter,
                        selectedDigipin === pin.id && styles.radioOuterActive
                    ]}>
                        {selectedDigipin === pin.id && (
                            <View style={styles.radioInner} />
                        )}
                    </View>
                    <Text style={[
                        styles.radioLabel,
                        selectedDigipin === pin.id && styles.radioLabelActive
                    ]}>
                        {pin.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>
            <View
                style={styles.header}
            >
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Get Digipin</Text>
                </View>

            </View>
            {radioButtons}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 10,
                }}
            >
                {selectedDigipin === "latlng" ? (
                    <TextInput
                        style={{
                            flex: 1,
                            height: 40, // fixed height for consistency
                            color: "white",
                            borderWidth: 1,
                            borderColor: colors.strokeBorder,
                            borderRadius: 8,
                            paddingHorizontal: 12,
                        }}
                        keyboardType='numeric'
                        placeholder="Latitude, Longitude"
                        placeholderTextColor={colors.textSecondary}
                        value={latLng}
                        onChangeText={(text) => setLatLng(text)}
                    />
                ) : (
                    <TextInput
                        style={{
                            flex: 1,
                            height: 40,
                            color: "white",
                            borderWidth: 1,
                             borderColor: colors.strokeBorder,
                            borderRadius: 8,
                            paddingHorizontal: 12,
                        }}
                        placeholder="Enter Digipin"
                        placeholderTextColor={colors.textSecondary}
                        value={digipin}
                        onChangeText={(text) => setDigipin(text)}
                    />
                )}



                <TouchableOpacity
                    style={{
                        marginLeft: 10,
                        height: 40, // same height as TextInput
                        paddingHorizontal: 20,
                        justifyContent: "center",
                        borderRadius: 8,
                        backgroundColor: "transparent",
                        borderWidth: 1,
                        borderColor: colors.accentPrimary,
                        alignItems: "center",
                    }}
                    onPress={onSubmit}
                >
                    <Text style={{ color: colors.accentPrimary, fontWeight: "600" }}>Submit</Text>
                </TouchableOpacity>
            </View>

            <MapView
                onMapError={error => { console.log(error.code + ' ' + error.message) }}
                style={{ flex: 1 }}
            >
                <Camera
                    zoomLevel={12}
                    centerCoordinate={[77.1025, 28.7041]}
                />
            </MapView>

            {(latLngValue !== null || digipinValue !== '') && (
                <View style={styles.addressContainer}>
                    <Text style={styles.addressText} numberOfLines={2}>
                        {selectedDigipin === "latlng"
                            ? `Digipin: ${digipinValue || ''}`
                            : latLngValue
                                ? `LatLng: ${latLngValue[1]}, ${latLngValue[0]}`
                                : ''}
                    </Text>
                </View>
            )}


        </View>
    );
}