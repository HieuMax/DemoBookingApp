import {
  calculateRegion,
  fetchRoute,
  generateMarkersFromData,
} from "@/lib/map";
import {
  useDriverStore,
  useLocationStore,
  useMarkerStore,
  useRouteStore,
} from "@/store";
import { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT, Polyline } from "react-native-maps";
import { MarkerData } from "../app/shared/Model/model";
import { data, icons } from "../constants";
import { ActivityIndicator, ImageURISource, Text, View } from "react-native";
import { useFetch } from "@/lib/fetch";
import { Driver } from "@/types/type";

const Map = () => {
  const { data: drivers, loading, error } = useFetch<Driver[]>("http://192.168.1.3:8081/(api)/driver");

  const {
    userLongitude,
    userLatitude,
    destinationLongitude,
    destinationLatitude,
  } = useLocationStore();

  const { selectedDriver, setDrivers } = useDriverStore();
  const { markerStore, setMarkerStore } = useMarkerStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const { useRoute, setRoute } = useRouteStore();
  const [useCorrectRoute, setCorrectRoute] = useState<any[]>([]);

  const region = calculateRegion({
    userLongitude,
    userLatitude,
    destinationLongitude,
    destinationLatitude,
  });
  // HÀM GENERATE MAKER
  useEffect(() => {
    if (Array.isArray(drivers)) {
      if (!userLatitude || !userLongitude) return;

      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });
      setMarkers(newMarkers);
      setMarkerStore(newMarkers);
      // setDrivers(drivers as MarkerData[]);
    }
  }, [drivers, userLatitude, userLongitude]);

  // useEffect(() => {
  //   if (
  //     markers.length > 0 &&
  //     destinationLatitude !== undefined &&
  //     destinationLongitude !== undefined
  //   ) {
  //     calculateDriverTimes({
  //       markers,
  //       userLatitude,
  //       userLongitude,
  //       destinationLatitude,
  //       destinationLongitude,
  //     }).then((drivers) => {
  //       setDrivers(drivers as MarkerData[]);
  //     });
  //   }
  // }, [markers, destinationLatitude, destinationLongitude]);

  // XỬ LÝ CORECT ROUTE
  useEffect(() => {
    if (useRoute && useRoute.length > 0) {
      const correctedRoute = useRoute.map((coord) => ({
        latitude: coord.longitude,
        longitude: coord.latitude,
      }));
      setCorrectRoute(correctedRoute);
    } else {
      setCorrectRoute([]);
    }
  }, [useRoute]);

  if (loading || (!userLatitude && !userLongitude))
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );

  if (error)
    return (
      <View className="flex justify-between items-center w-full">
        <Text>Error: {error}</Text>
      </View>
    );
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_DEFAULT}
        tintColor="#2F80ED"
        mapType="standard"
        showsPointsOfInterest={false}
        initialRegion={region}
        showsUserLocation={true}
        userInterfaceStyle="light">
        {markers.map((marker, index) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            image={
              selectedDriver === +marker.id
                ? (icons.selectedMarker as ImageURISource)
                : (icons.marker as ImageURISource)
            }
          />
        ))}

        {userLatitude !== undefined &&
          userLongitude !== undefined &&
          typeof userLatitude === "number" &&
          typeof userLongitude === "number" && (
            <Marker
              style={{ width: 60, height: 60 }}
              coordinate={{
                latitude: userLatitude,
                longitude: userLongitude,
              }}
              image={icons.pinStart as ImageURISource}
              title="Điểm bắt đầu"
            />
          )}

        {destinationLatitude !== undefined &&
          destinationLongitude !== undefined &&
          typeof destinationLatitude === "number" &&
          typeof destinationLongitude === "number" && (
            <Marker
              coordinate={{
                latitude: destinationLatitude,
                longitude: destinationLongitude,
              }}
              image={icons.pin as ImageURISource}
              title="Điểm kết thúc"
              pinColor="red"
            />
          )}

        {Array.isArray(useCorrectRoute) && useCorrectRoute.length > 0 && (
          <Polyline
            coordinates={useCorrectRoute}
            strokeColor="#0286FF"
            strokeWidth={2}
            zIndex={2}
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;
