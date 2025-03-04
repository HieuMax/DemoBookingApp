import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapComponent from '@/app/MapComponent';

export default function Index() {
    return (
        <View style={styles.container}>
            <Text>Hello World!</Text>
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