"use server";

import { providerService } from "@/services/provider.service";

export async function getProviders() {
  return await providerService.getAllProviders();
}

export async function getProviderDetails(id: string) {
  return await providerService.getProviderById(id);
}

export async function createProviderProfile(data: {
  shopName: string;
  address: string;
  phone: string;
}) {
  try {
    const res = await providerService.createProviderProfile(data);

    if (!res.success) {
      return { success: false, message: res.error || "Create failed" };
    }

    return { success: true };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
}
