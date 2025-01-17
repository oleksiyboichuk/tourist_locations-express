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

export async function getLocationById(id: string): Promise<any | null> {
    if (!id) return null;

    try {
        const location = await Location.findById(id);

        if(!location) return null;

        return location;
    } catch (error) {
        console.error("Error inside getLocationByCityName: ", error);
        return null;
    }
}

export async function updateLocationById(id: string, location: any) {
    if (!id || !location) return null;

    try {
        const updatedLocation = await Location.findByIdAndUpdate(
            id,
            { $set: location },
            { new: true, runValidators: true }
        );

        if(!updatedLocation) return null;

        return updatedLocation;
    } catch (error) {
        console.error("Error inside getLocationByCityName: ", error);
        return null;
    }
}

export async function deleteLocationById(id: string): Promise<any | null> {
    if (!id) return null;

    try {
        const deleteLocation = await Location.findByIdAndDelete(id);

        if(!deleteLocation) return null;

        return deleteLocation;
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