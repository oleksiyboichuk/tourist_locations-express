import axios from 'axios';
import {environment} from "../environment";

const GOOGLE_API_KEY = environment.GOOGLE_API_KEY;

export const searchLocationsByGoogle = async (cityName: string, query: string) => {
    if(!cityName || !query) return null;

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json`;

    try {
        const response = await axios.get(url, {
            params: {
                query: `${query} ${cityName}`,
                key: GOOGLE_API_KEY,
                language: "uk",
            },
        });

        if(!response) return null;

        return response.data;

    } catch (error) {
        console.error("Error inside searchLocationsByGoogle", error);
        return null;
    }
};
