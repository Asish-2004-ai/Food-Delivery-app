import { menuItem } from "@/type"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
type Props = {
    menuItem: menuItem,
    addToCart:()=>void
}

const RestaurantMenuItem = ({menuItem, addToCart}: Props) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">₹ {menuItem.price}</CardContent>
    </Card>
  )
}

export default RestaurantMenuItem
