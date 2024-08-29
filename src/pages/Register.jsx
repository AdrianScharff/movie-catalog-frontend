import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reset, register } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    password2: ''
  })

  const { name, email, role, password, password2 } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      navigate('/login')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, dispatch, navigate])

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error("The passwords doesn't match")
    } else {
      const data = {
        name,
        email,
        role: role === '' ? 'CUSTOMER' : role,
        password
      }

      dispatch(register(data))
    }
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
        <div className='w-full text-[50px] flex items-center gap-3'><FaUser /> Register</div>
        <div className='w-full flex flex-col gap-3 text-[20px] border-4 p-3'>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            className='border w-full p-2'
            placeholder='Name'
            onChange={onChange}
          />
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            className='border w-full p-2'
            placeholder='Email'
            onChange={onChange}
          />
          <select
            name='role'
            id='role'
            value={role}
            className='border w-full p-2 text-slate-400'
            placeholder='Role'
            onChange={onChange}
          >
            <option value=''>
              Select role
            </option>
            <option value='CUSTOMER'>CUSTOMER</option>
            <option value='ADMIN'>ADMIN</option>
          </select>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            className='border w-full p-2'
            placeholder='Password'
            onChange={onChange}
          />
          <input
            type='password'
            name='password2'
            id='password2'
            value={password2}
            className='border w-full p-2'
            placeholder='Confirm password'
            onChange={onChange}
          />
          <button type='submit' className='bg-sky-300 rounded p-3'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Register
