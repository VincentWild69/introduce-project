import s from './Quotes.module.css';
import { quoteAPI } from '../../api/api';
import { useState, useEffect } from 'react';
import Quote from './Quote/Quote';
import Preloader from './../../components/Preloader/Preloader';


const Quotes = (props) => {

  let [lang, setLang] = useState('ru');
  let [quote, setQuote] = useState('To be or not to be?');

  const changeQuote = (lang) => {
    quoteAPI.getQuote(lang).then(data => {
      if (data.quoteText === quote.quoteText) {
        changeQuote(lang)
        console.log('repeat', 'api подглючивает, иногда присылает одну и ту же цитату подряд, и тут небольшая рекурсия')
      }
      setQuote(data)
    })

  }

  const changeLang = (e) => {
    setLang(e.target.value);
  }

  useEffect(() => {
    changeQuote(lang);
  }, [])


  return (
    <div className={s.quotesContainer}>
      <h2>Random quotes for you</h2>
      <div className={s.quotesNav}>
        <div>
          <p>Change language</p>
          <div className={s.quotesRadios}>
            <label>
              <input type='radio' name='langswitch' value='ru' checked={lang === 'ru'} onChange={(e) => changeLang(e)}/>
              <span>Rus</span>
            </label>
            <label>
              <input type='radio' name='langswitch' value='en' checked={lang === 'en'} onChange={(e) => changeLang(e)}/>
              <span>Eng</span>
            </label>
          </div>
        </div>
        <div>
          <button className={s.generateBtn} onClick={() => changeQuote(lang)}>Genererate quote</button>
        </div>
      </div>
      <Quote quote={quote} />
    </div>
  );
}

export default Quotes;