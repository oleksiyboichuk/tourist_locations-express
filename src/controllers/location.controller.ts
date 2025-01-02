import {Request, Response} from "express";
import {getTouristLocations} from "../services/google.service";
import {generateDescription, generateTranslation} from "../services/open-ai.service";
import {saveToExcel} from "../utils/excel.util";
import {locationConfig} from "../configs/location.config";

export async function generateTouristLocations(req: Request, res: Response) {
    const {cityName, translationPrompt, descriptionPrompt, model, language} = req.body;

    if(!cityName ||  !translationPrompt || !descriptionPrompt || !model || !language) {
        res.status(400).json({message: "Bad request!"});
    }

    try {
        const locations = await getTouristLocations(cityName, language);
        const result = [];

        for (let location of locations) {
            const chatParams = {
                chatModel: model,
                locationName: location.name,
                language
            }

            const description = await generateDescription({...chatParams, prompt: descriptionPrompt});
            const translation: any = await generateTranslation({...chatParams, prompt: translationPrompt, locationAddress: location.address});

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