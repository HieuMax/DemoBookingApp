import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ImageURISource,
} from "react-native";
import RideCard from "../../../components/RideCard";
import Map from "../../../components/Map";
import { useLocationStore } from "@/store";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { icons } from "../../../constants";
import { router } from "expo-router";
import GoogleTextInput from "../../../components/GoogleTextInput";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";

const HomePage = () => {
  const { setUserLocation, setDestinationLocation } = useLocationStore();

  const user = { name: "Hieu", id: "1" };
  // const loading = true;

  const {
    data: recentRides,
    loading,
    error,
  } = useFetch<Ride[]>(`http://192.168.1.3:8081/(api)/ride/${user?.id}`);
  const [hasPermissions, setHasPermissions] = useState(false);

  const handleSignOut = () => {};

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/find-ride");
  };

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setHasPermissions(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync();

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
        address: `${address[0]?.name},${address[0]?.region}`,
      });
    };
    requestLocation();
  }, []);

  return (
    <View>
      <SafeAreaView className="bg-general-500">
        <FlatList
          data={recentRides?.slice(0, 5)}
          renderItem={({ item }) => <RideCard ride={item} />}
          className="px-5"
          keyboardShouldPersistTaps={"handled"}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          ListEmptyComponent={() => (
            <View className="flex flex-col items-center justify-center">
              {!loading ? (
                <>
                  {/* <Image
                    source={images.noResult as ImageURISource}
                    className="w-40 h-40"
                    alt="No Result recent rides found"
                    resizeMode="contain"
                  /> */}
                  <Text className="text-sm">No recent rides found</Text>
                </>
              ) : (
                <ActivityIndicator size="large" color="#000" />
              )}
            </View>
          )}
          ListHeaderComponent={() => (
            <>
              <View className="flex flex-row items-center justify-between my-5">
                <Text className="text-2xl capitalize font-JakartaExtraBold ">
                  Welcome, Hieu
                </Text>
                <TouchableOpacity
                  onPress={handleSignOut}
                  className="justify-center items-center w-10 h-10 rounded-full bg-white">
                  <Image
                    source={icons.out as ImageURISource}
                    className="w-4 h-4"
                  />
                </TouchableOpacity>
              </View>
              <GoogleTextInput
                icon={icons.search}
                containerStyle="bg-white shadow-md shadow-neutral-300"
                handlePress={handleDestinationPress}
              />

              <>
                <Text className="text-xl font-jakartaBold mt-5 mb-3">
                  Your Current Location
                </Text>
                <View className="flex flex-row items-center bg-transparent h-[300px]">
                  <Map></Map>
                </View>
              </>

              <Text className="text-xl font-jakartaBold mt-5 mb-3">
                Recent Rides
              </Text>
            </>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default HomePage;
