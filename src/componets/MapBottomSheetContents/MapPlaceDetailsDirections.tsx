import { getPopBusColor } from "@/utils/helper/main-functions";
import {
  TouchableOpacity,
  View,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { StyledTextBold } from "../StyledTextBold";
import { StyledText } from "../StyledText";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import { Collapsible } from "react-native-fast-collapsible";
import { Easing } from "react-native-reanimated";
import ImageModal from "react-native-image-modal";

interface IMapPlaceDetailsDirectionsProps {
  directions?: {
    cu_pop_bus: number[];
  };
}

export default function MapPlaceDetailsDirections(
  props: IMapPlaceDetailsDirectionsProps,
) {
  const [isVisible, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility((previous) => !previous);
  };
  const { width: screenWidth } = useWindowDimensions();
  const theme = useColorScheme();
  return (
    <View className="my-4">
      <View className="mx-8 mb-1 flex-row items-center space-x-4">
        <FontAwesome6
          name="bus"
          size={36}
          color={theme === "dark" ? "#FFAC9F" : "#135841"}
        />
        <StyledTextBold className="text-lg text-sy-green-400 dark:text-sy-pink-100">
          CU POP BUS
        </StyledTextBold>
      </View>
      <View className="flex-row flex-wrap mx-6">
        {props.directions?.cu_pop_bus.map((busNumber) => (
          <View
            key={busNumber}
            className="py-2 px-5 my-2 mr-2 self-start rounded-2xl shadow-sm"
            style={{ backgroundColor: getPopBusColor(busNumber) }}
          >
            <StyledTextBold key={busNumber} className="text-lg text-sy-white">
              สาย {busNumber === 6 ? "Syringe" : busNumber}
            </StyledTextBold>
          </View>
        ))}
      </View>
      <View className="border-b-2 w-full h-0 my-2 border-sy-gray-150 dark:border-sy-gray-250" />
      <Collapsible isVisible={isVisible} easing={Easing.elastic(1)}>
        <ImageModal
          resizeMode="contain"
          source={require("@/assets/images/maps/line-all-route.jpg")}
          style={{ width: screenWidth, height: 300 }}
        />
      </Collapsible>
      <TouchableOpacity className="py-2" onPress={toggleVisibility}>
        {isVisible ? (
          <View className="flex-row items-center justify-center space-x-2">
            <FontAwesome6
              name="chevron-up"
              size={20}
              color={theme === "dark" ? "#FFAC9F" : "#2F8B6C"}
            />
            <StyledText className="text-sy-green text-lg dark:text-sy-pink-100">
              ปิด
            </StyledText>
          </View>
        ) : (
          <View className="flex-row items-center justify-center space-x-2">
            <FontAwesome6
              name="chevron-down"
              size={20}
              color={theme === "dark" ? "#FFAC9F" : "#2F8B6C"}
            />
            <StyledText className="text-sy-green text-lg dark:text-sy-pink-100">
              รายละเอียดการเดินทาง
            </StyledText>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
