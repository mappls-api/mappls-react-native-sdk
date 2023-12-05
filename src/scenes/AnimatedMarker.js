import React, { useState,useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
import MapplsGL from 'mappls-map-react-native';




const AnimatedMarker = () => {
  const fromCoords = useRef([77.202482, 28.594418]);
  const toCoords = useRef([77.186016, 28.554948]);
//   const fromCoordss = [77.202482, 28.594418];
// const toCoords = [77.186016, 28.554948];
  const [animationIndex, setAnimationIndex] = useState(0);
  const [currentCoords, setCurrentCoords] = useState(fromCoords.current);

  

  useEffect(() => {
    const animate = () => {
      setAnimationIndex(animationIndex => animationIndex + 1);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // const { lng: fromLng, lat: fromLat } = fromCoords.current;
    // const { lng: toLng, lat: toLat } = toCoords.current;
    
    const diffLng = toCoords.current[0] - fromCoords.current[0];
    const diffLat = toCoords.current[1] - fromCoords.current[1];
    const fraction = animationIndex / 300;
    const currentLng = fromCoords.current[0] + diffLng * fraction;
    const currentLat = fromCoords.current[1] + diffLat * fraction;
    setCurrentCoords([currentLng, currentLat]);
  }, [animationIndex, fromCoords, toCoords]);

  useEffect(() => {
    console.log(currentCoords);
  }, [currentCoords]);

  return (
  
    <View style={styles.container}>
     <MapplsGL.MapView style={styles.map}>
      <MapplsGL.Camera 
       centerCoordinate={currentCoords}
       animationMode={'flyTo'}
       zoomLevel={12}/>
        <MapplsGL.PointAnnotation  id="symbolLocationSource"
        coordinate={currentCoords}>
          <View style={styles.object} />
        </MapplsGL.PointAnnotation>
      </MapplsGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  object: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'red'
  }
});
export default AnimatedMarker;