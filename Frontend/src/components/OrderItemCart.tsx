import { Order, OrderStatus } from "@/type"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Loader2 } from "lucide-react"
import { Badge } from "./ui/badge"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { updateRestaurantOrders } from "@/api/userRestaurant"
import { useEffect, useState } from "react"

type Props = {
    order: Order
    isLoading: boolean
}

type orderStatusInfo = {
    label: string
    value: OrderStatus
    progressValue: number
}

const OrderItemCart = ({ order, isLoading }: Props) => {

    const { update, isLoading: statusLoading } = updateRestaurantOrders()
    const [status, setStatus] = useState<OrderStatus>(order.status)

    useEffect(() => {
        setStatus(order.status)
    }, [order.status])

    const handleStatusChange = async (newStatus:OrderStatus)=>{
        await update({
            orderid: order._id as string,
            status: newStatus
        })

        setStatus(newStatus)
    }

    if (isLoading) {
        return <Loader2 className='animate-spin' />
    }
    const getExpectedDelivery = () => {
        const created = new Date(order.createdAt)

        created.setMinutes(
            created.getMinutes() + parseInt(order.restaurant.estimatedDeliveryTime)
        )

        const hours = created.getHours()
        const minutes = created.getMinutes()

        const add = minutes < 10 ? `0${minutes}` : minutes
        // console.log(add)
        return `${hours}:${add}`
    }

    const orderStatus: orderStatusInfo[] = [
        {
            label: "placed",
            value: "placed",
            progressValue: 0
        },
        {
            label: "Awaiting Restaurant Confirmation",
            value: "paid",
            progressValue: 25
        },
        {
            label: "In Progress",
            value: "inProgress",
            progressValue: 50
        },
        {
            label: "Out For Delivery",
            value: "outForDelivery",
            progressValue: 75
        },
        {
            label: "delivered",
            value: "Delivered",
            progressValue: 100
        },
    ]
    return (
        <Card>
            <CardHeader>
                <CardTitle className="grid md:grid-cols-4 justify-between gap-4 mb-4">
                    <div>
                        Customer Name: {" "}
                        <span className="font-normal ml-2">{order.deliveryDetails.name}</span>
                    </div>
                    <div>
                        Delivery address: {" "}
                        <span className="font-normal ml-2">{order.deliveryDetails.address}, {order.deliveryDetails.city}, {order.deliveryDetails.country}</span>
                    </div>
                    <div className="md:ms-10">
                        Time: <span className="font-normal ml-2">{getExpectedDelivery()} min</span>
                    </div>
                    <div>
                        Total Amount: {" "}
                        <span className="font-normal">{(order.totalAmount / 100).toFixed(2)}</span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                    {
                        order.cartItems.map((item) => (
                            <span>
                                <Badge variant={'outline'}>{item.qty}</Badge> {item.name}
                            </span>
                        ))
                    }

                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="status">What is the status for this order ?</Label>
                    <Select value={status} disabled={statusLoading} onValueChange={(value) => { handleStatusChange(value as OrderStatus) }}>
                        <SelectTrigger value={'status'}>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {
                                orderStatus.map((item) => (
                                    <SelectItem value={item.value}>{item.label}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}

export default OrderItemCart
