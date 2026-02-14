// "use client";

// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { updateCategory } from "@/actions/category.actions";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   cat_id: string;
//   currentName?: string; // ✅ add
// }

// const UpdateCategories: React.FC<Props> = ({
//   isOpen,
//   onClose,
//   cat_id,
//   currentName,
// }) => {
//   const [name, setName] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     setName(currentName || "");
//   }, [currentName]);

//   const handleUpdate = async () => {
//     if (!name.trim()) return toast.error("Name is required");

//     const toastId = toast.loading("Updating...");

//     const res = await updateCategory(cat_id, { name });

//     if (res.success) {
//       toast.success("Category updated!", { id: toastId });
//       onClose();
//       router.refresh();
//     } else {
//       toast.error(res.message || "Update failed", { id: toastId });
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <Card className="w-full max-w-md p-4">
//         <CardHeader>
//           <CardTitle>Update Category</CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           <Input
//             placeholder="Category Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </CardContent>

//         <CardFooter className="flex gap-2">
//           <Button className="flex-1" onClick={handleUpdate}>
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
import { updateCategory } from "@/actions/category.actions";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cat_id: string;
  currentName?: string;
}

const UpdateCategories: React.FC<Props> = ({
  isOpen,
  onClose,
  cat_id,
  currentName,
}) => {
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    setName(currentName || "");
  }, [currentName]);

  const handleUpdate = async () => {
    if (!name.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Category name is required!",
      });
    }

    // ✅ Confirm
    const result = await Swal.fire({
      title: "Update category?",
      text: "This will update the category name.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      // 🔥 Loading
      Swal.fire({
        title: "Updating...",
        text: "Please wait while we update the category.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await updateCategory(cat_id, { name });

      if (!res.success) {
        throw new Error(res.message || "Update failed");
      }

      // ✅ Success
      await Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Category updated successfully.",
        timer: 1400,
        showConfirmButton: false,
      });

      onClose();
      router.refresh();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.message || "Update failed. Please try again.",
      });
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
