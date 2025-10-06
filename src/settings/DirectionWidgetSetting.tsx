import React, { AnyActionArg, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity, Image, FlatList, SafeAreaView, ScrollView, TextInput, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RadioGroups from '../components/RadioGroups';
import CheckBoxGroup from '../components/CheckBoxGroup';
import { RestApi } from 'mappls-map-react-native';
import colors from '../constants/colors';
import styles from '../constants/styles';
import { MapplsDirectionWidgetSettings } from '../model/MapplsDirectionWidgetSettings';
import { DirectionsCriteria, PlaceOptionsConstants } from 'mappls-direction-widget-react-native';
import RNColorPicker from '../components/RNColorPicker';



export default function DirectionWidgetSetting() {
    const instance = MapplsDirectionWidgetSettings.instance;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();

    const [showStartNavigation, setShowStartNavigation] = useState(instance.showStartNavigation);

    const [resource, setResource] = useState(instance.resource);
    const resourcelist = [
        { label: 'Route', value: DirectionsCriteria.RESOURCE_ROUTE },
        { label: 'Route ETA', value: DirectionsCriteria.RESOURCE_ROUTE_ETA },
        { label: 'Route Traffic', value: DirectionsCriteria.RESOURCE_ROUTE_TRAFFIC },

    ];
    const [profile, setProfile] = useState(instance.profile);
    const profilelist = [
        { label: 'Biking', value: DirectionsCriteria.PROFILE_BIKING },
        { label: 'Driving', value: DirectionsCriteria.PROFILE_DRIVING },
        { label: 'Trucking', value: DirectionsCriteria.PROFILE_TRUCKING },
        { label: 'Walking', value: DirectionsCriteria.PROFILE_WALKING },

    ];
    const [overview, setOverview] = useState(instance.overview);
    const overviewlist = [
        { label: 'Full', value: DirectionsCriteria.OVERVIEW_FULL },
        { label: 'Dimplified', value: DirectionsCriteria.OVERVIEW_SIMPLIFIED },
        { label: 'False', value: DirectionsCriteria.OVERVIEW_FALSE },

    ];
    const geometrieslist = [
        { label: 'Polyline 5', value: RestApi.DirectionsCriteria.GEOMETRY_POLYLINE },
        { label: 'Polyline 6', value: RestApi.DirectionsCriteria.GEOMETRY_POLYLINE6 },
        { label: 'Geojson', value: RestApi.DirectionsCriteria.GEOMETRY_COORDINATES },

    ];
    const [alternatives, setAlternatives] = useState(instance.alternatives);
    const [enableSteps, setEnableSteps] = useState(instance.steps);

    const [enableIsSort, setIsSort] = useState(instance.isSort);

    const [excludes, setExcludes] = useState(instance.excludes ?? []);
    const excludeslist = [
        { label: 'Ferry', value: DirectionsCriteria.EXCLUDE_FERRY },
        { label: 'Motorway', value: DirectionsCriteria.EXCLUDE_MOTORWAY },
        { label: 'Toll', value: DirectionsCriteria.EXCLUDE_TOLL },
    ];
    const [mapplsPin, setMapplsPin] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [isMapplsPin, setIsMapplsPin] = useState(false);
    const [isMapplsPinSource, setIsMapplsPinSource] = useState(false);
    const [mapplsPinSource, setMapplsPinSource] = useState('');
    const [longitudeSource, setLongitudeSource] = useState('');
    const [latitudeSource, setLatitudeSource] = useState('');
    const [geometries, setGeometries] = useState(instance.geometries);
    const [nameSource, setNameSource] = useState('');
    const [addressSource, setAddressSource] = useState('');

    useEffect(() => {
        // 🟢 Handle Source
        if (instance.source) {
            if ('mapplsPin' in instance.source) {
                setIsMapplsPinSource(true);
                setMapplsPinSource(instance.source.mapplsPin);
                setNameSource(instance.source.name);
                setAddressSource(instance.source.address);
            } else if ('latitude' in instance.source && 'longitude' in instance.source) {
                setIsMapplsPinSource(false);
                setLatitudeSource(instance.source.latitude.toString());
                setLongitudeSource(instance.source.longitude.toString());
                setNameSource(instance.source.name);
                setAddressSource(instance.source.address);
            }
        }

        // 🟢 Handle Destination
        if (instance.destination) {
            if ('mapplsPin' in instance.destination) {
                setIsMapplsPin(true);
                setMapplsPin(instance.destination.mapplsPin);
                setName(instance.destination.name);
                setAddress(instance.destination.address);
            } else if ('latitude' in instance.destination && 'longitude' in instance.destination) {
                setIsMapplsPin(false);
                setLatitude(instance.destination.latitude.toString());
                setLongitude(instance.destination.longitude.toString());
                setName(instance.destination.name);
                setAddress(instance.destination.address);
            }
        }
    }, [instance.source, instance.destination]);

    return (
        <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>

            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Direction Widget Setting</Text>
                </View>
            </View>
            {/* Scrollable content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Origin Location</Text>
                    <View style={{ flexDirection: "row", marginVertical: 10 }}>
                        {/* Mappls Pin */}
                        <TouchableOpacity
                            style={styles.radioContainer}
                            onPress={() => setIsMapplsPinSource(true)}
                        >
                            <View
                                style={[
                                    styles.radioOuter,
                                    isMapplsPinSource && styles.radioOuterActive, // highlight border
                                ]}
                            >
                                {isMapplsPinSource && <View style={styles.radioInner} />}
                            </View>
                            <Text
                                style={[
                                    styles.radioLabel,
                                    isMapplsPinSource && styles.radioLabelActive,
                                ]}
                            >
                                Mappls Pin
                            </Text>
                        </TouchableOpacity>

                        {/* Lat/Lng */}
                        <TouchableOpacity
                            style={[styles.radioContainer, { marginLeft: 20 }]}
                            onPress={() => setIsMapplsPinSource(false)}
                        >
                            <View
                                style={[
                                    styles.radioOuter,
                                    !isMapplsPinSource && styles.radioOuterActive, // highlight border
                                ]}
                            >
                                {!isMapplsPinSource && <View style={styles.radioInner} />}
                            </View>
                            <Text
                                style={[
                                    styles.radioLabel,
                                    !isMapplsPinSource && styles.radioLabelActive,
                                ]}
                            >
                                Latitude/Longitude
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {isMapplsPinSource ? (
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Mappls Pin"
                            value={mapplsPinSource}
                            onChangeText={setMapplsPinSource}
                            placeholderTextColor={colors.textSecondary}
                        />
                    ) : (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextInput
                                style={[styles.input, { flex: 1, marginRight: 5 }]}
                                placeholder="Latitude"
                                value={latitudeSource}
                                keyboardType="decimal-pad"
                                onChangeText={setLatitudeSource}
                                placeholderTextColor={colors.textSecondary}
                            />
                            <TextInput
                                style={[styles.input, { flex: 1, marginLeft: 5 }]}
                                placeholder="Longitude"
                                value={longitudeSource}
                                keyboardType="decimal-pad"
                                onChangeText={setLongitudeSource}
                                placeholderTextColor={colors.textSecondary}
                            />
                        </View>
                    )}

                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={nameSource}
                        onChangeText={setNameSource}
                        placeholderTextColor={colors.textSecondary}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={addressSource}
                        onChangeText={setAddressSource}
                        placeholderTextColor={colors.textSecondary}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        if (isMapplsPinSource) {
                            instance.source = {
                                mapplsPin: mapplsPinSource,
                                address: addressSource,
                                name: nameSource,
                            };
                        } else {
                            instance.source = {
                                longitude: parseFloat(longitudeSource),
                                latitude: parseFloat(latitudeSource),
                                address: addressSource,
                                name: nameSource,
                            };
                        }
                    }}>
                        <Text style={styles.buttonText}>Save Origin Location</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Destination Location</Text>
                    {/* Radio buttons for Mappls Pin or Lat/Lng */}
                    <View style={{ flexDirection: "row", marginVertical: 10 }}>
                        {/* Mappls Pin */}
                        <TouchableOpacity
                            style={styles.radioContainer}
                            onPress={() => setIsMapplsPin(true)}
                        >
                            <View
                                style={[
                                    styles.radioOuter,
                                    isMapplsPin && styles.radioOuterActive, // highlight border when active
                                ]}
                            >
                                {isMapplsPin && <View style={styles.radioInner} />}
                            </View>
                            <Text
                                style={[styles.radioLabel, isMapplsPin && styles.radioLabelActive]}
                            >
                                Mappls Pin
                            </Text>
                        </TouchableOpacity>

                        {/* Lat/Lng */}
                        <TouchableOpacity
                            style={[styles.radioContainer, { marginLeft: 20 }]}
                            onPress={() => setIsMapplsPin(false)}
                        >
                            <View
                                style={[
                                    styles.radioOuter,
                                    !isMapplsPin && styles.radioOuterActive, // highlight border when active
                                ]}
                            >
                                {!isMapplsPin && <View style={styles.radioInner} />}
                            </View>
                            <Text
                                style={[styles.radioLabel, !isMapplsPin && styles.radioLabelActive]}
                            >
                                Latitude/Longitude
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {isMapplsPin ? (
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Mappls Pin"
                            value={mapplsPin}
                            onChangeText={setMapplsPin}
                            placeholderTextColor={colors.textSecondary}
                        />
                    ) : (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextInput
                                style={[styles.input, { flex: 1, marginRight: 5 }]}
                                placeholder="Latitude"
                                value={latitude}
                                keyboardType="decimal-pad"
                                onChangeText={setLatitude}
                                placeholderTextColor={colors.textSecondary}
                            />
                            <TextInput
                                style={[styles.input, { flex: 1, marginLeft: 5 }]}
                                placeholder="Longitude"
                                value={longitude}
                                keyboardType="decimal-pad"
                                onChangeText={setLongitude}
                                placeholderTextColor={colors.textSecondary}
                            />
                        </View>
                    )}

                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor={colors.textSecondary}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={address}
                        onChangeText={setAddress}
                        placeholderTextColor={colors.textSecondary}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        if (isMapplsPin) {
                            instance.destination = {
                                mapplsPin: mapplsPin,
                                address: address,
                                name: name,
                            };
                        } else {
                            instance.destination = {
                                longitude: parseFloat(longitude),
                                latitude: parseFloat(latitude),
                                address: address,
                                name: name,
                            };
                        }
                    }}>
                        <Text style={styles.buttonText}>Save Destination Location</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputGroup}>
                    <RadioGroups
                        label="Profile"
                        data={profilelist}
                        callback={(e: any) => {
                            setProfile(e.value);
                            instance.profile = e.value;
                        }}
                        index={profilelist.findIndex((x) => x.value === profile) + 1}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <RadioGroups
                        label="Resource"
                        data={resourcelist}
                        callback={(e: any) => {
                            setResource(e.value);
                            instance.resource = e.value;
                        }}
                        index={resourcelist.findIndex((x) => x.value === resource) + 1}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <RadioGroups
                        label="Overview"
                        data={overviewlist}
                        callback={(e: any) => {
                            setOverview(e.value);
                            instance.overview = e.value;
                        }}
                        index={overviewlist.findIndex((x) => x.value === overview) + 1}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <RadioGroups
                        label="Geometries"
                        data={geometrieslist}
                        callback={(e: any) => {
                            setGeometries(e.value);
                            instance.geometries = e.value;
                        }}
                        index={geometrieslist.findIndex((x) => x.value === geometries) + 1}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <CheckBoxGroup
                        title="Excludes"
                        items={excludeslist.map(item => item.value)}
                        selected={excludes}
                        onChange={(updatedList: any) => {
                            setExcludes(updatedList);
                            instance.excludes = updatedList
                        }}
                    />
                </View>

                <View style={styles.toggleRow}>
                    <Text style={styles.label}>Enable Alternative</Text>
                    <Switch
                        value={alternatives}
                        onValueChange={(value: boolean) => {
                            setAlternatives(value)
                            instance.alternatives = value
                        }}
                        trackColor={{ true: colors.switchTrackTrue, false: colors.switchTrackFalse }}
                        thumbColor={colors.switchThumb}
                    />
                </View>
                <View style={styles.toggleRow}>
                    <Text style={styles.label}>Enable Steps</Text>
                    <Switch
                        value={enableSteps}
                        onValueChange={(value: boolean) => {
                            setEnableSteps(value)
                            instance.steps = value
                        }}
                        trackColor={{ true: colors.switchTrackTrue, false: colors.switchTrackFalse }}
                        thumbColor={colors.switchThumb}
                    />
                </View>
                <View style={styles.toggleRow}>
                    <Text style={styles.label}>Enable is Sort</Text>
                    <Switch
                        value={enableIsSort}
                        onValueChange={(value: boolean) => {
                            setIsSort(value)
                            instance.isSort = value
                        }}
                        trackColor={{ true: colors.switchTrackTrue, false: colors.switchTrackFalse }}
                        thumbColor={colors.switchThumb}
                    />
                </View>

                <View style={styles.toggleRow}>
                    <Text style={styles.label}>Enable showStartNavigation</Text>
                    <Switch
                        value={showStartNavigation}
                        onValueChange={(value: boolean) => {
                            setShowStartNavigation(value)
                            instance.showStartNavigation = value
                        }}
                        trackColor={{ true: colors.switchTrackTrue, false: colors.switchTrackFalse }}
                        thumbColor={colors.switchThumb}
                    />
                </View>


            </ScrollView>

        </View>
    );
}

