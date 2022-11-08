import type { GetStaticProps } from 'next'
import type { SWRConfiguration } from 'swr'
import { FilmsResponseI } from 'src/models'
import Films from '@components/Films'
import Layout from '@components/Layout'
import useSWR from 'swr'
import { fetcher } from 'lib/api'
import { server } from 'config'
import { useState } from 'react'

export default function FilmsList({ films }: { films: FilmsResponseI }) {
  const [pageIndex, setPageIndex] = useState(1)

  const configSWR: SWRConfiguration = {
    fallbackData: films,
  }

  const { data } = useSWR<FilmsResponseI>(
    `http://localhost:1337/api/films?pagination[page]=${pageIndex}&pagination[pageSize]=2`,
    fetcher,
    configSWR,
  )
  return (
    <Layout>
      <h1 className='text-5xl md:text-6xl font-extrabold leading-tight mb-4 '>
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2'>Films</span>
      </h1>
      <Films films={data as FilmsResponseI} />
      <div className='space-x-2 space-y-2 flex justify-between'>
        <button
          className={`md:p-2 rounded py-2  p2 ${
            pageIndex === 1 ? 'bg-gray-300  text-black' : 'bg-blue-400 text-white'
          }`}
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex - 1)}>
          Prev
        </button>
        <span>{`${pageIndex} of ${data && data.meta.pagination.pageCount}`}</span>
        <button
          className={`md:p-2 rounded py-2  p2 ${
            pageIndex === (data && data.meta.pagination.pageCount)
              ? 'bg-gray-300  text-black'
              : 'bg-blue-400 text-white'
          }`}
          disabled={pageIndex === (data && data.meta.pagination.pageCount)}
          onClick={() => setPageIndex(pageIndex + 1)}>
          Next
        </button>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetcher(`${server}/films?pagination[page]=1&pagination[pageSize]=2`)

  return {
    props: {
      films: data,
    },
  }
}
