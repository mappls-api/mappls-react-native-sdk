import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    SafeAreaView, Image,
    ListRenderItemInfo
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { MapplsStyle, MapView } from 'mappls-map-react-native/src/components/MapView';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Camera, isShowLastSelectedStyle } from 'mappls-map-react-native';
import styles from '../../constants/styles';
import colors from '../../constants/colors';

type StyleItem = MapplsStyle;

export default function MapStyleURL() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();

    const [mmiStyle, setMmiStyle] = useState<string | undefined>(undefined);
    const [styleData, setStyleData] = useState<Array<MapplsStyle>>([]);
    const [saveLastSelected, setSaveLastSelected] = useState<boolean>(false);
    const [mapLoading, setMapLoading] = useState<boolean>(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

    useEffect(() => {
        isShowLastSelectedStyle().then(value => {
            setSaveLastSelected(value);
        });
    }, []);

    const renderItem = ({ item }: ListRenderItemInfo<StyleItem>) => (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                backgroundColor: colors.backgroundPrimary,
                padding: 10,
            }}
            onPress={() => {
                setMmiStyle(item.name)
            }}>
            <View style={{ flex: 1.5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.textPrimary }}>
                    {item.displayName}
                </Text>
                <Text style={{ color: colors.textSecondary }}>{item.description}</Text>
            </View>
            <Image
                style={{ height: 80, width: 100, flex: 1 }}
                source={{ uri: item.imageUrl }}
            />
        </TouchableOpacity>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{
                backgroundColor: colors.backgroundPrimary,
                flex: 1,
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
                        <Text style={styles.headerTitle}>Map Style URL</Text>
                    </View>
                </View>
                <MapView
                    mapplsStyle={mmiStyle}
                    onMapError={(e) => console.log(e)}
                    onDidFinishLoadingMap={() => {
                        console.log('MAP LOADED')
                        setMapLoading(true)
                    }}
                    didLoadedMapplsMapsStyles={(data) => {
                        console.log('STYLE DATA:', data);
                        setStyleData(data);
                        bottomSheetRef.current?.expand();
                    }}
                    style={{ flex: 1 }}
                >
                    <Camera
                        zoomLevel={4}
                        animationMode="moveTo"
                        centerCoordinate={[77.1025, 28.7041]}
                    />
                </MapView>

                {/* Bottom Sheet */}
                {mapLoading && Array.isArray(styleData) && (
                    <BottomSheet
                        ref={bottomSheetRef}
                        snapPoints={snapPoints}

                    >

                        <BottomSheetFlatList
                            data={styleData}
                            keyExtractor={(item, index) => String(item?.name ?? index)}
                            renderItem={renderItem}

                        />
                    </BottomSheet>
                )}


            </View>
        </GestureHandlerRootView>
    );
}

