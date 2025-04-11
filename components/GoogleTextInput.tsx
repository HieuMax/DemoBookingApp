import {
  FlatList,
  Image,
  ImageURISource,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-get-random-values";
import { useCallback, useState } from "react";
import { icons } from "../constants";
import debounce from "lodash/debounce";

const locationIQKey = "pk.f1084a6684c481007e9bf026446a342a";

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
  onChangeText,
}: {
  icon: any;
  initialLocation?: string;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: (location: any) => void;
  onChangeText?: (text: string) => void;
}) => {
  const [pointMap, setPointMap] = useState<any[]>([]);

  const fetchSuggestionsDebounced = useCallback(
    debounce(async (text: string) => {
      if (text.length < 3) {
        setPointMap([]);
        return;
      }

      const url = `https://api.locationiq.com/v1/autocomplete?key=${locationIQKey}&q=${encodeURIComponent(
        text
      )}&limit=5`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data)) {
          setPointMap(data);
        } else if (data?.error === "Rate Limited Second") {
          console.warn("Rate limit reached, please slow down typing");
          // Optionally keep previous results or clear them
          // setPointMap([]);
        } else {
          console.error("Invalid response from LocationIQ:", data);
        }
      } catch (error) {
        console.error("Error fetching LocationIQ suggestions:", error);
      }
    }, 500),
    []
  );

  const handleTextChange = (text: string) => {
    fetchSuggestionsDebounced(text);
    onChangeText?.(text);
  };
  return (
    <View>
      <View
        className={` w-full  flex flex-row items-center justify-center relative z-50 px-11 gap-3 
          rounded-[200px] bg-white z-10 mb-5 ${containerStyle}`}>
        <Image source={icon as ImageURISource} className="w-[24px] h-[24px] " />
        <TextInput
          placeholder="Where you want to go?"
          className="mt-1 w-full font-semibold z-1   text-[16px] rounded-[200px] py-3 "
          value={initialLocation}
          style={{
            textInputContainer: {
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              marginHorizontal: 20,
              position: "relative",
              shadowColor: "#d4d4d4",
              zIndex: 1,
            },
            textInput: {
              // backgroundColor: textInputBackgroundColor || "white",
              borderRadius: 200,
              fontSize: 16,
              fontWeight: 600,
              width: "100%",
              marginTop: 5,
            },
            listView: {
              backgroundColor: textInputBackgroundColor || "white",
              position: "relative",
              top: 0,
              width: "100%",
              borderRadius: 10,
              shadowColor: "#d4d4d4",
              zIndex: 99,
            },
          }}
          onChangeText={(text) => {
            if (onChangeText) {
              onChangeText(text);
            }
            handleTextChange(text);
          }}
        />
        <TouchableOpacity onPress={() => onChangeText && onChangeText("")}>
          <Image
            className="w-[18px] h-[18px] z-1"
            source={icons.close as ImageURISource}
          />
        </TouchableOpacity>

        <FlatList
          className="z-20"
          data={pointMap}
          keyExtractor={(item) => item.place_id || item.osm_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                handlePress({
                  latitude: parseFloat(item.lat),
                  longitude: parseFloat(item.lon),
                  address: item.display_name,
                });
                setPointMap([]);
              }}>
              <Text style={styles.suggestionText}>{item.display_name}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionList}
        />
      </View>
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
    zIndex: 200,
  },
  autocompleteContainer_End: {
    position: "absolute",
    top: 60,
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
    zIndex: 10,
  },
  suggestionList: {
    // maxHeight: 150,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 3,
    zIndex: 20,
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
  },
  suggestionText: {
    padding: 10,
    color: "#333",
    zIndex: 30,
  },
  info: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    zIndex: 30,
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

export default GoogleTextInput;
