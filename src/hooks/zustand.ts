import { create } from "zustand";

type TMarkerSelectedState = {
  name: string;
};

type TMarkerSelectedAction = {
  updateMarker: (newMarker: string) => void;
};

export const useMarkerStore = create<
  TMarkerSelectedState & TMarkerSelectedAction
>((set) => ({
  name: "",
  updateMarker: (newMarker) => set({ name: newMarker }),
}));
