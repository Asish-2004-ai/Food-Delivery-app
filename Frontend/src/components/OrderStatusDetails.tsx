import { Order } from "@/type"

type Props = {
    order: Order
}

const OrderStatusDetails = ({ order }: Props) => {
    return (
        <div className="space-y-5">
            <div className="flex flex-col ">
                <span className="font-semibold">Delivering To:</span>
                <span>{order.deliveryDetails.name}</span>
                <span>{order.deliveryDetails.address}, {order.deliveryDetails.city}, {order.deliveryDetails.country}</span>
            </div>
            <div className="flex flex-col ">
                <span className="font-semibold">Your Order:</span>
                <ul>

                    {
                        order.cartItems.map((item) => (
                            <li>
                                {item.name} x {item.qty}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <hr />
            <div className=" flex flex-col ">
                <span className="font-bold">Total</span>
                <span>₹ {(order.totalAmount / 100).toFixed(2)}</span>
            </div>
        </div>
    )
}

export default OrderStatusDetails
