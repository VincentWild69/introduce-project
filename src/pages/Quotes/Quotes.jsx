import s from "./Quotes.module.css";
import { useState, useEffect } from "react";
import Quote from "./Quote/Quote";
import axios from "axios";
import Loader from './../../components/Loader/MainLoader/Loader';


const Quotes = () => {
  let [lang, setLang] = useState("ru");
  let [quote, setQuote] = useState({});
  let [isLoading, setIsLoading] = useState(false);


  const changeQuote = () => {
    setIsLoading(true);
    axios
      .get(`https://favqs.com/api/qotd`)
      .then((res) => {
        setQuote(res.data.quote);
        setIsLoading(false);
      })
  };

  const changeLang = (e) => {
    setLang(e.target.value);
  };

  useEffect(() => {
    changeQuote();
  }, []);


  return (
    <div className={s.quotesContainer}>
      <h2>Random quotes for you</h2>
      <div className={s.quotesNav}>
        {/* <div>
          <p>Change language</p>
          <div className={s.quotesRadios}>
            <label>
              <input
                type="radio"
                name="langswitch"
                value="ru"
                checked={lang === "ru"}
                onChange={changeLang}
              />
              <span>Rus</span>
            </label>
            <label>
              <input
                type="radio"
                name="langswitch"
                value="en"
                checked={lang === "en"}
                onChange={changeLang}
              />
              <span>Eng</span>
            </label>
          </div>
        </div> */}
        <div>
          <button className={s.generateBtn} onClick={changeQuote}>
            Genererate quote
          </button>
        </div>
      </div>
      {isLoading ? <Loader /> : <Quote quote={quote} />}
    </div>
  );
};

export default Quotes;
