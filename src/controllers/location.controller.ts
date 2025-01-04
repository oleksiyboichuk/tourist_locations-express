import { Request, Response } from "express";
import { getTouristLocations } from "../services/google.service";
import {
  generateDescription,
  generateTranslation,
} from "../services/open-ai.service";
import { locationConfig } from "../configs/location.config";

const config = { ...locationConfig };

export async function locationController(
  req: Request,
  res: Response,
): Promise<void> {
  const { cityName, translationPrompt, descriptionPrompt, model } =
    req.body.params;

  if (!cityName || !translationPrompt || !descriptionPrompt || !model) {
    res.status(400).json({ message: "Bad request!" });
    return;
  }

  try {
    const locations = await getTouristLocations(cityName);
    const result: any = [];

    locations.length = 5;

    if (!locations || locations.length === 0) {
      res.status(500).json({ message: "No locations found!" });
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

      console.log("description", description);
      console.log("translation", translation);

      if (!description || !translation) {
        throw new Error("No description or translation found!");
      }

      const excelParams = {
        CountryId: config.countryId,
        CityId: config.cityId,
        AddressMultiLanguage: JSON.parse(translation).address,
        TitleMultiLanguage: JSON.parse(translation).name,
        DescriptionMultiLanguage: JSON.parse(description),
        Location: location.location,
        CategoryId: config.categoryId,
      };

      result.push(excelParams);
    });

    await Promise.all(promises);

    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
}
