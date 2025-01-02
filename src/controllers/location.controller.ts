import { getTouristLocations } from "../services/google/find-locations.service";

export const locationController = async () => {
  const locations = await getTouristLocations();
};
