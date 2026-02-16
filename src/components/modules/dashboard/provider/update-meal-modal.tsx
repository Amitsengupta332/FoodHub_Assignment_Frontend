"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
    const res = await updateMeal({
      id: meal.id,
      name,
      price: Number(price),
      description,
      image,
      isAvailable,
    });

    if (!res?.error) {
      toast.success("Meal updated successfully");
      router.refresh();
      onClose();
    } else {
      toast.error(res.error.message);
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
          <Input
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <Switch
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
            />
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
