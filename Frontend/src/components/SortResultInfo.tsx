import { Button } from "./ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

type Props = {
    sortOption: string,
    onChange: (value:string)=>void
}

const sort_option = [
  {
    label:"Best Match",
    value:"bestvalue",
  },
  {
    label:"Delivery Price",
    value:"deliveryPrice",
  },
  {
    label:"estimatedDeliveryTime ",
    value:"estimatedDeliveryTime",
  },
]

const SortResultInfo = ({sortOption, onChange}: Props) => {

  const sortResult = sort_option.find((item)=>item.value===sortOption)?.label || sort_option[0].label
  console.log(sortOption)
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
        <Button className="w-full" variant={'outline'}>
            Sort by : {sortResult}
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {sort_option.map((items)=>(
            <DropdownMenuItem className="cursor-pointer" onClick={()=>onChange(items.value)}>
              {items.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SortResultInfo
