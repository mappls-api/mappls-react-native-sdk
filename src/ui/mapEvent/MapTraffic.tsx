import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';
import { Camera, MapView } from 'mappls-map-react-native';
import colors from '../../constants/colors';
import styles from '../../constants/styles';



export default function MapTraffic() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  const [enableTraffic, setEnableTraffic] = useState(false);
  const [enableTrafficFreeFlow, setEnableTrafficFreeFlow] = useState(true);
  const [enableTrafficNonFreeFlow, setEnableTrafficNonFreeFlow] = useState(true);
  const [enableTrafficStopIcon, setEnableTrafficStopIcon] = useState(true);
  const [enableTrafficClosure, setEnableTrafficClosure] = useState(true);

  return (
    <View style={[styles.innerContainer, {
      backgroundColor: colors.backgroundPrimary,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }]}>
      {/* Header */}

      <View style={styles.header}>
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowBackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Map Traffic</Text>
        </View>
      </View>
      {/* Map View */}

      <MapView
        style={{ flex: 1 }}
        enableTraffic={enableTraffic}
        enableTrafficFreeFlow={enableTrafficFreeFlow}
        enableTrafficNonFreeFlow={enableTrafficNonFreeFlow}
        enableTrafficStopIcon={enableTrafficStopIcon}
        enableTrafficClosure={enableTrafficClosure}
        onMapError={error => console.log(error.code + ' ' + error.message)}
      >
        <Camera
          zoomLevel={12}
          centerCoordinate={[77.1025, 28.7041]}
        />
      </MapView>


      {/* Overlay Controls */}
      <View style={styles.overlay}>
        {/* Toggle Traffic */}
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Show Traffic</Text>
          <Switch
            trackColor={{ true: colors.switchTrackTrue, false: colors.switchTrackFalse }}
            thumbColor={colors.switchThumb}
            onValueChange={(ischeck) => {
              console.log("Traffic Switch Toggled:", ischeck);
              setEnableTraffic(ischeck)
            }}
            value={enableTraffic}
          />
        </View>

        {/* Checkboxes */}
        <View style={styles.checkboxRow}>
          <CheckBox
            value={enableTrafficFreeFlow}
            onValueChange={(ischeck) => { setEnableTrafficFreeFlow(ischeck) }}
            tintColors={{ true: colors.accentPrimary, false: '#666' }}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Free Flow</Text>
        </View>

        <View style={styles.checkboxRow}>
          <CheckBox
            value={enableTrafficNonFreeFlow}
            onValueChange={(ischeck) => { setEnableTrafficNonFreeFlow(ischeck) }}
            tintColors={{ true: colors.accentPrimary, false: '#666' }}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Non Free Flow</Text>
        </View>

        <View style={styles.checkboxRow}>
          <CheckBox
            value={enableTrafficClosure}
            onValueChange={(ischeck) => { setEnableTrafficClosure(ischeck) }}
            tintColors={{ true: colors.accentPrimary, false: '#666' }}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Closure</Text>
        </View>

        <View style={styles.checkboxRow}>
          <CheckBox
            value={enableTrafficStopIcon}
            onValueChange={(ischeck) => { setEnableTrafficStopIcon(ischeck) }}
            tintColors={{ true: colors.accentPrimary, false: '#666' }}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Stop Icon</Text>
        </View>
      </View>
    </View>
  );
}

