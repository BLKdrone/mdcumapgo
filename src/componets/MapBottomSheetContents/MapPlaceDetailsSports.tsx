import { View, useColorScheme } from "react-native";
import {
  MaterialIcons,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ComponentType, useMemo } from "react";
import { gamesFilter } from "@/utils/constants";
import { StyledTextBold } from "../StyledTextBold";

interface IMapPlaceDetailsSportsProps {
  sports: string[];
}

type TGamesFilterData = {
  id: string;
  icon: string;
  iconType: string;
  label: string;
};

const iconComponents: { [key: string]: ComponentType<any> } = {
  MaterialIcons,
  FontAwesome6,
  MaterialCommunityIcons,
};

export default function MapPlaceDetailsSports({
  sports,
}: IMapPlaceDetailsSportsProps) {
  const theme = useColorScheme();

  // Render only the available sports
  const filteredGames = useMemo(
    () => gamesFilter.filter((game) => sports.includes(game.label)),
    [sports],
  );

  return (
    <View className="flex-row flex-wrap">
      {filteredGames.map((item: TGamesFilterData) => {
        const IconComponent = iconComponents[item.iconType];
        return (
          <View
            key={item.id}
            className="flex-row shadow-lg space-x-4 mt-5 mx-8"
          >
            <View className="h-16 w-16 items-center justify-center rounded-full border-2 border-sy-gray-200">
              <IconComponent
                name={item.icon}
                size={32}
                color={theme === "dark" ? "#ffffff" : "#464646"}
              />
            </View>
            <View className="w-24 justify-center items-start">
              <StyledTextBold className="text-base">
                {item.label}
              </StyledTextBold>
            </View>
          </View>
        );
      })}
    </View>
  );
}
