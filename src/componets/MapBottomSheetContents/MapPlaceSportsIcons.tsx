import { View, useColorScheme } from "react-native";
import {
  MaterialIcons,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ComponentType, useMemo } from "react";
import { gamesFilter } from "@/utils/constants";

interface IMapPlaceSportsIconsProps {
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

export default function MapPlaceSportsIcons({
  sports,
}: IMapPlaceSportsIconsProps) {
  const theme = useColorScheme();

  // Render only the available sports
  const filteredGames = useMemo(
    () => gamesFilter.filter((game) => sports.includes(game.label)),
    [sports],
  );

  return (
    <View className="flex-row flex-wrap space-x-2">
      {filteredGames.map((item: TGamesFilterData) => {
        const IconComponent = iconComponents[item.iconType];
        return (
          <IconComponent
            name={item.icon}
            size={20}
            color={theme === "dark" ? "#696969" : "#AEAEAE"}
            key={item.id}
          />
        );
      })}
    </View>
  );
}
