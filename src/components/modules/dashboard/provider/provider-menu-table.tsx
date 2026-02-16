"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import UpdateMealModal from "./update-meal-modal";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteMealServer } from "@/actions/meal.server";

export default function ProviderMenuTable({ meals }: any) {
  const router = useRouter();
  const [selectedMeal, setSelectedMeal] = useState<any>(null);

  const handleDelete = async (meal: any) => {
    // ✅ Confirm
    const result = await Swal.fire({
      title: "Delete this meal?",
      html: `
        <div style="text-align:left;">
          <p><b>Name:</b> ${meal?.name ?? "N/A"}</p>
          <p><b>Price:</b> $${meal?.price ?? "N/A"}</p>
          <p style="margin-top:8px;">This action cannot be undone.</p>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      // 🔥 Loading
      Swal.fire({
        title: "Deleting...",
        text: "Please wait while we delete the meal.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await deleteMealServer(meal.id);

      if (!res.success) throw new Error(res.message || "Delete failed");

      // ✅ Success
      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Meal deleted successfully.",
        timer: 1400,
        showConfirmButton: false,
      });

      router.refresh();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.message || "Failed to delete meal.",
      });
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">My Menu</h1>

      {meals.length === 0 ? (
        <p>No meals added yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {meals.map((meal: any) => (
            <Card key={meal.id}>
              <CardHeader>
                <CardTitle>{meal.name}</CardTitle>
              </CardHeader>

              <CardContent>
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-40 object-cover rounded"
                />
                <p className="mt-2 text-sm text-gray-600">{meal.description}</p>
                <p className="mt-2 font-semibold">${meal.price}</p>
                <p className="text-xs mt-1">
                  Status:{" "}
                  <span
                    className={
                      meal.isAvailable ? "text-green-600" : "text-red-600"
                    }
                  >
                    {meal.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </p>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedMeal(meal)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(meal)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {selectedMeal && (
        <UpdateMealModal
          meal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
        />
      )}
    </>
  );
}
