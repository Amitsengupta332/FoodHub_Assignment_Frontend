"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { updateMeal } from "@/actions/meal.actions";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function UpdateMealModal({ meal, onClose }: any) {
  const router = useRouter();

  const [name, setName] = useState(meal.name);
  const [price, setPrice] = useState(meal.price);
  const [description, setDescription] = useState(meal.description);
  const [image, setImage] = useState(meal.image);
  const [isAvailable, setIsAvailable] = useState(meal.isAvailable);

  const handleUpdate = async () => {
    // ✅ Simple validation
    if (!name.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Meal name is required!",
      });
    }

    if (!price || Number(price) <= 0) {
      return Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Price must be greater than 0!",
      });
    }

    // ✅ Confirm
    const result = await Swal.fire({
      title: "Update this meal?",
      html: `
        <div style="text-align:left;">
          <p><b>Name:</b> ${name}</p>
          <p><b>Price:</b> $${Number(price)}</p>
          <p><b>Status:</b> ${isAvailable ? "Available" : "Unavailable"}</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      // 🔥 Loading
      Swal.fire({
        title: "Updating...",
        text: "Please wait while we update the meal.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await updateMeal({
        id: meal.id,
        name,
        price: Number(price),
        description,
        image,
        isAvailable,
      });

      // Your action seems to return { error?: { message } }
      if (res?.error) {
        throw new Error(res.error.message || "Update failed");
      }

      // ✅ Success
      await Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Meal updated successfully.",
        timer: 1400,
        showConfirmButton: false,
      });

      router.refresh();
      onClose();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.message || "Failed to update meal.",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Edit Meal</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <Input value={name} onChange={(e) => setName(e.target.value)} />

          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input value={image} onChange={(e) => setImage(e.target.value)} />

          <div className="flex items-center gap-2">
            <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
            <span>Available</span>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button onClick={handleUpdate}>Update</Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
