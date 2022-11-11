import Layout from '@components/Layout'
import { useFetchUser } from 'lib/authContext'

export default function Home() {
  const user = useFetchUser()
  return (
    <Layout value={user}>
      <h1 className='text-5xl md:text-6xl font-extrabold leading-tighter mb-4'>
        Strapi{' '}
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400'>Film Reviews</span>
      </h1>
      <p className='py-4'>
        Esta app fue creada para asentar los conocimientos adquiridos en{' '}
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-500'>
          Next JS
        </span>{' '}
        y{' '}
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-500'>
          Strapi
        </span>{' '}
        siguiendo la documentación oficial.
        <span>
          <span>👋</span>
        </span>
      </p>
    </Layout>
  )
}
