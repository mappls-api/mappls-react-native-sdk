import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, TextInput, Dimensions, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import Toast from 'react-native-simple-toast'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PlaceResponse } from 'mappls-map-react-native/src/modules/restApi/models/ReverseGeoCodeModel';
import { Callout, Camera, CameraRef, MapView, PointAnnotation, RestApi } from 'mappls-map-react-native';
import colors from '../../constants/colors';
import styles from '../../constants/styles';



export default function ReverseGeoCodeApi() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [markerLat, setMarkerLat] = useState<number | null>(22.553147478403194);
  const [markerLng, setMarkerLng] = useState<number | null>(77.23388671875);
  const [label, setLabel] = useState<string>('');
  const [center, setCenter] = useState<[number, number]>([77.61234, 27.61234]);
  const cameraRef = useRef<CameraRef>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [bottomHeight, setBottomHeight] = useState(0);
  const screenHeight = Dimensions.get('window').height;
  const [bottomSelected, setBottomSelected] = useState<'response' | 'data'>('data');
  const [placeResponse, setPlaceResponse] = useState<PlaceResponse | undefined>();

  useFocusEffect(
    React.useCallback(() => {
      if (markerLat && markerLng) {
        revGeoCodeApi(markerLat, markerLng);
      }

    }, [])
  );

  const revGeoCodeApi = (lat: number, lng: number) => {
    RestApi.reverseGeocode({ latitude: lat, longitude: lng })
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setPlaceResponse(data)
          const address = data.results[0].formatted_address;
          console.log(data.results[0]);
          setMarkerLat(parseFloat(data.results[0].lat))
          setMarkerLng(parseFloat(data.results[0].lng))
          moveCamera(parseFloat(data.results[0].lat), parseFloat(data.results[0].lng));
          setLabel(address);
        }
      })
      .catch((error: Error) => {
        console.log('fail: ' + error.message);
        Toast.show(error.message, Toast.SHORT);
      });
  };


  const moveCamera = (lat: number, lng: number) => {
    if (cameraRef.current) {
      cameraRef.current?.setCamera({ centerCoordinate: [lng, lat], zoomLevel: 10 });
    } else {
      console.log("moveCamera cameraRef else", lat)
    }
  };
  const onClick = () => {
    if (markerLat != null && markerLng != null) {
      revGeoCodeApi(markerLat, markerLng);
      Keyboard.dismiss();
    } else {
      Toast.show('Please enter some value', Toast.SHORT);
    }
  };
  const onLatitudeChange = (text: string) => {
    setMarkerLat(text.trim() === '' ? null : parseFloat(text));
  };

  const onLongitudeChange = (text: string) => {
    setMarkerLng(text.trim() === '' ? null : parseFloat(text));
  };
  const onPress = (event: any) => {
    const { geometry } = event;
    const lng = geometry.coordinates[0];
    const lat = geometry.coordinates[1];
    setMarkerLat(lat);
    setMarkerLng(lng);
    revGeoCodeApi(lat, lng);
    moveCamera(lat, lng);
  };
  return (
    <View
      style={[
        {
          flex:1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          backgroundColor: colors.backgroundPrimary,
        },
      ]}
    >
      {/* Header */}

      <View
        onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
        style={styles.header}
      >
        {/* Left side: Back button + Title */}
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowBackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reverse GeoCode API</Text>
        </View>

      </View>
      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter latitude..."
          placeholderTextColor={colors.textSecondary}
          style={styles.inputField}
          value={markerLat !== null ? markerLat.toString() : ''}
          onChangeText={onLatitudeChange}
          keyboardType="numbers-and-punctuation"
        />
        <TextInput
          placeholder="Enter longitude..."
          placeholderTextColor={colors.textSecondary}
          style={styles.inputField}
          value={markerLng !== null ? markerLng.toString() : ''}
          onChangeText={onLongitudeChange}
          keyboardType="numbers-and-punctuation"
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={onClick}
        >
          <Text style={{color:colors.textPrimary}}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <View style={{flex: 1,}}>
        <MapView
          onMapError={error => console.log(error.code + ' ' + error.message)}
          style={{flex: 1,}}
          onPress={onPress}
        >
          <Camera
            zoomLevel={10}
            ref={cameraRef}

          />
          {markerLat !== null && markerLng !== null && (
            <PointAnnotation
              id="markerId"
              title="Marker"
              coordinate={[markerLng, markerLat]}
            >
              <Callout title={label} />
            </PointAnnotation>
          )}
        </MapView>
      </View>
      {/* Response/Data Display */}
      {bottomSelected === 'response' && placeResponse && (
        <View style={[
          styles.responseContainer,
          {
            height: screenHeight - headerHeight - bottomHeight, // dynamic height
            marginTop: headerHeight,
          },
        ]}>
          <ScrollView contentContainerStyle={styles.responseContent}>
            <Text style={styles.responseText}>
              {JSON.stringify(placeResponse, null, 2)}
            </Text>
          </ScrollView>
        </View>
      )}
      {/* Address Display */}
      {label && (<View style={styles.addressContainer}>
        <Text style={styles.addressText} numberOfLines={2}>
          {label}
        </Text>
      </View>
      )}
      <View
        onLayout={(event) => setBottomHeight(event.nativeEvent.layout.height)}
        style={styles.bottomToggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleBtn,
            bottomSelected === 'response' ? styles.activeToggle : styles.inactiveToggle
          ]}
          onPress={() => setBottomSelected('response')}
        >
          <Text style={[bottomSelected === 'response' ? styles.activeToggleText : styles.inactiveToggleText]}>
            Show Response
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleBtn, bottomSelected === 'data' ? styles.activeToggle : styles.inactiveToggle]}
          onPress={() => setBottomSelected('data')}
        >
          <Text style={[bottomSelected === 'data' ? styles.activeToggleText : styles.inactiveToggleText]}>
            Show Data
          </Text>
        </TouchableOpacity>
      </View>

    </View>

  );
}

