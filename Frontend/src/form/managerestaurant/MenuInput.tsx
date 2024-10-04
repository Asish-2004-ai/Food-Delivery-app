import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

type Props = {
  Index: number,
  removeClick: () => void
}

const MenuInput = ({ Index, removeClick }: Props) => {
  const { control } = useFormContext()
  return (
  <div className="flex flex-row items-end gap-2">
      <FormField control={control} name={`menuItems.${Index}.name`} render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-1">Name <FormMessage /></FormLabel>
          {/* <FormLabel>Name</FormLabel> */}
          <FormControl>
            <Input {...field} placeholder="Chicken Biriyani" type="string" className="bg-white" />
          </FormControl>
        </FormItem>
      )
      } />
      <FormField control={control} name={`menuItems.${Index}.price`} render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-1">Price <FormMessage /></FormLabel>
          {/* <FormLabel>Name</FormLabel> */}
          <FormControl>
            <Input {...field} placeholder="100" type="number" className="bg-white" />
          </FormControl>
        </FormItem>
      )
      } />




      <Button onClick={removeClick}>Remove</Button>
    </div>
  )
}

export default MenuInput
