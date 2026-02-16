import { getProviderMeals } from '@/actions/meal.actions';
import ProviderMenuTable from '@/components/modules/dashboard/provider/provider-menu-table';
import React from 'react'

export default async function ViewMenuProvider() {
  const meals = await getProviderMeals();

  return (
    <div className="p-6">
      <ProviderMenuTable meals={meals?.data || []} />
    </div>
  );
}
