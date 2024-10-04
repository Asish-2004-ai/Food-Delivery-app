import { FormDescription, FormField, FormItem, } from "@/components/ui/form"
import {  useFieldArray, useForm, useFormContext } from "react-hook-form"
import MenuInput from "./MenuInput"
import { Button } from "@/components/ui/button"


const MenuItem = () => {
  const methods = useForm({
    defaultValues: {
      menuItems: [{ name: "", price: "" }],
      
      // Initialize with one menu item
    },
  });
  // const {control} = methods
  const {control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
   control,
    name: "menuItems"
  })
  return (
   
    
       <div className='space-y-2'>
      <div>
        <h2 className="font-bold text-2xl">Menu Item</h2>
        <FormDescription>Create your menu <br />
          Enter your Name and Price
        </FormDescription>
      </div>

      <FormField {...methods} control={control} name='menuItems' render={() => 
        <FormItem className="flex flex-col gap-2">
          {
            fields.map((_, index) => (
              <MenuInput Index={index} removeClick={() => remove(index)}  />
            ))
          }
        </FormItem>
      } />

      <Button onClick={() => append({ name: '', price: '' })}>Add Items</Button>

    </div>

   
  )
}

export default MenuItem
