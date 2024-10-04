import { FormDescription, FormField, FormItem } from "@/components/ui/form"
import { disesList } from "@/restaurantDises"
import { useFormContext } from "react-hook-form"
import CheckBox from "./CheckBox"

const Dises = () => {
  const { control } = useFormContext()
  return (
    <div className="space-y-4 md:p-10 w-[80vw]">
      <div>
        <h2 className="font-bold text-2xl">Dises</h2>
        <FormDescription>Select your favorite dises that your restaurant service</FormDescription>
      </div>
      <FormField control={control} name="cuisines" render={({ field }) => (
        <FormItem>
          <div className="grid md:grid-cols-5">
            {
              disesList.map((items) =>(
                <CheckBox cuisines={items} field={field} />

              ))

            }
          </div>
        </FormItem>
      )} />

  
    </div>
  )
}

export default Dises
