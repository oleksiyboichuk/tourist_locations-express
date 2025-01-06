import { Schema, model, Document } from "mongoose";

interface LocationCityModel extends Document {
  CityId: string;
  CityName: string;
}

const LocationCitySchema: Schema = new Schema<LocationCityModel>({
  CityId: { type: String, required: true, unique: true },
  CityName: { type: String, required: true },
});

const LocationCity = model<LocationCityModel>(
  "Location_City",
  LocationCitySchema,
);

export { LocationCity };
