import dotenv from "dotenv";
import axios from "axios";
import XLSX = require("xlsx");

dotenv.config();

const API_KEY = process.env.API_KEY ?? "no-api";
const url =
  "https://api.company-information.service.gov.uk/search/companies?q=";
const header = {
  headers: {
    Authorization: API_KEY,
  },
};

interface companyInfo {
  companyNumber: string;
  companyName: string;
  incorporatedDate: string;
  companyAddress: string;
}

async function companyScaper(companiesNames: string[]): Promise<void> {
  const companies: companyInfo[] = [];
  try {
    for (const companyName of companiesNames) {
      const response = await axios(
        url + `${companyName.replace(" ", "-")}`,
        header
      );
      const companyInformation = {
        companyNumber: response.data.items[0].company_number,
        companyName: response.data.items[0].title,
        incorporatedDate: response.data.items[0].date_of_creation,
        companyAddress: `${response.data.items[0].address.address_line_1}, ${response.data.items[0].address.postal_code}, ${response.data.items[0].address.locality}, ${response.data.items[0].address.country}`,
      };
      companies.push(companyInformation);
    }
  } catch (error) {
    console.error(error);
  }
  const sheet = XLSX.utils.json_to_sheet(companies);
  const excel = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(excel, sheet, "Company Information");
  XLSX.writeFile(excel, "./companyInformation/companyinfo.xlsx");
}

(async function () {
  const response = await companyScaper(["Zalario", "Uber Eats"]);
  return response;
})();
