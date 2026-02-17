import { getMyOrders } from "@/actions/order.server";
import OrdersList from "@/components/modules/orders/orders-list";

export default async function CustomerOrderPage() {
  const res = await getMyOrders();

  return (
    <div className="p-6">
      <OrdersList
        orders={res.success ? res.data : []}
        error={res.success ? "" : res.message}
      />
    </div>
  );

  // return (
  //   <div className="p-6">
  //     <OrdersList orders={res.data} />
  //   </div>
  // );
}
