// import {
//   LayoutDashboard,
//   Plus,
//   Menu,
//   Inbox,
// } from "lucide-react";

// export const providerRoutes = [
//   {
//     title: "Dashboard",
//     url: "/dashboard",
//     icon: LayoutDashboard,
//   },
 
//   {
//     title: "Add Menu",
//     url: "/provider-dashboard/addmenu",
//     icon: Plus,
//   },
//   {
//     title: "View Menu",
//     url: "/provider-dashboard/viewmenu",
//     icon: Menu,
//   },
//   {
//     title: "Incoming Orders",
//     url: "/provider-dashboard/orders",
//     icon: Inbox,
//   },
// ];


import { Route } from "@/types";
import { Hamburger, Home,  ShoppingCart } from "lucide-react";

export const providerRoutes: Route[] = [
  {
    title: "Profile Management",
    items: [
      {
        title: "Home",
        url: "/provider-dashboard",
        icon: Home,
      },
    ],
  },
  {
    title: "Meal Management",
    items: [
      {
        title: "Meals",
        url: "/provider-dashboard/meals",
        icon: Hamburger,
      },
    ],
  },
  {
    title: "Order Management",
    items: [
      {
        title: "Orders",
        url: "/provider-dashboard/orders",
        icon: ShoppingCart,
      },
    ],
  },
];