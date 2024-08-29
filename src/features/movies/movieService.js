import axios from 'axios'

const API_URL = 'http://localhost:5000/api/v1/movies/'

const getAllMovies = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const addNewLike = async (movieId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.patch(API_URL + 'likes/' + movieId, {}, config)
  return response.data
}

const deleteOneMovie = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(API_URL + id, config)
  return response.data
}

const createOneMovie = async (movieData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, movieData, config)
  return response.data
}

export default {
  getAllMovies,
  addNewLike,
  deleteOneMovie,
  createOneMovie
}
