import {Request, Response} from "express";
import {getTouristLocations} from "../services/google.service";
import {
    generateDescription,
    generateTranslation,
} from "../services/open-ai.service";
import {locationConfig} from "../configs/location.config";
import {LocationCity} from "../db/models/location-city";
import {Location} from "../db/models/location";
import {LocationModel} from "../models/location.model";

const config = {...locationConfig};

export async function locationController(
    req: Request,
    res: Response,
): Promise<void> {
    const {cityName, translationPrompt, descriptionPrompt, model} =
        req.body.params;

    if (!cityName || !translationPrompt || !descriptionPrompt || !model) {
        res.status(400).json({message: "Bad request!"});
        return;
    }

    try {
        const locations = await getTouristLocations(cityName);
        let result: LocationModel[] = [];

        locations.length = 1;

        if (!locations || locations.length === 0) {
            res.status(500).json({message: "No locations found!"});
            return;
        }

        const promises = locations.map(async (location: any) => {
            const params = {
                chatModel: model,
                locationName: location.name,
                language: "uk",
            };

            const descriptionPromise = generateDescription({
                ...params,
                prompt: descriptionPrompt,
                cityName: cityName,
            });

            const translationPromise = generateTranslation({
                ...params,
                prompt: translationPrompt,
                locationAddress: location.address,
            });

            const [description, translation] = await Promise.all([
                descriptionPromise,
                translationPromise,
            ]);

            if (!description || !translation) {
                throw new Error("No description or translation found!");
            }

            const excelParams = {
                CountryId: config.countryId,
                CityId: config.cityId,
                CityName: cityName,
                AddressMultiLanguage: JSON.parse(translation).address,
                TitleMultiLanguage: JSON.parse(translation).name,
                DescriptionMultiLanguage: JSON.parse(description),
                Location: location.location,
                CategoryId: config.categoryId,
            };

            const locationRecord = new Location(excelParams);
            await locationRecord.save();

            result.push(excelParams);
        });

        await Promise.all(promises);
        const locationCityRecord = new LocationCity({
            CityId: config.cityId,
            CityName: cityName
        });
        await locationCityRecord.save();

        res.status(200).json({data: result});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error!"});
    }
}
