"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

export type OrderStatus =
  | "PLACED"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

/* ✅ Provider Orders List */
export async function getProviderOrders() {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${env.API_URL}/api/orders/provider`, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to fetch provider orders",
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

/* ✅ Update Order Status */
export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${env.API_URL}/api/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ status }),
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to update status",
      };
    }

    return { success: true };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
}
