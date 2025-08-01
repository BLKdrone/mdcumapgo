import { memo, useCallback } from "react";
import {
  Linking,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import { StyledTextBold } from "@/components/StyledTextBold";
import { sportPlacesSection } from "@/utils/constants";
import { useMarkerStore } from "@/hooks/zustand";
import GoogleMapsLogo from "@/assets/images/google-maps-logo.svg";
import MapPlaceSportsIcons from "./MapPlaceSportsIcons";
import MapPlaceFacilitiesIcons from "./MapPlaceFacilitiesIcons";
import React from "react";

type TMapButtons = {
  name: string;
  sports: string[];
  map: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  facilities: string[];
};

type TMapButtonsSectionData = {
  title: string;
  data: TMapButtons[];
};

interface IMapPlacesListProps {
  moveMaptoMarker: (
    latitude: number,
    longitude: number,
    markerName: string,
  ) => void;
}

function MapPlacesList({ moveMaptoMarker }: IMapPlacesListProps) {
  const { updateMarker } = useMarkerStore();
  const { width: screenWidth } = useWindowDimensions();
  // render section headers
  const renderSectionHeader = useCallback(
    ({ section }: { section: TMapButtonsSectionData }) => (
      <StyledTextBold className="text-xl p-5 bg-sy-gray-50 dark:bg-sy-black">
        {section.title}
      </StyledTextBold>
    ),
    [],
  );

  // render markers
  const renderItem = useCallback(
    ({ item }: { item: TMapButtons; section: TMapButtonsSectionData }) => (
      <>
        <View className="px-8 py-6">
          <TouchableOpacity
            onPress={() => {
              moveMaptoMarker(
                item.coordinate.latitude,
                item.coordinate.longitude,
                item.name,
              );
              updateMarker(item.name);
            }}
            className="flex-row items-center justify-between"
          >
            <View>
              <StyledTextBold
                className="text-lg"
                style={{ maxWidth: screenWidth - 100 }}
              >
                {item.name}
              </StyledTextBold>
              <View className="flex-row">
                <View className="mr-2">
                  <MapPlaceFacilitiesIcons facilities={item.facilities} />
                </View>
                <MapPlaceSportsIcons sports={item.sports} />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => Linking.openURL(item.map)}
              className="bg-sy-pure-white rounded-full items-center justify-center shadow-sm w-12 h-12 dark:bg-sy-black"
            >
              <GoogleMapsLogo className="w-8 h-8" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View className="border-b-2 w-full border-sy-gray-150 dark:border-sy-gray-250" />
      </>
    ),
    [moveMaptoMarker, updateMarker],
  );

  return (
    <BottomSheetSectionList
      sections={sportPlacesSection}
      keyExtractor={(item, index) => item.name + index}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
    />
  );
}

export default memo(MapPlacesList);
