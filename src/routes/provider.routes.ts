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
import { Hamburger, Home,  Plus,  ShoppingCart,  } from "lucide-react";

export const providerRoutes: Route[] = [
  {
    title: "Profile Management",
    items: [
      {
        title: "Home",
        url: "/provider-dashboard",
        icon: Home,
      },
      {
        title: "Profile",
        url: "/provider-dashboard/providerprofile",
        icon: Home,
      },
    ],
  },
  {
    title: "Meal Management",
    items: [
      {
        title: "View Menu",
        url: "/provider-dashboard/viewmenu",
        icon: Hamburger,
      },
      {
        title: "Add Menu",
        url: "/provider-dashboard/addmenu",
        icon: Plus,
      },
    ],
  },
  {
    title: "Order Management",
    items: [
      {
        title: "Orders",
        url: "/provider-dashboard/order",
        icon: ShoppingCart,
      },
    ],
  },
];