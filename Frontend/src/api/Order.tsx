import { Order } from "@/type"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

const BASE_URL = "https://food-delivery-app-oigi.onrender.com"

export const userCreateOrder = () => {
    const { getAccessTokenSilently } = useAuth0()

    const CreateOrder = async (): Promise<Order[]> => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${BASE_URL}/api/order/details`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },

        },

        )
        if (!response.ok) {
            throw new Error("NOT Found")
        }

        return response.json()
    }

    const { data: orders, isLoading } = useQuery("getOrderDetails", CreateOrder)

    return { orders, isLoading }
}


type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string,
        name: string,
        qty: string
    }[]

    deliveryDetails: {
        email: string,
        name: string,
        address: string,
        city: string,
        country: string
    }

    restaurantId: string
}

export const useCreateCheckoutSession = () => {
    const { getAccessTokenSilently } = useAuth0()
    const createCheckoutSessionRequest = async (checkOutSessionRequest: CheckoutSessionRequest) => {
        const accessToken = await getAccessTokenSilently()
        console.log(accessToken)
        const response = await fetch(`${BASE_URL}/api/order/checkout/create-checkout-session`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(checkOutSessionRequest)
        })
        console.log(checkOutSessionRequest)
        console.log(BASE_URL)
        console.log(response)
        if (!response.ok) {
            throw new Error(`Failed to connect`);

        }

        return response.json()
    }

    const { mutateAsync: createCheckoutSession, isLoading, error, reset } = useMutation(createCheckoutSessionRequest)


    if (error) {
        toast.error(error.toString())
        reset()
    }
    return { createCheckoutSession, isLoading }
}