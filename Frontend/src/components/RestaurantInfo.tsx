import { Restaurant } from "@/type"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Dot } from "lucide-react"

type Props = {
    restaurant:Restaurant
}

const RestaurantInfo = ({restaurant}:Props) => {
  return (
    <Card className="border-slate-900">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
            {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
            {restaurant.city},{restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap">
        {restaurant.cuisines.map((items, index)=>(
            <span className="flex">
                <span>{items}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
            </span>
        ))}
      </CardContent>
    </Card>
  )
}

export default RestaurantInfo
