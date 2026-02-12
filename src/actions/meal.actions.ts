"use server";

import { mealService } from "@/services/meal.service";

export async function getMeals(params?: {
  search?: string;
  categoriesId?: string;
  maxPrice?: number;
}) {
  return mealService.getAll(params);
}

export async function getMealDetails(id: string) {
  return mealService.getById(id);
}

export async function getProviderMeals() {
  return mealService.getProviderMeals();
}

export async function createMeal(data: any) {
  return mealService.create(data);
}

export async function updateMeal(data: any) {
  return mealService.update(data);
}

export async function deleteMeal(id: string) {
  return mealService.delete(id);
}
