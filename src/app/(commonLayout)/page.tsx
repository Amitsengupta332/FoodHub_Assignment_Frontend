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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>
        <Button>Click me</Button>
      </div>
    </div>
  );
}
