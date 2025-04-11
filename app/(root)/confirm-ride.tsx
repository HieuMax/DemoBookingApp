import { FlatList, Text, View } from "react-native";
import RideLayout from "../../components/RideLayout";
import DriverCard from "../../components/DriverCard";
import CustomButton from "../../components/CustomButtom";
import { router } from "expo-router";
import { useDriverStore, useRouteStore } from "@/store";

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();
  return (
    <RideLayout title={"Choose a Rider"} snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            selected={selectedDriver ?? 0}
            item={item}
            setSelected={() => setSelectedDriver(Number(item.id)!)}
            // setSelected={() => handleSelectedDriver(item)}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Ride "
              onPress={() => {
                router.push("/(root)/book-ride");
              }}
              className={undefined}
              Iconleft={undefined}
              IconRight={undefined}></CustomButton>
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
