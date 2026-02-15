import { env } from "@/env";
import { cookies } from "next/headers";

export const providerService = {
  // ✅ Public list
  getAllProviders: async () => {
    const res = await fetch(`${env.API_URL}/api/providers`, {
      cache: "no-store",
    });

    return res.json();
  },

  // ✅ Provider Details with Meals
  getProviderById: async (id: string) => {
    const res = await fetch(`${env.API_URL}/api/providers/${id}`, {
      cache: "no-store",
    });

    return res.json();
  },

  // ✅ Create Provider Profile (Protected)
  createProviderProfile: async (payload: {
    shopName: string;
    address: string;
    phone: string;
  }) => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/api/providers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    return res.json();
  },
};
