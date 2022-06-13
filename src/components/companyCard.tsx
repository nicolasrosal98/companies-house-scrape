import { companyInfo } from "../scraper";

export default function CompanyCard(company: companyInfo): JSX.Element {
  return (
    <div>
      <h1>{company.companyName}</h1>
      <h3>Company Number: {company.companyNumber}</h3>
      <h3>Address: {company.companyAddress}</h3>
      <h3>Incorporation Date: {company.incorporatedDate}</h3>
    </div>
  );
}
