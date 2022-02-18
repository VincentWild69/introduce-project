import s from "./CatCards.module.css";
import { NavLink } from "react-router-dom";
import { PropTypes } from "prop-types";

const CatCard = ({ cats }) => {


  if (!cats?.length) {
    return <div className={s.noCats}>Please, select breed</div>;
  } else {
    return (
      <div className={s.cards}>
        {cats.map(item => {
          if (item) {
            return (
              <div key={item.id} className={s.card}>
                <img className={s.catImage} alt="pic" src={item.url}></img>
                <NavLink to={`/cats/${item.id}`} className={s.cardLink}>
                  View cat
                </NavLink>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }
};

CatCard.propTypes = {
  cats: PropTypes.array,
};

export default CatCard;
