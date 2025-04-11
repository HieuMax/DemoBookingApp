// import {Driver, MarkerData} from "@/types/type";

import { Coordinate, Driver, MarkerData } from "@/app/shared/Model/model";
import polyline from "@mapbox/polyline";

// const EXPO_PUBLIC_GEOAPIFY_API_KEY = "ad8ad287c95c4db9afd6a4332652a04e";
const apiKey = "b648d1c0-4b50-41ac-9d52-4bcf36856c5a";

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
    const latOffset = (Math.random() - 0.5) * 0.01;
    const lngOffset = (Math.random() - 0.5) * 0.01;

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
      latitude: 37.78825,
      longitude: -122.4324,
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

export const fetchRoute = async ({
  markers,
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  markers: MarkerData[];
  userLatitude: number;
  userLongitude: number;
  destinationLatitude: number;
  destinationLongitude: number;
}) => {
  if (
    !userLatitude ||
    !userLongitude ||
    !destinationLatitude ||
    !destinationLongitude
  )
    return;

  try {
    let routeCoordinates: Coordinate[] | undefined = undefined;
    const timesPromises = markers.map(async (marker) => {
      const responseToUser = await fetch(
        `https://graphhopper.com/api/1/route?point=${marker.latitude},${marker.longitude}&point=${userLatitude},${userLongitude}&vehicle=car&locale=en&key=${apiKey}`
      );


      const dataUser = (await responseToUser.json()) as GraphHopperResponse;
      const responseToDestionation = await fetch(
        `https://graphhopper.com/api/1/route?point=${userLatitude},${userLongitude},&point=${destinationLatitude},${destinationLongitude}&vehicle=car&locale=en&points_encoded=false&key=${apiKey}`
      );

      const dataDestination =
        (await responseToDestionation.json()) as GraphHopperResponse;

      if (dataDestination.paths && dataDestination.paths.length > 0) {
        const toDestination = dataDestination.paths[0];
        const decodedPoints =
          toDestination.points.coordinates ||
          polyline.decode(toDestination.points);
        routeCoordinates = decodedPoints.map(([lat, lng]) => ({
          latitude: lat,
          longitude: lng,
        }));
      } else {
        console.log("No paths found in GraphHopper response:", dataDestination);
      }
      if (
        dataUser.paths &&
        dataUser.paths.length > 0 &&
        dataDestination.paths &&
        dataDestination.paths.length > 0
      ) {
        const toUser = dataUser.paths[0];
        const toDestination = dataDestination.paths[0];

        const totalTime = (toUser.time + toDestination.time) / 1000 / 60;
        const price = (totalTime * 0.5).toFixed(2);

        return {
          ...marker,
          time: totalTime,
          price,
        };
      }
    });

    const drivers = await Promise.all(timesPromises);


    return { drivers, routeCoordinates };
  } catch (error) {
    console.error("Error fetching route:", error);
  }
};

// const testFetchRoute = async () => {
//   console.log("Starting fetchRoute test...");

//   // Mock data for the test
//   const userLatitude = 37.78825;
//   const userLongitude = -122.4324;
//   const destinationLatitude = 37.78835;
//   const destinationLongitude = -122.4325;

//   const markers: MarkerData[] = [
//     {
//       car_image_url:
//         "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
//       car_seats: 4,
//       first_name: "James",
//       id: 1,
//       last_name: "Wilson",
//       latitude: 10.891107178479396,
//       longitude: 106.77978081586392,
//       profile_image_url:
//         "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
//       rating: "4.80",
//       title: "James Wilson",
//     },
//     {
//       car_image_url:
//         "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
//       car_seats: 5,
//       first_name: "David",
//       id: 2,
//       last_name: "Brown",
//       latitude: 10.892068377812853,
//       longitude: 106.78265815260896,
//       profile_image_url:
//         "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
//       rating: "4.60",
//       title: "David Brown",
//     },
//     {
//       car_image_url:
//         "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
//       car_seats: 4,
//       first_name: "Michael",
//       id: 3,
//       last_name: "Johnson",
//       latitude: 10.898159147114317,
//       longitude: 106.7807910370306,
//       profile_image_url:
//         "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
//       rating: "4.70",
//       title: "Michael Johnson",
//     },
//     {
//       car_image_url:
//         "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
//       car_seats: 4,
//       first_name: "Robert",
//       id: 4,
//       last_name: "Green",
//       latitude: 10.893270534582665,
//       longitude: 106.78702990339113,
//       profile_image_url:
//         "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/",
//       rating: "4.90",
//       title: "Robert Green",
//     },
//   ];

//   try {
//     // Call fetchRoute with the mock data
//     const result = await fetchRoute({
//       markers,
//       userLatitude,
//       userLongitude,
//       destinationLatitude,
//       destinationLongitude,
//     });

//     // Log the results
//     console.log("fetchRoute result:", result);

//     if (result) {
//       console.log("Drivers:", result);
//       // console.log("Route Coordinates:", result.routeCoordinates);
//     } else {
//       console.log("fetchRoute returned undefined");
//     }
//   } catch (error) {
//     console.error("Test failed with error:", error);
//   }
// };

// // Run the test
// testFetchRoute();
