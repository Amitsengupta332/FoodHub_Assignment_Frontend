import * as React from "react";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { adminRoutes } from "@/routes/admin.routes";
import { customerRoutes } from "@/routes/customer.routes";
import { providerRoutes } from "@/routes/provider.routes";
import { ROLE } from "@/constants/userRoles";
import { Route } from "@/types/routes.type";

// This is sample data.
// const data = {
//   versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
//   navMain: [
//     {
//       title: "Getting Started",
//       url: "#",
//       items: [
//         {
//           title: "Admin",
//           url: "/admin-dashboard",
//           items: [{ title: "Categories", url: "/admin-dashboard/categories" }],
//         },
//         {
//           title: "Provider Dashboard",
//           url: "/provider-dashboard",
//         },
//         {
//           title: "Project Structure",
//           url: "#",
//         },
//       ],
//     },
//   ],
// };

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  let route: Route[] = [];

  // switch (user.role) {
  //   case "admin":
  //     route = adminRoutes;
  //     break;
  //   case "customer":
  //     route = customerRoutes;
  //     break;
  //   case "provider":
  //     route = providerRoutes;
  //     break;
  //   default:
  //     route = [];
  //     break;
  // }

  switch (user.role) {
  case ROLE.ADMIN:
    route = adminRoutes;
    break;
  case ROLE.CUSTOMER:
    route = customerRoutes;
    break;
  case ROLE.PROVIDER:
    route = providerRoutes;
    break;
  default:
    route = [];
}

  // if (user?.role === ROLE.customer) {
  //   route = customerRoutes;
  // } else if (user?.role === ROLE.provider) {
  //   route = providerRoutes;
  // } else if (user?.role === ROLE.admin) {
  //   route = adminRoutes;
  // }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {route?.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items?.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        {/* {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))} */}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
