import Link from 'next/link'
import { FilmsResponseI } from 'src/models'

const Films = ({ films }: { films: FilmsResponseI }) => {
  return (
    <ul className='list-none space-y-4 text-4xl font-bold mb-3'>
      {films &&
        films.data.map((film) => {
          return (
            <li key={film.id}>
              {/* Este href se pasa como endpoind que se añade al principal */}
              <Link href={`films/${film.id}`}>{film.attributes.title}</Link>
            </li>
          )
        })}
    </ul>
  )
}
export default Films
