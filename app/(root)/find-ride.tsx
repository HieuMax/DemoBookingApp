import {
  useDriverStore,
  useLocationStore,
  useMarkerStore,
  useRouteStore,
} from "@/store";
import { Text, View } from "react-native";
import RideLayout from "../../components/RideLayout";
import GoogleTextInput from "../../components/GoogleTextInput";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButtom";
import { fetchRoute } from "@/lib/map";
import { MarkerData } from "../shared/Model/model";
import { router } from "expo-router";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
    destinationLatitude,
    destinationLongitude,
    userLatitude,
    userLongitude,
  } = useLocationStore();

  const { drivers, setDrivers } = useDriverStore();
  const { markerStore } = useMarkerStore();
  const { setRoute } = useRouteStore();
  // HÀM GỌI API CHO DRIVER + SET ROUTE
  const handleFindNow = async () => {
    if (
      destinationLatitude !== undefined &&
      destinationLongitude !== undefined &&
      userLatitude !== undefined &&
      userLongitude !== undefined
    ) {
      try {
        const result = await fetchRoute({
          markers: markerStore,
          userLatitude,
          userLongitude,
          destinationLatitude,
          destinationLongitude,
        });
        
        if (result && result.drivers) {
          setDrivers(result.drivers as MarkerData[]);
          if (result.routeCoordinates) {
            setRoute(result.routeCoordinates);
          } else {
            setRoute([]);
          }
          router.push(`/(root)/confirm-ride`);
        } else {
          console.error("No drivers with routes returned");
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    } else {
      console.error("Missing required coordinates for route fetching");
    }
  };

  return (
    <RideLayout title="Ride">
      <View className="my-3">
        <Text className="text-lg font-JakartaSmeBold mb-3">From</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress ?? undefined}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => {
            setUserLocation(location);
          }}
          onChangeText={(text) =>
            setUserLocation({ latitude: 0, longitude: 0, address: text })
          }
        />
      </View>
      <View className="my-3">
        <Text className="text-lg font-JakartaSmeBold mb-3">To</Text>
        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress ?? undefined}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="transparent"
          handlePress={(location) => {
            setDestinationLocation(location);
          }}
          onChangeText={(text) =>
            setDestinationLocation({ latitude: 0, longitude: 0, address: text })
          }
        />
      </View>

      <CustomButton
        title="Find now"
        textVariant="text-white"
        bgVariant="bg-[#0286FF]"
        onPress={handleFindNow}
        className="mt-5"
        Iconleft={undefined}
        IconRight={undefined}
      />
    </RideLayout>
  );
};

export default FindRide;
