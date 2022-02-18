import s from "./Cats.module.css";
import { useState, useEffect } from "react";
import CatCards from "./CatCards/CatCards";
import { useSearchParams } from "react-router-dom";
import Loader from "./../../components/Loader/MainLoader/Loader";

const apiKey = "8198864b-a113-469f-949b-2d1e5b4dcc90";

const Cats = () => {
  const [breeds, setBreeds] = useState(null);
	const [isFetching, setIsFetching] = useState(true);
  const [currentBreed, setCurrentBreed] = useState('');
  const [isMoreCats, setIsMoreCats] = useState(false);
  const [cats, setCats] = useState([]);
  const [page, setPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
	const [isFetchingMore, setIsFetchingMore] = useState(false);

	const portionSize = 5;


	// if (searchParams.has('breed')) {
	// 	setCurrentBreed(searchParams.get('breed'));
	// }


  useEffect(() => {

		let curBreed = '';

		if (searchParams.has('breed')) {
			curBreed = searchParams.get('breed');
			setCurrentBreed(curBreed);
		}

    fetchCats(currentBreed);
		
  }, [searchParams]);

	useEffect(() => {
		if (!breeds) {
			setIsFetching(true);
			fetch(`https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        setBreeds(data);
				setIsFetching(false);
      });
		}
	}, [])




  const fetchCats = breed => {
		setIsFetching(true);
    if (breed) {
			setIsFetching(true);
      fetch(`https://api.thecatapi.com/v1/images/search?page=0&limit=${portionSize.toString()}&breed_id=${breed}`)
        .then(res =>res.json())
        .then(data => {
          setCats(data);
          setIsFetching(false);
          setPage(page + 1);
					if (data.length === portionSize) {
						setIsMoreCats(true)
					} else {
						setIsMoreCats(false)
					};
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
    fetch(`https://api.thecatapi.com/v1/images/search?page=${page + 1}&limit=${portionSize.toString()}&breed_id=${currentBreed}`)
      .then(res => res.json())
      .then(data => {
        let newCats = data.reduce((acc, cat) => {
          if (
            !cats.find((oldCat) => {
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
      }
			);
  };

  if (isFetching) {
    return <Loader height="70vh" />;
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
        {
					isFetchingMore ? <Loader /> : (isMoreCats &&
						<button className={s.loadMore} onClick={loadMore}>
							Load more
						</button>)

				// isMoreCats &&
        //   <button className={s.loadMore} onClick={loadMore}>
        //     Load more
        //   </button>
        }
      </section>
    );
  }
};

export default Cats;
