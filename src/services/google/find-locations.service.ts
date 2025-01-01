import axios from "axios";
import { GoogleParamsModel } from "../../models/google.model";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const baseUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json`;

export const getTouristLocations = async (params: GoogleParamsModel) => {
  const { language, cityName, query } = params;

  try {
    const response = await axios.get(baseUrl, {
      params: {
        query: `${query} ${cityName}`,
        key: GOOGLE_API_KEY,
        language: language,
      },
    });

    const places = response.data.results.map((place: any) => ({
      Name: place.name,
      Address: place.formatted_address || "",
      Type: place.types,
      Location: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      },
    }));

    return places;
  } catch (error: any) {
    console.error("Помилка при отриманні даних з Google API:", error.message);
    return [];
  }
};
