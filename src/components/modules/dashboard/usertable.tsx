// "use client";

// import { useState } from "react";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";

// import { ROLE } from "@/constants/userRoles";
// import { toggleUserStatus } from "@/actions/user.action";

// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   isActive: boolean;
//   createdAt?: string;
// }

// interface UsersTableProps {
//   users: User[];
// }

// //* TODO: add Swal for confirmation

// export default function UsersTable({ users }: UsersTableProps) {
//   const [loadingId, setLoadingId] = useState<string | null>(null);
//   const router = useRouter();

//   const handleStatusToggle = async (user: User) => {
//     // new status = opposite
//     const newIsActive = !user.isActive;

//     setLoadingId(user.id);
//     const toastId = toast.loading("Updating user...");

//     const res = await toggleUserStatus(user.id, newIsActive);

//     if (res.success) {
//       toast.success(`User ${newIsActive ? "Activated" : "Suspended"}`, {
//         id: toastId,
//       });
//       router.refresh();
//     } else {
//       toast.error(res.message || "Failed to update user status", { id: toastId });
//     }

//     setLoadingId(null);
//   };

//   const filtered = (users || []).filter((u) => u.role !== ROLE.ADMIN);

//   return (
//     <div className="w-full overflow-x-auto">
//       <table className="w-full border text-sm">
//         <thead className="bg-muted">
//           <tr>
//             <th className="p-3 text-left">Name</th>
//             <th className="p-3 text-left">Email</th>
//             <th className="p-3 text-left">Role</th>
//             <th className="p-3 text-left">Status</th>
//             <th className="p-3 text-left">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filtered.length === 0 ? (
//             <tr>
//               <td className="p-3" colSpan={5}>
//                 No users found
//               </td>
//             </tr>
//           ) : (
//             filtered.map((user) => (
//               <tr key={user.id} className="border-t">
//                 <td className="p-3">{user.name}</td>
//                 <td className="p-3">{user.email}</td>
//                 <td className="p-3">{user.role}</td>

//                 {/* ✅ Status Badge */}
//                 <td className="p-3">
//                   <span
//                     className={`rounded px-2 py-1 text-xs font-medium ${
//                       user.isActive
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {user.isActive ? "ACTIVE" : "SUSPENDED"}
//                   </span>
//                 </td>

//                 {/* ✅ Action */}
//                 <td className="p-3">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         disabled={loadingId === user.id}
//                       >
//                         {loadingId === user.id ? "Updating..." : "Action"}
//                       </Button>
//                     </DropdownMenuTrigger>

//                     <DropdownMenuContent align="end">
//                       {user.isActive ? (
//                         <DropdownMenuItem
//                           className="text-red-600"
//                           onClick={() => handleStatusToggle(user)}
//                         >
//                           Suspend
//                         </DropdownMenuItem>
//                       ) : (
//                         <DropdownMenuItem
//                           className="text-green-600"
//                           onClick={() => handleStatusToggle(user)}
//                         >
//                           Activate
//                         </DropdownMenuItem>
//                       )}
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { ROLE } from "@/constants/userRoles";
import { toggleUserStatus } from "@/actions/user.action";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt?: string;
}

interface UsersTableProps {
  users: User[];
}

export default function UsersTable({ users }: UsersTableProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handleStatusToggle = async (user: User) => {
    const newIsActive = !user.isActive;

    const actionText = newIsActive ? "Activate" : "Suspend";
    const actionColor = newIsActive ? "#16a34a" : "#dc2626";

    // ✅ Confirm modal
    const result = await Swal.fire({
      title: `${actionText} this user?`,
      html: `
        <div style="text-align:left;">
          <p><b>Name:</b> ${user.name}</p>
          <p><b>Email:</b> ${user.email}</p>
          <p><b>Action:</b> ${actionText}</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${actionText.toLowerCase()}`,
      cancelButtonText: "Cancel",
      confirmButtonColor: actionColor,
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      setLoadingId(user.id);

      // 🔥 Loading modal
      Swal.fire({
        title: "Updating...",
        text: "Please wait while we update the user status.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await toggleUserStatus(user.id, newIsActive);

      if (!res.success) {
        throw new Error(res.message || "Failed to update user status");
      }

      // ✅ Success modal
      await Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `User ${newIsActive ? "Activated" : "Suspended"} successfully.`,
        timer: 1400,
        showConfirmButton: false,
      });

      router.refresh();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoadingId(null);
    }
  };

  const filtered = (users || []).filter((u) => u.role !== ROLE.ADMIN);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td className="p-3" colSpan={5}>
                No users found
              </td>
            </tr>
          ) : (
            filtered.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>

                <td className="p-3">
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium ${
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.isActive ? "ACTIVE" : "SUSPENDED"}
                  </span>
                </td>

                <td className="p-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={loadingId === user.id}
                      >
                        {loadingId === user.id ? "Updating..." : "Action"}
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      {user.isActive ? (
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleStatusToggle(user)}
                        >
                          Suspend
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          className="text-green-600"
                          onClick={() => handleStatusToggle(user)}
                        >
                          Activate
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

