"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createProviderProfile } from "@/actions/provider-profile.server";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ProviderProfileForm() {
  const router = useRouter();

  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async () => {
    if (!shopName.trim() || !address.trim() || !phone.trim()) {
      return toast.error("সব ফিল্ড পূরণ করো");
    }

    const t = toast.loading("Creating profile...");

    const formData = new FormData();
    formData.append("shopName", shopName);
    formData.append("address", address);
    formData.append("phone", phone);

    const res = await createProviderProfile(formData);

    if (res.success) {
      toast.success("Provider profile created ✅", { id: t });
      router.refresh();
      // চাইলে redirect:
      // router.push("/provider-dashboard");
    } else {
      toast.error(res.message || "Create failed", { id: t });
    }
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Create Provider Profile</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Input
          placeholder="Shop Name"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />
        <Input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button className="flex-1" onClick={handleSubmit}>
          Create
        </Button>
        <Button className="flex-1" variant="outline" onClick={() => {
          setShopName("");
          setAddress("");
          setPhone("");
        }}>
          Clear
        </Button>
      </CardFooter>
    </Card>
  );
}
