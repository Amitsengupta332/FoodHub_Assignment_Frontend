// "use server";

// import { categoryService } from "@/services/category.service";

// export async function getCategories(
//   params: {
//     search?: string;
//     page?: string;
//     limit?: string;
//     sortBy?: string;
//     sortOrder?: string;
//   },
//   options?: { revalidate?: number },
// ) {
//   return await categoryService.getAll(params, options);
// }

// export async function createCategory(data: {
//   name: string;
//   emoji: string;
//   image: string;
// }) {
//   return await categoryService.create(data);
// }

// export async function updateCategory(data: {
//   id: string;
//   name: string;
//   emoji: string;
//   image: string;
// }) {
//   return await categoryService.update(data);
// }

// export async function deleteCategory(id: string) {
//   return await categoryService.delete(id);
// }

"use server";

import { categoryService } from "@/services/category.service";
import { env } from "@/env";
import { cookies } from "next/headers";

// export async function createCategory(formData: FormData) {
//   const cookieStore = await cookies();

//   const name = formData.get("name") as string;
//   const slug = formData.get("slug") as string;

//   const payload = { name, slug };

//   try {
//     const res = await fetch(`${env.API_URL}/api/categories`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         cookie: cookieStore.toString(),
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       throw new Error("Failed create");
//     }

//     return { success: true };
//   } catch (error: any) {
//     return { success: false, message: error.message };
//   }
// }

export async function createCategory(formData: FormData) {
  const cookieStore = await cookies();

  const name = formData.get("name") as string;

  const payload = { name };

  try {
    const res = await fetch(`${env.API_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Create failed" };
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}


export async function deleteCategory(id: string) {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${env.API_URL}/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        cookie: cookieStore.toString(), // ✅ admin cookie forward
      },
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { success: false, message: data?.message || "Delete failed" };
    }

    return { success: true };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
}


export async function updateCategory(id: string, payload: { name: string }) {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${env.API_URL}/api/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
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
export async function getCategories() {
  return await categoryService.getAll();
}

 
