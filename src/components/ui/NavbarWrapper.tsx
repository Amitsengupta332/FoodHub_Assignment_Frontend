"use client";

// import dynamic from "next/dynamic";

// const Navbar1 = dynamic(
//   () => import("./navbar1").then((mod) => mod.Navbar1),
//   { ssr: false }
// );

import dynamic from "next/dynamic";

const Navbar1 = dynamic(
  () => import("@/components/navbar1").then((mod) => mod.Navbar1),
  { ssr: false }
);

export default function NavbarWrapper({ user }: { user: any }) {
  return <Navbar1 user={user} />;
}


