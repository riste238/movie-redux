import React, { useEffect } from 'react'
import MovieListing from '../MovieListing/MovieListing'
import { useDispatch } from 'react-redux';
import { fetchData, fetchDataShows} from '../../features/movie/movieSlice';

const Home = () => {

  const dispatch = useDispatch();
const movie = "Harry";
const serie = "Friends"
  useEffect(() => {
        dispatch(fetchData(movie))
        dispatch(fetchDataShows(serie))
    
}, [dispatch])

  return (
    <div>
      <MovieListing />
    </div>
  )
}

export default Home
