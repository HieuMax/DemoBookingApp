# Welcome to Demo Booking Car App 👋

This is an [Mobile](#) project - Topic 11 Group 9
## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🚀 [Get started](#get-started)
5. 🕸️ [Snippets (Code to Copy)](#snippets)

## <a name="introduction">🤖 Introduction</a>

Xây dựng một ứng dụng di động đặt xe phía người dùng (client) với các tính năng cơ bản đáp ứng được các yêu cầu về quy trình đặt xe của người dùng.

## <a name="tech-stack">⚙️ Tech Stack</a>

- React Native
- Expo
- Google Maps
- zustand
- Clerk
- Tailwind CSS

## <a name="features">🔋 Features</a>

👉 **Onboarding Flow**: Quy trình người dùng mới bắt đầu thiết lập đăng ký.

👉 **Email Password Authentication with Verification**: Đăng ký và đăng nhập bằng email được xác thực

👉 **Home Screen with Live Location & Google Map**: Định vị vị trí người dùng theo thời gian thực trên map.

👉 **Recent Rides**: Người dùng xem được các xe đang xung quanh người dùng.

👉 **Google Places Autocomplete**: Gợi ý tìm kiếm khi người dùng nhập vị trí cần tìm.

👉 **Find Rides**: Tìm kiếm xe khi người dùng đã nhập điểm đón và điểm đến.

👉 **Select Rides from Map**: Người dùng có thể chọn xe trực tiếp trên map.

👉 **Confirm Ride with Detailed Information**: Xem chi tiết xe được đặt và các thông tin liên quan.

👉 **Pay for Ride Using Crash**: Sử dụng tiền mặt để thanh toán cho chuyến đi.

👉 **History**: Xem được tất cả lịch sử đặt xe.

## <a name="get-started">🚀 Get started</a>

Dự án đã bản initial đã được cấu hình NativeWind (Tailwind React-Native), thư mục hình ảnh và các thư viện cần thiết

1. **Cloning the Repository**

    ```bash
    git clone https://github.com/HieuMax/DemoBookingApp.git
    cd DemoBookingApp
    ```

2. **Cài đặt**

   ```bash
    npm install
   ```

3. **Chạy dự án**

    ```bash
    npx expo start
    ```

## <a name="snippets">🕸️ Snippets</a>

Đây là phần code được cung cấp để thực hiện theo project

### Setup

<details>
<summary><code>tailwind.config.js</code></summary>

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                Jakarta: ["Jakarta", "sans-serif"],
                JakartaBold: ["Jakarta-Bold", "sans-serif"],
                JakartaExtraBold: ["Jakarta-ExtraBold", "sans-serif"],
                JakartaExtraLight: ["Jakarta-ExtraLight", "sans-serif"],
                JakartaLight: ["Jakarta-Light", "sans-serif"],
                JakartaMedium: ["Jakarta-Medium", "sans-serif"],
                JakartaSemiBold: ["Jakarta-SemiBold", "sans-serif"],
            },
            colors: {
                primary: {
                    100: "#F5F8FF",
                    200: "#EBF4FF",
                    300: "#C3D9FF",
                    400: "#9BBFFF",
                    500: "#0286FF",
                    600: "#6A85E6",
                    700: "#475A99",
                    800: "#364573",
                    900: "#242B4D",
                },
                secondary: {
                    100: "#F8F8F8",
                    200: "#F1F1F1",
                    300: "#D9D9D9",
                    400: "#C2C2C2",
                    500: "#AAAAAA",
                    600: "#999999",
                    700: "#666666",
                    800: "#4D4D4D",
                    900: "#333333",
                },
                success: {
                    100: "#F0FFF4",
                    200: "#C6F6D5",
                    300: "#9AE6B4",
                    400: "#68D391",
                    500: "#38A169",
                    600: "#2F855A",
                    700: "#276749",
                    800: "#22543D",
                    900: "#1C4532",
                },
                danger: {
                    100: "#FFF5F5",
                    200: "#FED7D7",
                    300: "#FEB2B2",
                    400: "#FC8181",
                    500: "#F56565",
                    600: "#E53E3E",
                    700: "#C53030",
                    800: "#9B2C2C",
                    900: "#742A2A",
                },
                warning: {
                    100: "#FFFBEB",
                    200: "#FEF3C7",
                    300: "#FDE68A",
                    400: "#FACC15",
                    500: "#EAB308",
                    600: "#CA8A04",
                    700: "#A16207",
                    800: "#854D0E",
                    900: "#713F12",
                },
                general: {
                    100: "#CED1DD",
                    200: "#858585",
                    300: "#EEEEEE",
                    400: "#0CC25F",
                    500: "#F6F8FA",
                    600: "#E6F3FF",
                    700: "#EBEBEB",
                    800: "#ADADAD",
                },
            },
        },
    },
    plugins: [],
};
```

</details>
<br />

<details>
<summary><code>types/type.d.ts</code></summary>

```ts
import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface Driver {
  driver_id: number;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
}

declare interface MarkerData {
  latitude: number;
  longitude: number;
  id: number;
  title: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
  first_name: string;
  last_name: string;
  time?: number;
  price?: string;
}

declare interface MapProps {
  destinationLatitude?: number;
  destinationLongitude?: number;
  onDriverTimesCalculated?: (driversWithTimes: MarkerData[]) => void;
  selectedDriver?: number | null;
  onMapReady?: () => void;
}

declare interface Ride {
  origin_address: string;
  destination_address: string;
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
  ride_time: number;
  fare_price: number;
  payment_status: string;
  driver_id: number;
  user_email: string;
  created_at: string;
  driver: {
    first_name: string;
    last_name: string;
    car_seats: number;
  };
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface GoogleInputProps {
  icon?: string;
  initialLocation?: string;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface PaymentProps {
  fullName: string;
  email: string;
  amount: string;
  driverId: number;
  rideTime: number;
}

declare interface LocationStore {
  userLatitude: number | null;
  userLongitude: number | null;
  userAddress: string | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  destinationAddress: string | null;
  routeMap?: Coordinate[] | null;
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  setRoutes: (
    routes: Coordinate[]
  ) => void;
}

declare interface DriverStore {
  drivers: MarkerData[];
  selectedDriver: number | null;
  setSelectedDriver: (driverId: number) => void;
  setDrivers: (drivers: MarkerData[]) => void;
  clearSelectedDriver: () => void;
}

declare interface DriverCardProps {
  item: MarkerData;
  selected: number;
  setSelected: () => void;
}

declare interface Coordinate {
  latitude: number;
  longitude: number;
}
```

</details>
<br />

<details>
<summary><code>types/image.d.ts</code></summary>

```ts
declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.jpg" {
  const value: any;
  export default value;
}

declare module "*.jpeg" {
  const value: any;
  export default value;
}

declare module "*.gif" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const value: any;
  export default value;
}
```

</details>
<br />

<details>
<summary><code>constants/index.ts</code></summary>

```ts
import arrowDown from "@/assets/icons/arrow-down.png";
import arrowUp from "@/assets/icons/arrow-up.png";
import backArrow from "@/assets/icons/back-arrow.png";
import chat from "@/assets/icons/chat.png";
import checkmark from "@/assets/icons/check.png";
import close from "@/assets/icons/close.png";
import dollar from "@/assets/icons/dollar.png";
import email from "@/assets/icons/email.png";
import eyecross from "@/assets/icons/eyecross.png";
import google from "@/assets/icons/google.png";
import home from "@/assets/icons/home.png";
import list from "@/assets/icons/list.png";
import lock from "@/assets/icons/lock.png";
import map from "@/assets/icons/map.png";
import marker from "@/assets/icons/marker.png";
import out from "@/assets/icons/out.png";
import person from "@/assets/icons/person.png";
import pin from "@/assets/icons/pin.png";
import point from "@/assets/icons/point.png";
import profile from "@/assets/icons/profile.png";
import search from "@/assets/icons/search.png";
import selectedMarker from "@/assets/icons/selected-marker.png";
import star from "@/assets/icons/star.png";
import target from "@/assets/icons/target.png";
import to from "@/assets/icons/to.png";
import check from "@/assets/images/check.png";
import getStarted from "@/assets/images/get-started.png";
import message from "@/assets/images/message.png";
import noResult from "@/assets/images/no-result.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import signUpCar from "@/assets/images/signup-car.png";

export const images = {
    onboarding1,
    onboarding2,
    onboarding3,
    getStarted,
    signUpCar,
    check,
    noResult,
    message,
};

export const icons = {
    arrowDown,
    arrowUp,
    backArrow,
    chat,
    checkmark,
    close,
    dollar,
    email,
    eyecross,
    google,
    home,
    list,
    lock,
    map,
    marker,
    out,
    person,
    pin,
    point,
    profile,
    search,
    selectedMarker,
    star,
    target,
    to,
};

export const onboarding = [
    {
        id: 1,
        title: "The perfect ride is just a tap away!",
        description:
            "Your journey begins with Ryde. Find your ideal ride effortlessly.",
        image: images.onboarding1,
    },
    {
        id: 2,
        title: "Best car in your hands with Ryde",
        description:
            "Discover the convenience of finding your perfect ride with Ryde",
        image: images.onboarding2,
    },
    {
        id: 3,
        title: "Your ride, your way. Let's go!",
        description:
            "Enter your destination, sit back, and let us take care of the rest.",
        image: images.onboarding3,
    },
];

export const data = {
    onboarding,
};
```

</details>

<br />
<details>
<summary><code>utils/datadummy.ts</code></summary>

```ts
export const drivers = [
    {
        "id": "1",
        "first_name": "James",
        "last_name": "Wilson",
        "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
        "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
        "car_seats": 4,
        "rating": "4.80"
    },
    {
        "id": "2",
        "first_name": "David",
        "last_name": "Brown",
        "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
        "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
        "car_seats": 5,
        "rating": "4.60"
    },
    {
        "id": "3",
        "first_name": "Michael",
        "last_name": "Johnson",
        "profile_image_url": "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
        "car_image_url": "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
        "car_seats": 4,
        "rating": "4.70"
    },
    {
        "id": "4",
        "first_name": "Robert",
        "last_name": "Green",
        "profile_image_url": "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/",
        "car_image_url": "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
        "car_seats": 4,
        "rating": "4.90"
    }
]
```

</details>
<br />

### Store

<details>
<summary><code>store/index.ts</code></summary>

```ts
import { create } from 'zustand';

import { DriverStore, LocationStore, MarkerData, Coordinate } from '@/types/type';

export const useLocationStore = create<LocationStore>((set) => ({
    userAddress:null,
    userLongitude: null,
    userLatitude: null,
    destinationLongitude: null,
    destinationLatitude: null,
    destinationAddress: null,
    routeMap: null,
    setUserLocation: ({ 
        latitude, longitude, address
    }: { 
        latitude: number, longitude: number, address: string 
    }) => {
        set(() => ({
            userLatitude: latitude,
            userLongitude: longitude,
            userAddress: address
        }))
    },
    setDestinationLocation: ({ 
        latitude, longitude, address
    }: { 
        latitude: number, longitude: number, address: string 
    }) => {
        console.log("index.ts: ",latitude, longitude, address)
        set(() => ({
            destinationLatitude: latitude,
            destinationLongitude: longitude,
            destinationAddress: address
        }))
    },
    setRoutes: (routes: Coordinate[]) => {
        set(() => ({
            routeMap: routes
        }))
    }
    
}))

export const useDriverStore = create<DriverStore>((set) => ({
    drivers: [] as MarkerData[],
    selectedDriver: null,
    setSelectedDriver: (driveId: number) => set(() => ({ selectedDriver: driveId })),
    setDrivers: (drivers: MarkerData[]) => set(() => ({ drivers: drivers })),
    clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
}))
```

</details>
<br />

### Library

<details>
<summary><code>lib/auth.ts</code></summary>

```ts
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { TokenCache } from "@clerk/clerk-expo/dist/cache";

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("secure store get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    saveToken: (key: string, token: string) => {
      return SecureStore.setItemAsync(key, token);
    },
  };
};

// SecureStore is not supported on the web
export const tokenCache =
  Platform.OS !== "web" ? createTokenCache() : undefined;
```

</details>
<br />

<details>
<summary><code>lib/map.ts</code></summary>

```ts
import { Driver, MarkerData } from "@/types/type";
import polyline from "@mapbox/polyline";

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

export const generateMarkersFromData = ({
                                            data,
                                            userLatitude,
                                            userLongitude,
                                        }: {
    data: Driver[];
    userLatitude: number;
    userLongitude: number;
}): MarkerData[] => {
    return data.map((driver) => {
        const latOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005
        const lngOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005

        return {
            latitude: userLatitude + latOffset,
            longitude: userLongitude + lngOffset,
            title: `${driver.first_name} ${driver.last_name}`,
            ...driver,
        };
    });
};

export const calculateRegion = ({
                                    userLatitude,
                                    userLongitude,
                                    destinationLatitude,
                                    destinationLongitude,
                                }: {
    userLatitude: number | null;
    userLongitude: number | null;
    destinationLatitude?: number | null;
    destinationLongitude?: number | null;
}) => {
    if (!userLatitude || !userLongitude) {
        return {
            latitude: 37.421425, // DH VL
            longitude: -122.094718, // DH VL
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
    }

    if (!destinationLatitude || !destinationLongitude) {
        return {
            latitude: userLatitude,
            longitude: userLongitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
    }

    const minLat = Math.min(userLatitude, destinationLatitude);
    const maxLat = Math.max(userLatitude, destinationLatitude);
    const minLng = Math.min(userLongitude, destinationLongitude);
    const maxLng = Math.max(userLongitude, destinationLongitude);

    const latitudeDelta = (maxLat - minLat) * 1.3; // Adding some padding
    const longitudeDelta = (maxLng - minLng) * 1.3; // Adding some padding

    const latitude = (userLatitude + destinationLatitude) / 2;
    const longitude = (userLongitude + destinationLongitude) / 2;

    return {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
    };
};

export const calculateDriverTimes = async ({
                                               markers,
                                               userLatitude,
                                               userLongitude,
                                               destinationLatitude,
                                               destinationLongitude,
                                           }: {
    markers: MarkerData[];
    userLatitude: number | null;
    userLongitude: number | null;
    destinationLatitude: number | null;
    destinationLongitude: number | null;
}) => {
    if (
        !userLatitude ||
        !userLongitude ||
        !destinationLatitude ||
        !destinationLongitude
    )
        return;


    const start = `${userLatitude},${userLongitude}`;
    const end = `${destinationLatitude},${destinationLongitude}`;

    const url = `https://graphhopper.com/api/1/route?point=${start}&point=${end}&vehicle=car&locale=en&key=${process.env.EXPO_PUBLIC_GRAPH_HOOKER_API_KEY}`;
    try {
        const response = await fetch(url);
        const data = (await response.json()) as GraphHopperResponse;
        if (!data.paths || data.paths.length === 0) {
            return null;
        }
        const path = data.paths[0];
        const distance = path.distance / 1000;
        const time = Math.round(parseFloat(path.time / 1000 / 60 + ""));
        const decodedPoints = polyline.decode(path.points, 5);
        const coordinates: Coordinate[] = decodedPoints.map(([lat, lng]) => ({ latitude: lat, longitude: lng }));

        const timesPromises = markers.map(async (marker) => {
            // const responseToUser = await fetch(
            //     `https://maps.googleapis.com/maps/api/directions/json?origin=${marker.latitude},${marker.longitude}&destination=${userLatitude},${userLongitude}&key=${directionsAPI}`,
            // );
            // const dataToUser = await responseToUser.json();
            // const timeToUser = dataToUser.routes[0].legs[0].duration.value; // Time in seconds

            // const responseToDestination = await fetch(
            //     `https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${directionsAPI}`,
            // );
            // const dataToDestination = await responseToDestination.json();
            // const timeToDestination =
            //     dataToDestination.routes[0].legs[0].duration.value; // Time in seconds

            // const totalTime = (timeToUser + timeToDestination) / 60; // Total time in minutes
            // const price = (totalTime * 0.5).toFixed(2); // Calculate price based on time

            return {...marker, time: time, distance};
        });

        return await Promise.all(timesPromises);
    } catch (error) {
        console.error('Error fetching route:', error);
    }

    // Calc price time 

    // try {
    //     const timesPromises = markers.map(async (marker) => {
    //         const responseToUser = await fetch(
    //             `https://maps.googleapis.com/maps/api/directions/json?origin=${marker.latitude},${marker.longitude}&destination=${userLatitude},${userLongitude}&key=${directionsAPI}`,
    //         );
    //         const dataToUser = await responseToUser.json();
    //         const timeToUser = dataToUser.routes[0].legs[0].duration.value; // Time in seconds

    //         const responseToDestination = await fetch(
    //             `https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${directionsAPI}`,
    //         );
    //         const dataToDestination = await responseToDestination.json();
    //         const timeToDestination =
    //             dataToDestination.routes[0].legs[0].duration.value; // Time in seconds

    //         const totalTime = (timeToUser + timeToDestination) / 60; // Total time in minutes
    //         const price = (totalTime * 0.5).toFixed(2); // Calculate price based on time

    //         return {...marker, time: totalTime, price};
    //     });

    //     return await Promise.all(timesPromises);
    // } catch (error) {
    //     console.error("Error calculating driver times:", error);
    // }
};

export const calculateCost = async ({
                                    startLat,
                                    startLog,
                                    endLat,
                                    endLog
                                }: {
    startLat: number | null;
    startLog: number | null;
    endLat: number | null;
    endLog: number | null;
}) => {
    if (
        !startLat ||
        !startLog ||
        !endLat ||
        !endLog
    )
        return;
    const start = `${startLat},${startLog}`;

    const end = `${endLat},${endLog}`;

    const url = `https://graphhopper.com/api/1/route?point=${start}&point=${end}&vehicle=car&locale=en&key=${process.env.EXPO_PUBLIC_GRAPH_HOOKER_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = (await response.json()) as GraphHopperResponse;
        if (!data.paths || data.paths.length === 0) {
            return null;
        }
        const path = data.paths[0];
        const distance = path.distance / 1000;
        const time = path.time / 1000 / 60;
        const decodedPoints = polyline.decode(path.points, 5);
        const coordinates: Coordinate[] = decodedPoints.map(([lat, lng]) => ({ latitude: lat, longitude: lng }));
        return {
            distance: distance,
            time: time,
            coordinates: coordinates,
        }
    } catch (error) {
        console.log(error)
        return
    }
}
```

</details>
<br />

<details>
<summary><code>lib/utils.ts</code></summary>

```ts
import { Ride } from "@/types/type";

export const sortRides = (rides: Ride[]): Ride[] => {
  const result = rides.sort((a, b) => {
    const dateA = new Date(`${a.created_at}T${a.ride_time}`);
    const dateB = new Date(`${b.created_at}T${b.ride_time}`);
    return dateB.getTime() - dateA.getTime();
  });

  return result.reverse();
};

export function formatTime(minutes: number): string {
  const formattedMinutes = +minutes?.toFixed(0) || 0;

  if (formattedMinutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(formattedMinutes / 60);
    const remainingMinutes = formattedMinutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day < 10 ? "0" + day : day} ${month} ${year}`;
}
```

</details>
<br />

### Components

<details>
<summary><code>components/CustomButton.tsx</code></summary>

```ts
import { Text, TouchableOpacity } from "react-native";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#0286ff]";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`${className} w-full rounded-full flex p-3 flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} `}
    {...props}
  >
    {IconLeft && <IconLeft />}
    <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
      {title}
    </Text>
    {IconRight && <IconRight />}
  </TouchableOpacity>
);

export default CustomButton;
```

</details>
<br />
<details>
<summary><code>components/DriverCard.tsx</code></summary>

```ts
import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";

import {icons} from "@/constants";
import {formatTime} from "@/lib/utils";
import {DriverCardProps} from "@/types/type";

const DriverCard = ({item, selected, setSelected}: DriverCardProps) => {
    return (
        <TouchableOpacity
            onPress={setSelected}
            className={`${
                selected === item.id ? "bg-general-600" : "bg-white"
            } flex flex-row items-center justify-between py-5 px-3 rounded-xl`}
        >
            <Image
                source={{uri: item.profile_image_url}}
                className="w-14 h-14 rounded-full"
            />

            <View className="flex-1 flex flex-col items-start justify-center mx-3">
                <View className="flex flex-row items-center justify-start mb-1">
                    <Text className="text-lg font-JakartaRegular">{item.title}</Text>

                    <View className="flex flex-row items-center space-x-1 ml-2">
                        <Image source={icons.star} className="w-3.5 h-3.5"/>
                        <Text className="text-sm font-JakartaRegular">4</Text>
                    </View>
                </View>

                <View className="flex flex-row items-center justify-start">
                    <View className="flex flex-row items-center">
                        <Image source={icons.dollar} className="w-4 h-4"/>
                        <Text className="text-sm font-JakartaRegular ml-1">
                            ${item.price}
                        </Text>
                    </View>

                    <Text className="text-sm font-JakartaRegular text-general-800 mx-1">
                        |
                    </Text>

                    <Text className="text-sm font-JakartaRegular text-general-800">
                        {formatTime(item.time!)}
                    </Text>

                    <Text className="text-sm font-JakartaRegular text-general-800 mx-1">
                        |
                    </Text>

                    <Text className="text-sm font-JakartaRegular text-general-800">
                        {item.car_seats} seats
                    </Text>
                </View>
            </View>

            <Image
                source={{uri: item.car_image_url}}
                className="h-14 w-14"
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
};

export default DriverCard;
```

</details>
<br />
<details>
<summary><code>components/GoogleTextInput.tsx</code></summary>

```ts
import { data, icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";
import { useState, useCallback } from "react";
import { StyleSheet, Image, View, Text, TextInput, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { debounce } from "lodash";
interface Coordinate {
    latitude: number;
    longitude: number;
}

const GoogleTextInput = ({
    icon,
    initialLocation,
    containerStyle,
    textInputBackgroundColor,
    handlePress
}: GoogleInputProps) => {
    
    const [startPoint, setStartPoint] = useState<Coordinate | null>(null);

    const [startQuery, setStartQuery] = useState('');
    const [startSuggestions, setStartSuggestions] = useState<any[]>([]);
    const [endSuggestions, setEndSuggestions] = useState<any[]>([]);

    // Hàm gọi LocationIQ Autocomplete API
    const fetchSuggestions = async (text: string, type: 'start' | 'end') => {
        if (text.length < 3) {
            type === 'start' ? setStartSuggestions([]) : setEndSuggestions([]);
            return;
        }
        
        const url = `https://api.locationiq.com/v1/autocomplete?key=${process.env.EXPO_PUBLIC_LOCATIONIQ_API_KEY}&q=${encodeURIComponent(text)}&limit=20`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (Array.isArray(data)) {
                type === 'start' ? setStartSuggestions(data) : setEndSuggestions(data);
            } else {
                console.log('Invalid response from LocationIQ:', data);
            }
        } catch (error) {
            console.log('Error fetching LocationIQ suggestions:', error);
        }
    };
    const debouncedSearch = useCallback(debounce((text: string, type: 'start' | 'end') => fetchSuggestions(text, type), 500), []);

    const handleChange = (text:any, type: 'start' | 'end') => {
        setStartQuery(text);
        debouncedSearch(text, type);
    }
    
    return(
        <View className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}>
            <View className='flex justify-center w-full px-3'>
                <Image 
                    source={icon ? icon : icons.search} 
                    style={styles.autocompleteContainer} 
                    className="ml-5 absolute w-6 h-6 z-50"
                    resizeMode="contain"
                />

                <TextInput
                    placeholder={initialLocation ? initialLocation : 'Bạn muốn đi đâu?'}
                    value={startQuery}
                    onChangeText={(text) => handleChange(text, 'start')}
                    style={styles.textInput}
                    className="relative z-0 pl-10 pr-10 text-xl"
                />
                <TouchableWithoutFeedback onPress={() => {
                    setStartQuery('');
                    setStartSuggestions([]);
                }} className="p-3 bg-blue-300">
                    <Image 
                        source={icons.close} 
                        style={styles.autocompleteContainer}
                        className="absolute h-6 w-6 right-0 mr-5" 
                        resizeMode="contain"
                    />
                </TouchableWithoutFeedback>

                <FlatList
                    className='z-50'
                    data={startSuggestions}
                    // keyExtractor={(item) => item.place_id || item.osm_id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setStartPoint({ latitude: parseFloat(item.lat), longitude: parseFloat(item.lon) });
                                setStartQuery(item.display_name);
                                setStartSuggestions([]);
                                handlePress({
                                    latitude: parseFloat(item.lat),
                                    longitude: parseFloat(item.lon),
                                    address: item.display_name,
                                })
                            }}
                        >
                            <Text style={styles.suggestionText}>{item.display_name}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.suggestionList}
                />
            </View>
        </View>
    )
}

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
        height: 70,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        zIndex: 100, // Đảm bảo ô nhập liệu nằm trên danh sách gợi ý
    },
    suggestionList: {
        maxHeight: 200,
        overflow: 'scroll',
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 5,
        zIndex: 1200, // Cao hơn cả hai ô nhập liệu để hiển thị rõ
        position: 'absolute',
        top: 70, // Đặt ngay dưới ô nhập liệu
        margin: 12,
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

export default GoogleTextInput;
```

</details>
<br />
<details>
<summary><code>components/InputField.tsx</code></summary>

```ts
import {
  KeyboardAvoidingView,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";
import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              className={`rounded-full p-4 font-JakartaSemiBold placeholder:text-gray-400 text-[15px] flex-1 ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
```

</details>
<br />

<details>
<summary><code>components/MapComponent.tsx</code></summary>

```ts
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from "react-native-maps";
import "../global.css";
import { useDriverStore, useLocationStore } from "@/store";
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from "@/lib/map";
import { drivers } from '../utils/datadummy';
import { icons } from "@/constants";
import { Coordinate, MarkerData } from "@/types/type";

const MapComponent: React.FC = () => {


  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
    routeMap
  } = useLocationStore();

  const region = calculateRegion({
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  });

  const { selectedDriver, setDrivers } = useDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [startPoint, setStartPoint] = useState<Coordinate | null>(null);
  const [endPoint, setEndPoint] = useState<Coordinate | null>(null);
  const [error, setError] = useState(null)
  useEffect(() => {
    if (Array.isArray(drivers)) {
      if (!userLatitude || !userLongitude) return;

      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });

      setMarkers(newMarkers);
    }
  }, [drivers]);

  useEffect(() => {
    if (markers.length > 0 && destinationLatitude && destinationLongitude) {
      calculateDriverTimes({
        markers,
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      }).then((drivers) => {
        setDrivers(drivers as MarkerData[]);
      });
    }
  }, [markers, destinationLatitude, destinationLongitude]);

  useEffect(() => {
    if (!userLatitude || !userLongitude) return
    const startPoint : Coordinate = {
      latitude: userLatitude,
      longitude: userLongitude
    }
    setStartPoint(startPoint)
  }, [userLatitude, userLongitude]);

  useEffect(() => {
    if (!destinationLatitude || !destinationLongitude) return
    const endPoint : Coordinate = {
      latitude: destinationLatitude,
      longitude: destinationLongitude
    }
    setEndPoint(endPoint)
  }, [destinationLatitude, destinationLongitude]);


  if (!userLatitude || !userLongitude) {
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }

  if (error) {
    <View className="flex justify-between items-center w-full">
      <Text>Error: {error}</Text>
    </View>
  }

  return (
    <View style={styles.container}>
      {/* Bản đồ */}
      <MapView
        provider={PROVIDER_DEFAULT}
        className="w-full h-full rounded-2xl"
        tintColor="black"
        showsPointsOfInterest={false}
        style={styles.map}
        key={routeMap ? routeMap.length : 0} // Thay đổi key để ép render
        // region={route && startPoint && endPoint ? "calculateRegion(route)" : {
        //     latitude: 10.7769,
        //     longitude: 106.7009,
        //     latitudeDelta: 2,
        //     longitudeDelta: 2,
        // }}
        initialRegion={region}
        // showsUserLocation={true}
        userInterfaceStyle="light"
      >
        {markers &&
          markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              image={
                selectedDriver === marker.id
                  ? icons.selectedMarker
                  : icons.marker
              }
            />
          ))}
        {startPoint && (
          <Marker coordinate={startPoint} title="Điểm bắt đầu" pinColor="red" />
        )}
        {endPoint && (
          <Marker
            coordinate={endPoint}
            title="Điểm kết thúc"
            pinColor="green"
          />
        )}
        {routeMap && (
          <Polyline
            coordinates={routeMap}
            strokeColor="#FF0000"
            strokeWidth={3}
            zIndex={2}
          />
        )}
      </MapView>

      {/* Thông tin quãng đường và thời gian */}
      {error && (
        <View style={styles.error}>
          <Text style={{ color: "red" }}>{error}</Text>
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
    width: "100%",
    height: "100%",
  },
  autocompleteContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1000, // Tăng zIndex để nằm trên bản đồ
  },
  autocompleteContainer_End: {
    position: "absolute",
    top: 60, // Khoảng cách đủ để không đè lên danh sách gợi ý của điểm bắt đầu
    left: 10,
    right: 10,
    zIndex: 900, // Thấp hơn điểm bắt đầu để tránh đè lên danh sách gợi ý
  },
  textInput: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    zIndex: 1100, // Đảm bảo ô nhập liệu nằm trên danh sách gợi ý
  },
  suggestionList: {
    maxHeight: 150,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 3,
    zIndex: 1200, // Cao hơn cả hai ô nhập liệu để hiển thị rõ
    position: "absolute",
    top: 50, // Đặt ngay dưới ô nhập liệu
    left: 0,
    right: 0,
  },
  suggestionText: {
    padding: 10,
    color: "#333",
  },
  info: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
  error: {
    position: "absolute",
    top: 110,
    left: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
});

export default MapComponent;
```

</details>
<br />

<details>
<summary><code>components/Payment.tsx</code></summary>

```ts
import {
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "./CustomButton";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import { ReactNativeModal } from "react-native-modal";
import { useState } from "react";

const paymentMethods = ["Cash"];

const Payment = ({ actionButton } : {actionButton: any}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const openPaymentSheet = () => {
    setShowPaymentMethod(true);
  };

  const handleConfrim = () => actionButton.handleConfirm();

  return (
    <View>
      <ReactNativeModal isVisible={showPaymentMethod}>
        <View className={"bg-white px-7 py-9 rounded-2xl min-h-[300px]"}>
          <Image
            source={icons.dollar}
            resizeMode={"contain"}
            className={"w-[70px] h-[70px] mx-auto my-5"}
          />
          <Text className={"text-3xl font-JakartaBold text-center"}>
            {" "}
            Payment method
          </Text>

          <FlatList
            className="z-50"
            data={paymentMethods}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionList}
          />

          <CustomButton
            title={"OK!"}
            onPress={() => {
              setShowPaymentMethod(false);
              setShowPaymentModal(true);
            }}
            className={"mt-5"}
          />
        </View>
      </ReactNativeModal>

      <ReactNativeModal isVisible={showPaymentModal}>
        <View className={"bg-white px-7 py-9 rounded-2xl min-h-[300px]"}>
          <Image
            source={images.check}
            className={"w-[110px] h-[110px] mx-auto my-5"}
          />
          <Text className={"text-3xl font-JakartaBold text-center"}>
            {" "}
            Book car successfully
          </Text>

          <CustomButton
            title={"Go track"}
            onPress={() => {
              setShowPaymentModal(false);
              handleConfrim()
              // router.push("/(root)/(tabs)/home");
            }}
            className={"mt-5"}
          />
          <CustomButton
            title={"OK!"}
            bgVariant={"outline"}
            textVariant="primary"
            onPress={() => {
              setShowPaymentModal(false);
              router.push("/(root)/(tabs)/home");
            }}
            className={"mt-5 shadow-neutral-100 shadow-sm"}
          />
        </View>
      </ReactNativeModal>

      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  suggestionList: {
    maxHeight: 200,
    overflow: "scroll",
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 5,
    zIndex: 1200,
    margin: 12,
    left: 0,
    right: 0,
  },
  suggestionText: {
    padding: 10,
    color: "#333",
  },
});

export default Payment;
```

</details>
<br />

<details>
<summary><code>components/RideCard.tsx</code></summary>

```ts
import { Image, Text, View } from "react-native";
import { Ride } from "@/types/type";
import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";

const RideCard = ({
  ride: {
    destination_longitude,
    destination_latitude,
    origin_address,
    destination_address,
    created_at,
    ride_time,
    driver,
    payment_status,
  },
}: {
  ride: Ride;
}) => (
  <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
    <View className="flex flex-col items-center justify-center p-3">
      <View className="flex flex-row items-center justify-between">
        <Image
          source={{
            uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
          }}
          className="w-[80px] h-[90px] rounded-lg"
        />

        <View className="flex flex-col mx-5 gap-y-5 flex-1">
          <View className="flex flex-row items-center gap-x-2">
            <Image source={icons.to} className="w-5 h-5" />
            <Text className="text-md font-JakartaMedium" numberOfLines={1}>
              {origin_address}
            </Text>
          </View>

          <View className="flex flex-row items-center gap-x-2">
            <Image source={icons.point} className="w-5 h-5" />
            <Text className="text-md font-JakartaMedium" numberOfLines={1}>
              {destination_address}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
        <View className="flex flex-row items-center w-full justify-between mb-5">
          <Text className="text-md font-JakartaMedium text-gray-500">
            Date & time
          </Text>
          <Text className="text-md font-JakartaMedium text-gray-500">
            {formatDate(created_at)}, {formatTime(ride_time)}
          </Text>
        </View>

        <View className="flex flex-row items-center w-full justify-between mb-5">
          <Text className="text-md font-JakartaMedium text-gray-500">
            Driver
          </Text>
          <Text className="text-md font-JakartaMedium text-gray-500">
            {driver.first_name} {driver.last_name}
          </Text>
        </View>

        <View className="flex flex-row items-center w-full justify-between mb-5">
          <Text className="text-md font-JakartaMedium text-gray-500">
            Car Seats
          </Text>
          <Text className="text-md font-JakartaMedium text-gray-500">
            {driver.car_seats}
          </Text>
        </View>

        <View className="flex flex-row items-center w-full justify-between mb-5">
          <Text className="text-md font-JakartaMedium text-gray-500">
            Payment Status
          </Text>
          <Text
            className={`text-md font-JakartaMedium text-gray-500 ${payment_status === "paid" ? "text-green-500" : "text-red-500"}`}
          >
            {payment_status}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

export default RideCard;
```

</details>
<br />

<details>
<summary><code>components/RideLayout.tsx</code></summary>

```ts
import { icons } from "@/constants";
import { router } from "expo-router";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapComponent from "./MapComponent";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef } from "react";

const RideLayout = ({ title, children, snapPoints } : {title: string, children: React.ReactNode, snapPoints?: string[]}) => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    return (
        <GestureHandlerRootView>
            <View className="flex-1 bg-white">
                <View className="flex flex-col h-screen bg-blue-500">
                    <View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
                        <TouchableOpacity onPress={() => router.back()}>
                            <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                                <Image source={icons.backArrow} resizeMode="contain" className="w-6 h-6" />
                            </View>
                        </TouchableOpacity>
                        <Text className="text-xl font-JakartaSemiBold ml-5">
                            {title || "Go Back"}
                        </Text>

                    </View>
                    <MapComponent />
                </View>

                <BottomSheet 
                    ref={bottomSheetRef} 
                    snapPoints={snapPoints || ['40%', '85%']} 
                    index={0}
                    // keyboardBehavior="extend"
                >
                    <BottomSheetView style={{ flex: 1, padding: 20}}>
                        {children}
                    </BottomSheetView>
                </BottomSheet>
            </View>
            {/* {children} */}
        </GestureHandlerRootView>
    );
}

export default RideLayout;
```

</details>
<br />

## App
<details>
<summary><code>app/+not-found.tsx</code></summary>

```ts
import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text type="title">This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text type="link">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
```

</details>
<br />

<details>
<summary><code>app/_layout.tsx</code></summary>

```ts
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { tokenCache } from "@/lib/auth";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
    );
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
```

</details>
<br />

<details>
<summary><code>app/index.tsx</code></summary>

```ts
import { Redirect } from "expo-router";

const Home = () => {
  return <Redirect href="/(auth)/welcome" />;
};

export default Home;
```

</details>
<br />

### (auth)
<details>
<summary><code>app/(auth)/_layout.tsx</code></summary>

```ts
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
```

</details>
<br />

<details>
<summary><code>app/(auth)/sign-in.tsx</code></summary>

```ts
import { Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useCallback, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

const SignI = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, form.email, form.password]);

  return (
    <ScrollView className={`flex-1 bg-white`}>
      <View className={"flex-1 bg-white"}>
        <View className={" relative w-full h-[250px]"}>
          <Image source={images.signUpCar} className={"z-0 w-full h-[250px]"} />
          <Text
            className={
              "text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5"
            }
          >
            Welcome 👋👋👋
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title={"Sign In"}
            onPress={onSignInPress}
            className={"mt-6"}
          />

          {/*    O-Auth*/}

          <Link
            href={"/sign-up"}
            className={"text-lg text-center text-general-200 mt-10"}
          >
            <Text>Don't have an account? </Text>
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>

        {/*    Verification Modal*/}
      </View>
    </ScrollView>
  );
};

export default SignI;
```

</details>
<br />

<details>
<summary><code>app/(auth)/sign-up.tsx</code></summary>

```ts
import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {

        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "success",
      });
    }
  };
  
  return (
    <ScrollView className={`flex-1 bg-white`}>
      <View className={"flex-1 bg-white"}>
        <View className={" relative w-full h-[250px]"}>
          <Image source={images.signUpCar} className={"z-0 w-full h-[250px]"} />
          <Text
            className={
              "text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5"
            }
          >
            Create Your Account
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title={"Sign Up"}
            onPress={onSignUpPress}
            className={"mt-6"}
          />

          {/*    O-Auth*/}

          <Link
            href={"/sign-in"}
            className={"text-lg text-center text-general-200 mt-10"}
          >
            <Text>Already have an account? </Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") setShowSuccessModal(true);
          }}
        >
          <View className={"bg-white px-7 py-9 rounded-2xl min-h-[300px]"}>
            <Text className={"text-2xl font-JakartaExtraBold mb-2"}>
              Verification
            </Text>

            <Text className={"font-Jakarta mb-5"}>
              We've sent a verification code to {form.email}
            </Text>

            <InputField
              label={"Code"}
              icon={icons.lock}
              placeholder={"12345"}
              value={verification.code}
              keyboardType={"numeric"}
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />

            {verification.error && (
              <Text className={"text-red-500 text-sm mt-1"}>
                {verification.error}
              </Text>
            )}

            <CustomButton
              title={"Verify Email"}
              onPress={onVerifyPress}
              className={"mt-5 bg-success-500"}
            />
          </View>
        </ReactNativeModal>

        {/*    Verification Modal*/}
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className={"bg-white px-7 py-9 rounded-2xl min-h-[300px]"}>
            <Image
              source={images.check}
              className={"w-[110px] h-[110px] mx-auto my-5"}
            />
            <Text className={"text-3xl font-JakartaBold text-center"}>
              Verified
            </Text>

            <Text
              className={
                "text-base text-gray-400 font-Jakarta text-center mt-2"
              }
            >
              You have successfully verified your account.
            </Text>

            <CustomButton
              title={"Browse Home"}
              onPress={() => {
                setShowSuccessModal(false);
                router.push("/(root)/(tabs)/home");
              }}
              className={"mt-5"}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
```

</details>
<br />

<details>
<summary><code>app/(auth)/welcome.tsx</code></summary>

```ts
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView
      className={"flex h-full items-center justify-between bg-white"}
    >
      <TouchableOpacity
        // onPress={() => {
          // router.replace("/(auth)/sign-up");
        // }}
        className={"w-full flex justify-end items-end p-5"}
      >
        <Text className={"text-black text-md font-JakartaBold"}>Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className={"w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full"} />
        }
        activeDot={
          <View className={"w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full"} />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View
            key={item.id}
            className={"flex items-center justify-center p-5"}
          >
            <Image
              source={item.image}
              className={"w-full h-[300px]"}
              resizeMode="contain"
            />
            <View
              className={
                "flex flex-row items-center justify-center w-full mt-10"
              }
            >
              <Text
                className={"text-black text-3xl font-bold mx-10 text-center"}
              >
                {item.title}
              </Text>
            </View>
            <Text
              className={
                "text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3"
              }
            >
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        className="w-11/12 mt-10"
        // onPress={() =>
        //   isLastSlide
        //     ? router.replace("/(auth)/sign-up")
        //     : swiperRef.current?.scrollBy(1)
        // }
      />
    </SafeAreaView>
  );
};

export default Onboarding;
```

</details>
<br />

### (root)
<details>
<summary><code>app/(root)/_layout.tsx</code></summary>

```ts
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      // <Stack.Screen name="find-ride" options={{ headerShown: false }} />
      // <Stack.Screen name="confirm-ride" options={{ headerShown: false }} />
      // <Stack.Screen name="book-ride" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
```

</details>
<br />

<details>
<summary><code>app/(root)/book-ride.tsx</code></summary>

```ts
import { Image, Text, View } from "react-native";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { useDriverStore, useLocationStore } from "@/store";
import Payment from "@/components/Payment";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { calculateCost } from "@/lib/map";

const BookRide = () => {
  const { userAddress, destinationAddress, userLatitude, userLongitude, setRoutes } = useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();
  const [ confirm, setConfirm ] = useState(false)

  const [distance, setDistance] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  
  const driverDetails = drivers?.filter(
    (driver) => +driver.id === selectedDriver,
  )[0];


  const actionButton = {
    handleConfirm: () => {
      setConfirm(true)

      const startLat : number | null = driverDetails.latitude
      const startLog : number | null = driverDetails.longitude 
      const endLat = userLatitude
      const endLog = userLongitude
      if (!startLat || !startLog || !endLat || !endLog) return
      calculateCost({
        startLat,
        startLog,
        endLat,
        endLog
      }).then((item) => {
        // console.log("From calc: ", item)

        if (item === undefined || !item) return
        setRoutes(item.coordinates);
        setDistance(item?.distance || null);
        setTime(Math.ceil(item.time) || null)
      })
    }
  }

  return (
    <RideLayout title="Book Ride">

      <View className={`${confirm ? "hidden" : ""}`}>
        <Text className="text-xl font-JakartaSemiBold mb-3">
          Ride Information
        </Text>

        <View className="flex flex-col w-full items-center justify-center mt-10">
          <Image
            source={{ uri: driverDetails?.profile_image_url }}
            className="w-28 h-28 rounded-full"
          />

          <View className="flex flex-row items-center justify-center mt-5 space-x-2">
            <Text className="text-lg font-JakartaSemiBold">
              {driverDetails?.title}
            </Text>

            <View className="flex flex-row items-center space-x-0.5">
              <Image
                source={icons.star}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-JakartaRegular">
                {driverDetails?.rating}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">
          <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
            <Text className="text-lg font-JakartaRegular">Ride Price</Text>
            <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
              ${driverDetails?.price || 25}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
            <Text className="text-lg font-JakartaRegular">Pickup Time</Text>
            <Text className="text-lg font-JakartaRegular">
              {formatTime(driverDetails?.time!) || 5!}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between w-full py-3">
            <Text className="text-lg font-JakartaRegular">Car Seats</Text>
            <Text className="text-lg font-JakartaRegular">
              {driverDetails?.car_seats}
            </Text>
          </View>
        </View>

        <View className="flex flex-col w-full items-start justify-center mt-5">
          <View className="flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3">
            <Image source={icons.to} className="w-6 h-6" />
            <Text className="text-lg font-JakartaRegular ml-2">
              {userAddress}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-start border-b border-general-700 w-full py-3">
            <Image source={icons.point} className="w-6 h-6" />
            <Text className="text-lg font-JakartaRegular ml-2">
              {destinationAddress}
            </Text>
          </View>
        </View>

        <Payment actionButton={actionButton}/>
      </View>

      <View className={`${!confirm ? "hidden" : ""}`}>
        <Text className="text-xl font-JakartaSemiBold mb-3 mr-3">Arriving in {" "}
            <Text className="text-[#0CC25F]"> 
              {time ?? " " + Math.ceil(parseFloat(time))} min
            </Text> 
          </Text>

        <View className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">
          <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">

            <View className="flex flex-col justify-center items-center">
              <Image
                source={{ uri: driverDetails?.profile_image_url }}
                className="w-28 h-28 rounded-full"
              />
              <Text className="text-lg font-JakartaSemiBold">
                {driverDetails?.title}
              </Text>
            </View>

            <Image
              source={{ uri: driverDetails?.car_image_url }}
              className="h-full w-full"
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="flex flex-col w-full items-start justify-center mt-5">
          <View className="flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3">
            <Image source={icons.to} className="w-6 h-6" />
            <Text className="text-lg font-JakartaRegular ml-2">
              {userAddress}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-start border-b border-general-700 w-full py-3">
            <Image source={icons.point} className="w-6 h-6" />
            <Text className="text-lg font-JakartaRegular ml-2">
              {destinationAddress}
            </Text>
          </View>

          <CustomButton 
            title="Back home" 
            onPress={() => router.push("/(root)/(tabs)/home")} 
            className="mt-5"
          />
        </View>
      </View>
    </RideLayout>
  );
};

export default BookRide;
```

</details>
<br />

<details>
<summary><code>app/(root)/confirm-ride.tsx</code></summary>

```ts
import RideLayout from "@/components/RideLayout";
import { View, FlatList } from "react-native";
import DriverCard from "@/components/DriverCard";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { useDriverStore } from "@/store";

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();
  return (
    <RideLayout title="Choose a Driver" snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(Number(item.id)!)}
            item={item}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push("/(root)/book-ride")}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
```

</details>
<br />

<details>
<summary><code>app/(root)/find-ride.tsx</code></summary>

```ts
import CustomButton from "@/components/CustomButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { router } from "expo-router";
import { View, Text } from "react-native";

const FindRide = () => {
    const { userAddress, destinationAddress, setDestinationLocation, setUserLocation } = useLocationStore()

    return(
        <RideLayout title="Ride" snapPoints={['85%']}>
            <View className="my-3 relative z-50">
                <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>
                <GoogleTextInput 
                    icon={icons.target} 
                    initialLocation={userAddress} 
                    containerStyle="bg-neutral-100" textInputBackgroundColor="#f5f5f5" 
                    handlePress={(location) => setUserLocation(location)}
                />
            </View>

            <View className="my-3 relative z-10">
                <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>
                <GoogleTextInput 
                    icon={icons.map} 
                    initialLocation={destinationAddress} 
                    containerStyle="bg-neutral-100"
                    textInputBackgroundColor="transparent" 
                    handlePress={(location) => setDestinationLocation(location)}
                />
            </View>

            <CustomButton 
                title="Book Now" 
                onPress={() => router.push("/(root)/confirm-ride")} 
                className="mt-5"
            />
        </RideLayout>
    )
}

export default FindRide;
```

</details>
<br />

#### (root)/(tabs)
<details>
<summary><code>app/(root)/(tabs)/_layout.tsx</code></summary>

```ts
import { Stack } from "expo-router";

const Layout = () => (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
);

export default Layout;
```

</details>
<br />

<details>
<summary><code>app/(root)/(tabs)/home.tsx</code></summary>

```ts
import { useAuth } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { FlatList, Text, View, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import GoogleTextInput from "@/components/GoogleTextInput";
import { useLocationStore } from "@/store";
import { useEffect, useState } from "react";
import MapComponent from "@/components/MapComponent";
import { router } from "expo-router";

const recentRids = [
  {
    ride_id: "1",
    origin_address: "Kathmandu, Nepal",
    destination_address: "Pokhara, Nepal",
    origin_latitude: "27.717245",
    origin_longitude: "85.323961",
    destination_latitude: "28.209583",
    destination_longitude: "83.985567",
    ride_time: 391,
    fare_price: "19500.00",
    payment_status: "paid",
    driver_id: 2,
    user_id: "1",
    created_at: "2024-08-12 05:19:20.620007",
    driver: {
      driver_id: "2",
      first_name: "David",
      last_name: "Brown",
      profile_image_url:
        "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      car_image_url:
        "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      car_seats: 5,
      rating: "4.60",
    },
  },
  {
    ride_id: "2",
    origin_address: "Jalkot, MH",
    destination_address: "Pune, Maharashtra, India",
    origin_latitude: "18.609116",
    origin_longitude: "77.165873",
    destination_latitude: "18.520430",
    destination_longitude: "73.856744",
    ride_time: 491,
    fare_price: "24500.00",
    payment_status: "paid",
    driver_id: 1,
    user_id: "1",
    created_at: "2024-08-12 06:12:17.683046",
    driver: {
      driver_id: "1",
      first_name: "James",
      last_name: "Wilson",
      profile_image_url:
        "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      car_image_url:
        "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      car_seats: 4,
      rating: "4.80",
    },
  },
  {
    ride_id: "3",
    origin_address: "Zagreb, Croatia",
    destination_address: "Rijeka, Croatia",
    origin_latitude: "45.815011",
    origin_longitude: "15.981919",
    destination_latitude: "45.327063",
    destination_longitude: "14.442176",
    ride_time: 124,
    fare_price: "6200.00",
    payment_status: "paid",
    driver_id: 1,
    user_id: "1",
    created_at: "2024-08-12 08:49:01.809053",
    driver: {
      driver_id: "1",
      first_name: "James",
      last_name: "Wilson",
      profile_image_url:
        "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      car_image_url:
        "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      car_seats: 4,
      rating: "4.80",
    },
  },
  {
    ride_id: "4",
    origin_address: "Okayama, Japan",
    destination_address: "Osaka, Japan",
    origin_latitude: "34.655531",
    origin_longitude: "133.919795",
    destination_latitude: "34.693725",
    destination_longitude: "135.502254",
    ride_time: 159,
    fare_price: "7900.00",
    payment_status: "paid",
    driver_id: 3,
    user_id: "1",
    created_at: "2024-08-12 18:43:54.297838",
    driver: {
      driver_id: "3",
      first_name: "Michael",
      last_name: "Johnson",
      profile_image_url:
        "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
      car_image_url:
        "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
      car_seats: 4,
      rating: "4.70",
    },
  },
];

export default function Page() {
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const { signOut } = useAuth();

  const loading = false;

  const [hasPermissions, setHasPermissions] = useState(false);

  const handleSignOut = () => {
    signOut();
    router.push("/(auth)/sign-in");
  }

  const handleDestinationPress = (location: {
    latitude: number,
    longitude: number,
    address: string
  }) => {

    setDestinationLocation(location);
    router.push("/(root)/find-ride");
  }

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if(status !== "granted") {
        setHasPermissions(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!
      });

      if (!address[0]) return

      setUserLocation({
        latitude: 37.421425,
        longitude: -122.094718,
        address: `${address[0].name}, ${address[0].region}`
      });
    }

    requestLocation();
  }, [])

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentRids?.slice(0, 5)}
        // data={[]}
        className="px-5s"
        renderItem={({ item }) => <RideCard ride={item} />}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No rencent ride found"
                  resizeMode="contain"
                />
                <Text className="text-sm">
                  No recent rides found
                </Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items-center justify-between my-5 mx-3">
              <Text className="text-2xl capitalize font-JakartaExtraBold">
                Welcome{", "} 
                👋
              </Text>
              <TouchableOpacity 
                onPress={handleSignOut} 
                className="justify-center items-center w-10 h-10 rounded-full bg-white" 
              >
                <Image source={icons.out} className="w-4 h-4"/>
              </TouchableOpacity>
            </View>

            {/* GoogleTextInput */}
            <GoogleTextInput 
              icon={icons.search}
              containerStyle="shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            /> 
            
            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3 mx-3">
                Your Current Location
              </Text>

              <View className="flex flex-row items-center bg-transparent h-[500px] mx-3">
                <MapComponent />
              </View>
            </>

            <Text className="text-xl font-JakartaBold mt-5 mb-3 mx-3">
              Recent Rides
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
}
```

</details>
<br />