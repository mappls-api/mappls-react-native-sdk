import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, MapView, PointAnnotation, PointAnnotationRef } from 'mappls-map-react-native';
import colors from '../../constants/colors';
import styles from '../../constants/styles';




export default function AnimateMarker() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const pointAnnotation = useRef<PointAnnotationRef>(null)

    const fromCoords = useRef([77.202482, 28.594418]);
    const toCoords = useRef([77.186016, 28.554948]);

    const [currentCoords, setCurrentCoords] = useState(fromCoords.current);
    const [isMapReady, setIsMapReady] = useState(false);
    const animationFrameId = useRef<number | null>(null);
    const animationIndex = useRef(0);

    const animate = () => {
        animationIndex.current += 1;
        const fraction = animationIndex.current / 300;

        if (fraction > 1) return; // Stop animation after reaching end

        const diffLng = toCoords.current[0] - fromCoords.current[0];
        const diffLat = toCoords.current[1] - fromCoords.current[1];

        const currentLng = fromCoords.current[0] + diffLng * fraction;
        const currentLat = fromCoords.current[1] + diffLat * fraction;

        setCurrentCoords([currentLng, currentLat]);

        animationFrameId.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (isMapReady) {
            animationFrameId.current = requestAnimationFrame(animate);
        }

        return () => {
            if (animationFrameId.current !== null) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [isMapReady]);

    const handleMapLoaded = () => {
        console.log('Map loaded successfully');
        setIsMapReady(true);
    };

    return (

        <View style={[
            {
                flex:1,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            },
        ]}>
           <View
                style={styles.header}
            >
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Animation Marker</Text>
                </View>

            </View>
        

            <MapView
                onDidFinishLoadingMap={handleMapLoaded}
                onMapError={error => { console.log(error.code + ' ' + error.message) }}
                style={{ flex: 1 }}
            >
                <Camera
                    centerCoordinate={currentCoords}
                    animationMode={'flyTo'}
                    zoomLevel={12} />
                <PointAnnotation
                    ref={pointAnnotation}
                    id="markerId"
                    title="Marker"
                    coordinate={currentCoords}>
                    <View />
                </PointAnnotation>

            </MapView>

        </View>

    );
}

