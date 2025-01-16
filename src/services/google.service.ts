import axios from 'axios';
import {environment} from "../environment";

const GOOGLE_API_KEY = environment.GOOGLE_API_KEY;

export const getTouristLocations = async (cityName: string) => {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json`;
    const query = 'туристичні локації';

    try {
        const response = await axios.get(url, {
            params: {
                query: `${query} ${cityName}`,
                key: GOOGLE_API_KEY,
                language: "uk",
            },
        });

        return response.data.results.map((place: any) => ({
            name: place.name,
            address: place.formatted_address || '',
            type: place.types,
            location: {
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
            },
        }));
    } catch (error) {
        throw new Error(`Google API Error: ${error}`);
    }
};
