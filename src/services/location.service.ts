import {Location} from "../db/models/location";
import {LocationCity} from "../db/models/location-city";

export async function getLocationByCityName(cityName: string) {
    if (!cityName) return null;

    const correctCityName = decodeURIComponent(cityName);

    try {
        const locations = await Location.find({CityName: correctCityName}).exec();

        if (!locations) return null;

        return locations;
    } catch (error) {
        console.error("Error inside getLocationByCityName: ", error);
        return null;
    }
}

export async function getListOfCities() {
    try {
        const cities = await LocationCity.find();

        if (!cities) return null;

        return cities;
    } catch (error) {
        console.error("Error inside getLocationByCityName: ", error);
        return null;
    }
}