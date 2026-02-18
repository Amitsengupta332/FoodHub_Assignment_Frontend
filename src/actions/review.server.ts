"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

export async function createReview(payload: {
  mealId: string;
  rating: number;
  comment: string;
}) {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${env.API_URL}/api/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Review failed",
      };
    }

    return { success: true, data: data?.data };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
}
