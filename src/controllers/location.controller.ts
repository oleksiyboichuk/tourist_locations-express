import {Request, Response} from "express";
import {getTouristLocations} from "../services/google.service";
import {generateDescription, generateTranslation} from "../services/open-ai.service";
import {saveToExcel} from "../utils/excel.util";
import {locationConfig} from "../configs/location.config";

export async function locationController(req: Request, res: Response): Promise<void> {
    const {cityName, translationPrompt, descriptionPrompt, model} = req.body.params;

    if(!cityName ||  !translationPrompt || !descriptionPrompt || !model) {
        res.status(400).json({message: "Bad request!"});
    }

    try {
        const locations = await getTouristLocations(cityName);
        const result = [];

        locations.length = 1;

        if(!locations) {
            res.status(500).json({message: "No locations found!"});
        }

        for (let location of locations) {
            const params = {
                chatModel: model,
                locationName: location.name,
                language: "uk"
            }

            const description = await generateDescription({...params, prompt: descriptionPrompt, cityName: cityName});
            const translation: any = await generateTranslation({...params, prompt: translationPrompt, locationAddress: location.address});

            console.log('description', description);
            console.log('translation', translation);

            if(!description || !translation) {
                res.status(500).json({message: "No locations found!"});
            }

            if (description && translation) {
                const excelParams = {
                    CountryId: locationConfig.countryId,
                    CityId: locationConfig.cityId,
                    AddressMultiLanguage: JSON.parse(translation).address,
                    TitleMultiLanguage: JSON.parse(translation).name,
                    DescriptionMultiLanguage: JSON.parse(description),
                    Location: location.location,
                    CategoryId: locationConfig.categoryId,
                };

                console.log('excelParams', excelParams);

                // await saveToExcel("../excel/interesting-places.xlsx", excelParams);
                result.push(excelParams);
            }
        }

        res.status(200).json({data: result});
    } catch (error) {
        res.status(500).json({message: "Internal server error!"});
    }
}