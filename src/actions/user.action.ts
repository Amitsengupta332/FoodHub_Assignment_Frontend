"use server";
import userService from "@/services/user.service";
import { env } from "@/env";
import { cookies } from "next/headers";

 

export async function getCurrentUser() {
  return await userService.getCurrentUser();
}

export async function getAllUsers() {
  return await userService.getAllUsers();
}

// ✅ ADD THIS: toggle user active/suspend
export async function toggleUserStatus(id: string, isActive: boolean) {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${env.API_URL}/api/admin/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(), // ✅ admin auth cookie forward
      },
      body: JSON.stringify({ isActive }),
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { success: false, message: data?.message || "Update failed" };
    }

    return { success: true };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
}
