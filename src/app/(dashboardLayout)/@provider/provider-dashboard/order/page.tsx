import { getProviderOrders } from "@/actions/provider-orders.server";
import ProviderOrdersTable from "@/components/modules/dashboard/provider/provider-orders-table";

 

export default async function ProviderOrderPage() {
  const result = await getProviderOrders();

  return (
    <div className="p-6">
      <ProviderOrdersTable
        orders={result.data}
        error={result.success ? "" : result.message}
      />
    </div>
  );
}
