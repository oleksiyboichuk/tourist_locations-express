import {Location} from "../db/models/location";

export async function getLocationByCityName(cityName: string) {
    if(!cityName) return null;

    try {
        const locations = await Location.find({CityName: cityName}).exec();

        if(!locations) return null;

        return locations;
    } catch (error) {
        console.error("Error inside getLocationByCityName: ", error);
        return null;
    }
}