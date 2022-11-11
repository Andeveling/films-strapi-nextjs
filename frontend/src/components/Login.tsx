import axios, { AxiosError } from 'axios'
import { server } from 'config'
import { setToken, unsetToken } from 'lib/auth'
import { useAuth } from 'lib/authContext'
import Link from 'next/link'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { AuthResponseI, Details } from 'src/models'

type loginSessionT = {
  identifier: string
  password: string
}

type ResponseErrorT = {
  data: null
  error: {
    status: number
    name: string
    message: string
    details: Details
  }
}
const Login = () => {
  const [data, setData] = useState<loginSessionT>({
    identifier: '',
    password: '',
  })
  const [error, setError] = useState('')

  const { user, loading } = useAuth()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios
      .post<AuthResponseI>(`${server}/auth/local`, {
        identifier: data.identifier,
        password: data.password,
      })
      .then((response) => setToken(response.data))
      .catch((error: AxiosError<ResponseErrorT>) => {
        error.response && setError(error.response.data.error.message)
      })
  }

  const logout = () => {
    unsetToken()
  }

  return (
    <>
      {!loading &&
        (user ? (
          <li>
            <Link
              href='/profile'
              className=' text-lg block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>
              Profile
            </Link>
          </li>
        ) : (
          <></>
        ))}
      {/* --------------- */}
      {!loading &&
        (user ? (
          <li>
            <a
              className=' text-lg block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
              onClick={logout}
              style={{ cursor: 'pointer' }}>
              Logout
            </a>{' '}
          </li>
        ) : (
          <></>
        ))}
      {/* --------------- */}
      {!loading && !user ? (
        <>
          <li>
            <form onSubmit={handleSubmit} className='form-inline'>
              <div>
                <input
                  type='text'
                  name='identifier'
                  placeholder='Username'
                  className='md:p-2 form-input py-2 px-4 rounded-xl mx-2'
                  required
                />
                <input
                  type='password'
                  name='password'
                  onChange={handleChange}
                  placeholder='Password'
                  className='md:p-2 form-input py-2 rounded-xl  mx-2'
                  required
                />
                <button className='rounded-xl  px-2 text-white bg-blue-700 p-2' type='submit'>
                  Login
                </button>
              </div>
              {error ? <p className='text-xs text-red-600 block text-center'>*{error}</p> : <></>}
            </form>
          </li>
          <li>
            <Link
              href='/register'
              className=' text-lg block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>
              Register
            </Link>
          </li>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default Login
