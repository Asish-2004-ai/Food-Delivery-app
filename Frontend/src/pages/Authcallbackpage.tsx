import { createUserRegister } from "@/api/userApi"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const Authcallbackpage = () => {
  const navigate = useNavigate()
  const { user } = useAuth0()
  const { createUser } = createUserRegister()
  const hasgcreateUser = useRef(false)

  useEffect(() => {
    if (user?.sub && user?.email && !hasgcreateUser.current) {
      createUser({ auth0Id: user?.sub, email: user?.email })
      hasgcreateUser.current = true
    }
    navigate('/')
  }, [createUser, navigate, user])

  return <>Loading..</>
  
   
  

}

export default Authcallbackpage
