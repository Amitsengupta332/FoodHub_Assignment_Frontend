"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

export async function createProviderProfile(formData: FormData) {
  const cookieStore = await cookies();

  const shopName = formData.get("shopName") as string;
  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;

  if (!shopName || !address || !phone) {
    return { success: false, message: "shopName, address, phone are required" };
  }

  try {
    const res = await fetch(`${env.API_URL}/api/providers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ shopName, address, phone }),
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { success: false, message: data?.error || data?.message || "Create failed" };
    }

    return { success: true, data };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
}
