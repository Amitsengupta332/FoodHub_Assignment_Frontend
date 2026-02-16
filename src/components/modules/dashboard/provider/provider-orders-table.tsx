"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  updateOrderStatus,
  type OrderStatus,
} from "@/actions/provider-orders.server";

import { Button } from "@/components/ui/button";

function nextStatus(current: OrderStatus): OrderStatus | null {
  if (current === "PLACED") return "PREPARING";
  if (current === "PREPARING") return "READY";
  if (current === "READY") return "DELIVERED";
  return null;
}

export default function ProviderOrdersTable({
  orders,
  error,
}: {
  orders: any[];
  error?: string;
}) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleUpdate = async (orderId: string, status: OrderStatus) => {
    setLoadingId(orderId);

    const toastId = toast.loading("Updating status...");

    const res = await updateOrderStatus(orderId, status);

    if (res.success) {
      toast.success("Status updated ✅", { id: toastId });
      router.refresh();
    } else {
      toast.error(res.message || "Failed", { id: toastId });
    }

    setLoadingId(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Provider Orders</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order: any) => {
              const current: OrderStatus = order.status;
              const next = nextStatus(current);

              return (
                <tr key={order.id} className="border-t">
                  <td className="p-3">{order.id.slice(0, 8)}...</td>
                  <td className="p-3">{order.user?.name}</td>
                  <td className="p-3">${order.total}</td>

                  <td className="p-3">
                    <span className="px-2 py-1 rounded bg-gray-100 text-xs">
                      {current}
                    </span>
                  </td>

                  <td className="p-3">
                    {next ? (
                      <Button
                        size="sm"
                        disabled={loadingId === order.id}
                        onClick={() => handleUpdate(order.id, next)}
                      >
                        {loadingId === order.id
                          ? "Updating..."
                          : `Mark ${next}`}
                      </Button>
                    ) : (
                      <span className="text-xs text-gray-500">
                        No Action
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
