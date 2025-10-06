import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, Image, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../utils/navigationUtils';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import MapplsNearbyWidget from 'mappls-nearby-widget-react-native'
import colors from '../../constants/colors';
import styles from '../../constants/styles';





export default function NearByWidget() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();

    const [resultText, setResultText] = useState('Result will show here');

    const openNearByWidget = async () => {
        try {
            const res = await MapplsNearbyWidget.openNearbyWidget({})
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
                    <Text style={styles.headerTitle}>NearBy Widget</Text>
                </View>
            </View>

            {/* Button and Result */}
            <View style={styles.root}>
                <TouchableOpacity style={styles.button} onPress={openNearByWidget}>
                    <Text style={styles.buttonText}>Open NearBy Widget</Text>
                </TouchableOpacity>
            </View>

           
        </View>
    );
}
