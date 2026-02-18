"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { createProviderProfile } from "@/actions/provider-profile.server";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ProviderProfileForm() {
  const router = useRouter();

  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async () => {
    // ✅ Validation
    if (!shopName.trim() || !address.trim() || !phone.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please fill in all fields.",
      });
    }

    // ✅ Confirm
    const result = await Swal.fire({
      title: "Create Provider Profile?",
      html: `
        <div style="text-align:left;">
          <p><b>Shop Name:</b> ${shopName}</p>
          <p><b>Address:</b> ${address}</p>
          <p><b>Phone:</b> ${phone}</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Create",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      // 🔥 Loading
      Swal.fire({
        title: "Creating Profile...",
        text: "Please wait while we create your provider profile.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const formData = new FormData();
      formData.append("shopName", shopName);
      formData.append("address", address);
      formData.append("phone", phone);

      const res = await createProviderProfile(formData);

      if (!res.success) {
        throw new Error(res.message || "Creation failed");
      }

      // ✅ Success
      await Swal.fire({
        icon: "success",
        title: "Created!",
        text: "Provider profile created successfully.",
        timer: 1400,
        showConfirmButton: false,
      });

      router.refresh();
      // Optional redirect:
      // router.push("/provider-dashboard");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to create provider profile.",
      });
    }
  };

  const handleClear = async () => {
    const result = await Swal.fire({
      title: "Clear all fields?",
      text: "All input fields will be reset.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Clear",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    setShopName("");
    setAddress("");
    setPhone("");
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
        <Button
          className="flex-1"
          variant="outline"
          onClick={handleClear}
        >
          Clear
        </Button>
      </CardFooter>
    </Card>
  );
}
