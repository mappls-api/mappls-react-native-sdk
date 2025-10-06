import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, Image, Modal, ScrollView } from 'react-native';
import MapplsUIWidgets from 'mappls-search-widgets-react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../utils/navigationUtils';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import MapplsPlacePickerWidgetSettings from '../../model/MapplsPlacePickerWidgetSettings';
import colors from '../../constants/colors';
import styles from '../../constants/styles';




export default function PlacePickerWidget() {
    const instance = MapplsPlacePickerWidgetSettings.instance;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();

    const [placepickerVisible, setPlacepickerVisible] = useState(false);
    const [resultText, setResultText] = useState('Result will show here');

    const handleResult = (res: any) => {
        if (res != null) {
            setResultText(
                `Place Name: ${res.poi}\nAddress: ${res.formatted_address}\nCoordinates: [${res.lat}, ${res.lng}]`
            );
        }
        setPlacepickerVisible(false); // close modal after selection
    };

    return (
        <View
            style={{
                backgroundColor: colors.backgroundPrimary,
                flex: 1,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Place Picker Widget</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("PlacePickerWidgetSetting")}>
                    <Image
                        source={require('../../assets/settings.png')}
                        style={[styles.settingsIcon, { tintColor: 'white' }]}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            {/* Button and Result */}
            <View style={styles.root}>
                <TouchableOpacity style={styles.button} onPress={() => setPlacepickerVisible(true)}>
                    <Text style={styles.buttonText}>Open PlacePicker</Text>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={{ padding: 10, }} >
                    <Text style={styles.responseText}>
                        {JSON.stringify(resultText, null, 2)}
                    </Text>
                </ScrollView>
            </View>

            {/* Full-screen PlacePicker Modal */}
            <Modal visible={placepickerVisible} animationType="slide" transparent={false}>
                <MapplsUIWidgets.PlacePicker
                    center={instance.location}
                    zoom={10}

                    searchWidgetProps={{
                        location: instance.location
                            ? Array.isArray(instance.location)
                                ? `${instance.location[0]},${instance.location[1]}`
                                : instance.location
                            : "77.1025, 28.7041",
                        backgroundColor: instance.backgroundColor,
                        toolbarColor: instance.toolbarColor,
                        zoom: instance.zoom,
                        pod: instance.pod,
                        tokenizeAddress: instance.tokenizeAddress,
                        saveHistory: instance.saveHistory,
                        historyCount: instance.historyCount,
                        attributionHorizontalAlignment: instance.attributionHorizontalAlignment,
                        attributionVerticalAlignment: instance.attributionVerticalAlignment,
                        logoSize: instance.logoSize,
                        filter: instance.filter,
                        debounce: instance.deBounce,
                        bridge: instance.enableBridge,
                        hyperLocal: instance.enableHyperLocal,
                        enableTextSearch: instance.enableTextSearch
                    }}
                    resultCallback={handleResult}
                />
            </Modal>
        </View>
    );
}
