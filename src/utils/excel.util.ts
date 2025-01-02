import xlsx from 'xlsx';
import fs from 'fs';

import {ExcelParams} from "../models/excel.model";

export async function saveToExcel(existingFile: string, newLocations: ExcelParams){
    let workbook;
    let worksheet;

    try {
        if (fs.existsSync(existingFile)) {
            workbook = xlsx.readFile(existingFile);
            worksheet = workbook.Sheets["Sheet1"];
        } else {
            workbook = xlsx.utils.book_new();
            worksheet = xlsx.utils.json_to_sheet([]);
            xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        }

        let range = worksheet["!ref"]
            ? xlsx.utils.decode_range(worksheet["!ref"])
            : { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
        const lastRow = range.e.r + 1;

        worksheet[xlsx.utils.encode_cell({ r: lastRow, c: 0 })] = {
            t: "s",
            v: newLocations.CountryId,
        };
        worksheet[xlsx.utils.encode_cell({ r: lastRow, c: 1 })] = {
            t: "s",
            v: newLocations.CityId,
        };
        worksheet[xlsx.utils.encode_cell({ r: lastRow, c: 2 })] = {
            t: "s",
            v: JSON.stringify(newLocations.AddressMultiLanguage),
        };
        worksheet[xlsx.utils.encode_cell({ r: lastRow, c: 3 })] = {
            t: "s",
            v: JSON.stringify(newLocations.TitleMultiLanguage),
        };
        worksheet[xlsx.utils.encode_cell({ r: lastRow, c: 4 })] = {
            t: "s",
            v: JSON.stringify(newLocations.DescriptionMultiLanguage),
        };
        worksheet[xlsx.utils.encode_cell({ r: lastRow, c: 5 })] = {
            t: "s",
            v: JSON.stringify(newLocations.Location),
        };
        worksheet[xlsx.utils.encode_cell({ r: lastRow, c: 6 })] = {
            t: "s",
            v: newLocations.CategoryId,
        };

        range.e.r = lastRow;
        range.e.c = 6;

        worksheet["!ref"] = xlsx.utils.encode_range(range);

        xlsx.writeFile(workbook, existingFile);
    } catch (error) {
        throw new Error(`Error saving to Excel: ${error}`);
    }
}
