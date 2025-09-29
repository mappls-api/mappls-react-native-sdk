import React, { AnyActionArg, useState } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity, Image, FlatList, SafeAreaView, ScrollView, TextInput, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RadioGroups from '../components/RadioGroups';
import { MapplsDirectionApiSettings } from '../model/MapplsDirectionApiSettings';
import CheckBoxGroup from '../components/CheckBoxGroup';
import { RestApi } from 'mappls-map-react-native';
import colors from '../constants/colors';
import styles from '../constants/styles';



export default function DirectionApiSetting() {
    const instance = MapplsDirectionApiSettings.instance;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const [origin, setOrigin] = useState(instance.origin);
    const [destination, setDestination] = useState(instance.destination);


    const [waypoints, setWaypoints] = useState<string[]>(instance.waypoints ?? []);
    const [overview, setOverview] = useState(instance.overview);
    const overviewlist = [
        { label: 'Full', value: RestApi.DirectionsCriteria.OVERVIEW_FULL },
        { label: 'Dimplified', value: RestApi.DirectionsCriteria.OVERVIEW_SIMPLIFIED },
        { label: 'False', value: RestApi.DirectionsCriteria.OVERVIEW_FALSE },

    ];
    const [geometries, setgeometries] = useState(instance.geometries);
    const geometrieslist = [
        { label: 'Polyline 5', value: RestApi.DirectionsCriteria.GEOMETRY_POLYLINE },
        { label: 'Polyline 6', value: RestApi.DirectionsCriteria.GEOMETRY_POLYLINE6 },
        { label: 'Geojson', value: RestApi.DirectionsCriteria.GEOMETRY_COORDINATES },

    ];
    const [alternatives, setAlternatives] = useState(instance.alternatives);
    const [enableSteps, setEnableSteps] = useState(instance.steps);

    const [enableRouteRefresh, setRouteRefresh] = useState(instance.routeRefresh);

    const [annotations, setAnnotations] = useState(instance.annotations ?? []);
    const annotationslist = [
        { label: 'Congestion', value: RestApi.DirectionsCriteria.ANNOTATION_CONGESTION },
        { label: 'Nodes', value: RestApi.DirectionsCriteria.ANNOTATION_NODES },
        { label: 'Duration', value: RestApi.DirectionsCriteria.ANNOTATION_DURATION },
        { label: 'Distance', value: RestApi.DirectionsCriteria.ANNOTATION_DISTANCE },
        { label: 'Speed', value: RestApi.DirectionsCriteria.ANNOTATION_SPEED },
        { label: 'Base Duration', value: RestApi.DirectionsCriteria.ANNOTATION_BASE_DURATION },
        { label: 'Speed Limt', value: RestApi.DirectionsCriteria.ANNOTATION_SPEED_LIMIT },
        { label: 'Toll Road', value: RestApi.DirectionsCriteria.ANNOTATION_TOLL_ROAD },

    ];

    const [excludes, setExcludes] = useState(instance.excludes ?? []);
    const excludeslist = [
        { label: 'Ferry', value: RestApi.DirectionsCriteria.EXCLUDE_FERRY },
        { label: 'Motorway', value: RestApi.DirectionsCriteria.EXCLUDE_MOTORWAY },
        { label: 'Toll', value: RestApi.DirectionsCriteria.EXCLUDE_TOLL },
    ];


    return (
        <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>

            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Direction Api Setting</Text>
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
                    <Text style={styles.label}>Waypoint</Text>
                    <TextInput
                        style={styles.input}
                        value={waypoints.join(";")}
                        onChangeText={(text) => {
                            const updatedWaypoints = text
                                .split(',')
                                .map(item => item.trim())
                                .filter(item => item.length > 0);

                            setWaypoints(updatedWaypoints);
                        }}
                        placeholder="Enter Waypoint"
                        placeholderTextColor={colors.textSecondary}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.waypoints = waypoints;
                    }}>
                        <Text style={styles.buttonText}>Save WayPoint </Text>
                    </TouchableOpacity>
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
                            setgeometries(e.value);
                            instance.geometries = e.value;
                        }}
                        index={geometrieslist.findIndex((x) => x.value === geometries) + 1}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <CheckBoxGroup
                        title="Annotations"
                        items={annotationslist.map(item => item.value)}
                        selected={annotations}
                        onChange={(updatedList: any) => {
                            setAnnotations(updatedList);
                        }}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <CheckBoxGroup
                        title="Excludes"
                        items={excludeslist.map(item => item.value)}
                        selected={excludes}
                        onChange={(updatedList: any) => {
                            setExcludes(updatedList);
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
                        trackColor={{ true: '#21D0B2', false: '#666' }}
                        thumbColor="#fff"
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
                        trackColor={{ true: '#21D0B2', false: '#666' }}
                        thumbColor="#fff"
                    />
                </View>
                <View style={styles.toggleRow}>
                    <Text style={styles.label}>Enable Route Refresh</Text>
                    <Switch
                        value={enableRouteRefresh}
                        onValueChange={(value: boolean) => {
                            setRouteRefresh(value)
                            instance.routeRefresh = value
                        }}
                        trackColor={{ true: '#21D0B2', false: '#666' }}
                        thumbColor="#fff"
                    />
                </View>

            </ScrollView>

        </View>
    );
}

