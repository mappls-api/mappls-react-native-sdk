import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import colors from '../constants/colors';

export default function SplashScreen({ navigation }: any) {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Home');
        }, 2000);
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.logo}>
                    <Text style={{ color: '#00E7A8', fontWeight: 'bold' }}>MAPPLS</Text>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}> SDK</Text>
                </Text>

                <View style={styles.footerContainer}>
                    <Image
                        source={require('../assets/MapmyIndia.png')}
                        style={styles.footerImage}
                        resizeMode="stretch"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundPrimary,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 32,
        color: 'white',
    },
    footerContainer: {
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
    },
    footerImage: {
        width: 130,
        height: 20,
    },
});
