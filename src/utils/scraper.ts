import dotenv from "dotenv";
import axios from "axios";
// import XLSX = require("xlsx");

dotenv.config();

const API_KEY = process.env.API_KEY ?? "no-api";
const url =
  "https://api.company-information.service.gov.uk/search/companies?q=";

interface companyInfo {
  companyNumber: string;
  companyName: string;
  incorporatedDate: string;
  companyAddress: string;
}

async function companyScaper(
  companiesNames: string[]
): Promise<companyInfo[] | string> {
  const companies: companyInfo[] = [];
  try {
    console.log("scraping for company info", companiesNames);
    for (const companyName of companiesNames) {
      console.log({ companyName });
      const finalUrl = url + `${companyName.replace(" ", "-")}`;
      const response = await axios(finalUrl, {
        headers: { Authorization: API_KEY },
      });
      if (response.data.items.length > 0) {
        const companyInformation = {
          companyNumber: response.data.items[0].company_number,
          companyName: response.data.items[0].title,
          incorporatedDate: response.data.items[0].date_of_creation,
          companyAddress: `${response.data.items[0].address.address_line_1}, ${response.data.items[0].address.postal_code}, ${response.data.items[0].address.locality}, ${response.data.items[0].address.country}`,
        };
        companies.push(companyInformation);
      }
    }
  } catch (error) {
    console.error(error);
    return "Error: " + error;
  }
  // const sheet = XLSX.utils.json_to_sheet(companies);
  // const excel = XLSX.utils.book_new();
  // XLSX.utils.book_append_sheet(excel, sheet, "Company Information");
  // XLSX.writeFile(excel, "./companyInformation/companyinfo.xlsx");
  return companies;
}

export default companyScaper;
// (async function () {
//   const response = await companyScaper(["Zalario", "Uber Eats"]);
//   return response;
// })();
