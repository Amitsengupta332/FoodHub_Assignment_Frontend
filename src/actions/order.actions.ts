"use server";

import { orderService } from "@/services/order.service";

export async function getAllOrdersAdmin() {
  return orderService.getAllOrdersAdmin();
}
