import { Restaurant } from "@/type"
import { Banknote, Clock, Dot } from "lucide-react"
import { Link } from "react-router-dom"
import { AspectRatio } from "./ui/aspect-ratio"

type Props = {
  Item: Restaurant
}

const SearchCart = ({ Item }: Props) => {
  return (
    <Link to={`/details/${Item._id}`} className="grid lg:grid-cols-[2fr_3fr]">
      <AspectRatio ratio={16 / 7}>
        <img src={Item.imageUrl} className="rounded-md h-full w-[400px] object-cover bg-rose-500" alt="" />
      </AspectRatio>
      <div className="mx-3">
        <h3 className="text-2xl font-bold hover:underline mb-2">
          {Item.restaurantName}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">{Item.cuisines.map((items, index) => (
            <span className="flex">
              <span>{items}</span>
              {index < Item.cuisines.length - 1 && <Dot />}
            </span>
          ))}
          </div>
          <div className="flex flex-col gap-2 ">
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600" />
              {Item.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1 ">
              <Banknote  />
             Delivery From ₹ {Item.deliveryPrice}/-
            </div>

          </div>
        </div>
      </div>


    </Link>
  )
}

export default SearchCart
