// "use client";

// export default function OrdersList({ orders }: any) {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">My Orders</h1>

//       {orders.length === 0 ? (
//         <p>No orders yet</p>
//       ) : (
//         <div className="space-y-3">
//           {orders.map((o: any) => (
//             <div key={o.id} className="border p-4 rounded">
//               <p>Status: <b>{o.status}</b></p>
//               <p>Total: ৳{o.total}</p>
//               <p>Address: {o.address}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { cancelMyOrder } from "@/actions/order.server";

export default function OrdersList({ orders }: any) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleCancel = async (order: any) => {
    // ✅ Confirm
    const result = await Swal.fire({
      title: "Cancel this order?",
      html: `
        <div style="text-align:left;">
          <p><b>Status:</b> ${order?.status ?? "N/A"}</p>
          <p><b>Total:</b> ৳${order?.total ?? "N/A"}</p>
          <p><b>Address:</b> ${order?.address ?? "N/A"}</p>
          <p style="margin-top:8px;">This action cannot be undone.</p>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "Keep order",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      setLoadingId(order.id);

      // 🔥 Loading
      Swal.fire({
        title: "Cancelling...",
        text: "Please wait while we cancel your order.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await cancelMyOrder(order.id);

      if (!res.success) {
        throw new Error(res.message || "Cancel failed");
      }

      // ✅ Success
      await Swal.fire({
        icon: "success",
        title: "Cancelled!",
        text: "Your order has been cancelled ✅",
        timer: 1400,
        showConfirmButton: false,
      });

      router.refresh();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.message || "Failed to cancel order.",
      });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="space-y-3">
          {orders.map((o: any) => (
            <div key={o.id} className="border p-4 rounded space-y-1">
              <p>
                Status: <b>{o.status}</b>
              </p>
              <p>Total: ৳{o.total}</p>
              <p>Address: {o.address}</p>

              <div className="pt-2">
                {o.status === "PLACED" ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={loadingId === o.id}
                    onClick={() => handleCancel(o)}>
                    {loadingId === o.id ? "Cancelling..." : "Cancel Order"}
                  </Button>
                ) : (
                  <span className="text-xs text-gray-500">
                    Cancel available only when order is PLACED
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
