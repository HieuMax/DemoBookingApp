import { Image, Text, View } from "react-native";
import { formatDate, formatTime } from "@/lib/util";

const EXPO_PUBLIC_GEOAPIFY_API_KEY = "ad8ad287c95c4db9afd6a4332652a04e";
const RideCard = ({
  ride: {
    destination_longitude,
    destination_latitude,
    origin_address,
    destination_address,
    ride_time,
    driver,
    payment_status,
    created_at,
  },
}) => {
  return (
    <View className="flex  flex-row items-center  bg-white rounded-log shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-col items-center justify-center p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />
          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row items-center gap-x-2">
              {/*<Image source={icon.to} className="w-5 h-5"/>*/}
              <Text numberOfLines={1} className="text-md font-JakartaMedium">
                {origin_address}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-x-2">
              {/*<Image source={icon.point} className="w-5 h-5"/>*/}
              <Text numberOfLines={1} className="text-md font-JakartaMedium">
                {destination_address}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
          <View className="flex flex-row items-center justify-between w-full  mb-5 ">
            <Text className="text-md font-JakartaMeidum text-gray-500">
              Date & Time
            </Text>
            <Text className="text-md font-JakartaMeidum text-gray-500">
              {formatDate(created_at)},{formatTime(ride_time)}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full gap-10 mb-5 ">
            <Text className="text-md font-JakartaMeidum text-gray-500">
              Driver
            </Text>
            <Text className="text-md font-JakartaMeidum text-gray-500">
              {driver.first_name} {driver.last_name}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full gap-10 mb-5 ">
            <Text className="text-md font-JakartaMeidum text-gray-500">
              Car
            </Text>
            <Text className="text-md font-JakartaMeidum text-gray-500">
              {driver.car_seats}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full gap-10 mb-5 ">
            <Text className="text-md font-JakartaMeidum text-gray-500">
              Payment Status
            </Text>
            <Text
              className={`text-md capitalize font-font-JakartaMeidum text-gray-500 ${
                payment_status === "paid" ? "text-green-700" : "text-red-700"
              }`}>
              {payment_status}
            </Text>
          </View>
        </View>
      </View>
      {/*<Text className="text-3xl">{driver.first_name}</Text>*/}
    </View>
  );
};

export default RideCard;
