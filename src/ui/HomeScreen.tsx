import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { menuItems, RootStackParamList, screenDataMap } from '../utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../constants/colors';


export default function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            onPress={() => {
                if (item.screen) {
                    navigation.navigate("ListScreen", {
                        title: item.title,
                        data: screenDataMap[item.screen],
                    });
                }
            }}
            style={{
                width: '30%',
                aspectRatio: 1,
                backgroundColor: colors.backgroundSecondry,   // ✅ use from constants
                margin: '1.5%',
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {item.icon}
            <Text style={{ color: colors.textPrimary, marginTop: 8, fontSize: 12, textAlign: 'center' }}>
                {item.title}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.backgroundPrimary,   // ✅ use from constants
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right
        }}>
            {/* Header for MAPPLS SDK */}
            <View
                style={{
                    paddingTop: 10,
                    paddingHorizontal: 20,
                    paddingBottom: 10,
                    backgroundColor: colors.backgroundPrimary,
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.strokeBorder,
                    elevation: 4,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    zIndex: 1,
                }}>
                <Text style={{ color: colors.accentPrimary, fontSize: 24, fontWeight: '700', letterSpacing: 1, lineHeight: 26 }}>
                    MAPPLS
                </Text>
                <Text style={{ color: colors.textPrimary, fontSize: 18, fontWeight: '600', marginTop: 0, lineHeight: 18 }}>
                    SDK
                </Text>
            </View>
            <FlatList
                data={menuItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={3}
                contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
            />
        </View>
    );
}