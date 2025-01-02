import {Request, Response} from "express";
import {getTouristLocations} from "../services/google.service";
import {generateDescription, generateTranslation} from "../services/open-ai.service";
import {saveToExcel} from "../utils/excel.util";
import {config} from "../configs/location.config";

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
                language
            }

            const description = await generateDescription({...chatParams, prompt: descriptionPrompt});
            const translation: any = await generateTranslation({...chatParams, prompt: translationPrompt});

            if (description && translation) {
                const excelParams = {
                    CountryId: config.countryId,
                    CityId: config.cityId,
                    AddressMultiLanguage: translation.address,
                    TitleMultiLanguage: translation.name,
                    DescriptionMultiLanguage: description,
                    Location: location.Location,
                    CategoryId: config.categoryId,
                };

                await saveToExcel("tables/interesting-places.xlsx", excelParams);
                result.push(excelParams);
            }
        }

        res.status(200).json({data: result});
    } catch (error) {
        res.status(500).json({message: error});
    }
}