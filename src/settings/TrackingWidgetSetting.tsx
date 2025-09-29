import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity, Image, FlatList, SafeAreaView, ScrollView, TextInput, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/navigationUtils';
import Toast from 'react-native-simple-toast'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RadioGroups from '../components/RadioGroups';
import { MapplsTrackingWidgetSetting } from '../model/MapplsTrackingWidgetSettings';
import colors from '../constants/colors';
import styles from '../constants/styles';

const latent = [
    {
        label: 'jump',
        value: "jump",
    },
    {
        label: 'route',
        value: "route",
    },
    {
        label: 'fly',
        value: "fly",
    },


];

export default function TrackingWidgetSetting() {
    const instance = MapplsTrackingWidgetSetting.instance;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const [viaPointLatlng, setViaPointLatlng] = useState(instance.viaPointLatlng);
    const [addViaPointIndex, setAddViaPointIndex] = useState(instance.addViaPointIndex);
    const [latentVizEnabled, setlatentVizEnabled] = useState(instance.latentViz);
    const [polylineRefreshEnabled, setPolylineRefreshEnabled] = useState(instance.polylineRefresh);
    const [destinationRouteConnectorEnabled, setdestinationRouteConnectorEnabled] = useState(instance.enableDestinationRouteConnector);
    const [speedInMillis, setSpeedInMillis] = useState(String(instance.speedInMillis || ''));
    const [routeChangeBuffer, setRouteChangeBuffer] = useState(String(instance.routeChangeBuffer || ''));
    const [zoomLevel, setZoomLevel] = useState(String(instance.cameraZoomLevel || ''));
    const [fitBoundsPadding, setFitBoundsPadding] = useState(String(instance.fitBoundsPadding || ''));
    const [fitBoundsDuration, setfitBoundsDuration] = useState(String(instance.fitBoundsDuration || ''));
    const [maxSimDistance, setMaxSimDistance] = useState(String(instance.maxSimDistance || ''));
    const [simSpeed, setSimSpeed] = useState(String(instance.simSpeed || ''));
    const [enableSim, setEnableSim] = useState(instance.enableSimulation);
    const [showRiderOnOrigin, setShowRiderOnOrigin] = useState(instance.showRiderOnOrigin);
    const [etaRefresh, setETARefesh] = useState(instance.etaRefresh);
    const [etaRefreshDuration, setETARefeshDuration] = useState(String(instance.etaRefreshDuration || ''));
    const [wayPointIndex, setWayPointIndex] = useState<{ label: string; value: string }[]>([]);
    const [removeViaPointEnabled, setRemoveViaPointEnabled] = useState(instance.removeViaPointIndex);



    return (
        <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>

            <View
                style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Tracking Widget Setting</Text>
                </View>
            </View>
            {/* Scrollable content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.inputGroup}>
                    <RadioGroups
                        label="latentViz"
                        data={latent}
                        callback={(e: any) => {
                            setlatentVizEnabled(e.value);
                            instance.latentViz = e.value;
                        }}
                        index={latent.findIndex((x) => x.value === latentVizEnabled) + 1}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Add ViaPoint (lngLat;)</Text>
                    <TextInput
                        style={styles.input}
                        value={viaPointLatlng}
                        onChangeText={setViaPointLatlng}
                        placeholder="Enter (lngLat;)"
                        placeholderTextColor={colors.textSecondary}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.viaPointLatlng = viaPointLatlng;
                    }}>
                        <Text style={styles.buttonText}>Save viaPointLatlng</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Add ViaPoint Id (;)</Text>
                    <TextInput
                        style={styles.input}
                        value={addViaPointIndex}
                        onChangeText={setAddViaPointIndex}
                        placeholder="Enter ViaPoint Id"
                        placeholderTextColor={colors.textSecondary}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.addViaPointIndex = addViaPointIndex;
                    }}>
                        <Text style={styles.buttonText}>Save ViaPoint Id</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.toggleRow}>
                    <Text style={styles.label}>PolylineRefresh</Text>
                    <Switch
                        value={polylineRefreshEnabled}
                        onValueChange={(value: boolean) => {
                            setPolylineRefreshEnabled(value)
                            instance.polylineRefresh = value
                        }}
                        trackColor={{ true: colors.switchTrackTrue, false: colors.switchTrackFalse }}
                        thumbColor={colors.switchThumb}
                    />
                </View>
                <View style={styles.toggleRow}>
                    <Text style={styles.label}>DestinationRouteConnector</Text>
                    <Switch
                        value={destinationRouteConnectorEnabled}
                        onValueChange={(value: boolean) => {
                            setdestinationRouteConnectorEnabled(value)
                            instance.polylineRefresh = value
                        }}
                        trackColor={{ true: colors.switchTrackTrue, false: colors.switchTrackFalse }}
                        thumbColor={colors.switchThumb}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>SpeedInMillis</Text>
                    <TextInput
                        style={styles.input}
                        value={speedInMillis}
                        onChangeText={setSpeedInMillis}
                        placeholder="Enter SpeedInMillis"
                        placeholderTextColor={colors.textSecondary}
                        keyboardType='numeric'
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.speedInMillis = parseInt(speedInMillis);
                    }}>
                        <Text style={styles.buttonText}>Save SpeedInMillis</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>RouteChangeBuffer</Text>
                    <TextInput
                        style={styles.input}
                        value={routeChangeBuffer}
                        onChangeText={setRouteChangeBuffer}
                        placeholder="Enter RouteChangeBuffer"
                        placeholderTextColor={colors.textSecondary}
                        keyboardType='numeric'
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.routeChangeBuffer = parseInt(speedInMillis);
                    }}>
                        <Text style={styles.buttonText}>Save RouteChangeBuffer</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Zoom Level</Text>
                    <TextInput
                        style={styles.input}
                        value={zoomLevel}
                        onChangeText={setZoomLevel}
                        placeholder="Enter Zoom Level"
                        placeholderTextColor={colors.textSecondary}
                        keyboardType='numeric'
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.cameraZoomLevel = parseInt(zoomLevel);
                    }}>
                        <Text style={styles.buttonText}>Save Zoom Level</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>FitBoundsPadding</Text>
                    <TextInput
                        style={styles.input}
                        value={fitBoundsPadding}
                        onChangeText={setFitBoundsPadding}
                        placeholder="Enter FitBoundsPadding"
                        placeholderTextColor={colors.textSecondary}
                        keyboardType='numeric'
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.fitBoundsPadding = parseInt(fitBoundsDuration);
                    }}>
                        <Text style={styles.buttonText}>Save FitBoundsPadding</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>FitBoundsDuration</Text>
                    <TextInput
                        style={styles.input}
                        value={fitBoundsDuration}
                        onChangeText={setfitBoundsDuration}
                        placeholder="Enter FitBoundsPadding"
                        placeholderTextColor={colors.textSecondary}
                        keyboardType='numeric'
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.fitBoundsDuration = parseInt(fitBoundsDuration);
                    }}>
                        <Text style={styles.buttonText}>Save FitBoundsPadding</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>MaxSimulationDistance</Text>
                    <TextInput
                        style={styles.input}
                        value={maxSimDistance}
                        onChangeText={setMaxSimDistance}
                        placeholder="Enter MaxSimulationDistance"
                        placeholderTextColor={colors.textSecondary}
                        keyboardType='numeric'
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.maxSimDistance = parseInt(maxSimDistance);
                    }}>
                        <Text style={styles.buttonText}>Save MaxSimulationDistance</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>SimulationSpeed</Text>
                    <TextInput
                        style={styles.input}
                        value={simSpeed}
                        onChangeText={setSimSpeed}
                        placeholder="Enter SimulationSpeed"
                        placeholderTextColor={colors.textSecondary}
                        keyboardType='numeric'
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.simSpeed = parseInt(simSpeed);
                    }}>
                        <Text style={styles.buttonText}>Save SimulationSpeed</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.toggleRow}>
                    <Text style={styles.label}>Enable Simulation</Text>
                    <Switch
                        value={enableSim}
                        onValueChange={(value: boolean) => {
                            setEnableSim(value)
                            instance.enableSimulation = value
                        }}
                        trackColor={{ true: colors.switchTrackTrue, false: colors.switchTrackFalse }}
                        thumbColor={colors.switchThumb}
                    />
                </View>
                <View style={styles.toggleRow}>
                    <Text style={styles.label}>Show Rider On Origin</Text>
                    <Switch
                        value={showRiderOnOrigin}
                        onValueChange={(value: boolean) => {
                            setShowRiderOnOrigin(value)
                            instance.showRiderOnOrigin = value
                        }}
                        trackColor={{ true: colors.switchTrackTrue, false: colors.switchTrackFalse }}
                        thumbColor={colors.switchThumb}
                    />
                </View>
                <View style={styles.toggleRow}>
                    <Text style={styles.label}>ETA Refresh</Text>
                    <Switch
                        value={etaRefresh}
                        onValueChange={(value: boolean) => {
                            setETARefesh(value)
                            instance.etaRefresh = value
                        }}
                        trackColor={{ true: colors.switchTrackTrue, false: colors.switchTrackFalse }}
                        thumbColor={colors.switchThumb}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>ETA Refesh Duration</Text>
                    <TextInput
                        style={styles.input}
                        value={etaRefreshDuration}
                        onChangeText={setETARefeshDuration}
                        placeholder="Enter etaRefreshDuration"
                        placeholderTextColor={colors.textSecondary}
                        keyboardType='numeric'
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        instance.etaRefreshDuration = parseInt(etaRefreshDuration);
                    }}>
                        <Text style={styles.buttonText}>Save etaRefreshDuration</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    );
}
