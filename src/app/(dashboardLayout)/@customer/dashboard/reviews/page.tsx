"use client";

import { env } from "@/env";
import { useState } from "react";
import { toast } from "sonner";

export default function OrdersList({ orders }: any) {
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = async (order: any) => {
    const mealId = order.items[0]?.mealId; // simple case
    // ${API_URL}/api/meals/${id} env.API_URL;

    const res = await fetch(`${env.API_URL}/api/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        mealId,
        rating,
        comment,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Review failed");
    } else {
      toast.success("Review submitted!");
      setReviewingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders?.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="space-y-3">
          {orders?.map((o: any) => (
            <div key={o.id} className="border p-4 rounded">
              <p>
                Status: <b>{o.status}</b>
              </p>
              <p>Total: ৳{o.total}</p>
              <p>Address: {o.address}</p>

              {/* ✅ Review Button */}
              {o.status === "DELIVERED" && (
                <>
                  {reviewingId === o.id ? (
                    <div className="mt-3 space-y-2">
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="border p-1 w-20"
                      />

                      <textarea
                        className="border p-2 w-full"
                        placeholder="Write your review..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />

                      <button
                        className="bg-black text-white px-3 py-1 rounded text-sm"
                        onClick={() => submitReview(o)}>
                        Submit Review
                      </button>
                    </div>
                  ) : (
                    <button
                      className="mt-2 text-sm text-blue-600"
                      onClick={() => setReviewingId(o.id)}>
                      Leave Review
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
