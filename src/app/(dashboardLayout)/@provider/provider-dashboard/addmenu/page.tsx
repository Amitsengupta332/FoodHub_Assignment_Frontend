import { getCategories } from "@/actions/category.actions";
import { CreateMealForm } from "@/components/modules/dashboard/provider/addMenu";
import React from "react";

export default async function AddMenu() {
  const categoriesData = await getCategories();

  return (
    <div className="p-6">
      <CreateMealForm categoriesData={categoriesData} />
    </div>
  );
}
