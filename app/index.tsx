import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapComponent from '@/app/MapComponent';
import 'react-native-get-random-values';
import '../global.css'

export default function Index() {
    return (
        <View style={styles.container}>
            <Text>Map Function</Text>
            <MapComponent />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fee2e2', // bg-red-50 trong Tailwind
    },
});