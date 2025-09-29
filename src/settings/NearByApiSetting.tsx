import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity, Image, FlatList, SafeAreaView, ScrollView, TextInput, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/navigationUtils';
import Toast from 'react-native-simple-toast'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RadioGroups from '../components/RadioGroups';
import { MapplsNearbyApiSettings } from '../model/MapplsNearbyApiSettings';
import colors from '../constants/colors';
import styles from '../constants/styles';



export default function NearByApiSetting() {
    const instance = MapplsNearbyApiSettings.instance;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const [customLocation, setCustomLocation] = useState(instance.customLocation);
    const [keyword, setKeyword] = useState(instance.keyword);
    const [pageNumber, setPageNumber] = useState(instance.page?.toString() || '');

    const [radius, setRadius] = useState(instance.radius?.toString() || '');



    return (
        <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>
           <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Near By Setting</Text>
                </View>
            </View>
            {/* Scrollable content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Custom Location */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Custom Location</Text>
                    <TextInput
                        style={styles.input}
                        value={customLocation}
                        onChangeText={setCustomLocation}
                        placeholder="Enter coordinates"
                         placeholderTextColor={colors.textSecondary}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.customLocation = customLocation;
                    }}>
                        <Text style={styles.buttonText}>Save Custom Location</Text>
                    </TouchableOpacity>
                </View>

                {/* Keyword */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Keyword</Text>
                    <TextInput
                        style={styles.input}
                        value={keyword}
                        onChangeText={setKeyword}
                        placeholder="Enter keyword"
                        placeholderTextColor={colors.textSecondary}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.keyword = keyword;
                    }}>
                        <Text style={styles.buttonText}>Save Keyword</Text>
                    </TouchableOpacity>
                </View>

                {/* Page Number */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Page</Text>
                    <TextInput
                        style={styles.input}
                        value={pageNumber}
                        onChangeText={setPageNumber}
                        placeholder="Page Number (In Integer)"
                         placeholderTextColor={colors.textSecondary}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.page = Number(pageNumber);
                    }}>
                        <Text style={styles.buttonText}>Save Page Number</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Radius</Text>
                    <TextInput
                        style={styles.input}
                        value={radius}
                        onChangeText={setRadius}
                        placeholder="Enter Radius (In Integer)"
                        placeholderTextColor={colors.textSecondary}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.radius = Number(radius);
                    }}>
                        <Text style={styles.buttonText}>Save Radius</Text>
                    </TouchableOpacity>
                </View>
               
            </ScrollView>

        </View>
    );
}

