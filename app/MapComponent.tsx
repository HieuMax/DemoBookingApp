import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import polyline from '@mapbox/polyline';
import '../global.css'

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
    const [startPoint, setStartPoint] = useState<Coordinate | null>(null);
    const [endPoint, setEndPoint] = useState<Coordinate | null>(null);

    const [startQuery, setStartQuery] = useState('');
    const [endQuery, setEndQuery] = useState('');
    const [startSuggestions, setStartSuggestions] = useState<any[]>([]);
    const [endSuggestions, setEndSuggestions] = useState<any[]>([]);

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

    const apiKey = 'a955bf95-b471-4fff-b75c-7c514589bb52'; // Thay bằng API Key của bạn
    const locationIQKey='pk.8074ca6974320bb40016a230e6867f33'

    // Hàm gọi LocationIQ Autocomplete API
    const fetchSuggestions = async (text: string, type: 'start' | 'end') => {
        if (text.length < 3) {
            type === 'start' ? setStartSuggestions([]) : setEndSuggestions([]);
            return;
        }
        const url = `https://api.locationiq.com/v1/autocomplete?key=${locationIQKey}&q=${encodeURIComponent(text)}&limit=5`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (Array.isArray(data)) {
                type === 'start' ? setStartSuggestions(data) : setEndSuggestions(data);
            } else {
                console.error('Invalid response from LocationIQ:', data);
            }
        } catch (error) {
            console.error('Error fetching LocationIQ suggestions:', error);
        }
    };

    // Hàm gọi GraphHopper API
    const fetchRoute = async () => {
        if (!startPoint || !endPoint) {
            setError('Vui lòng chọn cả điểm bắt đầu và điểm kết thúc');
            return;
        }
        const start = `${startPoint.latitude},${startPoint.longitude}`;
        const end = `${endPoint.latitude},${endPoint.longitude}`;
        const url = `https://graphhopper.com/api/1/route?point=${start}&point=${end}&vehicle=car&locale=en&key=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = (await response.json()) as GraphHopperResponse;
            if (!data.paths || data.paths.length === 0) {
                setError(data.message || 'No route found');
                setRoute(null);
                setDistance(null);
                setTime(null);
                return;
            }
            const path = data.paths[0];
            setDistance(path.distance / 1000);
            setTime(path.time / 1000 / 60);
            const decodedPoints = polyline.decode(path.points, 5);
            const coordinates: Coordinate[] = decodedPoints.map(([lat, lng]) => ({ latitude: lat, longitude: lng }));
            setRoute(coordinates);
        } catch (error) {
            console.error('Error fetching route:', error);
            setError('Failed to fetch route');
        }
    };

    // Debug state thay đổi
    // useEffect(() => {
    //     console.log('startPoint:', startPoint);
    //     console.log('endPoint:', endPoint);
    // }, [startPoint, endPoint]);

    useEffect(() => {
        if (startPoint && endPoint) {
            fetchRoute();
        }
    }, [startPoint, endPoint]);

    return (
        <View style={styles.container}>
            <View className='z-50' style={styles.autocompleteContainer}>
                <TextInput
                    placeholder="Nhập điểm bắt đầu"
                    value={startQuery}
                    onChangeText={(text) => {
                        setStartQuery(text);
                        fetchSuggestions(text, 'start');
                    }}
                    style={styles.textInput}
                />
                <FlatList
                    className='z-50'
                    data={startSuggestions}
                    keyExtractor={(item) => item.place_id || item.osm_id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setStartPoint({ latitude: parseFloat(item.lat), longitude: parseFloat(item.lon) });
                                setStartQuery(item.display_name);
                                setStartSuggestions([]);
                            }}
                        >
                            <Text style={styles.suggestionText}>{item.display_name}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.suggestionList}
                />
            </View>

            {/* Ô nhập liệu điểm kết thúc */}
            <View className='z-10' style={styles.autocompleteContainer_End}>
                <TextInput
                    placeholder="Nhập điểm kết thúc"
                    value={endQuery}
                    onChangeText={(text) => {
                        setEndQuery(text);
                        fetchSuggestions(text, 'end');
                    }}
                    style={styles.textInput}
                />
                <FlatList
                    data={endSuggestions}
                    keyExtractor={(item) => item.place_id || item.osm_id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setEndPoint({ latitude: parseFloat(item.lat), longitude: parseFloat(item.lon) });
                                setEndQuery(item.display_name);
                                setEndSuggestions([]);
                            }}
                        >
                            <Text style={styles.suggestionText}>{item.display_name}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.suggestionList}
                />
            </View>

            {/* Bản đồ */}
            <MapView
                style={styles.map}
                key={route ? route.length : 0} // Thay đổi key để ép render
                region={route && startPoint && endPoint ? calculateRegion(route) : {
                    latitude: 10.7769,
                    longitude: 106.7009,
                    latitudeDelta: 2,
                    longitudeDelta: 2,
                }}
            >
                {startPoint && <Marker coordinate={startPoint} title="Điểm bắt đầu" pinColor="red" />}
                {endPoint && <Marker coordinate={endPoint} title="Điểm kết thúc" pinColor="green" />}
                {route && <Polyline coordinates={route} strokeColor="#FF0000" strokeWidth={3} zIndex={2} />}
            </MapView>

            {/* Thông tin quãng đường và thời gian */}
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
    autocompleteContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        zIndex: 1000, // Tăng zIndex để nằm trên bản đồ
    },
    autocompleteContainer_End: {
        position: 'absolute',
        top: 60, // Khoảng cách đủ để không đè lên danh sách gợi ý của điểm bắt đầu
        left: 10,
        right: 10,
        zIndex: 900, // Thấp hơn điểm bắt đầu để tránh đè lên danh sách gợi ý
    },
    textInput: {
        height: 40,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        zIndex: 1100, // Đảm bảo ô nhập liệu nằm trên danh sách gợi ý
    },
    suggestionList: {
        maxHeight: 150,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 3,
        zIndex: 1200, // Cao hơn cả hai ô nhập liệu để hiển thị rõ
        position: 'absolute',
        top: 50, // Đặt ngay dưới ô nhập liệu
        left: 0,
        right: 0,
    },
    suggestionText: {
        padding: 10,
        color: '#333',
    },
    info: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        zIndex: 1000,
    },
    error: {
        position: 'absolute',
        top: 110,
        left: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        zIndex: 1000,
    },
});

export default MapComponent;