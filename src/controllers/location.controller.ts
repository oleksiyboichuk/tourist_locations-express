import {Request, Response} from "express";
import {getTouristLocations} from "../services/google.service";
import {generateDescription, generateTranslation} from "../services/open-ai.service";
import {saveToExcel} from "../utils/excel.util";
import {locationConfig} from "../configs/location.config";

export async function generateTouristLocations(req: Request, res: Response): Promise<void> {
    const {cityName, translationPrompt, descriptionPrompt, model} = req.body;

    if(!cityName ||  !translationPrompt || !descriptionPrompt || !model) {
        res.status(400).json({message: "Bad request!"});
    }

    try {
        const locations = await getTouristLocations(cityName);
        const result = [];

        for (let location of locations) {
            const params = {
                chatModel: model,
                locationName: location.name,
                language: "uk"
            }

            const description = await generateDescription({...params, prompt: descriptionPrompt, cityName: cityName});
            const translation: any = await generateTranslation({...params, prompt: translationPrompt, locationAddress: location.address});

            if (description && translation) {
                const excelParams = {
                    CountryId: locationConfig.countryId,
                    CityId: locationConfig.cityId,
                    AddressMultiLanguage: translation.address,
                    TitleMultiLanguage: translation.name,
                    DescriptionMultiLanguage: description,
                    Location: location.location,
                    CategoryId: locationConfig.categoryId,
                };

                await saveToExcel("../excel/interesting-places.xlsx", excelParams);
                result.push(excelParams);
            }
        }

        res.status(200).json({data: result});
    } catch (error) {
        res.status(500).json({message: error});
    }
}