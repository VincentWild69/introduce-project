import s from './Quotes.module.css';
import { quoteAPI } from '../../api/api';
import { useState, useEffect } from 'react';
import { randomNumber } from '../../util/randomNumber';
import Quote from './Quote/Quote';


const Quotes = (props) => {
  
  let [lang, setLang] = useState('ru');
  let [quote, setQuote] = useState('To be or not to be?');

  const changeQuote = (lang) => {
    quoteAPI.getQuote(lang).then(data => {
      setQuote(data)
    })
  }

  useEffect(() => {
    changeQuote(lang)
  }, [lang])


  return (
    <div className={s.quotesContainer}>
      <h2>Random quotes for you</h2>
      <div className={s.quotesNav}>
        <div>
          <p>Change language</p>
          <div>
            <label>
              <input type='radio' name='langswitch' value='ru'/>
              <span>ru</span>
            </label>
            <label>
              <input type='radio' name='langswitch' value='en'/>
              <span>en</span>
            </label>
          </div>
        </div>
        <div>
          <button onClick={() => changeQuote(lang)}>Genererate quote</button>
        </div>
      </div>
      <Quote quote={quote} />
    </div>
  );
}

export default Quotes;