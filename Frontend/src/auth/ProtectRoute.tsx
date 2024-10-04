// import Loading from "@/components/Loading";
import { useAuth0 } from "@auth0/auth0-react"
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";


const ProtectRoute = () => {
    const {isAuthenticated, isLoading} = useAuth0();

    if(isAuthenticated){
        return <Outlet></Outlet>
    }

    if(isLoading){
      return(
        <div className="flex justify-center items-center min-h-screen">
          <span className="text-2xl"><Loader2 className="animate-spin"/></span>
          
        </div>
      )
    }
  return <Navigate to={'/'} replace/>
}

export default ProtectRoute
