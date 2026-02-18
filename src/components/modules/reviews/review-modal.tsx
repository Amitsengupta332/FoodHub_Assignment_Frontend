"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createReview } from "@/actions/review.server";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function ReviewModal({
  open,
  setOpen,
  mealId,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  mealId: string;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!open) return null;

  const submit = async () => {
    // ✅ Validation (Swal)
    if (!comment.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Comment is required!",
      });
    }

    if (rating < 1 || rating > 5) {
      return Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Rating must be between 1 and 5!",
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
      setLoading(true);

      // 🔥 Loading
      Swal.fire({
        title: "Submitting...",
        text: "Please wait while we submit your review.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await createReview({ mealId, rating, comment });

      if (!res.success) {
        throw new Error(res.message || "Review failed");
      }

      // ✅ Success
      await Swal.fire({
        icon: "success",
        title: "Submitted!",
        text: "Review submitted ✅",
        timer: 1400,
        showConfirmButton: false,
      });

      setOpen(false);
      setComment("");
      setRating(5);
      router.refresh();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.message || "Failed to submit review.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <div className="bg-white w-full max-w-md rounded p-5 space-y-4">
        <h2 className="text-lg font-bold">Leave a Review</h2>

        <div>
          <label className="text-sm font-medium">Rating (1-5)</label>
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded w-full p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Comment</label>
          <textarea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border rounded w-full p-2 mt-1"
            placeholder="Write something..."
          />
        </div>

        <div className="flex gap-2">
          <Button className="flex-1" disabled={loading} onClick={submit}>
            {loading ? "Submitting..." : "Submit"}
          </Button>

          <Button
            className="flex-1"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
