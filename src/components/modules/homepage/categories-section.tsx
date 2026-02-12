import { getCategories } from "@/actions/category.actions";
import CategoryCard from "./category-card";

export default async function CategoriesSection() {
  const { data, error } = await getCategories();

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load categories
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No categories found
      </div>
    );
  }

  return (
    <section className="py-12 container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Browse Categories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {data.map((category: any) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
