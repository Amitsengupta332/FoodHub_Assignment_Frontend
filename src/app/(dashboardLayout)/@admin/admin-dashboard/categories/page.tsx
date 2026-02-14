import { getCategories } from '@/actions/category.actions';
import ManageCategories from '@/components/modules/dashboard/manage.categories';
import React from 'react'

export default async function  CategoriesDashboard() {
  const categories = await getCategories();

  return (
    <div>
      <ManageCategories item={categories.data}></ManageCategories>
    </div>
  );
}
