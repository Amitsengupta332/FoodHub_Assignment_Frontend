import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const mealService = {

  async getAll(params?: {
    search?: string;
    categoriesId?: string;
    maxPrice?: number;
  }) {
    try {
      const url = new URL(`${API_URL}/api/meals`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const res = await fetch(url.toString(), {
        next: { revalidate: 30 },
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to fetch meals" } };
      }

      const result = await res.json();

      return { data: result.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  async getById(id: string) {
    try {
      const res = await fetch(`${API_URL}/api/meals/${id}`, {
        next: { revalidate: 30 },
      });

      if (!res.ok) {
        return { data: null, error: { message: "Meal not found" } };
      }

      const result = await res.json();

      return { data: result.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  async getProviderMeals() {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/meals/provider/my`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch provider meals" },
        };
      }

      const result = await res.json();

      return { data: result.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  async create(data: {
    name: string;
    description: string;
    price: number;
    image: string;
    categoryId: string;
  }) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: result?.message || "Failed to create meal" },
        };
      }

      return { data: result.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  async update(payload: {
    id: string;
    name?: string;
    description?: string;
    price?: number;
    image?: string;
    categoryId?: string;
    isAvailable?: boolean;
  }) {
    try {
      const { id, ...updateData } = payload;
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/meals/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(updateData),
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: result?.message || "Failed to update meal" },
        };
      }

      return { data: result.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  async delete(id: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/meals/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: result?.message || "Failed to delete meal" },
        };
      }

      return { data: result.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
