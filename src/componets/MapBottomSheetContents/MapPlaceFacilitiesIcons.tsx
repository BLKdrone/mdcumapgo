import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentType, useMemo } from "react";
import { facilitiesFilter } from "@/utils/constants";
import { StyledText } from "../StyledText";

interface IMapPlaceFacilitiesIcons {
  facilities: string[];
  detailed?: boolean;
}

type TFacilitiesFilterData = {
  id: string;
  icon: string;
  iconType: string;
  label: string;
};

const iconComponents: { [key: string]: ComponentType<any> } = {
  MaterialCommunityIcons,
};

export default function MapPlaceFacilitiesIcons({
  facilities,
  detailed,
}: IMapPlaceFacilitiesIcons) {
  // Render only the available facilities
  const filteredFacilities = useMemo(
    () =>
      facilitiesFilter.filter((facility) =>
        facilities.includes(facility.label),
      ),
    [facilities],
  );

  return (
    <View
      className={`${detailed ? "space-y-1" : "flex-row"} flex-wrap space-x-2`}
    >
      {filteredFacilities.map((item: TFacilitiesFilterData) => {
        const IconComponent = iconComponents[item.iconType];
        return (
          <View
            key={item.id}
            className={`${detailed && "flex-row items-center self-start space-x-2"}`}
          >
            <IconComponent
              name={item.icon}
              size={20}
              color={item.label === "first_aid" ? "#D93829" : "#258EF0"}
              style={detailed ? { alignSelf: "center" } : {}}
            />
            {detailed && (
              <StyledText
                className={`text-sm ${item.label === "first_aid" ? "text-sy-red" : "text-sy-blue"}`}
              >
                {item.label === "first_aid" ? "มีสถานพยาบาล" : "มีจุดรับอาหาร"}
              </StyledText>
            )}
          </View>
        );
      })}
    </View>
  );
}
