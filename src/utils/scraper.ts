import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY ?? "no-api";
const url =
  "https://api.company-information.service.gov.uk/search/companies?q=";
const header = {
  headers: {
    Authorization: "Basic " + btoa(API_KEY + ":"),
  },
  crossDomain: true,
};

export interface companyInfo {
  companyNumber: string;
  companyName: string;
  incorporatedDate: string;
  companyAddress: string;
}

async function companyScaper(companiesNames: string[]): Promise<companyInfo[]> {
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
  return companies;
}

export default companyScaper;
