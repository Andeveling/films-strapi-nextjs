import Layout from '@components/Layout'
import { server } from 'config'
import { fetcher } from 'lib/api'
import { useFetchUser } from 'lib/authContext'
import type { GetServerSideProps } from 'next'
import { FilmI, FilmResponseI } from 'src/models'

const Film = ({ film }: { film: FilmI }) => {
  const user = useFetchUser()
  return (
    <Layout value={user}>
      <h5 className='text-5xl md:text-6xl font-extrabold leading-tight mb-4 '>
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2'>
          {film ? film.attributes.title : <>no found</>}
        </span>
      </h5>
    </Layout>
  )
}
export default Film

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const filmsResponse: FilmResponseI = await fetcher(`${server}/films/${params?.id}`)

  return {
    props: {
      film: filmsResponse.data,
    },
  }
}
