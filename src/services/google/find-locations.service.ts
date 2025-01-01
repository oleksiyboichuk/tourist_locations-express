import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const baseUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json`;

interface Params {
  language: string;
  cityName: string;
  query: string;
}

export async function getTouristLocations(params: Params) {
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
}
