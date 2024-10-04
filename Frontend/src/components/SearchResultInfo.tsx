import { Link } from "react-router-dom"

type Props = {
  total?:number
  city: string
}

const SearchResultInfo = ({total, city}:Props) => {
  return (
    <div className="flex flex-col justify-between gap-3 text-2xl font-bold lg:items-center lg:flex-row">
      <span>{total} Restaurant found in {city}
     <Link to={'/'} className="ml-2 text-sm font-semibold cursor-pointer hover:underline text-blue-500">Go to Home</Link>
     </span>
    </div>
  )
}

export default SearchResultInfo
