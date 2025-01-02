import xlsx from 'xlsx';
import fs from 'fs';

import {ExcelParams} from "../models/excel.model";

export async function saveToExcel(filePath: string, newLocation: ExcelParams){
    let workbook;
    let worksheet;

    try {
        if (fs.existsSync(filePath)) {
            workbook = xlsx.readFile(filePath);
            worksheet = workbook.Sheets['Sheet1'];
        } else {
            workbook = xlsx.utils.book_new();
            worksheet = xlsx.utils.json_to_sheet([]);
            xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        }

        const range = worksheet['!ref']
            ? xlsx.utils.decode_range(worksheet['!ref'])
            : { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };

        const lastRow = range.e.r + 1;

        const row = [
            newLocation.CountryId,
            newLocation.CityId,
            JSON.stringify(newLocation.AddressMultiLanguage),
            JSON.stringify(newLocation.TitleMultiLanguage),
            JSON.stringify(newLocation.DescriptionMultiLanguage),
            JSON.stringify(newLocation.Location),
            newLocation.CategoryId,
        ];

        xlsx.utils.sheet_add_aoa(worksheet, [row], { origin: lastRow });
        workbook.Sheets['Sheet1'] = worksheet;

        xlsx.writeFile(workbook, filePath);
    } catch (error) {
        throw new Error(`Error saving to Excel: ${error}`);
    }
}
