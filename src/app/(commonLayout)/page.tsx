import CategoryMeals from "@/components/modules/homepage/category-meals";
import FeaturedMeals from "@/components/modules/homepage/FeaturedMeals";

import { Hero7 } from "@/components/modules/homepage/hero7";
import HowItWorks from "@/components/modules/homepage/HowItWorks";

import { cookies } from "next/headers";

// import { authClient } from "@/lib/auth-client";

export default async function Home() {
  // const cookieStore = await cookies();
  // console.log(cookieStore.get("better-auth.session"));
  // console.log(cookieStore.toString());

  // cookieStore.set("test", "value");

  // const res = await fetch("http://localhost:5000/api/auth/get-session", {
  //   headers: {
  //     Cookie: cookieStore.toString(),
  //   },
  //   cache: "no-cache",
  // });

  // const session = await res.json();
  // console.log("page session: ", session);

  // const session = await authClient.getSession();
  // console.log("Session Data:", session);
  return (
    <div>
      <Hero7 />
      {/* <Categories/> */}
      <CategoryMeals />
      <FeaturedMeals />
      {/* <CategoriesSection /> */}
      {/* <CategoriesSection/> */}
      <HowItWorks />
    </div>
  );
}
