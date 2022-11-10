import { AuthContextProvider, AuthPropsI } from 'lib/authContext'
import Head from 'next/head'
import Nav from './Nav'

const Layout = ({ value: { user, loading }, children }: AuthPropsI) => {
  return (
    <AuthContextProvider value={{ user, loading }}>
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
    </AuthContextProvider>
  )
}
export default Layout
