import Head from 'next/head'
import { Fragment, PropsWithChildren } from 'react'
import Nav from './Nav'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Fragment>
      <Head>
        <title>Film database</title>
      </Head>
      <Nav />
      <main className='px-4 min-h-screen box-border'>
        <div
          className='
          flex
          justify-center
          items-center
          bg-white
          mx-auto
          w-2/3
          h-4/5
          rounded-lg
          my-16
          p-16
          '>
          <div className='text-2xl font-medium'>{children}</div>
        </div>
      </main>
    </Fragment>
  )
}
export default Layout
