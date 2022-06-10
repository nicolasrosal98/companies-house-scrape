import { useEffect, useState } from "react";
import formatInput from './utils/formatInput';
import companyScaper, { companyInfo } from './scraper';

function App(): JSX.Element {
    const [inputContent, setInputContent] = useState<string>('');
    const [listOfCompanies, setListOfCompanies] = useState<string[]>([]);
    const [scrapeResult, setScrapeResult] = useState<companyInfo[]>();

    const handleChange = (e) => {
        setInputContent(e.target.value)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setListOfCompanies([...formatInput(inputContent)]);
        setInputContent('');
        setScrapeResult(await companyScaper(listOfCompanies));
      };

    useEffect(() => {
        console.log(scrapeResult)
    }, [scrapeResult])

    return (
        <div>
            <form
                onSubmit={handleSubmit}
            >
                <input 
                    type="text" 
                    placeholder="e.g. Academy, Uber, Deliveroo"
                    onChange={handleChange}
                    value={inputContent}
                ></input>
                <input 
                    type="submit"
                ></input>
            </form>
            <h1>{}</h1>
        </div>
      
    );
  }
  
  export default App;