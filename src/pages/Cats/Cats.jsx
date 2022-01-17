import s from './Cats.module.css';
import { useState, useEffect } from 'react';
import CatCards from './CatCards/CatCards';
import { useLocation, useSearchParams } from 'react-router-dom';

const apiKey = '8198864b-a113-469f-949b-2d1e5b4dcc90';

const Cats = (props) => {

  const [breeds, setBreeds] = useState([]);
  const [isBreedsReady, setIsBreedsReady] = useState(false);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const [currentBreed, setCurrentBreed] = useState('');
  const [isAbleToLoad, setIsAbleToLoad] = useState(true);
  const [options, setOptions] = useState([]);
  const [cats, setCats] = useState([]);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();


  useEffect(() => {
    
      setCurrentBreed(() => {
          let breed = searchParams.get('breed');
          if (breed) return breed;
          return '';
      })

      fetch(`https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`)
      .then(
          (response) => response.json()
      )
      .then(
          (data) => {
              breeds.length === 0 ? setBreeds(data) : setIsBreedsReady(true);
          }
      )

      onPageLoad(currentBreed)
  },[breeds])

  useEffect(() => {
      if (isBreedsReady) {
          setOptions(breeds.map((item, index) => <option value={item.id} key={index}>{item.name}</option>))
      }
  },[isBreedsReady, breeds])

  const onPageLoad = (breed) => {
      if (breed) {
          fetch(`https://api.thecatapi.com/v1/images/search?page=${page}&limit=10&breed_id=${breed}`)
          .then(
              (response) => {
                  return response.json()}
          ).then(
              (data) => {
                  setCats(data)
                  setIsImagesLoaded(true)
                  setPage(1)
                  setIsAbleToLoad(true)
              }
          )   
      }
  }

const onSelectChange = (e) => {
  
      if (e.target.value === '' ) {
          setCats([])
          setIsAbleToLoad(false)
          setIsImagesLoaded(false)
          setCurrentBreed('')
          return
      }

      setCurrentBreed(e.target.value)
      setPage(1)
      fetch(`https://api.thecatapi.com/v1/images/search?page=${page}&limit=10&breed_id=${e.target.value}`)
      .then(
          (response) => {
              return response.json()}
      ).then(
          (data) => {
              setCats(data)
              setIsImagesLoaded(true)
              setIsAbleToLoad(true)
          }
      )
  }

  const loadMore = () => {
      fetch(`https://api.thecatapi.com/v1/images/search?page=${page + 1}&limit=10&breed_id=${currentBreed}`)
      .then(
        (response) => {
            return response.json()}
        )
      .then(
        (data) => {
            let newCats = []
            data.forEach(cat => {
                let newCat = cats.find(newCat => {
                    return cat.id === newCat.id
                })
                if(!newCat) {
                    newCats.push(cat)
                }
            })
            if(!newCats.length) {
                setIsAbleToLoad(false)
            }
            setCats((oldCats) => ([...oldCats, ...newCats]))
        }
    )
      setIsImagesLoaded(true)
      setPage(page + 1)
  }

  if(!isBreedsReady) {
      return <div className={s.loading}>Searching cats!</div>
  } else {
      return(
          <section className={s.searchSection}>
              <h1 className={s.title}>Search your cat!</h1>
              <form className={s.breeds}>
                <select className={s.breedsList} value={currentBreed} onChange={onSelectChange}>
                  <option value=''>Select Breed</option>
                  {options}
                </select>
              </form>
              <CatCards cats={cats}/>
              {
                (isImagesLoaded && isAbleToLoad) ?
                <button className={s.loadMoreVisible} onClick={loadMore}>Load more</button> :
                <button disabled style={{display: 'none'}} className={s.loadMore}>Load more</button>
              }
          </section>
      )
  }
}

export default Cats;