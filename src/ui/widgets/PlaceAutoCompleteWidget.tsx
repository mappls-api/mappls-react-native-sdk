import React, { useState } from 'react';
import { View,TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import MapplsUIWidgets from 'mappls-search-widgets-react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../utils/navigationUtils';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import PlaceSettings from '../../model/PlaceSettings';
import colors from '../../constants/colors';
import styles from '../../constants/styles';
import Toast from 'react-native-simple-toast';




export default function PlaceAutoCompleteWidget() {
  const instance = PlaceSettings.getInstance();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [autocompleteResultResponse, setAutocompleteResultResponse] = useState<AutocompleteResult | undefined>();
  const [lat, lng] = (instance.location ?? "28.7041,77.1025")
    .split(",")
    .map(Number);

  const searchWidgetProps = {
    location: instance.location.split(",").map(Number),
    backgroundColor: instance.backgroundColor,
    toolbarColor: instance.toolbarColor,
    zoom: parseInt(instance.zoom),
    pod: instance.pod,
    tokenizeAddress: instance.tokenizeAddress,
    saveHistory: instance.saveHistory,
    historyCount: parseInt(instance.historyCount),
    attributionHorizontalAlignment: instance.attributionHorizontalAlignment,
    attributionVerticalAlignment: instance.attributionVerticalAlignment,
    logoSize: instance.logoSize,
    filter: instance.filter,
    debounce: parseFloat(instance.deBounce),
    bridge: instance.enableBridge,
    hyperLocal: instance.enableHyperLocal,
    enableTextSearch: instance.enableTextSearch,
  };



  const handleOnButtonPress3 = async () => {
    try {
      const res = await MapplsUIWidgets.searchWidget(searchWidgetProps);
      setAutocompleteResultResponse(res)
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleOnButtonPress4 = async () => {
    try {
      const res = await MapplsUIWidgets.searchWidget(searchWidgetProps);
      setAutocompleteResultResponse(res)
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>
      <View
        style={styles.header}>
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowBackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Place AutoComplete Widget</Text>
        </View>

        {/* Right side: Settings icon */}
        <TouchableOpacity onPress={() => navigation.navigate("PlaceAutoCompleteSetting")}>
          <Image
            source={require('../../assets/settings.png')}
            style={[styles.settingsIcon, { tintColor: 'white' }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>


      <View style={styles.root}>
        <TouchableOpacity style={styles.button} onPress={handleOnButtonPress3}>
          <Text style={styles.buttonText}>Activity With Card Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleOnButtonPress4}>
          <Text style={styles.buttonText}>Activity With Full Mode</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{ padding: 10, }} >
                        <Text style={styles.responseText}>
                            {JSON.stringify(autocompleteResultResponse, null, 2)}
                        </Text>
                    </ScrollView>

      </View>

    </View>

  );
};




