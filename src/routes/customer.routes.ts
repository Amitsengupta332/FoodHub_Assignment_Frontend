// import {
//   ShoppingCart,
//   CreditCard,
//   Receipt,
//   User,
// } from "lucide-react";

// export const customerRoutes = [
//   {
//     title: "Cart",
//     url: "/dashboard/cart",
//     icon: ShoppingCart,
//   },
//   {
//     title: "Checkout",
//     url: "/dashboard/checkout",
//     icon: CreditCard,
//   },
//   {
//     title: "My Orders",
//     url: "/dashboard/orders",
//     icon: Receipt,
//   },
//   {
//     title: "Profile",
//     url: "/dashboard/profile",
//     icon: User,
//   },
// ];


import { Route } from "@/types";
import { Home, ShoppingCart, UserStar } from "lucide-react";

export const customerRoutes: Route[] = [
  {
    title: "General Management",
    items: [
      {
        title: "Home",
        url: "/dashboard",
        icon: Home,
      },
      {
        title: "Orders",
        url: "/dashboard/order",
        icon: ShoppingCart,
      },
      {
        title: "Reviews",
        url: "/dashboard/reviews",
        icon: UserStar,
      },
    ],
  },
];