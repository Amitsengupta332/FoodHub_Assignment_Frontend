import { Footer2 } from "@/components/footer2";
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

      <div>
        <Footer2/>
      </div>
    </div>
  );
}
