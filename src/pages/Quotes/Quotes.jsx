import s from './Quotes.module.css';
// import { quoteAPI } from '../../api/api';
import { useState, useEffect } from 'react';
import Quote from './Quote/Quote';


const Quotes = (props) => {

  let [lang, setLang] = useState('ru');
  let [quote, setQuote] = useState('To be or not to be?');


  //тут использую соединение через прокси, чтобы можно было делать запросы в обход корс ошибки, настройки прокси в файле setupProxy.js, но все равно работает только на локальном сервере
  const changeQuote = () => {
    fetch(`/api/1.0/?method=getQuote&format=json&lang=${lang}`)
    .then(
      response => response.json())
    .then(
      data => {
      if (data.quoteText === quote.quoteText) {
        changeQuote(lang)
        console.log('repeat,', 'api подглючивает, иногда присылает одну и ту же цитату подряд, и тут небольшая рекурсия')
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
              <input type='radio' name='langswitch' value='ru' checked={lang === 'ru'} onChange={changeLang}/>
              <span>Rus</span>
            </label>
            <label>
              <input type='radio' name='langswitch' value='en' checked={lang === 'en'} onChange={changeLang}/>
              <span>Eng</span>
            </label>
          </div>
        </div>
        <div>
          <button className={s.generateBtn} onClick={changeQuote}>Genererate quote</button>
        </div>
      </div>
      <Quote quote={quote} />
    </div>
  );
}

export default Quotes;