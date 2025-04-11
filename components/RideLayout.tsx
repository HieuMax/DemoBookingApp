import {
  Image,
  ImageURISource,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { icons } from "../constants";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Map from "./Map";
import { useRef } from "react";
import { router, useSegments } from "expo-router";
import { useRouteStore } from "@/store";

const RideLayout = ({
  title,
  snapPoints,
  children,
}: {
  title: string;
  children: React.ReactNode;
  snapPoints?: string[];
}) => {
  const bottomSheefRef = useRef<BottomSheet>(null);
  const segments: string[] = useSegments();
  const { setRoute } = useRouteStore();

  const handleBackPress = () => {
    if (segments.includes("confirm-ride")) {
      setRoute([]);
    }
    router.back();
  };

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="flex flex-col h-screen bg-blue-500">
          <View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
            <TouchableOpacity onPress={handleBackPress}>
              <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                <Image
                  source={icons.backArrow as ImageURISource}
                  resizeMode="contain"
                  className="w-6 h-6"></Image>
              </View>
            </TouchableOpacity>
            <Text className="text-xl font-JakartaSemiBold ml-5">
              {title || "Go Back"}
            </Text>
          </View>

          <Map />
        </View>

        <BottomSheet
          ref={bottomSheefRef}
          snapPoints={snapPoints || ["50%", "85%"]}
          index={0}>
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};
export default RideLayout;
