import { disesList } from "@/restaurantDises"
import { Label } from "./ui/label"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { ChangeEvent } from "react"
import { Button } from "./ui/button"

type Props = {
  onChange: (cuisines: string[]) => void
  selectedCuisnes: string[]
  isExpanded:boolean
  ExpandedClick: ()=>void
}

const CuisnesFilter = ({ onChange, selectedCuisnes, isExpanded, ExpandedClick}: Props) => {
  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedCuisne = event.target.value
    const isChecked = event.target.checked
    const newCuisnesList = isChecked ? [...selectedCuisnes, selectedCuisne] : selectedCuisnes.filter((cuisine) => cuisine !== selectedCuisne)

    // Log the state change for debugging
    console.log("Selected Cuisne:", selectedCuisne, "isChecked:", isChecked)
    console.log("Updated Cuisne List:", newCuisnesList)

    onChange(newCuisnesList)
  }

  const resetClick = () => {
    console.log("Reset clicked") // Debugging
    onChange([])
  }

  return (
    <>
      <div className="flex justify-between px-4 mt-5 items-center font-bold gap-4 mb-3">
        <div className="text-md">Filter By Cuisnes or Dishes</div>
        <div
          className="hover:underline font-semibold text-blue-500 cursor-pointer"
          onClick={resetClick}
        >
          Reset Filter
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        {disesList.slice(0, isExpanded ? disesList.length:7).map((cuisine) => {
          const isSelected = selectedCuisnes.includes(cuisine)
          return (
            <div className="flex" key={cuisine}>
              <input
                type="checkbox"
                className="sr-only"
                id={`cuisine_${cuisine}`}
                value={cuisine}
                checked={isSelected}
                onChange={handleCuisinesChange}
              />
              <Label
                htmlFor={`cuisine_${cuisine}`}
                className={`flex flex-1 text-md font-semibold rounded-md cursor-pointer px-4 py-2 ms-3 ${
                  isSelected ? "border border-green-700 text-green-700" : "border border-gray-300"
                }`}
              >
                {isSelected && <Check size={20} strokeWidth={3} />}
                {cuisine}
              </Label>
            </div>
          )
        })}
      </div>

      <Button onClick={ExpandedClick} variant={'outline'} className="mt-5 border-none ms-12">
          {isExpanded ? <span className="flex">view less <ChevronUp /></span>: <span className="flex">view more <ChevronDown /></span>}
      </Button>
    </>
  )
}

export default CuisnesFilter
