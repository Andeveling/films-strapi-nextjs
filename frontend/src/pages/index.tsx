import Layout from '@components/Layout'
import { useFetchUser } from 'lib/authContext'

export default function Home() {
  const user = useFetchUser()
  return (
    <Layout value={user}>
      <div className='container mx-auto'>
        <h1 className='font-bold text-5xl'>Hello O</h1>
      </div>
    </Layout>
  )
}
