// import { Route } from "@/types";
// import type { Route } from "@/types/routes.type";
import { Route } from "@/types/routes.type";
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
