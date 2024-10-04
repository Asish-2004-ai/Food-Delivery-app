import { Order, Restaurant } from "@/type";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from 'sonner';
// import { useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

//get restaurant
export const getUserRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getRestaurant = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()
    const response = await fetch(`${BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,

      },
    })

    if (!response.ok) {
      throw new Error("Not Found")
    }
    return response.json()
  }

  const { data: currentRestaurant, isLoading } = useQuery("Fetch restaurant", getRestaurant,{refetchInterval:5000})
  return { currentRestaurant, isLoading }
}

//create restaurant
export const createUserRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const UserRestaurant = async (RestaurantFormData: FormData): Promise<Restaurant> => {

    // Get access token silently from Auth0
    const accessToken = await getAccessTokenSilently();

    // API call to create a user restaurant
    const response = await fetch(`${BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: RestaurantFormData,
    });
    console.log(response)

    if (!response.ok) {
      // Throw an error if the request failed
      // const errorMessage = await response.text();
      throw new Error('Failed to create restaurant');
    }

    return response.json(); // Return the API response

  };

  // useMutation hook to trigger the create restaurant function
  const { mutate: createRestaurant, isLoading, isSuccess, error } = useMutation(UserRestaurant);

  // Use useEffect for toast notifications to avoid side effects outside React lifecycle
  if (isSuccess) {
    toast.success("Restaurant created successfully")
  }

  if (error) {
    toast.error("Unable to create Restaurant")
  }

  return { createRestaurant, isLoading };
};


//update restaurant

export const UpdateUserRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0()

  const updateRestaurant = async (RestaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // "Content-Type": "application/json",
      },
      body: RestaurantFormData
    });

    if (!response.ok) {
      throw new Error("Failed to Update Restaurant")
    };

    return response.json();
  }

  const { mutate: Updaterestaurant, isLoading, isSuccess, error } = useMutation(updateRestaurant)

  if (isSuccess) {
    toast.success("Restaurant Updated Successfully")
  }

  if (error) {
    toast.error("Unable to update")
  }

  return { Updaterestaurant, isLoading }
}


export const getRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0()
  const restaurantOrder = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${BASE_URL}/api/my/restaurant/orders`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    })
    if (!response.ok) {
      throw new Error("Failed to get Restaurant")
    }

    return response.json()
  }

  const { data: orders, isLoading } = useQuery("getRestaurantOrders", restaurantOrder)
  return { orders, isLoading }
}

type UpdateRestaurantOrderStatus = {
  orderid: string
  status: string
}


export const updateRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0()
  const updateRestaurant = async (updateRestaurantOrderStatus: UpdateRestaurantOrderStatus) => {
    const accessToken = await getAccessTokenSilently()
    const response = await fetch(`${BASE_URL}/api/my/restaurant/order/${updateRestaurantOrderStatus.orderid}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: updateRestaurantOrderStatus.status })
    })

    if(!response.ok){
      throw new Error("Failed to Update Status")
    }

    return response.json()
  }

  const {mutateAsync: update, isLoading, isSuccess, isError, reset} = useMutation(updateRestaurant)

  
  if(isSuccess){
    toast.success("Order Status Updated")
  }
  
  if(isError){
    toast.error("Unble to update status")
    reset()
  }
  

  return {update, isLoading}
}