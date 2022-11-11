import Layout from '@components/Layout'
import { server } from 'config'
import { fetcher } from 'lib/api'
import { getTokenFromLocalCookie, getTokenFromServerCookie, getUserFromLocalCookie } from 'lib/auth'
import { useFetchUser } from 'lib/authContext'
import markdownToHtml from 'lib/markdownToHtml'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'
import { FilmI, FilmResponseI } from 'src/models'

interface FilmProps {
  film: FilmI
  plot: string
  error: any
  jwt: string
}

const Film = ({ jwt, plot, film, error }: FilmProps) => {
  const user = useFetchUser()
  const router = useRouter()
  const [review, setReview] = useState({
    value: '',
  })

  const handleChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    setReview({ value: e.currentTarget.value })
  }

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await fetcher(`${server}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            review: review.value,
            reviewer: await getUserFromLocalCookie(),
            film: film.id,
          },
        }),
      })
      router.reload()
    } catch (error) {
      console.log('algo salio mal')
      router.reload()
    }
  }

  if (error) {
    return (
      <Layout value={user}>
        <p>{error}</p>
      </Layout>
    )
  } else {
    return (
      <Layout value={user}>
        <h1 className='text-5xl md:text-6xl font-extrabold leading-tighter mb-4'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2'>
            {film.attributes.title}
          </span>
        </h1>
        <p>
          Directed by{' '}
          <span className='bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent'>
            {film.attributes.director}
          </span>
        </p>
        <h2 className='text-3xl md:text-4xl font-extrabold leading-tighter mb-4 mt-4'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2'>Plot</span>
        </h2>
        <div className='tracking-wide font-normal text-xl' dangerouslySetInnerHTML={{ __html: plot }}></div>
        {<h3>{JSON.stringify(user.user)}</h3>}
        {user.user && (
          <>
            <h2 className='text-3xl md:text-4xl font-extrabold leading-tighter mb-4 mt-4'>
              <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2'>
                Reviews
              </span>
              <form onSubmit={handleSubmit}>
                <textarea
                  className='w-full text-sm px-3 py-2 text-gray-700 border-2 border-teal-400 rounded-lg focus:outline-none'
                  rows={4}
                  value={review.value}
                  onChange={handleChange}
                  placeholder='Add your review'></textarea>
                <button className='md:p-2 rounded py-2 text-xl text-black bg-purple-200 p-2' type='submit'>
                  Add Review
                </button>
              </form>
            </h2>
            <ul>
              {film.attributes.reviews ? (
                film.attributes.reviews.data.length === 0 && <span>No reviews yet</span>
              ) : (
                <span>No reviews yet</span>
              )}
              {film.attributes.reviews &&
                film.attributes.reviews.data.map((review) => {
                  return (
                    <li key={review.id}>
                      <span className='bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent'>
                        {review.attributes.reviewer}
                      </span>{' '}
                      said &quot;{review.attributes.review}&quot;
                    </li>
                  )
                })}
            </ul>
          </>
        )}
      </Layout>
    )
  }
}
export default Film

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const jwt = typeof window !== 'undefined' ? getTokenFromLocalCookie : getTokenFromServerCookie(req)
  const filmsResponse: FilmResponseI = await fetcher(
    `${server}/films/${params?.id}?populate=*`,
    jwt
      ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      : {},
  )
  if (filmsResponse.data) {
    const plot = await markdownToHtml(filmsResponse.data.attributes.plot)
    return {
      props: {
        film: filmsResponse.data,
        plot,
        jwt: jwt ? jwt : '',
      },
    }
  } else {
    return {
      props: {
        error: filmsResponse.error.message,
      },
    }
  }
}
