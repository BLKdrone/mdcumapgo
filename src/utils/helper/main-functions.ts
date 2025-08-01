import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { sportPlacesSection } from "../constants";
import {
  BM,
  BTU,
  BUU,
  CMU,
  CU,
  KKU,
  KMITL,
  KU,
  MFU,
  MSU,
  NU,
  PCM,
  PI,
  PNU,
  PSCM,
  PSU,
  RA,
  RSU,
  SI,
  SU,
  SUT,
  SWU,
  TU,
  UBU,
  UP,
  WTU,
  WU,
} from "../images";

dayjs.extend(utc);

export function formatTimestampDMHm(timestamp: string): string {
  return dayjs(timestamp).utcOffset(7).format("DD MMM HH:mm");
}

export function formatTimestampDMY(timestamp: string | null): string {
  if (!timestamp) return "";
  return dayjs(timestamp).utcOffset(7).format("DD MMM YYYY");
}

export function formatTimestampHm(timestamp: string | null): string {
  if (!timestamp) return "";
  return dayjs(timestamp).utcOffset(7).format("HH:mm");
}

export function formatGameTime(startTime: string | null) {
  if (!startTime) return "";
  const now = dayjs().utcOffset(7);
  const start = dayjs(startTime).utcOffset(7);

  if (start.isSame(now, "day")) {
    return start.format("HH:mm") + "\nTODAY";
  } else {
    return start.format("HH:mm") + "\n" + start.format("DD MMM");
  }
}

export function formatCategory(category: string): {
  name: string;
  color: string;
} {
  let formatedCategory = {
    name: "",
    color: "",
  };
  switch (category) {
    case "Important":
      formatedCategory.name = "exclamation";
      formatedCategory.color = "#218E6A";
      break;
    case "Game":
      formatedCategory.name = "person-running";
      formatedCategory.color = "#FFAC9F";
      break;
    case "News":
      formatedCategory.name = "newspaper";
      formatedCategory.color = "#B9AB87";
      break;
    default:
      formatedCategory.name = "info";
      formatedCategory.color = "#258EF0";
  }
  return formatedCategory;
}

const universityImages: { [key: string]: any } = {
  CU: CU,
  BM: BM,
  BTU: BTU,
  BUU: BUU,
  CMU: CMU,
  KKU: KKU,
  KMITL: KMITL,
  KU: KU,
  MFU: MFU,
  MSU: MSU,
  NU: NU,
  PCM: PCM,
  PI: PI,
  PNU: PNU,
  PSCM: PSCM,
  PSU: PSU,
  RA: RA,
  RSU: RSU,
  SI: SI,
  SU: SU,
  SUT: SUT,
  SWU: SWU,
  TU: TU,
  UBU: UBU,
  UP: UP,
  WTU: WTU,
  WU: WU,
};

export const getImageSource = (shortName: string) =>
  universityImages[shortName] || null;

export async function findSportPlaceByName(name: string) {
  for (const section of sportPlacesSection) {
    const place = section.data.find((place) => place.name === name);
    if (place) {
      return { title: section.title, data: place };
    }
  }
  return null;
}

export function getPopBusColor(busNumber: number): string {
  const colorMap: { [key: string]: string } = {
    1: "#DC7557",
    2: "#306EB0",
    3: "#5BB239",
    4: "#FAD13B",
    5: "#820A6C",
    6: "#E799B2",
  };
  return colorMap[busNumber] || "#000000";
}
