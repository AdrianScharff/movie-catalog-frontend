/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { BiSolidLike } from 'react-icons/bi'
import { FaWindowClose } from 'react-icons/fa'
import naImage from '../assets/naavlb.png'
import { useDispatch, useSelector } from 'react-redux'
import { addNewLike, deleteOneMovie } from '../features/movies/movieSlice'

const Movie = ({ movieData }) => {
  const baseImgUrl = 'https://image.tmdb.org/t/p/w500'

  const { _id, poster_path, title, popularity, vote_average, likes } = movieData
  const { user } = useSelector((state) => state.auth)

  const imgSrc = poster_path && poster_path.startsWith('/') ? `${baseImgUrl}${poster_path}` : poster_path || naImage

  const dispatch = useDispatch()

  const handleLike = () => {
    if (user) {
      dispatch(addNewLike(_id))
    }
  }

  const handleDelete = () => {
    dispatch(deleteOneMovie(_id))
  }

  return (
    <div className='relative border p-2 flex flex-col'>
      <img src={imgSrc} alt='movie image' />
      <div className='text-[23px] font-bold'>{title}</div>
      <div>Popularity: {popularity}</div>
      <div>Vote average: {vote_average}</div>
      <div className='flex gap-2'>
        <button onClick={handleLike}>
          <BiSolidLike />
        </button>
        {likes}
      </div>
      {user && user.role === 'ADMIN' &&
        <button className='absolute right-0 top-0 text-red-600' onClick={handleDelete}><FaWindowClose /></button>}
    </div>
  )
}

export default Movie
