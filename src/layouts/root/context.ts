import { createContext } from "react";
import { GeolocationData } from "../../utils/geolocation/hooks";

export const GeolocationContext = createContext<GeolocationData>({
  position: null,
  error: null,
  status: "pending",
});
