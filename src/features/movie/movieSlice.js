import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api.js';
import { APIKey } from '../../api/MovieApiKey.js';

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
  status: 'idle',
  error: null
};

export const fetchData = createAsyncThunk("movies/fetchData", async (name) => {
  const movieText = "Harry"
  const response = await api.get(`?apikey=${APIKey}&s=${name}&type=movie`)
  // // `?apiKey=${APIKey}&s=${movieText}&type=movie`
  // console.log('What contains response object ', response.data)
  return response.data
})

export const fetchDataShows = createAsyncThunk("shows/fetchDataShows", async (name) => {
  const seriesText = "Friends";
  const response = await api.get(`?apiKey=${APIKey}&s=${name}&type=series`)
  return response.data;
})

export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchAsyncMovieOrShowDetail', async (imdbID) => {
  const response = await api.get(`?apikey=${APIKey}&i=${imdbID}&plot=full`);
  // https://www.omdbapi.com/?apikey=b4b5844&i=tt1285016&plot=full
  console.log(response);
  return response.data;
})


export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // removeSelectedMovieOrShow(state, action) {
    //   state.selectMovieOrShow = {}
    // }
    removeSelectedMovieOrShow : (state) =>{
      state.selectMovieOrShow = {}
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchData.pending, (state, action) => {
      state.status = 'loading';
    })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.movies = action.payload;

      })

      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(fetchDataShows.fulfilled, (state, action) => {
        state.shows = action.payload;
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, action) => {
        state.selectMovieOrShow = action.payload;
        console.log(state.selectMovieOrShow);
      })
  }
})

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllData = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getStatus = (state) => state.movies.status;
export const getError = (state) => state.movies.error;
export const getselectMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;

