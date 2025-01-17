import {Request, Response} from "express";
import {searchLocationsByGoogle} from "../services/google.service";
import {
    generateDescription,
    generateTranslation,
} from "../services/open-ai.service";
import {locationConfig} from "../configs/location.config";
import {LocationCity} from "../db/models/location-city";
import {Location} from "../db/models/location";
import {LocationModel} from "../models/location.model";
import {
    deleteLocationById,
    getListOfCities,
    getLocationByCityName,
    getLocationById, updateLocationById
} from "../services/location.service";

const config = {...locationConfig};

export async function searchLocations(req: Request, res: Response): Promise<any> {
    const {cityName, query} = req.query as {cityName: string, query: string};

    console.log('cityName', cityName);
    console.log('query', query);

    if(!cityName || !query) {
        return res.status(400).json({message: "Bad request"});
    }

    try {
        const locations = await searchLocationsByGoogle(cityName, query);
        if(!locations) {
            return res.status(404).json({message: "Locations not found"});
        }
        return res.status(200).json(locations);
    } catch (error) {
        console.log("Error inside getLocations: ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

// export async function generateLocations(
//     req: Request,
//     res: Response,
// ): Promise<any> {
//     const {cityName, translationPrompt, descriptionPrompt, model} =
//         req.body.params;
//
//     if (!cityName || !translationPrompt || !descriptionPrompt || !model) {
//         return res.status(400).json({message: "Bad request"});
//     }
//
//     try {
//         const locations = await searchLocationsByGoogle(cityName);
//         let result: LocationModel[] = [];
//
//         locations.length = 2;
//
//         if (!locations || locations.length === 0) {
//             return res.status(500).json({message: "No locations found!"});
//         }
//
//         const promises = locations.map(async (location: any) => {
//             const params = {
//                 chatModel: model,
//                 locationName: location.name,
//                 language: "uk",
//             };
//
//             const descriptionPromise = generateDescription({
//                 ...params,
//                 prompt: descriptionPrompt,
//                 cityName: cityName,
//             });
//
//             const translationPromise = generateTranslation({
//                 ...params,
//                 prompt: translationPrompt,
//                 locationAddress: location.address,
//             });
//
//             const [description, translation] = await Promise.all([
//                 descriptionPromise,
//                 translationPromise,
//             ]);
//
//             if (!description || !translation) {
//                 return res.status(404).json({message: "No description or translation found"});
//             }
//
//             const locationParams = {
//                 CountryId: config.countryId,
//                 CityId: config.cityId,
//                 CityName: cityName,
//                 AddressMultiLanguage: JSON.parse(translation).address,
//                 TitleMultiLanguage: JSON.parse(translation).name,
//                 DescriptionMultiLanguage: JSON.parse(description),
//                 Location: location.location,
//                 Type: location.type,
//                 CategoryId: config.categoryId,
//             };
//
//             const locationRecord = new Location(locationParams);
//             await locationRecord.save();
//
//             result.push(locationParams);
//         });
//
//         await Promise.all(promises);
//         const locationCityRecord = new LocationCity({
//             CityId: config.cityId,
//             CityName: cityName
//         });
//         await locationCityRecord.save();
//
//         return res.status(200).json({data: result});
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({message: "Internal server error!"});
//     }
// }

export async function getLocations(req: Request, res: Response): Promise<any> {
    const {cityName} = req.query as { cityName: string };

    if (!cityName) {
        return res.status(400).json({message: "Bad request"});
    }

    try {
        const locations = await getLocationByCityName(cityName);
        return res.status(200).json(locations);
    } catch (error) {
        console.log("Error inside getLocations: ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export async function getLocation(req: Request, res: Response): Promise<any>{
    const {id} = req.params as {id: string};

    if(!id) {
        return res.status(400).json({message: "Bad request"});
    }

    try {
        const result = await getLocationById(id);

        if(!result) {
            return res.status(404).json({message: "Location not found"});
        }

        return res.status(200).json(result);
    } catch(error) {
        console.log("Error inside getLocations: ", error);
        return res.status(500).json({message: "Internal server error"});
    }

}

export async function updateLocation(req:Request, res: Response): Promise<any> {
    const {id} = req.params as {id: string};
    const location = req.body;

    if(!id || !location) {
        return res.status(400).json({message: "Bad request"});
    }

    try {
        const updatedLocation = await updateLocationById(id, location);
        if(!updatedLocation) {
            return res.status(400).json({message: "Bad request"});
        }

        return res.status(200).json(updatedLocation);
    } catch(error) {
        console.log("Error inside getLocations: ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export async function deleteLocation(req: Request, res: Response): Promise<any> {
    const {id} = req.params as {id: string};

    if(!id) {
        return res.status(400).json({message: "Bad request"});
    }

    try {
        const result = await deleteLocationById(id);

        if(!result) {
            return res.status(404).json({message: "Location not found"});
        }

        return res.status(200).json(result);
    } catch(error) {
        console.log("Error inside getLocations: ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export async function getCities(req: Request, res: Response): Promise<any> {
    try {
        const citiList = await getListOfCities();
        return res.status(200).json(citiList);
    } catch (error) {
        console.log("Error inside getLocations: ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}