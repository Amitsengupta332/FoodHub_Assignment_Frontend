import Link from "next/link";
import { categoryService } from "@/services/category.service";

const iconList = ["🍕", "🥗", "🍖", "🍔", "🍜", "☕", "🍰", "🥤", "🌮", "🍣"];

export default async function CategoryMeals() {
  const catRes = await categoryService.getAll();
  const categories = catRes?.data || [];

  return (
    <section className="container mx-auto py-16">
      {/* Title */}
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-4xl font-bold tracking-tight">Browse by Category</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Discover meals by cuisine and dietary preference. Find exactly what
          you&apos;re craving in just one click.
        </p>
      </div>

      {/* Content */}
      {categories.length === 0 ? (
        <p className="text-center text-muted-foreground">No categories found</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.slice(0, 12).map((cat: any, idx: number) => (
            <Link
              key={cat.id}
              href={`/meals?categoriesId=${cat.id}`}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition p-8 flex flex-col items-center justify-center gap-4 h-42.5">
                {/* Icon circle */}
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-2xl group-hover:scale-105 transition">
                  {iconList[idx % iconList.length]}
                </div>

                {/* Name */}
                <p className="text-base font-semibold text-center">
                  {cat.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
