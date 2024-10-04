import { AspectRatio } from "@/components/ui/aspect-ratio"
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

const MenuImg = () => {
  const { control, watch } = useFormContext()

  const existImgUrl = watch("imageUrl")
  return (
    <div className="space-y-4">
      <div className="">
        <h2 className="font-bold text-2xl">Image</h2>
        <FormDescription>Upload an image to showcase your restaurant.</FormDescription>
      </div>
      <div className="flex flex-col md:w-[50%]">
        {existImgUrl && (
          <AspectRatio ratio={14 / 16}>
            <img src={existImgUrl} className='object-cover h-[300px] md:h-[400px] w-full rounded-md' alt="" />
          </AspectRatio>
        )}
        <FormField  control={control} name="imageFile" render={({ field }) => (
          <FormItem className=''>
            <FormControl>
              <Input type="file" accept=".jpg, .png, .jpeg" onChange={(e) => (field.onChange(e.target.files ? e.target.files[0] : null))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
    </div>
  )
}

export default MenuImg
