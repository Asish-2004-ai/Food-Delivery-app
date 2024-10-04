import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormItem, FormLabel } from "@/components/ui/form"
import { ControllerRenderProps, FieldValue } from "react-hook-form"

type Props = {
  cuisines: string
  field: ControllerRenderProps<FieldValue, "cuisines">
}

const CheckBox = ({ cuisines, field }: Props) => {
  return (
    <FormItem className="flex space-x-2 mt-2 items-center space-y-0">
      <FormControl>
        <Checkbox className="bg-white" checked={field.value.includes(cuisines)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, cuisines])
            }
            else {
              field.onChange(field.value.filter((value: string) => value !== cuisines))
            }
          }}
        />
      </FormControl>  
      <FormLabel className="text-sm font-normal">{cuisines}</FormLabel>
    </FormItem>
  )
}

export default CheckBox
