import { Schema, model, Document } from "mongoose";

interface LocationSchemaModel extends Document {
  CountryId: string;
  CityId: string;
  CityName: string;
  CategoryId: string;
  AddressMultiLanguage: Record<string, string>;
  TitleMultiLanguage: Record<string, string>;
  DescriptionMultiLanguage: Record<string, string>;
  Location: object;
  Type: string[]
}

const LocationSchema: Schema = new Schema<LocationSchemaModel>({
  CountryId: { type: String, required: true },
  CityId: { type: String, required: true },
  CityName: { type: String, required: true },
  CategoryId: { type: String, required: true },
  AddressMultiLanguage: { type: Map, of: String, required: true },
  TitleMultiLanguage: { type: Map, of: String, required: true },
  DescriptionMultiLanguage: { type: Map, of: String, required: true },
  Location: { type: Object, required: true },
  Type: {type: [String], required: true},
});

const Location = model<LocationSchemaModel>("Location", LocationSchema);

export { Location };
