import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

const RestaurantDetails = () => {
    const { control } = useFormContext()
    return (
       <div className = "space-y-4 md:p-10 w-[80vw]">
            <div  className = "w-full " >
                <h2 className="font-bold text-2xl">Restaurant Details</h2>
                <FormDescription>Enter details about your Restaurant</FormDescription>
            </div >
            <FormField control={control} name="restaurantName" render={({ field }) =>
                <FormItem>
                    <FormLabel>Restaurant Name</FormLabel>

                    <FormControl>
                        <Input {...field} className="bg-white" />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            } />


            <div className="flex flex-col md:flex-row gap-4">
                <FormField control={control} name="city" render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>City</FormLabel>

                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={control} name="country" render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>Country</FormLabel>

                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )} />


            </div>
            <FormField control={control} name="deliveryPrice" render={({ field }) => (
                    <FormItem className="max-w-[25%]">
                        <FormLabel>Delivery Price ₹</FormLabel>

                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )} />



            <FormField control={control} name="estimatedDeliveryTime" render={({ field }) => (
                    <FormItem className="max-w-[25%]">
                        <FormLabel>Estimated Time</FormLabel>

                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )} />

              

            

        </div >
    )
}

export default RestaurantDetails
