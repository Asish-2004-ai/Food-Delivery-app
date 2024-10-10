import { user } from "@/type";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const BASE_URL = "https://food-delivery-app-oigi.onrender.com"
type userRequest = {
    auth0Id: string,
    email: string
};

//userRegister
export const createUserRegister = () => {
    const {getAccessTokenSilently} = useAuth0()
    const userRegister = async (user: userRequest) => {
        const accesstoken = await getAccessTokenSilently()
        console.log(accesstoken)

        const response = await fetch(`${BASE_URL}/api/user/register`, {
            
            method: "POST",
            headers: {
                "Authorization":`Bearer ${accesstoken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            // const errorMessage = await response.text();
            throw new Error(`Failed to create User`);
        }

        // Optionally return response or response data if needed
        return response.json();
    };

    const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(userRegister);

    return { createUser, isLoading, isError, isSuccess };
};


//upadate user
type Updatereq = {
    name: string,
    address: string,
    city: string,
    country: string
}

export const UpdateUser = () => {
    const { getAccessTokenSilently } = useAuth0();
  
    const updateUserReq = async (formData: Updatereq) => {
      try {
        // Await the token retrieval
        const accessToken = await getAccessTokenSilently();
  
        const response = await fetch(`${BASE_URL}/api/user/user-update`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body:JSON.stringify(formData)
        });
  
        if (!response.ok) {
          throw new Error(`Failed to update user`);
        }
  
        return response.json();
      } catch (error) {
        throw new Error();
      }
    };
  
    const { mutateAsync: updateUser, isLoading, isSuccess, error } = useMutation(updateUserReq);
  
    if(isSuccess){
      toast.success("User updated Successful")
    };

    if(error){
      toast.error(error.toString())
    }
    return { updateUser, isLoading };
  };
  

  //all users

  export const allUsers = () =>{
    const {getAccessTokenSilently} = useAuth0()

    const getUsers = async ():Promise<user>=>{
     try {
      const accessToken =await getAccessTokenSilently()

      const response = await fetch(`${BASE_URL}/api/user/get-user`,{
        method:"GET",
        headers:{
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })

      if(!response.ok){
        throw new Error('Failed to get user') 
      }
      return response.json();
     } catch (error) {
      throw new Error()
     }
    }

    const {data:currentUser, isLoading, error} = useQuery("Fetch user",getUsers)

    if(error){
      toast.error(error.toString())
    }
  return {currentUser, isLoading}
  }