import { CartItems } from "@/pages/Detailpage"
import { Restaurant } from "@/type"
import { CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Trash } from "lucide-react"

type Props = {
    restaurant: Restaurant,
    cartResult: CartItems[]
    remove: (cartItem:CartItems)=>void
}


const CardItem = ({restaurant, cartResult, remove}: Props) => {
    const totalCostOfOrder = ()=>{
        const totalCost = cartResult.reduce((total,cartItem)=> total + cartItem.qty*cartItem.price ,0)
        const totalCostOfPrice = totalCost + restaurant.deliveryPrice
        return totalCostOfPrice
        
    }
 

  return (
    <> 
    <CardHeader>
      <CardTitle className="flex justify-between">
        <span>Your Order</span>
        <span>{totalCostOfOrder()}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
        {cartResult.map((items)=>(
            <div className="flex justify-between">
                <span><Badge variant={'outline'} className="border-none mb-5">{items.qty}</Badge>{items.name}</span>

                <span className="flex"><Trash className='cursor-pointer mt-1 me-1 text-red-500 ' size={18}  onClick={()=>remove(items)}/>{items.qty*items.price}</span>
            </div>
        ))}
        <hr />
        <div className="flex justify-between">
            <span>Delivery Price</span>
            <span>{restaurant.deliveryPrice}</span>
        </div>
    </CardContent>
    </>
    
  )
}

export default CardItem  