import axios from 'axios'
import { server } from 'config'
import { setToken, unsetToken } from 'lib/auth'
import { useAuth } from 'lib/authContext'
import Link from 'next/link'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { AuthResponseI } from 'src/models'

type loginSessionT = {
  identifier: string
  password: string
}

const Login = () => {
  const [data, setData] = useState<loginSessionT>({
    identifier: '',
    password: '',
  })
  const { user, loading } = useAuth()
  console.log(user, loading)
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
      .catch((e) => console.log(e))
  }

  const logout = () => {
    unsetToken()
  }

  return (
    <>
      {!loading &&
        (user ? (
          <li>
            <Link href='/profile' className='md:p-2 py-2 block hover:text-purple-400'>
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
            <a className='md:p-2 py-2 block hover:text-purple-400' onClick={logout} style={{ cursor: 'pointer' }}>
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
              <input
                type='text'
                name='identifier'
                onChange={handleChange}
                placeholder='Username'
                className='md:p-2 form-input py-2 rounded-xl mx-2'
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

              <button className='md:p-2 rounded-xl py-2 px-2 text-black bg-purple-200 p-2' type='submit'>
                Login
              </button>
            </form>
          </li>
          <li>
            <Link href='/register' className='md:p-2 py-2 block hover:text-purple-400 text-black'>
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
