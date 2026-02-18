"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { createCategory } from "@/actions/category.actions";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCategories: React.FC<Props> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleCreate = async () => {
    if (!name.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Category name is required!",
      });
    }

    // ✅ Confirm
    const result = await Swal.fire({
      title: "Create category?",
      text: `Category name: "${name}"`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, create",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      // 🔥 Loading
      Swal.fire({
        title: "Creating...",
        text: "Please wait while we create the category.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const formData = new FormData();
      formData.append("name", name);

      const res = await createCategory(formData);

      if (!res.success) {
        throw new Error(res.message || "Creation failed");
      }

      // ✅ Success
      await Swal.fire({
        icon: "success",
        title: "Created!",
        text: "Category created successfully.",
        timer: 1400,
        showConfirmButton: false,
      });

      setName("");
      onClose();
      router.refresh();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.message || "Failed to create category. Please try again.",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle>Create Category</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button className="flex-1" onClick={handleCreate}>
            Create
          </Button>
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateCategories;
