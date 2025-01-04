import { Schema, model, Document } from "mongoose";

interface LocationSchemaModel extends Document {
  CountryId: string;
  CityId: string;
  AddressMultiLanguage: Record<string, string>;
  TitleMultiLanguage: Record<string, string>;
  DescriptionMultiLanguage: Record<string, string>;
  Location: string;
  CategoryId: string;
}

const LocationSchema: Schema = new Schema<LocationSchemaModel>({
  CountryId: { type: String, required: true },
  CityId: { type: String, required: true },
  AddressMultiLanguage: { type: Map, of: String, required: true },
  TitleMultiLanguage: { type: Map, of: String, required: true },
  DescriptionMultiLanguage: { type: Map, of: String, required: true },
  Location: { type: String, required: true },
  CategoryId: { type: String, required: true },
});

const LocationModel = model<LocationSchemaModel>("Location", LocationSchema);

export { LocationModel };
