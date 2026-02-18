import { getAllOrdersAdmin } from "@/actions/order.actions";
import AdminOrdersTable from "@/components/modules/dashboard/admin/admin-orders-table";

export default async function AdminOrdersPage() {
  const res = await getAllOrdersAdmin();

  if (res.error) {
    return <div className="p-6 text-red-500">{res.error.message}</div>;
  }

  return (
    <div className="p-6">
      <AdminOrdersTable orders={res.data || []} />
    </div>
  );
}
