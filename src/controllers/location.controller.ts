import {Request, Response} from "express";
import {getTouristLocations} from "../services/google.service";
import {generateDescription, generateTranslation} from "../services/open-ai.service";
import {saveToExcel} from "../utils/excel.util";

export async function generateTouristLocations(req: Request, res: Response) {
    const {prompt, model, cityName, countryId, categoryId, language} = req.body;

    try {
        const locations = await getTouristLocations(cityName, language);
        const result = [];

        for (let location of locations) {

            const chatParams = {
                prompt: prompt,
                chatModel: model,
                language
            }
            const description = await generateDescription(chatParams);
            const translation: any = await generateTranslation(chatParams);

            if (description && translation) {
                const excelParams = {
                    CountryId: countryId,
                    CityId: cityName,
                    AddressMultiLanguage: translation.address,
                    TitleMultiLanguage: translation.name,
                    DescriptionMultiLanguage: description,
                    Location: location.Location,
                    CategoryId: categoryId,
                };

                await saveToExcel('tables/interesting-places.xlsx', excelParams);
                result.push(excelParams);
            }
        }

        res.status(200).json({data: result});
    } catch (error) {
        res.status(500).json({message: error});
    }
}