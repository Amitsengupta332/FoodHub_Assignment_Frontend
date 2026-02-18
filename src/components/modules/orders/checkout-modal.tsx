"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { createOrder } from "@/actions/order.server";

export default function CheckoutModal({
  open,
  setOpen,
  mealId,
  mealPrice, // optional
}: any) {
  const [address, setAddress] = useState("");
  const [qty, setQty] = useState(1);
  const router = useRouter();

  if (!open) return null;

  const increase = () => setQty((prev: number) => prev + 1);
  const decrease = () => {
    if (qty > 1) setQty((prev: number) => prev - 1);
  };

  const handleOrder = async () => {
    if (!address.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Delivery address is required!",
      });
    }

    const total = mealPrice ? mealPrice * qty : null;

    // ✅ Confirm
    const result = await Swal.fire({
      title: "Confirm your order?",
      html: `
        <div style="text-align:left;">
          <p><b>Quantity:</b> ${qty}</p>
          ${
            total !== null
              ? `<p><b>Total:</b> ৳${total}</p>`
              : `<p><b>Total:</b> (not provided)</p>`
          }
          <p style="margin-top:8px;"><b>Address:</b> ${address}</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, place order",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      // 🔥 Loading
      Swal.fire({
        title: "Placing order...",
        text: "Please wait while we confirm your order.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await createOrder({
        address,
        items: [{ mealId, qty }],
      });

      if (!res.success) {
        throw new Error(res.message || "Order failed");
      }

      // ✅ Success
      await Swal.fire({
        icon: "success",
        title: "Order placed!",
        text: "Your order has been placed successfully ✅",
        timer: 1400,
        showConfirmButton: false,
      });

      setOpen(false);
      setAddress("");
      setQty(1);

      router.push("/dashboard/order");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.message || "Failed to place order.",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Checkout</h2>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium mb-1">Quantity</label>

          <div className="flex items-center gap-3">
            <button className="px-3 py-1 border rounded" onClick={decrease}>
              -
            </button>

            <span className="text-lg font-semibold">{qty}</span>

            <button className="px-3 py-1 border rounded" onClick={increase}>
              +
            </button>
          </div>
        </div>

        {/* Optional Total */}
        {mealPrice && (
          <p className="text-sm text-muted-foreground">
            Total: ৳ {mealPrice * qty}
          </p>
        )}

        {/* Address */}
        <textarea
          className="border w-full p-2 rounded"
          rows={3}
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex gap-2">
          <Button className="flex-1" onClick={handleOrder}>
            Confirm Order
          </Button>

          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
