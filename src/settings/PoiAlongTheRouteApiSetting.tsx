import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity, Image, FlatList, SafeAreaView, ScrollView, TextInput, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapplsPoiAlongTheRouteApiSettings } from '../model/MapplsPoiAlongTheRouteApiSettings';
import RadioGroups from '../components/RadioGroups';
import { RestApi } from 'mappls-map-react-native';
import colors from '../constants/colors';
import styles from '../constants/styles';



export default function PoiAlongTheRouteApiSetting() {
    const instance = MapplsPoiAlongTheRouteApiSettings.instance;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const [origin, setOrigin] = useState(instance.origin);
    const [destination, setDestination] = useState(instance.destination);
    const [buffer, setBuffer] = useState(String(instance.buffer || ''));
    const [category, setCategory] = useState(instance.category);
    const [geometries, setgeometries] = useState(instance.geometries);
    const geometrieslist = [
        { label: 'Polyline 5', value: RestApi.DirectionsCriteria.GEOMETRY_POLYLINE },
        { label: 'Polyline 6', value: RestApi.DirectionsCriteria.GEOMETRY_POLYLINE6 },
        { label: 'Geojson', value: RestApi.DirectionsCriteria.GEOMETRY_COORDINATES },

    ];
    const [page, setPage] = useState(String(instance.page || ''));
    const [sort, setSort] = useState(instance.sort);





    return (
        <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>

            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Poi Along The Route Api Setting</Text>
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
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Buffer</Text>
                    <TextInput
                        style={styles.input}
                        value={buffer}
                        onChangeText={setBuffer}
                        placeholder="Enter Buffer"
                        placeholderTextColor={colors.textSecondary}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.buffer = parseInt(buffer);
                    }}>
                        <Text style={styles.buttonText}>Save Buffer</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Category</Text>
                    <TextInput
                        style={styles.input}
                        value={category}
                        onChangeText={setCategory}
                        placeholder="Enter category"
                        placeholderTextColor={colors.textSecondary}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.category = category;
                    }}>
                        <Text style={styles.buttonText}>Save Category</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Page</Text>
                    <TextInput
                        style={styles.input}
                        value={page}
                        onChangeText={setPage}
                        placeholder="Enter page"
                        placeholderTextColor={colors.textSecondary}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.category = category;
                    }}>
                        <Text style={styles.buttonText}>Save Category</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.toggleRow}>
                    <Text style={styles.label}>Enable Sort</Text>
                    <Switch
                        value={sort}
                        onValueChange={(value: boolean) => {
                            setSort(value)
                            instance.sort = value
                        }}
                        trackColor={{ true: colors.switchTrackTrue, false: colors.switchTrackFalse }}
                        thumbColor={colors.switchThumb}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <RadioGroups
                        label="Geometries"
                        data={geometrieslist}
                        callback={(e: any) => {
                            setgeometries(e.value);
                            instance.geometries = e.value;
                        }}
                        index={geometrieslist.findIndex((x) => x.value === geometries) + 1}
                    />
                </View>
            </ScrollView>

        </View>
    );
}

