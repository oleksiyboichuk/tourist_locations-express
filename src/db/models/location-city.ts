import { Schema, model, Document } from "mongoose";

interface LocationCityModel extends Document {
  AddedCities: Array<string>;
}

const LocationCitySchema: Schema = new Schema<LocationCityModel>({
  AddedCities: { type: [String], required: true },
});

const LocationCity = model<LocationCityModel>(
  "LocationCity",
  LocationCitySchema,
);

export { LocationCity };
