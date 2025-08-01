"use client";
// // import { useRef, useMemo, useEffect } from "react";
// // import { Text, useColorScheme, useWindowDimensions } from "react-native";
// import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import mapStyle from "@/utils/config/mapStyle.json";

// // import MapView, {
// //   Callout,
// //   type MapMarker,
// //   Marker,
// //   PROVIDER_GOOGLE,
// // } from "react-native-maps";

// import { sportPlacesSection } from "@/utils/constants";
// import * as Location from "expo-location";
// import MapPlaceDetails from "@/componets/MapBottomSheetContents/MapPlaceDetails";
// import MapPlacesList from "@/componets/MapBottomSheetContents/MapPlacesList";
// import { useMarkerStore } from "@/hooks/zustand";
// import PopBusPolylines from "@/componets/MapOverlay/PopBusPolylines";



// export default function Map() {
//   // // hooks
//   // const sheetRef = useRef<BottomSheet>(null);
//   // const mapRef = useRef<MapView>(null);
//   // const markerRefs = useRef<{ [key: string]: MapMarker | null }>({});
//   // const { name } = useMarkerStore();

//   // const { height } = useWindowDimensions();

//   // useEffect(() => {
//   //   (async () => {
//   //     const { status } = await Location.requestForegroundPermissionsAsync();
//   //     if (status !== "granted") {
//   //       return;
//   //     }
//   //   })();
//   // }, []);

//   // variables
//   const snapPoints = useMemo(() => ["10%", "30%", "45%", "90%"], []);

//   // functions
//   const moveMaptoMarker = (
//     latitude: number,
//     longitude: number,
//     markerName: string,
//   ) => {
//     mapRef.current?.animateToRegion(
//       {
//         latitude: latitude,
//         longitude: longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       },
//       1000,
//     );
//     markerRefs.current[markerName]?.showCallout();
//     // Adding 200 ms delay to mitigate animation lag
//     // setTimeout(() => sheetRef.current?.snapToIndex(2), 200);
//   };

//   const theme = useColorScheme();

//   return (
//     <GestureHandlerRootView
//       style={{
//         flex: 1,
//         backgroundColor: theme === "dark" ? "#333333" : "#FFFFFF",
//       }}>
//       <MapView
//         ref={mapRef}
//         // Gooogle Maps Night Mode: https://developers.google.com/maps/documentation/javascript/examples/style-array#maps_style_array-typescript
//         customMapStyle={theme === "dark" ? mapStyle : []}
//         initialRegion={{
//           latitude: 13.7389,
//           longitude: 100.5303,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.01,
//         }}
//         provider={PROVIDER_GOOGLE}
//         showsUserLocation={true}
//         followsUserLocation={false}
//         showsMyLocationButton={true}
//         showsCompass={true}
//         mapPadding={{
//           top: 0,
//           right: 0,
//           bottom: height * 0.1,
//           left: 0,
//         }}
//         className="h-full w-full"
//       >
//         <PopBusPolylines />
//         {sportPlacesSection.map((section) =>
//           section.data.map((marker) =>
//             marker.coordinate ? (
//               <Marker
//                 key={marker.name}
//                 coordinate={{
//                   latitude: marker.coordinate.latitude,
//                   longitude: marker.coordinate.longitude,
//                 }}
//                 title={marker.name}
//                 image={require("@/assets/images/map-pin.png")}
//                 ref={(ref) => (markerRefs.current[marker.name] = ref)}
//               >
//                 <Callout>
//                   <Text
//                     className="text-black w-full h-6"
//                     style={{ fontFamily: "NotoSansThai" }}
//                   >
//                     {marker.name}
//                   </Text>
//                 </Callout>
//               </Marker>
//             ) : null,
//           ),
//         )}
//       </MapView>

//       <BottomSheet
//         ref={sheetRef}
//         snapPoints={snapPoints}
//         maxDynamicContentSize={90}
//         backgroundStyle={{
//           backgroundColor: theme === "dark" ? "#333333" : "#F5F5F5",
//         }}
//       >
//         {name ? (
//           <BottomSheetScrollView>
//             <MapPlaceDetails />
//           </BottomSheetScrollView>
//         ) : (
//           <MapPlacesList moveMaptoMarker={moveMaptoMarker} />
//         )}
//       </BottomSheet>
//     </GestureHandlerRootView>
//   );
// }





// 2





// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { Drawer, Typography, Button } from "@mui/material";

// // ตัวอย่างข้อมูลสถานที่
// const sportPlacesSection = [
//   {
//     data: [
//       { name: "Sport Place A", coordinate: { latitude: 13.7389, longitude: 100.5303 } },
//       { name: "Sport Place B", coordinate: { latitude: 13.7395, longitude: 100.531 } },
//       // เพิ่มเติมตามต้องการ
//     ],
//   },
// ];

// export default function Map() {
//   const [selectedPlace, setSelectedPlace] = useState<any>(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

//   // ดึงตำแหน่งผู้ใช้ด้วย Geolocation Web API
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setUserPosition([pos.coords.latitude, pos.coords.longitude]);
//         },
//         (err) => {
//           console.error("Error getting user position:", err);
//         },
//         { enableHighAccuracy: true }
//       );
//     }
//   }, []);

//   // ฟังก์ชันเปิด Drawer พร้อมข้อมูลสถานที่
//   const moveMaptoMarker = (place: any) => {
//     setSelectedPlace(place);
//     setDrawerOpen(true);
//   };

//   return (
//     <>
//       <div style={{ height: "100vh", width: "100%" }}>
//         <MapContainer
//           center={[13.7389, 100.5303]}  // ใช้ center แทน initialCenter
//           zoom={13}                     // ใช้ zoom แทน initialZoom
//           style={{ height: "100vh", width: "100%" }}
//         >
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//           {sportPlacesSection.map((section) =>
//             section.data.map((marker) =>
//               marker.coordinate ? (
//                 <Marker
//                   key={marker.name}
//                   position={[marker.coordinate.latitude, marker.coordinate.longitude]}
//                   eventHandlers={{
//                     click: () => moveMaptoMarker(marker),
//                   }}
//                 >
//                   <Popup>{marker.name}</Popup>
//                 </Marker>
//               ) : null
//             )
//           )}

//           {userPosition && <Marker position={userPosition} />}
//         </MapContainer>
//       </div>

//       <Drawer
//         anchor="bottom"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         PaperProps={{ style: { height: "40%", padding: 16 } }}
//       >
//         {selectedPlace ? (
//           <>
//             <Typography variant="h6">{selectedPlace.name}</Typography>
//             {/* ใส่รายละเอียดอื่นๆ ได้ที่นี่ */}
//             <Button variant="contained" onClick={() => setDrawerOpen(false)} style={{ marginTop: 16 }}>
//               ปิด
//             </Button>
//           </>
//         ) : (
//           <Typography>เลือกสถานที่เพื่อดูรายละเอียด</Typography>
//         )}
//       </Drawer>
//     </>
//   );
// }


import { useState, useRef, useEffect } from "react";
import Image from 'next/image';

export default function MapPage() {
  type Building = {
    id: number;
    name: string;
    description: string;
    coordinates: { top: string; left: string };
  };

  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  // Track which line is active by target building id (5, 3, or 1), or null for none
  const [activeLineTargetId, setActiveLineTargetId] = useState<number | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const [mapSize, setMapSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const buildings: Building[] = [
    { id: 1, name: "อาคารภูมิสิริมังคลานุสรณ์", description: "Bhumi Siri Mangalanusorn Building", coordinates: { top: "39.7%", left: "49.2%" } },
    { id: 3, name: "อาคารอปร.", description: "Or Por Ror Building", coordinates: { top: "33.5%", left: "33.8%" } },
    { id: 4, name: "คณะวิทยาศาสตร์", description: "Faculty of Science", coordinates: { top: "63.5%", left: "50.2%" } },
    { id: 5, name: "สก.", description: "Her Royal Highness Building", coordinates: { top: "41.9%", left: "58.2%" } },
    { id: 6, name: "แพทยพัฒน์", description: "Faculty of Medicine", coordinates: { top: "60.5%", left: "33.8%" } },
    { id: 7, name: "หอประชุมจุฬาฯ", description: "CU Auditorium", coordinates: { top: "25.6%", left: "14.1%" } },
    { id: 8, name: "ภปร", description: "Institute of Medical Science", coordinates: { top: "41.1%", left: "79.1%" } },
  ];
  const yellowLinePoints = [
    { top: "41.1%", left: "79.1%" },
    { top: "46.5%", left: "53.2%" },
    { top: "55.3%", left: "53.5%" },
    { top: "56.6%", left: "46.6%" },
    { top: "57.9%", left: "41.9%" },
    { top: "37.4%", left: "40.1%" },
    { top: "33.5%", left: "33.8%" },
  ];
  const yellowLineActiveBuildings = [8, 3]; // example building ids related to yellow line
  const isYellowLineActive = selectedBuilding && yellowLineActiveBuildings.includes(selectedBuilding.id);

  const getPixelCoordinates = (coords: { top: string; left: string }) => {
    const topPercent = parseFloat(coords.top);
    const leftPercent = parseFloat(coords.left);
    return {
      x: (leftPercent / 100) * mapSize.width,
      y: (topPercent / 100) * mapSize.height,
    };
  };

  // Now this is safe to call
  const yellowLinePointsStr = yellowLinePoints
    .map((pt) => {
      const p = getPixelCoordinates(pt);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  useEffect(() => {
    if (mapRef.current) {
      const resize = () => {
        setMapSize({ width: mapRef.current!.offsetWidth, height: mapRef.current!.offsetHeight });
      };
      resize();
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }
  }, []);

  const building8 = buildings.find(b => b.id === 8);
  const targets = buildings.filter(b => [5, 1].includes(b.id));
  const colors = ["green", "orange", "purple"];

  // Optional: define gradients in SVG defs for fancy stroke
  // For simplicity, below example just uses strokeOpacity for fade effect

  return (
    <>
      <div style={{ position: "relative", height: "100vh", background: "#eee" }} ref={mapRef}>
        {/* Map image */}
        <div style={{ width: "100%", position: "relative", height: "auto" }}>
          <Image
            src="/S__39747590.jpg"
            alt="Map"
            layout="responsive"
            width={700}
            height={400}
          />
        </div>

        {/* SVG overlay for lines */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: mapSize.width,
            height: mapSize.height,
            pointerEvents: "auto",
            zIndex: 1,
          }}
          width={mapSize.width}
          height={mapSize.height}
        >
          {/* Colored lines */}
          {building8 && targets.map((target, idx) => {
            const start = getPixelCoordinates(building8.coordinates);
            const end = getPixelCoordinates(target.coordinates);
            const isActive = activeLineTargetId === target.id;
            return (
              <line
                key={target.id}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={colors[idx] || "black"}
                strokeWidth={3}
                strokeOpacity={isActive ? 1 : 0.2} // fade effect
                style={{ transition: "stroke-opacity 0.5s ease" }}
                onClick={() => setActiveLineTargetId(isActive ? null : target.id)}
                cursor="pointer"
              />
            );
          })}

          {/* Yellow polyline with fade effect */}
          <polyline
            points={yellowLinePointsStr}
            stroke="yellow"
            strokeWidth={3}
            fill="none"
            strokeOpacity={isYellowLineActive ? 1 : 0.2} // fade in/out
            style={{ transition: "stroke-opacity 0.5s ease" }}
            onClick={() => setActiveLineTargetId(isYellowLineActive ? null : 8)} // toggle on click if desired
            cursor="pointer"
          />
        </svg>
        {/* Icons */}
        {buildings.map((b) => (
          <button
            key={b.id}
            onClick={() => {
              setSelectedBuilding(b);
              // Activate line if building is a target from building 8
              if ([1, 5].includes(b.id)) {
                setActiveLineTargetId(b.id);
              } else {
                setActiveLineTargetId(null);
              }
            }}
            style={{
              position: "absolute",
              top: b.coordinates.top,
              left: b.coordinates.left,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              width: 30,
              height: 30,
              backgroundColor: selectedBuilding?.id === b.id ? "blue" : "red",
              border: "none",
              cursor: "pointer",
              zIndex: 2,
            }}
            aria-label={`Select ${b.name}`}
          />
        ))}
        {/* หา location */}
        {/* <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 99,
            cursor: "crosshair"
          }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const leftPercent = (x / rect.width) * 100;
            const topPercent = (y / rect.height) * 100;
            console.log(`{ top: "${topPercent.toFixed(1)}%", left: "${leftPercent.toFixed(1)}%" },`);
          }}
        ></div> */}


        {/* Info bar at bottom */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#222",
            color: "#fff",
            padding: "1rem",
            minHeight: "4rem",
            fontSize: "1.1rem",
            display: selectedBuilding ? "block" : "none",
            zIndex: 3,
          }}
        >
          <strong>{selectedBuilding?.name}</strong>: {selectedBuilding?.description}
        </div>
      </div>
    </>
  );
}
