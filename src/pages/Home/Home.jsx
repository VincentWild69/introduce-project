import s from './Home.module.css';
import SvgSelector from './../../components/SvgSelector/SvgSelector';



const Home = () => {
  return (
    <div className={s.homeContainer}>
      <h2 className={s.mainTitle}>Welcome to my introduce page!</h2>
        <article className={s.article}>
          <h3 className={s.articleTitle}><span className={s.beforeIcon}><SvgSelector id='about' /></span>About me</h3>
          <p className={s.aboutText}>Hello! My name is Alexey, I live in a small town in Ukraine. Due to the lack of job offers in my city, I want to study the profession of a web developer in order to be able to work remotely. I have always been fascinated by the "magic" of talking with a machine, when you can learn languages that allow you to do some cool things using a computer and a well-written program. Now I am at the beginning of the road, but I hope to become a professional in web development in the near future, I am ready to put a lot of effort into this.</p>
        </article>
        <article className={s.article}>
          <h3 className={s.articleTitle}><span className={s.beforeIcon}><SvgSelector id='skills' /></span>Skills</h3>
          <div>
            <ul className={s.skillList}>
              <li className={s.skillItem}>
                <span className={s.skillName}>Technology:</span>
                <ul className={s.technoSkillList}>
                  <li className={s.technoSkillItem}>HTML:<span className={s.tecnoSkillDesc}> confident</span></li>
                  <li className={s.technoSkillItem}>CSS: <span className={s.tecnoSkillDesc}>confident</span></li>
                  <li className={s.technoSkillItem}>Java script: <span className={s.tecnoSkillDesc}>confident</span></li>
                  <li className={s.technoSkillItem}>GIT: <span className={s.tecnoSkillDesc}>average</span></li>
                  <li className={s.technoSkillItem}>React: <span className={s.tecnoSkillDesc}>beginner</span></li>
                  <li className={s.technoSkillItem}>Dev tools:<span className={s.tecnoSkillDesc}> confident</span></li>
                </ul>
              </li>
              <li className={s.skillItem}>
                <span className={s.skillName}>Soft skills:</span>
                <span> adaptability, communication, creative thinking, critical thinking, positivity, flexibility</span>
              </li>
              <li className={s.skillItem}>
                <span className={s.skillName}>English proficiency:</span>
                <span> A2</span>
              </li>
            </ul>
          </div>
        </article>
    </div>
  );
}

export default Home;