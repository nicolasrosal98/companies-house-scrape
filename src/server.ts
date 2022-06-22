import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cleanSearchList from "./utils/cleanSearchList";
import companyScraper from "./utils/scraper";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});

app.get("/:listOfCompanies", async (req, res) => {
  const companies = req.params.listOfCompanies;
  const listOfCompanies = cleanSearchList(companies);
  const companyInformation = await companyScraper(listOfCompanies);
  await res.json(companyInformation);
});

const port = process.env.PORT;
if (!port) {
  throw "Missing PORT environment variable.  Set it in .env file.";
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
