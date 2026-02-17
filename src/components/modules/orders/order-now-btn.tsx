"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CheckoutModal from "./checkout-modal";
 

export default function OrderNowButton({ mealId, user }: any) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // ❌ Not logged in
  if (!user) {
    return (
      <Button onClick={() => router.push("/login")}>
        Login to Order
      </Button>
    );
  }

  // ❌ Provider/Admin cannot order
  if (user.role !== "CUSTOMER") {
    return (
      <Button disabled>
        Only customers can order
      </Button>
    );
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Order Now
      </Button>

      <CheckoutModal
        open={open}
        setOpen={setOpen}
        mealId={mealId}
      />
    </>
  );
}
