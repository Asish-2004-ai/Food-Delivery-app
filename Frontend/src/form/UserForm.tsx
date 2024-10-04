import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { user } from '@/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const userSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required")
})

export type userFormData = z.infer<typeof userSchema>



type Props = {
  currentuser: user,
  onSave: (userData: userFormData) => void,
  isLoading: boolean,
  title?:string,
  button?:string
}

const UserForm = ({ onSave, isLoading, currentuser, title="User Profile", button="Submit" }: Props) => {
  const form = useForm<userFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: currentuser || {
      email: '',
      name: '',
      address: '',
      city: '',
      country: ''
    }
  })

  useEffect(() => {
    console.log(currentuser); // Debug: Log currentuser
    form.reset(currentuser);
  }, [currentuser, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className='space-y-4 bg-gray-50 rounded-lg p-4 md:p-10'>
        <div className='w-full'>
          <h2 className='font-bold text-2xl text-slate-700'>{title}</h2>
          <FormDescription>
            View and update your profile here.
          </FormDescription>
        </div>

        <FormField control={form.control} name='email' render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <input {...field}  className='bg-white w-full p-2 border border-gray-300 rounded-md' />
            </FormControl>
          </FormItem>
        )} />
        
        <div className='flex flex-col md:flex-row gap-4'>
          <FormField control={form.control} name='name' render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <input {...field} className='bg-white w-full p-2 border border-gray-300 rounded-md' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name='address' render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <input {...field} className='bg-white w-full p-2 border border-gray-300 rounded-md' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name='city' render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>City</FormLabel>
              <FormControl>
                <input {...field} className='bg-white w-full p-2 border border-gray-300 rounded-md' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name='country' render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <input {...field} className='bg-white w-full p-2 border border-gray-300 rounded-md' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        {isLoading ? (<Loading />) : (
          <Button type='submit' className='bg-blend-darken hover:bg-white hover:text-red-600'>{button}</Button>
        )}
      </form>
    </Form>
  )
}

export default UserForm
