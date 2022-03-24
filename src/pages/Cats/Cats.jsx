import s from "./Cats.module.css";
import { useState, useEffect } from "react";
import CatCards from "./CatCards/CatCards";
import { useSearchParams } from "react-router-dom";
import Loader from "./../../components/Loader/Loader";
import axios from "axios";
import { createAxiosError } from './../../util/createAxiosError';


const apiKey = "8198864b-a113-469f-949b-2d1e5b4dcc90";

const Cats = () => {
  const [breeds, setBreeds] = useState(null);
	const [isFetching, setIsFetching] = useState(true);
  const [currentBreed, setCurrentBreed] = useState('');
  const [isMoreCats, setIsMoreCats] = useState(false);
  const [cats, setCats] = useState(null);
  const [page, setPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
	const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState(null);

	const portionSize = 6;

  useEffect(() => {
		if (searchParams.has('breed')) {
			setCurrentBreed(searchParams.get('breed'));
		}
    fetchCats(searchParams.get('breed'));
  }, [searchParams]);

	useEffect(() => {
		if (!breeds) {
			setIsFetching(true);
			axios.get(`https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`)
      .then(res => res.data)
      .then(data => {
        setBreeds(data);
				setIsFetching(false);
      })
      .catch(error => {
        createAxiosError(error, 'Cant fetch breeds', setError);
        setIsFetching(false);
      });
		}
	}, [])


  const fetchCats = breed => {
		setIsFetching(true);
    if (breed) {
      axios.get(`https://api.thecatapi.com/v1/images/search?page=0&limit=${portionSize.toString()}&breed_id=${breed}`)
        .then(res => res.data)
        .then(data => {
          setCats(data);
          setIsFetching(false);
					if (data.length === portionSize) {
						setIsMoreCats(true)
					} else {
						setIsMoreCats(false)
					};
        })
        .catch(error => {
          createAxiosError(error, 'Cant fetch cats', setError);
          setIsFetching(false);
        });
    } else {
			setIsFetching(false);
		}
  };

  const handleSelectChange = e => {
		if (e.target.value === '') {
			setSearchParams({})
		} else {
			setSearchParams({breed: e.target.value});
		}
		setCats(null);
		setIsMoreCats(false);
		setCurrentBreed(e.target.value);
		setPage(0);
  };

  const loadMore = () => {
		setIsFetchingMore(true);
    axios.get(`https://api.thecatapi.com/v1/images/search?page=${page + 1}&limit=${portionSize.toString()}&breed_id=${currentBreed}`)
      .then(res => res.data)
      .then(data => {
        let newCats = data.reduce((acc, cat) => {
          if (!cats.find((oldCat) => {
              return cat.id === oldCat.id;
            })
          ) {
            return (acc = [...acc, cat]);
          } else return acc;
        }, []);

        if (!newCats.length) {
          setIsMoreCats(false);
        }

        setCats((oldCats) => [...oldCats, ...newCats]);
				setPage(page + 1);
				setIsFetchingMore(false);
      })
      .catch(error => {
        if (error.response) {
          console.log(`Error ${error.response.status}: ${error.response.data.message}`);
        } else {
          console.log(error);
        }
        setIsFetchingMore(false);
      });;
  };

  if (isFetching) {
    return <Loader boxHeight="70vh" />;
  } else  if (error) {
    return <div style={{marginTop: '20vh', textAlign: 'center'}}>{error}</div>
  } else {
    return (
      <section className={s.catsContainer}>
        <h1 className={s.title}>Search your cat!</h1>
        <form className={s.breeds}>
          <select
            className={s.breedsList}
            value={currentBreed}
            onChange={handleSelectChange}
          >
            <option value=''>Select Breed</option>
            {breeds?.map(item => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </form>
        <CatCards cats={cats} />
        {isFetchingMore ? <Loader /> : (isMoreCats &&
					<button className={s.loadMore} onClick={loadMore}>
						Load more
					</button>)
				}
      </section>
    );
  }
};

export default Cats;
