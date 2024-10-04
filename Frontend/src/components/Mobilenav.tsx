import {
    Sheet,
    SheetContent,
    SheetDescription,

    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { CircleUserRound, Menu } from "lucide-react"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import Mobilenavlink from "./Mobilenavlink"


const Mobilenav = () => {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0()
    return (

        <Sheet>
            <SheetTrigger><Menu /></SheetTrigger>
            <SheetContent className='space-y-3'>

                <SheetTitle className="tracking-tight">{isAuthenticated ? <span className="flex  gap-2 hover:text-red-500"><CircleUserRound /> {user?.given_name}</span> : <>Welcome to UrDokan</>}</SheetTitle>
                <Separator />
                <SheetDescription className="flex flex-col gap-4 ">
                    {isAuthenticated ? <><Mobilenavlink /></> :
                        <Button className="font-bold text-red-500" onClick={async () => await loginWithRedirect()}>Login</Button>
                    }
                </SheetDescription>

            </SheetContent>
        </Sheet>

    )
}

export default Mobilenav
