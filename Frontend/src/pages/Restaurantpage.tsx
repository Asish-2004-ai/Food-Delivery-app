import { createUserRestaurant, getRestaurantOrders, getUserRestaurant, UpdateUserRestaurant } from "@/api/userRestaurant"
import OrderItemCart from "@/components/OrderItemCart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RestaurantForm from "@/form/RestaurantForm"
// import { useAuth0 } from "@auth0/auth0-react"
import { Loader2 } from "lucide-react"

const Restaurantpage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = createUserRestaurant()
  const { currentRestaurant, isLoading: isGetLoading } = getUserRestaurant()
  const { Updaterestaurant, isLoading: isUpdateLoading } = UpdateUserRestaurant()
  const {orders, isLoading} = getRestaurantOrders()
  const isEditing = !!currentRestaurant
  if (isGetLoading) {
    return (

      <Loader2 className="animate-spin mt-[250px]" />
    )
  }
  return (

    <Tabs className="w-[90vw]">
      <TabsList>
        <TabsTrigger value="order">Order</TabsTrigger>
        <TabsTrigger value="manage-restaurant">ManageRestaurant</TabsTrigger>
      </TabsList>
      <TabsContent value="order" className="space-y-5 p-10 bg-green-50 rounded-md">
        <h2>{orders?.length} active order</h2>
        {
          orders?.map((order)=>(
            <OrderItemCart order = {order} isLoading={isLoading} />
          ))
        }
      </TabsContent>
      <TabsContent value="manage-restaurant" className="space-y-5 p-10 bg-green-50 rounded-md">
      <RestaurantForm restaurant={currentRestaurant} onSave={isEditing ? Updaterestaurant : createRestaurant} isLoading={isCreateLoading || isUpdateLoading} />
      </TabsContent>

    </Tabs>

    // <RestaurantForm restaurant={currentRestaurant} onSave={isEditing ? Updaterestaurant : createRestaurant} isLoading={isCreateLoading || isUpdateLoading} />

  )
}

export default Restaurantpage
