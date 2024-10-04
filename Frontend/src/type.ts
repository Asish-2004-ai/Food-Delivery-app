

export type user = {
    _id: string
    auth0Id: string 
    email :string
    name: string
    address: string
    city :string
    country: string
}

export type menuItem=
    {
        _id: string
       name: string
       price: number 
    }


export type Restaurant = {
    _id: string
    user: string
    restaurantName: string
    city: string
    country: string
    deliveryPrice: number
    estimatedDeliveryTime: string
    cuisines: string[]
    menuItems: menuItem[]
    imageUrl: string
    lastUpdate: string
}


export type searchRestaurant = {
    data:Restaurant[],
    pagination:{
        page:number,
        pages:number,
        total:number
    }
}

export type OrderStatus = "placed" | "paid" | "inProgress" | "outForDelivery" | "Delivered"

export type Order = {
    _id: string,
    restaurant: Restaurant,
    user: user,
    deliveryDetails:{
        email: string
        name: string
        city: string
        address: string
        country: string
    },
    cartItems:{
        menuItemId: string
        name: string
        qty: number
    }[],
    status: OrderStatus
    totalAmount: number
    createdAt: Date
    restaurantId: string
}