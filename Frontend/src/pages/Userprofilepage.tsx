import { allUsers, UpdateUser } from "@/api/userApi"
import UserForm from "@/form/UserForm"
import { Loader2 } from "lucide-react";


const Userprofilepage = () => {
  const {currentUser, isLoading: isGetLoading} = allUsers()
  const {updateUser, isLoading:isUpdateLoading} = UpdateUser();
  

  // console.log(currentUser)
  if(isGetLoading){
    return <Loader2 className='mt-[250px] text-lg font-bold flex justify-center text-center animate-spin'  />
  }
  if(!currentUser){
    return <span>Failed to load User</span>
  }
  return <UserForm currentuser={currentUser} onSave={updateUser} isLoading={isUpdateLoading} ></UserForm>
}

export default Userprofilepage
