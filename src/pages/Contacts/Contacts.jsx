import s from './Contacts.module.css';



const Contacts = () => {
  return (
    <div className={s.contactsContainer}>
      <h2 className={s.mainTitle}>My contacts</h2>
      <ul className={s.contactList}>
        <li className={s.contactItem}>
          Telegram:&nbsp;
          <a href="https://t.me/VincentGreen" className={s.contactLink} target="_blank" rel="noreferrer">@VincentGreen</a>
        </li>
        <li className={s.contactItem}>
          Email:&nbsp;
          <a href="mailto:alexeyk90@gmail.com" className={s.contactLink} target="_blank" rel="noreferrer">alexeyk90@gmail.com</a>
        </li>
        <li className={s.contactItem}>
          Github:&nbsp;
          <a href="https://github.com/VincentWild69" className={s.contactLink} target="_blank" rel="noreferrer">VincentWild69</a>
          </li>
        <li className={s.contactItem}>
          Web:&nbsp;
          <a href="http://vincent.pp.ua" className={s.contactLink} target="_blank" rel="noreferrer">vincent.pp.ua</a>
          </li>
        <li className={s.contactItem}>
          CodeWars:&nbsp;
          <a href="https://www.codewars.com/users/VincentWild69" className={s.contactLink} target="_blank" rel="noreferrer">My codewars</a>
        </li>
      </ul>
    </div>
  );
}

export default Contacts;