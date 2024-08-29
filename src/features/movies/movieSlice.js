import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import movieService from './movieService'

const initialState = {
  movies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const getAllMovies = createAsyncThunk('movies/get', async (_, thunkAPI) => {
  try {
    return await movieService.getAllMovies()
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const addNewLike = createAsyncThunk('movies/patch/likes', async (movieId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await movieService.addNewLike(movieId, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteOneMovie = createAsyncThunk('movies/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await movieService.deleteOneMovie(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const createOneMovie = createAsyncThunk('movies/post', async (movieData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await movieService.createOneMovie(movieData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.movies = action.payload
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(addNewLike.fulfilled, (state, action) => {
        state.movies = state.movies.map((movie) => {
          if (movie._id === action.payload._id) {
            movie.likes = movie.likes + 1
          }
          return movie
        })
      })
      .addCase(addNewLike.rejected, (state, action) => {
        state.isError = true
        state.message = action.paylaod
      })
      .addCase(deleteOneMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteOneMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies = state.movies.filter((movie) => movie._id !== action.payload._id)
      })
      .addCase(deleteOneMovie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createOneMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOneMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies = state.movies.push(action.payload)
      })
      .addCase(createOneMovie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = movieSlice.actions
export default movieSlice.reducer
