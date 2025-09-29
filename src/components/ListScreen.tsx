import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParamList } from "../utils/navigationUtils";
import ArrowBackIcon from "../assets/ArrowBackIcon";
import colors from "../constants/colors";
import styles from "../constants/styles";


type ComponentItem = {
  title: string;
  subtitle: string;
  image: any;
  screen?: keyof RootStackParamList;
};

type CommonScreenParams = {
  title: string;
  data: ComponentItem[];
};

export default function ListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const { title, data } = route.params as CommonScreenParams;

  const renderItem = ({ item }: { item: ComponentItem }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if (item.screen) {
          navigation.navigate(item.screen);
        }
      }}
    >
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View >
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        backgroundColor: colors.backgroundPrimary, // ✅ use constant
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{title}</Text>
                </View>

            </View>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
}
