import s from './Home.module.css';
import SvgSelector from './../../components/SvgSelector/SvgSelector';
import { useTranslation } from 'react-i18next';





const Home = () => {

  const { t } = useTranslation();

  return (
    <div className={s.homeContainer}>
      <h2 className={s.mainTitle}>{t("home.welcome-title")}</h2>
        <article className={s.article}>
          <h3 className={s.articleTitle}><span className={s.beforeIcon}><SvgSelector id='about' /></span>{t("home.about-me-title")}</h3>
          <p className={s.aboutText}>{t("big-texts.about-me")}</p>
        </article>
        <article className={s.article}>
          <h3 className={s.articleTitle}><span className={s.beforeIcon}><SvgSelector id='skills' /></span>{t("home.skills-title")}</h3>
          <div>
            <ul className={s.skillList}>
              <li className={s.skillItem}>
                <span className={s.skillName}>{t("home.technology")}:</span>
                <ul className={s.technoSkillList}>
                  <li className={s.technoSkillItem}>HTML:<span className={s.tecnoSkillDesc}> {t("home.confident")}</span></li>
                  <li className={s.technoSkillItem}>CSS: <span className={s.tecnoSkillDesc}>{t("home.confident")}</span></li>
                  <li className={s.technoSkillItem}>Java script: <span className={s.tecnoSkillDesc}>{t("home.confident")}</span></li>
                  <li className={s.technoSkillItem}>GIT: <span className={s.tecnoSkillDesc}>{t("home.average")}</span></li>
                  <li className={s.technoSkillItem}>React: <span className={s.tecnoSkillDesc}>{t("home.beginner")}</span></li>
                  <li className={s.technoSkillItem}>Dev tools:<span className={s.tecnoSkillDesc}> {t("home.confident")}</span></li>
                </ul>
              </li>
              <li className={s.skillItem}>
                <span className={s.skillName}>{t("home.soft-skills")}:</span>
                <span> {t("home.soft-skills-list")}</span>
              </li>
              <li className={s.skillItem}>
                <span className={s.skillName}>{t("home.english-proficiency")}:</span>
                <span> A2</span>
              </li>
            </ul>
          </div>
        </article>
    </div>
  );
}

export default Home;