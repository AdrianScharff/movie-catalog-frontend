/* eslint-disable camelcase */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { MdMovie } from 'react-icons/md'
import { createOneMovie } from '../features/movies/movieSlice'

const AddMovie = () => {
  const [movieFormData, setMovieFormData] = useState({
    title: '',
    poster_path: ''
  })

  const { title, poster_path } = movieFormData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.movie)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      navigate('/')
    }
  }, [isError, isSuccess, message, navigate])

  const onChange = (e) => {
    setMovieFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      title,
      poster_path
    }

    dispatch(createOneMovie(data))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='w-screen flex justify-center mt-[5rem]'>
      <form
        className='w-[40%] flex flex-col items-center gap-6'
        onSubmit={onSubmit}
      >
        <div className='w-full text-[50px] flex items-center gap-3'><MdMovie /> Add new movie</div>
        <div className='w-full flex flex-col gap-3 text-[20px] border-4 p-3'>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            className='border w-full p-2'
            placeholder='Title'
            onChange={onChange}
          />
          <input
            type='text'
            name='poster_path'
            id='poster_path'
            value={poster_path}
            className='border w-full p-2'
            placeholder='Image source'
            onChange={onChange}
          />
          <button type='submit' className='bg-sky-300 rounded p-3'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddMovie
