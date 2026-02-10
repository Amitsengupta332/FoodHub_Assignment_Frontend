
// import {
//   LayoutDashboard,
//   Users,
//   ClipboardList,
//   Layers,
// } from "lucide-react";


// export const adminRoutes = [
//   {
//     title: "Dashboard",
//     url: "/admin-dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     title: "Users",
//     url: "/admin-dashboard/users",
//     icon: Users,
//   },
//   {
//     title: "Orders",
//     url: "/admin-dashboard/orders",
//     icon: ClipboardList,
//   },
//   {
//     title: "Categories",
//     url: "/admin-dashboard/categories",
//     icon: Layers,
//   },
// ];


 
import { Route } from "@/types";
import { LayoutDashboard, User, ChefHat, ShoppingCart } from "lucide-react";

export const adminRoutes: Route[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Home",
        url: "/admin-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "User List",
        url: "/admin-dashboard/users",
        icon: User,
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
        icon: ChefHat,
      },
    ],
  },
  {
    title: "Order Management",
    items: [
      {
        title: "Orders",
        url: "/admin-dashboard/orders",
        icon: ShoppingCart,
      },
    ],
  },
];