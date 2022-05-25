import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const API_KEY = process.env.API_KEY ?? 'no-api'
const url = "https://api.company-information.service.gov.uk/search/companies?q="
const header = {
    headers: {
        'Authorization': API_KEY
    }
};

interface companyInfo {
    companyNumber: string;
    companyName: string;
    incorporatedDate: string;
    companyAddress: {
        country: string;
        postal_code: string;
        locality: string;
        address_line_1: string;
    }
}

function companyScaper(companyName: string[]): companyInfo[] {
    const add: companyInfo[] = [];
    axios(url+`${companyName}`, header)
        .then(response => {
            const companyInformation = {
                companyNumber: response.data.items[0].company_number,
                companyName: response.data.items[0].title,
                incorporatedDate: response.data.items[0].date_of_creation,
                companyAddress: {
                    country: response.data.items[0].address.country,
                    postal_code: response.data.items[0].address.postal_code,
                    locality: response.data.items[0].address.locality,
                    address_line_1: response.data.items[0].address.address_line_1
                }
            }
            add.push(companyInformation)
            return add
        })
        .catch(err => {
            console.error(err)
        })
    return add
}

console.log(companyScaper(['Zalario']));

