import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from './ui/form'
import {  Search } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'


const formSchema = z.object({
    searchQuery: z.string({
        required_error: "Restaurant Name is Requiered"
    })

})
export type SearchForm = z.infer<typeof formSchema>

type Props = {
    onSubmit: (formData: SearchForm) => void,
    onReset?: () => void,
    placeHolder: string,
    searchQuery?: string
}

const Searchbar = ({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {

    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: { searchQuery }
    })

    const handleclick=()=>{
        form.reset({
            searchQuery:"",
        })
        if(onReset){
            onReset()
        }
    }
    return <Form {...form}>
        <form className={`flex gap-2 justify-between items-center flex-row border-2 rounded-full p-3 my-5 ${form.formState.errors.searchQuery && "border-red-500"}`} onSubmit={form.handleSubmit(onSubmit)} >
            <Search strokeWidth={2.5} className='ml-1 hidden text-red-500 md:block' />
            <FormField control={form.control} name='searchQuery' render={({ field }) => (
                <FormItem className='flex-1'>
                    <FormControl>
                        <Input {...field} placeholder={placeHolder} className='border-none shadow-none focus-visible:ring-0 text-xl' />
                    </FormControl>
                </FormItem>
            )} />
            {form.formState.isDirty ?<Button onClick={handleclick}>Reset</Button>:""}
            <Button>Submit</Button>
        </form>
    </Form>

}

export default Searchbar
