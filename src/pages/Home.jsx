import { useEffect } from 'react'
import MovieContainer from '../components/MovieContainer'
import Movie from '../components/Movie'
import { useDispatch, useSelector } from 'react-redux'
import { reset, getAllMovies } from '../features/movies/movieSlice'
import Spinner from '../components/Spinner'

const Home = () => {
  const dispatch = useDispatch()

  const { movies, isError, isLoading, message } = useSelector((state) => state.movie)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getAllMovies())

    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <MovieContainer>
      {movies.length > 0
        ? (movies.map((movie) => (
          <Movie movieData={movie} key={movie._id} />
          )))
        : (<h3> There are no movies to show </h3>)}
    </MovieContainer>
  )
}

export default Home
