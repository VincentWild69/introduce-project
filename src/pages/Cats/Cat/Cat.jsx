import s from './Cat.module.css';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Loader from './../../../components/Loader/Loader';



const Cat = () => {

  const [cat, setCat] = useState(null)

  let params = useParams();
  
  
  useEffect(() => {
    fetch(`https://api.thecatapi.com/v1/images/${params.id}`)
      .then(res => res.json())
      .then(data => setCat(data))
  },[])

  if(!cat) {
      return <Loader boxHeight='400px' />
  } else {
      return (
        <div className={s.catItem}>
            <NavLink to={`/cats/?breed=${cat.breeds[0]?.id}`} className={s.backBtn}>Back</NavLink>
            <img className={s.catImage} src={cat?.url} alt={cat.breeds?.name}></img> 
            <h2>{cat.breeds[0].name}</h2>
            <div className={s.catInfo}>
              <p><span>Origin: </span>{cat.breeds[0]?.origin}</p>
              <p><span>Alternative names: </span>{cat.breeds[0]?.alt_names || 'none'}</p>
              <p><span>Temperament: </span>{cat.breeds[0]?.temperament}</p>
              <p>{cat.breeds[0]?.description}</p>
            </div>
        </div>
      )
  }
}

export default Cat;