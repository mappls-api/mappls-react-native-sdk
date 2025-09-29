import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import RNColorPicker from '../components/RNColorPicker';
import MapplsUIWidgets from 'mappls-search-widgets-react-native';
import RadioGroups from '../components/RadioGroups';
import PlaceSettings from '../model/PlaceSettings';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/navigationUtils';
import ArrowBackIcon from '../assets/ArrowBackIcon';
import colors from '../constants/colors';
import styles from '../constants/styles';



const PlaceAutoCompleteSetting: React.FC = () => {
  const instance = PlaceSettings.getInstance();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [zoom, setZoom] = useState<string>(instance.zoom ?? '');
  const [pod, setPod] = useState<string>(instance.pod ?? '');
  const [tokenizeAddress, setTokenizeAddress] = useState<boolean>(instance.tokenizeAddress ?? false);
  const [saveHistory, setSaveHistory] = useState<boolean>(instance.saveHistory ?? false);
  const [historyCount, setHistoryCount] = useState<string>(instance.historyCount ?? '');
  const [attributionVerticalAlignment, setAttributionVerticalAlignment] = useState<string>(
    instance.attributionVerticalAlignment?.toString() ?? ''
  );
  const [attributionHorizontalAlignment, setAttributionHorizontalAlignment] = useState<string>(
    instance.attributionHorizontalAlignment?.toString() ?? ''
  );
  const [logoSize, setLogoSize] = useState<string>(instance.logoSize !== undefined ? instance.logoSize.toString() : '');
  const [location, setLocation] = useState(instance.location || '');
  const [filter, setFilter] = useState<string>(instance.filter ?? '');
  const [deBounce, setDeBounce] = useState<string>(instance.deBounce ?? '');
  const [enableHyperLocal, setEnableHyperLocal] = useState<boolean>(instance.enableHyperLocal ?? false);
  const [enableBridge, setEnableBridge] = useState<boolean>(instance.enableBridge ?? false);
  const [enableTextSearch, setEnableTextSearch] = useState<boolean>(instance.enableTextSearch ?? false);

  const [showBackColorPicker, setBackShowColorPicker] = useState<boolean>(false);
  const [backGroundColor, setBackGroundColor] = useState(instance.backgroundColor);

  const [showToolColorPicker, setShowToolColorPicker] = useState<boolean>(false);
  const [toolbarColor, setToolbarColor] = useState<string>(instance.toolbarColor ?? '#ffffff');

  const pods = [
    { label: 'SUB LOCALITY', value: MapplsUIWidgets.POD_SUB_LOCALITY },
    { label: 'LOCALITY', value: MapplsUIWidgets.POD_LOCALITY },
    { label: 'CITY', value: MapplsUIWidgets.POD_CITY },
    { label: 'VILLAGE', value: MapplsUIWidgets.POD_VILLAGE },
    { label: 'SUB DISTRICT', value: MapplsUIWidgets.POD_SUB_DISTRICT },
    { label: 'DISTRICT', value: MapplsUIWidgets.POD_DISTRICT },
    { label: 'STATE', value: MapplsUIWidgets.POD_STATE },
    { label: 'SUB SUB LOCALITY', value: MapplsUIWidgets.POD_SUB_SUB_LOCALITY },
  ];

  const verticalAlignments = [
    { label: 'GRAVITY TOP', value: MapplsUIWidgets.GRAVITY_TOP },
    { label: 'GRAVITY BOTTOM', value: MapplsUIWidgets.GRAVITY_BOTTOM },
  ];

  const horizontalAlignments = [
    { label: 'GRAVITY LEFT', value: MapplsUIWidgets.GRAVITY_LEFT },
    { label: 'GRAVITY CENTER', value: MapplsUIWidgets.GRAVITY_CENTER },
    { label: 'GRAVITY RIGHT', value: MapplsUIWidgets.GRAVITY_RIGHT },
  ];

  const logoSizes = [
    { label: 'SMALL', value: MapplsUIWidgets.SIZE_SMALL },
    { label: 'MEDIUM', value: MapplsUIWidgets.SIZE_MEDIUM },
    { label: 'LARGE', value: MapplsUIWidgets.SIZE_LARGE },
  ];

  return (
    <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>
        <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>PlaceAutoComplete Widget Setting</Text>
                </View>
            </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Background color picker */}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Set Background Color</Text>

          <TouchableOpacity onPress={() => setBackShowColorPicker(true)} activeOpacity={0.8}>
            <TextInput
              value={backGroundColor}
              editable={false} // disable typing
              pointerEvents="none" // prevent focus
              style={styles.input}
            />
          </TouchableOpacity>
          <RNColorPicker
            visible={showBackColorPicker}
            onRequestClose={() => {
              setBackShowColorPicker(false)
            }}
            defaultColor={backGroundColor}
            onColorSelected={(color: string) => {
              // setBackShowColorPicker(false);
              setBackGroundColor(color);
              instance.backgroundColor = color;
            }}
          />
        </View>


        {/* Toolbar color picker */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Set Toolbar Background Color</Text>
          <TouchableOpacity onPress={() => setShowToolColorPicker(true)}>
            <TextInput
              value={toolbarColor}
              editable={false} // disable typing
              pointerEvents="none" // prevent focus
              style={styles.input}
            />
            <RNColorPicker
              visible={showToolColorPicker}
              onRequestClose={() => setShowToolColorPicker(false)}
              defaultColor={toolbarColor}
              onColorSelected={(color: string) => {
                setShowToolColorPicker(false);
                setToolbarColor(color);
                instance.toolbarColor = color;
              }}
            />
          </TouchableOpacity>
        </View>



        {/* Zoom */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Zoom</Text>
          <TextInput
            keyboardType="number-pad"
            maxLength={2}
            value={zoom}
            onChangeText={(text) => {
              setZoom(text);
            }}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={() => {
            instance.zoom = zoom;
          }}>
            <Text style={styles.buttonText}>Save zoom</Text>
          </TouchableOpacity>
        </View>


        {/* POD selection */}
        <View style={styles.inputGroup}>
          <RadioGroups
            label="POD"
            data={pods}
            callback={(e: any) => {
              setPod(e.value);
              instance.pod = e.value;
            }}
            index={pods.findIndex((x) => x.value === pod) + 1}
          />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.label}>Tokenize Address</Text>
          <Switch
            value={tokenizeAddress}
            onValueChange={(value: boolean) => {
              setTokenizeAddress(value)
              instance.tokenizeAddress = value
            }}
            trackColor={{ true: colors.switchTrackTrue, false: colors.switchTrackFalse }}
            thumbColor={colors.switchThumb}
          />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.label}>Save History (Android)</Text>
          <Switch
            value={saveHistory}
            onValueChange={(value: boolean) => {
              setSaveHistory(value)
              instance.saveHistory = value
            }}
           trackColor={{ true: colors.switchTrackTrue, false: colors.switchTrackFalse }}
            thumbColor={colors.switchThumb}
          />

        </View>


        {/* History count */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>History Count (Android)</Text>
          <TextInput
            keyboardType="numeric"
            maxLength={2}
            value={historyCount}
            onChangeText={(text) => {
              setHistoryCount(text);
            }}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={() => {
            instance.historyCount = historyCount;
          }}>
            <Text style={styles.buttonText}>Save history Count</Text>
          </TouchableOpacity>
        </View>


        {/* Location */}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="lat,lng"
            keyboardType="numeric"
            placeholderTextColor={colors.textSecondary}
          />
          <TouchableOpacity style={styles.button} onPress={() => {
            instance.location = location;
          }}>
            <Text style={styles.buttonText}>Save Location</Text>
          </TouchableOpacity>
        </View>

        {/* Filter */}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Filter</Text>
          <TextInput
            style={styles.input}
            value={filter}
            onChangeText={setFilter}
            placeholder="EX: cop:YMCZ0J"
          placeholderTextColor={colors.textSecondary}
          />
          <TouchableOpacity style={styles.button} onPress={() => {
            instance.filter = filter;
          }}>
            <Text style={styles.buttonText}>Save filter</Text>
          </TouchableOpacity>
        </View>

        {/* Radio groups */}
        <View style={styles.inputGroup}>
          <RadioGroups
            label="Attribution Vertical Alignment"
            data={verticalAlignments}
            callback={(e: any) => {
              setAttributionVerticalAlignment(e.value);
              instance.attributionVerticalAlignment = e.value;
            }}
            index={verticalAlignments.findIndex((x) => x.value === attributionVerticalAlignment) + 1}
          />
        </View>
        <View style={styles.inputGroup}>
          <RadioGroups
            label="Attribution Horizontal Alignment"
            data={horizontalAlignments}
            callback={(e: any) => {
              setAttributionHorizontalAlignment(e.value);
              instance.attributionHorizontalAlignment = e.value;
            }}
            index={horizontalAlignments.findIndex((x) => x.value === attributionHorizontalAlignment) + 1}
          />
        </View>
        <View style={styles.inputGroup}>
          <RadioGroups
            label="Logo Size"
            data={logoSizes}
            callback={(e: any) => {
              setLogoSize(e.value);
              instance.logoSize = e.value;
            }}
            index={logoSizes.findIndex((x) => x.value === logoSize) + 1}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>De-Bounce</Text>
          <TextInput
            style={styles.input}
            value={deBounce}
            onChangeText={setDeBounce}
            placeholder="Enter deBounce"
            placeholderTextColor={colors.textSecondary}
          />
          <TouchableOpacity style={styles.button} onPress={() => {
            instance.deBounce = deBounce;
          }}>
            <Text style={styles.buttonText}>Save De-Bounce</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.label}>Enable HyperLocal</Text>
          <Switch
            value={enableHyperLocal}
            onValueChange={(value: boolean) => {
              setEnableHyperLocal(value)
              instance.enableHyperLocal = value
            }}
            trackColor={{ true: colors.switchTrackTrue, false: colors.switchTrackFalse }}
            thumbColor={colors.switchThumb}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.label}>Enable TextSearch</Text>
          <Switch
            value={enableTextSearch}
            onValueChange={(value: boolean) => {
              setEnableTextSearch(value)
              instance.enableTextSearch = value
            }}
            trackColor={{ true: colors.switchTrackTrue, false: colors.switchTrackFalse }}
            thumbColor={colors.switchThumb}
          />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.label}>Enable Bridge</Text>
          <Switch
            value={enableBridge}
            onValueChange={(value: boolean) => {
              setEnableBridge(value)
              instance.enableBridge = value
            }}
            trackColor={{ true: colors.switchTrackTrue, false: colors.switchTrackFalse }}
            thumbColor={colors.switchThumb}
          />
        </View>
      </ScrollView>
    </View>

  );
};

export default PlaceAutoCompleteSetting;

