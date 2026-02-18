import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const orderService = {
  async getAllOrdersAdmin() {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/orders/all`, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { data: null, error: { message: data?.message || "Failed to fetch orders" } };
    }

    return { data: data.data, error: null };
  },
};
