import axios from 'axios';
import { environment } from "../environment";

const GOOGLE_API_KEY = environment.GOOGLE_API_KEY;

export const searchLocationsByGoogle = async (cityName: string, query: string, next?: string) => {
    if (!cityName || !query) return null;

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json`;

    try {
        const params: Record<string, string> = {
            query: `${query} ${cityName}`,
            key: GOOGLE_API_KEY,
            language: "uk",
        };

        if (next) {
            params.pagetoken = next;
        }

        const response = await axios.get(url, { params });

        if (!response || response.status !== 200) return null;

        return response.data;
    } catch (error) {
        console.error("Error inside searchLocationsByGoogle", error);
        return null;
    }
};
