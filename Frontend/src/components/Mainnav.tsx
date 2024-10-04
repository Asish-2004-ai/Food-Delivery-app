import { useAuth0 } from '@auth0/auth0-react'
import { Button } from './ui/button'
import Useroption from './Useroption'
import { Link } from 'react-router-dom'

const Mainnav = () => {
  const {loginWithRedirect, isAuthenticated} = useAuth0()
    return (
      <span className='flex space-x-4'>
        {isAuthenticated?
      <>
      <Link to={'/order-status'} className='font-bold hover:text-red-500'>Order Status</Link>
       <Useroption /> 
       </> :
      <Button onClick={async()=> await loginWithRedirect()} variant={'ghost'} className='font-bold text-red-500 bg-white border-2 border-red-500 hover:bg-red-500 hover:text-white'>Login</Button>
      }
      </span>
      
    )
}

export default Mainnav
