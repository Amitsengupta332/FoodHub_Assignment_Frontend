import { Hero7 } from "@/components/modules/homepage/hero7";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";

// import { authClient } from "@/lib/auth-client";

export default async function Home() {
  const cookieStore = await cookies();
  // console.log(cookieStore.get("better-auth.session"));
  console.log(cookieStore.toString());

  // cookieStore.set("test", "value");

  const res = await fetch("http://localhost:5000/api/auth/get-session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-cache",
  });

  const session = await res.json();
  console.log(session);

  // const session = await authClient.getSession();
  // console.log("Session Data:", session);
  return (
    <div>
      <Hero7 />
    </div>
  );
}
