import { Linking, TouchableOpacity, useColorScheme, View } from "react-native";
import { StyledTextBold } from "../StyledTextBold";
import { StyledText } from "../StyledText";
import { useMarkerStore } from "@/hooks/zustand";
import { useEffect, useState } from "react";
import { findSportPlaceByName } from "@/utils/helper/main-functions";
import { AntDesign } from "@expo/vector-icons";
import MapPlaceDetailsSports from "./MapPlaceDetailsSports";
import MapPlaceDetailsDirections from "./MapPlaceDetailsDirections";
import GoogleMapsLogo from "@/assets/images/google-maps-logo.svg";
import MapPlaceFacilitiesIcons from "./MapPlaceFacilitiesIcons";
import React from "react";

interface IPlaceData {
  title: string;
  data: {
    name: string;
    sports: string[];
    map: string;
    coordinate: {
      latitude: number;
      longitude: number;
    };
    directions?: {
      cu_pop_bus: number[];
    };
    facilities: string[];
  };
}

export default function MapPlaceDetails() {
  const { name, updateMarker } = useMarkerStore();
  const [placeData, setPlaceData] = useState<IPlaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getPlaceData = async () => {
      try {
        setLoading(true);
        const data = await findSportPlaceByName(name);
        if (data) {
          setPlaceData(data);
        } else {
          setError("เกิดความผิดพลาดในการดึงข้อมูลสถานที่");
        }
      } catch {
        setError("เกิดความผิดพลาดในการดึงข้อมูลสถานที่");
      } finally {
        setLoading(false);
      }
    };
    if (name) {
      getPlaceData();
    }
  }, [name]);

  const theme = useColorScheme();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <StyledText>Loading...</StyledText>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <StyledText>{error}</StyledText>
        <TouchableOpacity onPress={() => updateMarker("")}>
          <AntDesign
            name="close"
            size={48}
            color={theme === "dark" ? "#ffffff" : "#464646"}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      {placeData && (
        <>
          <View className="px-8 mb-5 flex-row justify-between">
            <View className="space-y-1">
              <StyledTextBold className="text-2xl">{name}</StyledTextBold>
              <StyledText className="text-base">{placeData.title}</StyledText>
              <View className="my-2">
                <MapPlaceFacilitiesIcons
                  facilities={placeData.data.facilities}
                  detailed
                />
              </View>
              <TouchableOpacity
                onPress={() => Linking.openURL(placeData.data.map)}
                className="self-start"
              >
                <View className="p-2 flex-row items-center bg-sy-white rounded-full shadow-sm border border-sy-gray-100 dark:bg-sy-black dark:border-sy-gray-250">
                  <GoogleMapsLogo className="w-6 h-6" />
                  <StyledTextBold className="text-sm text-sy-green dark:text-sy-pink-100">
                    Open with Google Maps
                  </StyledTextBold>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => updateMarker("")}>
              <AntDesign
                name="close"
                size={36}
                color={theme === "dark" ? "#ffffff" : "#464646"}
              />
            </TouchableOpacity>
          </View>
          <StyledTextBold className="text-2xl p-5 pl-8 bg-sy-gray-50 dark:bg-sy-black">
            วิธีการเดินทาง
          </StyledTextBold>
          <MapPlaceDetailsDirections directions={placeData.data.directions} />
          <StyledTextBold className="text-2xl p-5 pl-8 bg-sy-gray-50 dark:bg-sy-black">
            กีฬาที่มีการแข่งขัน
          </StyledTextBold>
          <MapPlaceDetailsSports sports={placeData.data.sports} />
        </>
      )}
    </>
  );
}
