import { Navbar1 } from "@/components/navbar1";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <Navbar1></Navbar1>
      </div>
      <div>{children}</div>

      {/* <div>
        <Footer></Footer>
      </div> */}
    </div>
  );
}
