import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"

const Mobilenavlink = () => {
    const {logout} = useAuth0()
    return (
        <>

            <Button onClick={()=>console.log('click')} variant={'outline'} className="text-black border-red-500 hover:bg-red-500 hover:text-white hover:font-bold "><Link to={'/order-status'}>Order Status</Link></Button>
            <Button onClick={()=>console.log('click')} variant={'outline'} className="text-black border-red-500 hover:bg-red-500 hover:text-white hover:font-bold "><Link to={'/manage-restaurant'}>Manage Restaurant</Link></Button>
            <Button onClick={()=>console.log('click')} variant={'outline'} className="text-black border-red-500 hover:bg-red-500 hover:text-white hover:font-bold "><Link to={'/user-profile'}>Profile</Link></Button>
            <Button variant={'destructive'} className="hover:bg-white hover:text-black" onClick={()=>logout()}>Logout</Button>
        </>
    )
}

export default Mobilenavlink
