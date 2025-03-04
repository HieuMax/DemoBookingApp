import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, {Marker, Polyline, UrlTile} from 'react-native-maps';
import polyline from '@mapbox/polyline';

interface Coordinate {
    latitude: number;
    longitude: number;
}

interface GraphHopperResponse {
    paths?: {
        distance: number;
        time: number;
        points: string;
        points_encoded: boolean;
    }[];
    message?: string;
}

const MapComponent: React.FC = () => {
    const [route, setRoute] = useState<Coordinate[] | null>(null);
    const [distance, setDistance] = useState<number | null>(null);
    const [time, setTime] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const startPoint: Coordinate = { latitude: 10.762622, longitude: 106.660172 }; // TP. Hồ Chí Minh
    const endPoint: Coordinate = { latitude: 10.7769, longitude: 106.7009 }; // Phan Thiết

    // Hàm tính toán region dựa trên tọa độ tuyến đường
    const calculateRegion = (coordinates: Coordinate[]) => {
        const lats = coordinates.map(coord => coord.latitude);
        const lngs = coordinates.map(coord => coord.longitude);

        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLng = Math.min(...lngs);
        const maxLng = Math.max(...lngs);

        const latitude = (minLat + maxLat) / 2;
        const longitude = (minLng + maxLng) / 2;
        const latitudeDelta = (maxLat - minLat) * 1.2; // Thêm padding 20%
        const longitudeDelta = (maxLng - minLng) * 1.2; // Thêm padding 20%

        return { latitude, longitude, latitudeDelta, longitudeDelta };
    };

    useEffect(() => {
        const fetchRoute = async () => {
            const apiKey = 'a955bf95-b471-4fff-b75c-7c514589bb52'; // Thay bằng API Key của bạn
            // const start = '10.7769,106.7009'; // TP. Hồ Chí Minh
            // const end = '10.9289,108.1021'; // Phan Thiết
            const start = '10.762622,106.660172'; // Quận 7, TP.HCM
            const end = '10.7769,106.7009'; // Quận 1, TP.HCM


            const url = `https://graphhopper.com/api/1/route?point=${start}&point=${end}&vehicle=car&locale=en&key=${apiKey}`;

            try {
                const response = await fetch(url);
                const data = (await response.json()) as GraphHopperResponse;
                // console.log('GraphHopper response:', data); // Kiểm tra dữ liệu
                if (!data.paths || data.paths.length === 0) {
                    setError(data.message || 'No route found');
                    return;
                }

                const path = data.paths[0];
                setDistance(path.distance / 1000); // km
                setTime(path.time / 1000 / 60); // phút


                const decodedPoints = polyline.decode(path.points, 5); // Độ chính xác 5 (10^-5)
                const coordinates: Coordinate[] = decodedPoints.map(
                    ([lat, lng]) => ({
                        latitude: lat,
                        longitude: lng,
                    })
                );
                setRoute(coordinates);
            } catch (error) {
                console.error('Error fetching route:', error);
                setError('Failed to fetch route');
            }
        };

        fetchRoute();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                // provider={null}
                region={route ? calculateRegion(route) : {
                    latitude: 10.7769,
                    longitude: 106.7009,
                    latitudeDelta: 2,
                    longitudeDelta: 2,
                }}
            >
                {/* Marker cho điểm bắt đầu */}
                <Marker
                    coordinate={startPoint}
                    title="TP. Hồ Chí Minh"
                    description="Điểm bắt đầu"
                    pinColor="red" // Màu đỏ cho điểm bắt đầu
                />

                {/* Marker cho điểm kết thúc */}
                <Marker
                    coordinate={endPoint}
                    title="Phan Thiết"
                    description="Điểm kết thúc"
                    pinColor="green" // Màu xanh cho điểm kết thúc
                />
                <UrlTile
                    urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maximumZ={19}
                    zIndex={1}
                />
                {route && (
                    <Polyline
                        coordinates={route}
                        strokeColor="#FF0000"
                        strokeWidth={3}
                        zIndex={2}
                    />
                )}
            </MapView>
            {distance && time && (
                <View style={styles.info}>
                    <Text>Quãng đường: {distance.toFixed(2)} km</Text>
                    <Text>Thời gian: {time.toFixed(2)} phút</Text>
                </View>
            )}

            {error && (
                <View style={styles.error}>
                    <Text style={{ color: 'red' }}>{error}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    info: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    error: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
});

export default MapComponent;