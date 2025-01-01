import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const LANGUAGE = config.language;
const CITY = config.cityName;
const QUERY = "туристичні локації";
const URL = `https://maps.googleapis.com/maps/api/place/textsearch/json`;

export async function getTouristLocations() {
  try {
    const response = await axios.get(URL, {
      params: {
        query: `${QUERY} ${CITY}`,
        key: GOOGLE_API_KEY,
        language: LANGUAGE,
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
  } catch (error) {
    console.error("Помилка при отриманні даних з Google API:", error.message);
    return [];
  }
}
