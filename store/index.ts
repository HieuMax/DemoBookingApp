import {
  DriverStore,
  LocationStore,
  MarkerData,
  RouteStore,
} from "@/app/shared/Model/model";
import { create } from "zustand";

export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));

    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    if (selectedDriver) clearSelectedDriver();
  },

  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));

    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    if (selectedDriver) clearSelectedDriver();
  },
}));

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,
  setSelectedDriver: (driverId: number) =>
    set(() => ({ selectedDriver: driverId })),
  setDrivers: (drivers: MarkerData[]) => set({ drivers }),
  clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
}));

export const useRouteStore = create<RouteStore>((set) => ({
  useRoute: null,
  setRoute: (useRoute: { latitude: number; longitude: number }[]) =>
    set(() => ({ useRoute })),
  clearRoute: () => set(() => ({ route: null, useRoute: null })),
}));

export const useMarkerStore = create<{
  markerStore: MarkerData[];
  setMarkerStore: (markerStore: MarkerData[]) => void;
  clearMarkers: () => void;
}>((set) => ({
  markerStore: [],
  setMarkerStore: (markerStore: MarkerData[]) => set(() => ({ markerStore })),
  clearMarkers: () => set(() => ({ markerStore: [] })),
}));
