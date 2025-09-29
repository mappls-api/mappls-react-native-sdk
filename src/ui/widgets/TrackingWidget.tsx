import { Camera, CameraRef, LineLayerStyle, MapView, SymbolLayerStyle } from 'mappls-map-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, StyleProp, ToastAndroid, Alert, Image } from 'react-native';
import carIcon from '../../assets/bikeicon.png';
import marker from '../../assets/marker.png'
import MapplsTracking from 'mappls-tracking-react-native';
import TrackingWidgetSettings from '../../model/TrackingWidgetSettings';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import colors from '../../constants/colors';
import styles from '../../constants/styles';




export default function TrackingWidget() {
  let instance = TrackingWidgetSettings.getInstance();
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<CameraRef | null>(null);
  const mapRef = useRef(null);
  const trackingWidgetRef = useRef<MapplsTracking.MapplsTrackingWidget.TrackingWidgetRef>(null);
  const [lineVisible, setLineVisible] = useState(true);
  const [timeDistance, setTimeDistance] = useState<MapplsTracking.MapplsTrackingWidget.TrackingData>();
  const isInitial = useRef(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  const onPress = (event: any) => {
    const { geometry } = event;
    const longitude = geometry.coordinates[0];
    const latitude = geometry.coordinates[1];
    const newSourcePoint: [number, number] = [longitude, latitude];
    const newSourcePointString = `${longitude},${latitude}`;


    if (trackingWidgetRef.current) {
      trackingWidgetRef.current.removeCurveLine(true);
      const trackingData: MapplsTracking.MapplsTrackingWidget.TrackingRequestData = {
        currentLocation: newSourcePoint
      }
      trackingWidgetRef.current.startTracking(trackingData); // Example coordinates newSourcePoint
    }

  };
  const enableFitBound = () => {
    if (trackingWidgetRef.current) {
      trackingWidgetRef.current.enableFitBounds(true);
    }
  }
  const disableFitBound = () => {
    if (trackingWidgetRef.current) {
      trackingWidgetRef.current.enableFitBounds(false);
    }
  }
  const recenterBound = () => {
    if (trackingWidgetRef.current) {

      trackingWidgetRef.current.enableFitBounds(true);
    }
  }
  const hideLine = () => {
    if (trackingWidgetRef.current) {
      const newState = !lineVisible;
      setLineVisible(newState);
      trackingWidgetRef.current.isVisibleRoutePolyline(newState);
      trackingWidgetRef.current.enableDestinationConnectorLine(newState)
    }
  }
  const onClickPoint1 = () => {

    if (trackingWidgetRef.current) {
      trackingWidgetRef.current.removeCurveLine(true);
      const newSourcePoint: MapplsTracking.MapplsTrackingWidget.TrackingRequestData = {
        currentLocation: [77.26757150555511, 28.551569415823124]
      }


      trackingWidgetRef.current.startTracking(newSourcePoint); // Example coordinates
    }


  }
  const onClickPoint2 = () => {

    if (trackingWidgetRef.current) {
      trackingWidgetRef.current.removeCurveLine(true);
      const newSourcePoint: MapplsTracking.MapplsTrackingWidget.TrackingRequestData = {
        currentLocation: [77.26486259000762, 28.553441753212752]
      }


      trackingWidgetRef.current.startTracking(newSourcePoint); // Example coordinates
    }
  }
  const onClickPoint3 = () => {

    if (trackingWidgetRef.current) {
      trackingWidgetRef.current.removeCurveLine(true);
      const newSourcePoint: MapplsTracking.MapplsTrackingWidget.TrackingRequestData = {
        currentLocation: [77.2587714362221, 28.548644369293683]
      }


      trackingWidgetRef.current.startTracking(newSourcePoint); // Example coordinates
    }
  }
  const onClickPoint4 = async () => {

    if (trackingWidgetRef.current) {
      trackingWidgetRef.current.removeCurveLine(true);
      const newSourcePoint: MapplsTracking.MapplsTrackingWidget.TrackingRequestData = {
        currentLocation: [77.25173289130068, 28.54679094322537],

      }


      trackingWidgetRef.current.startTracking(newSourcePoint); // Example coordinates
    }
  }
  const onClickPoint5 = async () => {

    if (trackingWidgetRef.current) {
      trackingWidgetRef.current.removeCurveLine(true);
      const newSourcePoint: MapplsTracking.MapplsTrackingWidget.TrackingRequestData = {
        currentLocation: [77.25942296326477, 28.552159192199877]
      }

      trackingWidgetRef.current.startTracking(newSourcePoint); // Example coordinates
    }
  }




  const renderActions = () => {

    return (
      <View style={styles.actionContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>Distance: {timeDistance && timeDistance.distance ?
            (timeDistance.distance < 1000
              ? `${timeDistance.distance} m`
              : `${(timeDistance.distance / 1000).toFixed(1)} km`
            ) : ''}</Text>
          <Text style={styles.addressText}> Duration: {timeDistance && timeDistance.duration ?
            `${Math.ceil(timeDistance.duration / 60)} mins`
            : ''}</Text>
          <Text style={styles.addressText}>LastRiderLocation: {timeDistance && timeDistance.lastRiderLocation
            ? `${timeDistance.lastRiderLocation[0].toFixed(6)}, ${timeDistance.lastRiderLocation[1].toFixed(6)}`
            : ''} </Text>
        </View>


        {/* Row 1 */}
        <View style={[styles.row,]}>
          <TouchableOpacity style={[styles.trackingButton]} onPress={disableFitBound}>
            <Text style={styles.buttonText}>Disable Fit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trackingButton} onPress={enableFitBound}>
            <Text style={styles.buttonText}>Enable Fit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trackingButton} onPress={hideLine}>
            <Text style={styles.buttonText}> {lineVisible ? "Hide Polyline" : "show Polyline"} </Text>
          </TouchableOpacity>

        </View>
        {/* Second Column */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.trackingButton} onPress={onClickPoint1}>
            <Text style={styles.buttonText}>Point1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trackingButton} onPress={onClickPoint2}>
            <Text style={styles.buttonText}>Point2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trackingButton} onPress={onClickPoint3}>
            <Text style={styles.buttonText}>Point3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trackingButton} onPress={onClickPoint4}>
            <Text style={styles.buttonText}>Point4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trackingButton} onPress={onClickPoint5}>
            <Text style={styles.buttonText}>Point5</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  };


  return (
    <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>
      <View
        style={styles.header}>
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowBackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tracking Widget</Text>
        </View>

        {/* Right side: Settings icon */}
        <TouchableOpacity onPress={() => navigation.navigate("TrackingWidgetSetting")}>
          <Image
            source={require('../../assets/settings.png')}
            style={[styles.settingsIcon, { tintColor: 'white' }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <MapView style={{ flex: 1 }}
        onPress={(event: any) => onPress(event)}
        ref={mapRef}
        logoClickEnabled={false}
        onMapError={(error: any) => console.log(error)}>
        <Camera ref={cameraRef}
        />
        <MapplsTracking.MapplsTrackingWidget
          orderId='1'
          ref={trackingWidgetRef}
          originPoint='77.26890561043258,28.550947419414012'
          destinationPoint='77.25988209737588,28.55373960502866'
          lastRiderLocation={instance.lastRiderLocation}
          speedInMillis={instance.speedInMillis}
          resource='route_eta'
          profile='driving'
          routeChangeBuffer={instance.routeChangeBuffer}
          trackingIcon={carIcon}
          latentViz={instance.latentViz}
          polylineRefresh={instance.polylineRefresh}
          cameraZoomLevel={instance.cameraZoomLevel}
          routePolylineStyle={layerStyle.routePolylineStyle}
          destinationIconStyle={layerStyle.destinationIconStyle}
          dashRoutePolylineStyle={layerStyle.dashRoutePolylineStyle}
          OriginIconStyle={layerStyle.OriginOutletIconStyle}
          destinationRouteConnectorStyle={layerStyle.connectorPolylineStyle}
          enableDestinationRouteConnector={instance.enableDestinationRouteConnector}
          fitBoundsPadding={instance.fitBoundsPadding}
          fitBoundsDuration={instance.fitBoundsDuration}
          latentVizRadius={instance.latentVizRadius}
          enableSim={instance.enableSimulation}
          maxSimDis={instance.maxSimDistance}
          simSpeed={instance.simSpeed}
          showRiderOnOrigin={instance.showRiderOnOrigin}
          trackingSegmentCompleteCallback={(event: any) => {
            if (isInitial.current) {
              // console.log("Initial run of trackingSegmentCompleteCallback");
              // Set isInitial to false to prevent this block from running again
              isInitial.current = false;
            } else {
              if (event.lastRiderLocation) {
                instance.lastRiderLocation = event.lastRiderLocation;
              }
            }

            setTimeDistance(event)

          }}
          trackingEventCallback={(eventName: any, eventValue: any) => {
            // console.log("trackingEventCallback", eventName + ":::::::" + eventValue)
          }}
        />

      </MapView>

      {renderActions()}

    </View>

  )
}

const layerStyle = {
  destinationIconStyle: {
    iconImage: marker,//https://mmi-api-team.s3.ap-south-1.amazonaws.com/mappls/notexist.png
    iconAllowOverlap: true,
    iconAnchor: 'bottom',
    iconSize: 0.2,

  } as StyleProp<SymbolLayerStyle>,
  OriginOutletIconStyle: {
    iconImage: marker,
    iconAllowOverlap: true,
    iconAnchor: 'bottom',
    iconSize: 0.2,

  } as StyleProp<SymbolLayerStyle>,
  routePolylineStyle: {
    lineColor: '#314ccd',
    lineWidth: 6,
    lineOpacity: 0.75,
    lineCap: 'round',
    lineJoin: 'round',
  } as StyleProp<LineLayerStyle>,

  connectorPolylineStyle: {
    lineColor: '#787878',
    lineWidth: 4,
    lineOpacity: 0.75,
    lineCap: 'round',
    lineJoin: 'round',
    lineDasharray: [2, 4],
  } as StyleProp<LineLayerStyle>,

  dashRoutePolylineStyle: {
    lineColor: '#314ccd',  // Set polyline color
    lineWidth: 4,  // Set polyline width
    lineOpacity: 0.75,  // Set polyline opacity
    lineCap: 'round',
    lineJoin: 'round',
    lineDasharray: [2, 4],  // Dash pattern: [Dash length, Gap length]
  } as StyleProp<LineLayerStyle>,

}
// const styles = StyleSheet.create({
// actionContainer: {
//   position: 'absolute',
//   bottom: 0,
//   zIndex: 10,
//   backgroundColor: '#1B1E23' // Ensures the buttons are on top of the map
// },
// row: {
//   flexDirection: 'row', // Arrange buttons in a row
//   alignItems: 'center', // Align buttons vertically centered
//   padding: 10 // Space between rows
// },
//   button: {
//     marginHorizontal: 5,
//     paddingVertical: 5, // Vertical padding
//     paddingHorizontal: 8, // Horizontal padding
//     backgroundColor: '#0D1014',
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: '#21D0B2',
//     alignItems: 'center',
//   },
//   buttonText: {
//     textAlign: 'center', // Center the text within the button
//     textTransform: 'none', // Prevent text from being transformed to uppercase
//     fontSize: 16, // Adjust font size as needed
//     color: '#FFFFFF', // Set text color to white
//   },
//   headerRow: {
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 10,
//     paddingTop: 10,
//     paddingBottom: 10,
//     paddingLeft: 15,
//     paddingRight: 15,
//   },
//   headerText: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#000', // Example background color
//   },
//   leftSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   backBtn: {
//     marginRight: 8,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   settingsIcon: {
//     width: 24,
//     height: 24,
//   },
//   textContainer: {
//     marginLeft: 0,
//   },

// });

