import { useEffect, useState } from "react";
import formatInput from "./utils/formatInput";
import companyScaper, { companyInfo } from "./utils/scraper";
import CompanyCard from "./components/companyCard";
import ReactPaginate from "react-paginate";

function App(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(0);
  const [inputContent, setInputContent] = useState<string>("");
  const [listOfCompanies, setListOfCompanies] = useState<string[]>([]);
  const [scrapeResult, setScrapeResult] = useState<companyInfo[]>([]);

  const PER_PAGE = 2;

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;
  const currentPageData = scrapeResult
    .slice(offset, offset + PER_PAGE)
    .map((res, index) => (
      <div className="company-card">
        <CompanyCard
          key={index}
          companyNumber={res.companyNumber}
          companyAddress={res.companyAddress}
          companyName={res.companyName}
          incorporatedDate={res.incorporatedDate}
        />
      </div>
    ));
  const pageCount = Math.ceil(scrapeResult.length / PER_PAGE);

  const handleChange = (e) => {
    setInputContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setListOfCompanies([...formatInput(inputContent)]);
    setInputContent("");
    setScrapeResult(await companyScaper(listOfCompanies));
  };

  useEffect(() => {
    console.log(scrapeResult);
  }, [scrapeResult]);

  return (
    <div className="body-root">
      <header>
        <a href="logo" className="logo">
          <img alt="logo" src="https://i.ibb.co/ZMhR8T5/logo.png"></img>
        </a>
        <div className="signinbuttons">
          <button type="button" className="button">
            Login
          </button>
          <button type="button" className="button">
            Sign-up
          </button>
        </div>
      </header>
      <div className="main-content">
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="e.g. Academy, Uber, Deliveroo"
            onChange={handleChange}
            value={inputContent}
          ></input>
          <input type="submit" className="button"></input>
        </form>
        <div className="cards">
          {currentPageData}
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"→ Next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            activeClassName={"pagination__link--active"}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
