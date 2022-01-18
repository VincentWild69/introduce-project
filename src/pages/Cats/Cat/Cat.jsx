import s from './Cat.module.css';
import { useState, useEffect } from 'react';
import { NavLink, useMatch } from 'react-router-dom';



const Cat = () => {

  const [cat, setCat] = useState(null)

  let match = useMatch('/cats/:id/');
  let id = match.params.id;

  
  useEffect(() => {

      fetch(`https://api.thecatapi.com/v1/images/${id}`)
        .then(
          (response) => response.json())
        .then(
          (data) => setCat(data))

  },[])

  
  if(!cat) {
      return <div className={s.loading}>Loading</div>
  } else {
      return (
              <div className={s.catItem}>
                  <NavLink to={`/cats/?breed=${cat.breeds[0].id}`} className={s.backBtn}>Back</NavLink>
                  <img className={s.catImage} src={cat.url} alt={cat.breeds.name}></img> 
                  <h2 className={s.catInfo}><b>{cat.breeds[0].name}</b></h2>
                  <p className={s.catInfo}>Origin: {cat.breeds[0].origin}</p>
                  <p className={s.catInfo}>{cat.breeds[0].temperament}</p>
                  <p className={s.catInfo}>{cat.breeds[0].description}</p>
              </div>
      )
  }
}

export default Cat;