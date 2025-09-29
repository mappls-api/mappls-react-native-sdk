import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity, Image, FlatList, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from "react-native-svg"
import { Camera, CameraRef, MapView, MapViewRef, MarkerView, PointAnnotation } from 'mappls-map-react-native';
import colors from '../../constants/colors';
import styles from '../../constants/styles';

const ClientData = require('../../ClientData.json');


export default function AddMarkerView() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  const mapRef = useRef<MapViewRef>(null);
  const cameraRef = useRef<CameraRef>(null);

  const handleMarkerPress = useCallback((markerId: string) => {
    setSelectedMarkerId(prev => (prev === markerId ? null : markerId));
  }, []);

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.backgroundPrimary,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right
    }}>

      <View style={styles.header}>
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowBackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add MarkerView</Text>
        </View>
      </View>
      <MapView
        style={{ flex: 1 }}
        ref={mapRef}
        onDidFinishLoadingMap={() => console.log("onDidFinishLoadingMap")}
      >
        <Camera
          ref={cameraRef}
          zoomLevel={15}
          animationMode="moveTo"
          centerCoordinate={[77.01775095884524, 28.38361801036934]}
        />

        {ClientData.response.nearby_places.map((property: any, index: any) => {
          const coord: [number, number] = [
            property.location.coordinates[0].longitude,
            property.location.coordinates[0].latitude
          ];

          const markerId = `markerId${index}`;
          const showMarkerView = selectedMarkerId === markerId;

          return (
            <React.Fragment key={markerId}>
              <PointAnnotation
                id={markerId}
                anchor={{ x: 0, y: 1 }}
                coordinate={coord}
                onSelected={() => handleMarkerPress(markerId)}
              >
                <Svg height="50px" width="50px" viewBox="0 0 293.334 293.334">
                  <Path
                    d="M146.667 0C94.903 0 52.946 41.957 52.946 93.721c0 22.322 7.849 42.789 20.891 58.878 4.204 5.178 11.237 13.331 14.903 18.906 21.109 32.069 48.19 78.643 56.082 116.864 1.354 6.527 2.986 6.641 4.743.212 5.629-20.609 20.228-65.639 50.377-112.757 3.595-5.619 10.884-13.483 15.409-18.379a94.561 94.561 0 0016.154-24.084c5.651-12.086 8.882-25.466 8.882-39.629C240.387 41.962 198.43 0 146.667 0zm0 144.358c-28.892 0-52.313-23.421-52.313-52.313 0-28.887 23.421-52.307 52.313-52.307s52.313 23.421 52.313 52.307c0 28.893-23.421 52.313-52.313 52.313z"
                    fill="#FF00FF"
                  />
                  <Circle cx={146.667} cy={90.196} r={21.756} fill="#FF00FF" />
                </Svg>
              </PointAnnotation>

              {showMarkerView && (
                <MarkerView
                  id={`markerView_${index}`}
                  anchor={{ x: 0.2, y: -0.1 }}
                  coordinate={coord}
                >
                  <View style={styles.calloutContainer}>
                    <TouchableWithoutFeedback>
                      <View>
                        <Text style={styles.calloutText}>
                          {property.name}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </MarkerView>
              )}
            </React.Fragment>
          );
        })}
      </MapView>
    </View>
  );
}

