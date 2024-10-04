import { Link } from "react-router-dom"
import Mainnav from "./Mainnav"
import Mobilenav from "./Mobilenav"


const Header = () => {
  return (
    <div className='border-b-2 border-b-red-500 py-6'>
      <div className="container flex justify-between items-center">
        <Link to={'/'} className="font-bold text-red-500 text-3xl">
          UrDokan
        </Link>
        <div className="md:hidden">
            <Mobilenav />
        </div>
      <div className='hidden md:block'>
        <Mainnav />
      </div>
      </div>

    </div>
  )
}

export default Header
