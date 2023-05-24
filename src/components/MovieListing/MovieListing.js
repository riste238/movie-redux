import React from 'react'
import {  useSelector } from 'react-redux';
import {getAllShows, getAllData, getStatus, getError } from '../../features/movie/movieSlice';
import MovieCard from '../MovieCard/MovieCard';
import "./MovieListing.scss"
import Slider from "react-slick";

const MovieListing = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

    const movies = useSelector(getAllData);
    const movieStatus = useSelector(getStatus);
    const error = useSelector(getError);
    const shows = useSelector(getAllShows);
// console.log(shows.Search);

    let content, renderShows;
    if (movieStatus === 'loading') {
        content = <p>Loading...</p>
    }
    else if (movieStatus === 'succeeded') {
        content = movies.Search.map((movie, index) => {
            return <MovieCard key={index} data={movie} />
        })

    }
    else if (movieStatus === 'failed') {
        content = <p>{error}</p>
    }

    renderShows =
    shows.Response === "True" ? (
      shows.Search.map((show, index) => <MovieCard key={index} data={show} />)
    ) : (
      <div className="shows-error">
        <h3>{shows.Error}</h3>
      </div>
    );
    return (
        <div className="movie-wrapper">
        <div className="movie-list">
          <h2>Movies</h2>
          <div className="movie-container">
            <Slider
            {...settings}
            >{content}</Slider>
            </div>
        </div>
        <div className="show-list">
          <h2>Shows</h2>
          <div className="movie-container">
            <Slider {...settings}>
            {renderShows} </Slider></div>
        </div>
      </div>
    )
}

export default MovieListing
