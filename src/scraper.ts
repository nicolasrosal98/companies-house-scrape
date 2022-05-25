import dotenv from "dotenv";
import axios from "axios";
const fs = require("fs");

dotenv.config();

const API_KEY = process.env.API_KEY ?? "no-api";
const url =
  "https://api.company-information.service.gov.uk/search/companies?q=";
const header = {
  headers: {
    Authorization: API_KEY,
  },
};

function companyScaper(companiesNames: string[]): void {
  for (const companyName of companiesNames) {
    axios(url + `${companyName.replace(" ", "-")}`, header)
      .then((response) => {
        const companyInformation = {
          companyNumber: response.data.items[0].company_number,
          companyName: response.data.items[0].title,
          incorporatedDate: response.data.items[0].date_of_creation,
          companyAddress: `${response.data.items[0].address.address_line_1}, ${response.data.items[0].address.postal_code}, ${response.data.items[0].address.locality}, ${response.data.items[0].address.country}`,
        };
        const companyInfo = JSON.stringify(companyInformation);
        fs.writeFile(
          `./companyInformation/${companyName}.json`,
          companyInfo,
          (err: any) => {
            if (err) return err;
          }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

companyScaper(["Zalario", "Uber Eats"]);