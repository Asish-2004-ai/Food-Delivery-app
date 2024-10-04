import pizza from '../assets/pizza-4538925.jpg'
import app from '../assets/app.webp'
import Searchbar, { SearchForm } from '@/components/Searchbar'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
  const navigate = useNavigate()
  const handleSearchSubmit = (SearchFormData: SearchForm)=>{
    navigate({
      pathname:`/search/${SearchFormData.searchQuery}`
    })
  }
  return (
    <div className="flex flex-col gap-18">
      <div className="md:px-32 bg-white rounded-lg flex-col shadow-md text-center -mt-16 gap-8">
            <h1 className="text-5xl font-bold tracking-tight text-red-600">
                Discover the best food & <br></br>
                 drinks now...
            </h1>

            <span className="text-xl">Just Click And Get</span>
            <Searchbar placeHolder='Search by Location' onSubmit={handleSearchSubmit}/>
      </div>
      <div className="grid md:grid-cols-2">
        <img src={pizza} style={{width:'640px',height:'412px',borderRadius:'10px',marginTop:'5px'}} alt="" />

        <div className='flex flex-col justify-center items-center gap-4 text-center'>
            <span className='font-bold text-3xl tracking-tighter'>
                    Get your favorite takeout in no time !
            </span>
            <p>
                Download the UrDokan App for quick Ordering and <br /> Personalized meal Suggestions..
            </p>
            <img src={app} className='h-[200px]' alt="" />
        </div>
      </div>
    </div>
  )
}

export default Homepage
