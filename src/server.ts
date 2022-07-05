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
  console.log(req.params);
  const companies = req.params.listOfCompanies;
  const listOfCompanies = cleanSearchList(companies);
  const response = await companyScraper(listOfCompanies);
  if (typeof response === "string") {
    res.status(500).send(response);
  } else {
    res.json(response);
  }
});

const port = process.env.PORT;
if (!port) {
  throw "Missing PORT environment variable.  Set it in .env file.";
}
app.listen(port, () => {
  console.log(`Nico's server is running on port ${port}`);
});
