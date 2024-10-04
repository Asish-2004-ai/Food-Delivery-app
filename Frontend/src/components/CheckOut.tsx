import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import Loading from "./Loading"
import { useLocation } from "react-router-dom"
import UserForm, { userFormData } from "@/form/UserForm"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { allUsers } from "@/api/userApi"

type Props = {
    checkOut: (user: userFormData) => void,
    disabled: boolean
    isCreateLoading: boolean
}

const CheckOut = ({ checkOut, disabled, isCreateLoading }: Props) => {
    const { pathname } = useLocation()
    const { isLoading, loginWithRedirect, isAuthenticated } = useAuth0()
    const { currentUser, isLoading: isGettingLoading } = allUsers()

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname,
            },
        })
    }
    if (!isAuthenticated) {
        return (
            <Button className="text-red-500 flex-1" onClick={onLogin}>Login to PlaceOrder</Button>
        )
    }
    if (isLoading || !currentUser || isCreateLoading) {
        return <Loading />
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={disabled} className="bg-green-500 flex-1">Go To CheckOut</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[450px] md:min-w-[700px] bg-gray-50">
                <UserForm currentuser={currentUser} isLoading={isGettingLoading} onSave={checkOut} title="Confirm Delivery Details" button="Save" />
            </DialogContent>
        </Dialog>
    )
}

export default CheckOut
