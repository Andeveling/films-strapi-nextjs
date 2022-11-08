import Link from 'next/link'
import strapiLogo from '@public/assets/img/Strapi.full.logo.dark.jpg'

const Nav = () => {
  return (
    <nav
      className='
    flex flex-wrap
    items-center
    justify-between
    w-full
    md:py-0
    py-2
    text-lg text-gray-700
    bg-white
    '>
      <div className='my-2'>
        <Link href='/' passHref>
          {/* eslint-disable @next/next/no-img-element */}
          <img className='m-2' src={strapiLogo.src} width={200} height={50} alt='Strapi Logo' />
        </Link>
      </div>
      <ul
        className='
        pt-4
        text-xl font-bold text-gray-700
        flex
        mr-10
        md:mr-20
        md:justify-between
        md:pt-0 space-x-2
      '>
        <li>
          <Link href='/' className='md:p-2 py-2 block hover:text-purple-400'>
            Home
          </Link>
        </li>
        <li>
          <Link href='/films' className='md:p-2 py-2 block hover:text-purple-400'>
            Films
          </Link>
        </li>
      </ul>
    </nav>
  )
}
export default Nav
