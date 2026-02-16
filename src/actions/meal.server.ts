"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

export async function deleteMealServer(id: string) {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${env.API_URL}/api/meals/${id}`, {
      method: "DELETE",
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Delete failed",
      };
    }

    return { success: true };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
}
