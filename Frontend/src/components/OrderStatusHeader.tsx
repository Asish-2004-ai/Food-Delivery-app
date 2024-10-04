import { Order, OrderStatus } from "@/type"
import { Progress } from "./ui/progress"

type Props = {
  order: Order
}

type orderStatusInfo = {
  label: string
  value: OrderStatus
  progressValue: number
}

const OrderStatusHeader = ({ order }: Props) => {

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

  const orderResult = () => {
    return orderStatus.find((o) => o.value === order.status) || orderStatus[0]
  }

  return (
    <>
      <h1 className="font-bold text-4xl flex flex-col gap-5 md:flex-row md:justify-between">
        <span>Order Status : {orderResult()?.label}</span>

        <span>Expected by : {getExpectedDelivery()}</span>
      </h1>
      <Progress className="animate-pulse" value={orderResult()?.progressValue} />
    </>
  )
}

export default OrderStatusHeader

