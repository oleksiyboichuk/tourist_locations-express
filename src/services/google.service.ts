import axios from 'axios';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const getTouristLocations = async (cityName: string, language: string) => {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json`;
    const query = 'туристичні локації';

    try {
        const response = await axios.get(url, {
            params: {
                query: `${query} ${cityName}`,
                key: GOOGLE_API_KEY,
                language: language,
            },
        });

        return response.data.results.map((place: any) => ({
            Name: place.name,
            Address: place.formatted_address || '',
            Type: place.types,
            Location: {
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
            },
        }));
    } catch (error) {
        throw new Error(`Google API Error: ${error}`);
    }
};
