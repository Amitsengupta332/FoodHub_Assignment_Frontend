import { getCurrentUser } from "@/actions/user.action";
import { Footer2 } from "@/components/footer2";
import { Navbar1 } from "@/components/navbar1";
import NavbarWrapper from "@/components/ui/NavbarWrapper";



export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  console.log("user", user);
  return (
    <div>
      <div>
        {/* user={session?.user} */}
        {/* <Navbar1 user={user} /> */}
        <NavbarWrapper user={user} />
      </div>
      <div>{children}</div>

      <div>
        <Footer2 />
      </div>
    </div>
  );
}
