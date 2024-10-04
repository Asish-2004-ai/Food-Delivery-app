import { userCreateOrder } from "@/api/Order"
import OrderStatusDetails from "@/components/OrderStatusDetails"
import OrderStatusHeader from "@/components/OrderStatusHeader"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Loader2 } from "lucide-react"

const OrderStatusPage = () => {
   const { isLoading, orders } = userCreateOrder()

   if (isLoading) {
      return <Loader2 className='animate-spin' />
   }

   if (orders?.length === 0 || !orders) {
      return "No Orders Found"
   }

   return (
      <div className="space-y-10 w-[90vw]">
         {
            orders.map((order) => (
               <div className="space-y-10 bg-gray-50 rounded-lg p-10">
                  <OrderStatusHeader order={order} />
                  <div className="grid md:grid-cols-2">
                     <OrderStatusDetails order={order} />
                     <AspectRatio ratio={16 / 5}>
                        <img src={order.restaurant.imageUrl} className='object-cover rounded-md w-full h-full' alt="" />
                     </AspectRatio>

                     
                  </div>
               </div>
            ))
         }
      </div>
   )
}

export default OrderStatusPage
