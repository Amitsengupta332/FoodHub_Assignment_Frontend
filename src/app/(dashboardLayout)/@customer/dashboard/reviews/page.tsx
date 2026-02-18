"use client";

import { env } from "@/env";
import { useState } from "react";
import Swal from "sweetalert2";

export default function OrdersList({ orders }: any) {
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = async (order: any) => {
    const mealId = order.items?.[0]?.mealId;

    if (!mealId) {
      return Swal.fire({
        icon: "error",
        title: "Missing Meal",
        text: "Meal ID not found for this order.",
      });
    }

    if (!comment.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Comment is required.",
      });
    }

    if (rating < 1 || rating > 5) {
      return Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Rating must be between 1 and 5.",
      });
    }

    // ✅ Confirm
    const result = await Swal.fire({
      title: "Submit review?",
      html: `
        <div style="text-align:left;">
          <p><b>Rating:</b> ${rating}/5</p>
          <p style="margin-top:8px;"><b>Comment:</b> ${comment}</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, submit",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      // 🔥 Loading
      Swal.fire({
        title: "Submitting...",
        text: "Please wait while we submit your review.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await fetch(`${env.API_URL}/api/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ mealId, rating, comment }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Review failed");
      }

      // ✅ Success
      await Swal.fire({
        icon: "success",
        title: "Submitted!",
        text: "Your review has been submitted successfully.",
        timer: 1400,
        showConfirmButton: false,
      });

      setReviewingId(null);
      setRating(5);
      setComment("");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.message || "Failed to submit review.",
      });
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
                        onClick={() => submitReview(o)}
                      >
                        Submit Review
                      </button>

                      <button
                        className="text-sm text-gray-600 ml-2"
                        onClick={() => {
                          setReviewingId(null);
                          setRating(5);
                          setComment("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="mt-2 text-sm text-blue-600"
                      onClick={() => setReviewingId(o.id)}
                    >
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
