import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { RiAddLargeFill } from 'react-icons/ri'

const Header = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='flex justify-center font-bold'>
      <div className='h-[5rem] w-[60%] border-b-2 flex items-center justify-between'>
        <Link to='/'>
          <button className='text-center border-4 border-sky-600 p-2'>Movie Catalog</button>
        </Link>
        <div className='text-2xl'>Welcome {user && user.name}</div>
        {user
          ? (
            <div className='flex gap-2'>
              {user && user.role === 'ADMIN' &&
                <Link
                  to='/addmovie'
                >
                  <button className='flex items-center gap-2 bg-sky-300 p-2'><RiAddLargeFill />

                    Add movie
                  </button>
                </Link>}
              <Link
                to='/'
                onClick={onLogout}
              >
                <button className='flex items-center gap-2 bg-sky-300 p-2'><FaSignOutAlt /> Logout</button>
              </Link>
            </div>
            )
          : (
            <div className='flex gap-2'>
              <Link to='/login'>
                <button className='flex items-center gap-2 bg-sky-300 p-2'><FaSignInAlt /> Login</button>
              </Link>
              <Link to='/register'>
                <button className='flex items-center gap-2 bg-sky-300 p-2'><FaUser /> Register</button>
              </Link>
            </div>
            )}
      </div>
    </div>
  )
}

export default Header
