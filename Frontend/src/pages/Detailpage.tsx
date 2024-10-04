import { useCreateCheckoutSession } from "@/api/Order";
import { getRestaurant } from "@/api/SearchApi";
import CardItem from "@/components/CardItem";
import CheckOut from "@/components/CheckOut";
import RestaurantInfo from "@/components/RestaurantInfo";
import RestaurantMenuItem from "@/components/RestaurantMenuItem";
import { Card, CardFooter } from "@/components/ui/card";
import { userFormData } from "@/form/UserForm";
import { menuItem } from "@/type";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItems = {
  _id: string,
  name: string,
  price: number,
  qty: number
}

const Detailpage = () => {
  const { restaurantId } = useParams();
  const { Result, isLoading } = getRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: createLoading } = useCreateCheckoutSession()
  const [cartItem, setCartItem] = useState<CartItems[]>(() => {
    const storeCartItem = sessionStorage.getItem(`cartItems- ${restaurantId}`)

    return (storeCartItem ? JSON.parse(storeCartItem) : [])
  })


  const addToCart = (items: menuItem) => {
    setCartItem((previous) => {
      const previousValue = previous.find((item) => item._id === items._id)
      let UpdatedCartItem;

      if (previousValue) {
        UpdatedCartItem = previous.map((item) =>
          item._id === items._id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      else {
        UpdatedCartItem = [
          ...previous,
          {
            _id: items._id,
            name: items.name,
            price: items.price,
            qty: 1
          }
        ]
      }

      sessionStorage.setItem(`cartItems- ${restaurantId}`, JSON.stringify(UpdatedCartItem))
      return UpdatedCartItem
    })

  }

  const removeFormCart = (cartItem: CartItems) => {
    setCartItem((previous) => {
      const updatedCart = previous.filter((item) => item._id !== cartItem._id)
      sessionStorage.setItem(`cartItems- ${restaurantId}`, JSON.stringify(updatedCart))

      return updatedCart;
    })

  }

  const checkOut = async (user: userFormData) => {
    if (!Result) {
      return
    }

    const checkoutData = {
      cartItems: cartItem.map((item) => ({
        menuItemId: item._id,
        name: item.name,
        qty: item.qty.toString()
      })),
      restaurantId: Result._id,

      deliveryDetails: {
        email: user.email as string,
        name: user.name,
        address: user.address,
        city: user.city,
        country: user.country
      },
    }
    console.log("checkout", checkoutData)
    const data = await createCheckoutSession(checkoutData)
    window.location.href = data.url
  }

  if (isLoading || !Result) {
    return <Loader2 className="animate-spin mr-2 h-4 text-2xl mt-[250px]" />;
  }

  return (
    <div className="flex flex-col gap-10">



      <img
        src={Result.imageUrl}
        alt="Restaurant"
        className="object-cover rounded-md h-full w-full"
      />

      <div className="grid grid-cols-1 md:grid-cols-[4fr_2fr] mx-10 gap-5 md:px-34">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={Result} />
          <span className="text-3xl font-bold">
            Menu
          </span>
          {Result.menuItems.map((items) => (
            <RestaurantMenuItem menuItem={items} addToCart={() => addToCart(items)} />
          ))}
        </div>

        <div>
          <Card className="gap-5">
            <CardItem restaurant={Result} cartResult={cartItem} remove={removeFormCart} />
            <CardFooter>
              <CheckOut disabled={cartItem.length === 0} checkOut={checkOut} isCreateLoading={createLoading} />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Detailpage;
// function createCheckOutSession() {
//   throw new Error("Function not implemented.");
// }

