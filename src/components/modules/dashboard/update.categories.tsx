// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";
// import { Input } from "@/components/ui/input";
// import { env } from "@/env";
// import { useRouter } from "next/navigation";

// interface ReviewModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   category: any;
//   cat_id: string;
//   category_code: string;
// }

// const UpdateCategories: React.FC<ReviewModalProps> = ({
//   isOpen,
//   onClose,
//   category,
//   cat_id,
//   category_code,
// }) => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   const router = useRouter();

//   const UpdateCategories = async () => {
//     const toastId = toast.loading("Updating category...");
//     const updatedCategory = {
//       name,
//       slug: description,
//     };

//     try {
//       const patchRes = await fetch(`${env.API_URL}/api/categories/${cat_id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(updatedCategory),
//       });

//       if (!patchRes.ok) throw new Error("Failed to update category");

//       toast.success("Category updated successfully!", { id: toastId });
//       onClose();
//       router.refresh();
//     } catch (err) {
//       toast.error("Failed to update. Try again.", { id: toastId });
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <Card className="w-full max-w-md p-4">
//         <CardHeader>
//           <CardTitle>update Category</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <Input
//             placeholder="Category Name"
//             onChange={(e) => setName(e.target.value)}
//           />
//           <Textarea
//             placeholder="Description"
//             onChange={(e) => setDescription(e.target.value)}
//             rows={4}
//           />
//         </CardContent>
//         <CardFooter className="flex gap-2">
//           <Button className="flex-1" onClick={UpdateCategories}>
//             Update
//           </Button>
//           <Button variant="outline" className="flex-1" onClick={onClose}>
//             Cancel
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default UpdateCategories;


"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateCategory } from "@/actions/category.actions";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cat_id: string;
  currentName?: string; // ✅ add
}

const UpdateCategories: React.FC<Props> = ({ isOpen, onClose, cat_id, currentName }) => {
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    setName(currentName || "");
  }, [currentName]);

  const handleUpdate = async () => {
    if (!name.trim()) return toast.error("Name is required");

    const toastId = toast.loading("Updating...");

    const res = await updateCategory(cat_id, { name });

    if (res.success) {
      toast.success("Category updated!", { id: toastId });
      onClose();
      router.refresh();
    } else {
      toast.error(res.message || "Update failed", { id: toastId });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle>Update Category</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button className="flex-1" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdateCategories;
