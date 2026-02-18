"use client";

import { Badge } from "@/components/ui/badge";

function statusColor(status: string) {
  if (status === "PLACED") return "bg-blue-100 text-blue-700";
  if (status === "PREPARING") return "bg-yellow-100 text-yellow-700";
  if (status === "READY") return "bg-purple-100 text-purple-700";
  if (status === "DELIVERED") return "bg-green-100 text-green-700";
  if (status === "CANCELLED") return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-700";
}

export default function AdminOrdersTable({ orders }: any) {
  if (!orders.length) {
    return <p>No orders found</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">All Orders (Admin)</h1>

      <div className="overflow-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Provider</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Created</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o: any) => (
              <tr key={o.id} className="border-t">
                <td className="p-3 font-medium">{o.id.slice(0, 8)}...</td>

                <td className="p-3">
                  <div className="flex flex-col">
                    <span>{o.user?.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {o.user?.email}
                    </span>
                  </div>
                </td>

                <td className="p-3">
                  {o.provider?.user?.name || "N/A"}
                </td>

                <td className="p-3 font-semibold">৳{o.total}</td>

                <td className="p-3">
                  <span className={`text-xs px-2 py-1 rounded ${statusColor(o.status)}`}>
                    {o.status}
                  </span>
                </td>

                <td className="p-3 max-w-[250px] truncate">{o.address}</td>

                <td className="p-3 text-xs text-muted-foreground">
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
