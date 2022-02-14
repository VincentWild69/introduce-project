import s from "./LangSelect.module.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const LangSelect = () => {
  const { i18n } = useTranslation();

  let [lang, setLang] = useState(localStorage.getItem("i18nextLng") || "en");

  const changeLang = (e) => {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div>
      <select value={lang} onChange={changeLang} className={s.langSelect}>
        <option value="ru">ru</option>
        <option value="en">en</option>
      </select>
    </div>
  );
};

export default LangSelect;
