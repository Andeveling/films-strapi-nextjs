import Layout from '@components/Layout'
import axios from 'axios'
import { server } from 'config'
import { getTokenFromServerCookie } from 'lib/auth'
import { useFetchUser } from 'lib/authContext'
import type { GetServerSideProps } from 'next'
import { UserI } from 'src/models'

const Profile = ({ avatar }: { avatar: UserI['avatar'] }) => {
  const user = useFetchUser()

  return (
    <Layout value={user}>
      <div className='grid justify-center justify-items-center py-4'>
        <div className='overflow-hidden relative w-20 h-20 bg-gray-100 rounded-full dark:bg-gray-600 py-4'>
          <svg
            className='absolute -left-2 w-24 h-24 text-gray-400'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fill-rule='evenodd'
              d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
              clip-rule='evenodd'></path>
          </svg>
        </div>

        <div>
          <h1 className='text-5xl font-bold py-4'>
            Welcome Back{' '}
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400'>
              {user.user}
            </span>
            <span>👋</span>
          </h1>
        </div>
      </div>
    </Layout>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const jwt = getTokenFromServerCookie(req)
  if (!jwt) {
    return {
      redirect: {
        destination: '/',
      },
      props: {},
    }
  }
  const response = await axios.get(`${server}/users/me`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  const avatar = response.data.avatar ? response.data.avatar : 'default_avatar'
  return {
    props: {
      avatar,
    },
  }
}

export default Profile
