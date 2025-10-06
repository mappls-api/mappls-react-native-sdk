import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, Image, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../utils/navigationUtils';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import MapplsPlacePickerWidgetSettings from '../../model/MapplsPlacePickerWidgetSettings';
import colors from '../../constants/colors';
import styles from '../../constants/styles';
import MapplsDirectionWidget, { DirectionsCriteria } from 'mappls-direction-widget-react-native';
import { MapplsDirectionWidgetSettings } from '../../model/MapplsDirectionWidgetSettings';




export default function DirectionWidget() {
    const instance = MapplsDirectionWidgetSettings.instance;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();


    const openDirectionWidget = async () => {
        try {
            const res = await MapplsDirectionWidget.openDirectionWidget({
                destination: instance.destination,
                source: instance.source,
                resource: instance.resource,
                profile: instance.profile,
                overview: instance.overview,
                geometries: instance.geometries,
                excludes: instance.excludes,
                showAlternative: instance.showAlternative,
                steps: instance.steps,
                isSort: instance.isSort,
                showStartNavigation: instance.showStartNavigation,
                
                


            })

            console.log(res);
        } catch (e) {
            console.log(e);
        }
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
                    <Text style={styles.headerTitle}>Direction Widget</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("DirectionWidgetSetting")}>
                    <Image
                        source={require('../../assets/settings.png')}
                        style={[styles.settingsIcon, { tintColor: 'white' }]}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            {/* Button and Result */}
            <View style={styles.root}>
                <TouchableOpacity style={styles.button} onPress={openDirectionWidget}>
                    <Text style={styles.buttonText}>Open Direction Widget</Text>
                </TouchableOpacity>
            </View>

           
        </View>
    );
}
