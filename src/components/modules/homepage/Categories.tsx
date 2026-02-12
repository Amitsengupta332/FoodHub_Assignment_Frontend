import Link from "next/link";
import {
  Pizza,
  Salad,
  Beef,
  Sandwich,
  Soup,
  Coffee,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    title: "Fast Food",
    icon: Pizza,
    href: "/meals?category=fast-food",
  },
  {
    title: "Healthy",
    icon: Salad,
    href: "/meals?category=healthy",
  },
  {
    title: "BBQ & Grill",
    icon: Beef,
    href: "/meals?category=bbq",
  },
  {
    title: "Snacks",
    icon: Sandwich,
    href: "/meals?category=snacks",
  },
  {
    title: "Soups",
    icon: Soup,
    href: "/meals?category=soups",
  },
  {
    title: "Beverages",
    icon: Coffee,
    href: "/meals?category=beverages",
  },
];

const Categories = () => {
  return (
    <section className="py-20 bg-muted/40">
      <div className="container mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold lg:text-4xl">
          Browse by Category
        </h2>

        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Discover meals by cuisine and dietary preference. Find exactly what you're craving in just one click.
        </p>

        {/* Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link key={index} href={category.href}>
                <Card className="group cursor-pointer border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>

                    <h3 className="text-lg font-semibold">
                      {category.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
