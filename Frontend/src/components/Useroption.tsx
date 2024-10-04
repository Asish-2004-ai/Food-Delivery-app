import { useAuth0 } from "@auth0/auth0-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "./ui/dropdown-menu"
import { CircleUserRound } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"

const Useroption = () => {
    const {user, logout} = useAuth0()
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="flex px-3 gap-2 font-bold hover:text-red-500">
      <CircleUserRound  />
            {user?.given_name ? user?.given_name:user?.email
            }
        </DropdownMenuTrigger>
       <DropdownMenuContent>
       <DropdownMenuItem>
        <Link to={'/user-profile'} className="font-bold text-primary">Profile</Link>

        </DropdownMenuItem>
        <hr />
       <DropdownMenuItem>
        <Link to={'/manage-restaurant'} className="font-bold text-primary">Manage Restaurant</Link>

        </DropdownMenuItem>
        {/* <Separator /> */}
        <hr></hr>
        <DropdownMenuItem>
        <Button variant={'destructive'} className="hover:bg-white hover:text-black" onClick={()=>logout()}>Logout</Button>

        </DropdownMenuItem>
       </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Useroption
