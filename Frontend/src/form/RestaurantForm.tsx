import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import RestaurantDetails from './managerestaurant/RestaurantDetails';
import Dises from './managerestaurant/Dises';
import MenuItem from './managerestaurant/MenuItem';
import MenuImg from './managerestaurant/MenuImg';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { Restaurant } from '@/type';
import { useEffect } from 'react';
// import { Item } from '@radix-ui/react-dropdown-menu';

const formSchema = z.object({
    restaurantName: z.string({
        required_error: "Restaurant is Requier"
    }),
    city: z.string({
        required_error: "City is Requier"
    }),
    country: z.string({
        required_error: "Country is Requier"
    }),
    deliveryPrice: z.coerce.number({
        required_error: "DeliveryPrice is Requier",
        invalid_type_error: "must be a number"
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "EstimatedDeliveryTime is Requier",
        invalid_type_error: "must be a number"

    }),
    cuisines: z.array(z.string()).nonempty({ message: "Please select one item" }),

    menuItems: z.array(z.object({
        name: z.string().min(1, "Name is required"),
        price: z.coerce.number().min(0, "Price is required"),
    })),
    
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is requierd" }).optional(),
}).refine((data)=>data.imageUrl || data.imageFile,{
    message:"Either ImageFile or ImageUrl requiered",path:["imageFile"]
})

type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
    onSave: (RestaurantFormData: FormData) => void
    isLoading: boolean
    restaurant?: Restaurant

}

const RestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: '' }, { price: 0 }]
        }
    })

    useEffect(() => {
        if (!restaurant) {
            return
        }

    //    const restaurantFormat = restaurant.menuItems.map((item)=>({
    //     ...item,
    //     price:parseInt(item.price)

    //    }))

       const updateRestaurant = {
        ...restaurant,
        // menuItems: restaurantFormat
       }

        form.reset(updateRestaurant)
    }, [form, restaurant])
    const onSubmit = (formDataJson: RestaurantFormData) => {
        const formData = new FormData()
        console.log("submit")

        formData.append("restaurantName", formDataJson.restaurantName)
        formData.append("city", formDataJson.city)
        formData.append("country", formDataJson.country)
        formData.append("deliveryPrice", formDataJson.deliveryPrice.toString())
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString())
        formDataJson.cuisines.forEach((item, index) => {
            formData.append(`cuisines[${index}]`, item)
        })

        formDataJson.menuItems.forEach((item, index) => {
            formData.append(`menuItems[${index}][name]`, item.name)
            formData.append(`menuItems[${index}][price]`, item.price.toString())
        })

        if (formDataJson.imageFile) {
            formData.append("imageFile", formDataJson.imageFile)
        }

        onSave(formData);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7 bg-gray-50 p-10'>
                <RestaurantDetails />
                <hr />
                <Dises />
                <hr />
                <MenuItem />
                <br></br>
                <MenuImg />
                {isLoading ? <Loading /> : (<Button className='sm:mt-10' type='submit'>Submit</Button>)}
                {/* <Button type='submit'>Submit</Button> */}
            </form>
        </Form>
    )
}





export default RestaurantForm