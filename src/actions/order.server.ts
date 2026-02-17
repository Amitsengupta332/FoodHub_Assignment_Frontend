"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

/* ✅ Create Order (Customer) */
export async function createOrder(payload: {
  address: string;
  items: { mealId: string; qty: number }[];
}) {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${env.API_URL}/api/orders`, {
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
        message: data?.error || data?.message || "Order failed",
      };
    }

    return { success: true, data: data?.data };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
}

/* ✅ Get My Orders (Customer) */
export async function getMyOrders() {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${env.API_URL}/api/orders`, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to fetch orders",
        data: [],
      };
    }

    return {
      success: true,
      data: data?.data || [],
    };
  } catch (e: any) {
    return {
      success: false,
      message: e.message,
      data: [],
    };
  }
}

/* ✅ Cancel Order (Customer) */
export async function cancelMyOrder(orderId: string) {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${env.API_URL}/api/orders/${orderId}/cancel`, {
      method: "PATCH",
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to cancel order",
      };
    }

    return { success: true };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
}
