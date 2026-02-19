import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Meal = {
  id: string;
  title: string;
  provider: string;
  price: number;
  rating: number;
  tag?: string;
  image: string; // use public images for now
};

const featuredMeals: Meal[] = [
  {
    id: "1",
    title: "Chicken Shawarma Bowl",
    provider: "Spice House",
    price: 249,
    rating: 4.8,
    tag: "Popular",
    image: "/meals/shawarma.jpg",
  },
  {
    id: "2",
    title: "Beef Burger Combo",
    provider: "Burger Lab",
    price: 299,
    rating: 4.7,
    tag: "Best Seller",
    image: "/meals/burger.jpg",
  },
  {
    id: "3",
    title: "Vegetable Pasta",
    provider: "Green Kitchen",
    price: 219,
    rating: 4.6,
    tag: "Healthy",
    image: "/meals/pasta.jpg",
  },
  {
    id: "4",
    title: "Falafel Wrap",
    provider: "Vegan Bite",
    price: 179,
    rating: 4.7,
    tag: "Vegan",
    image: "/meals/falafel.jpg",
  },
  {
    id: "5",
    title: "Kacchi Biryani",
    provider: "Dhakaiya Treat",
    price: 320,
    rating: 4.9,
    tag: "Top Rated",
    image: "/meals/biryani.jpg",
  },
  {
    id: "6",
    title: "Thai Soup & Salad",
    provider: "Asia Bowl",
    price: 199,
    rating: 4.5,
    tag: "Light",
    image: "/meals/soup.jpg",
  },
];

export default function FeaturedMeals() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold lg:text-4xl">Featured Meals</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Hand-picked meals loved by customers. Order your favorite food in minutes with Cash on Delivery.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/meals">View All Meals</Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredMeals.map((meal) => (
            <Link key={meal.id} href={`/meals/${meal.id}`}>
              <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 w-full">
                  <Image
                    src={meal.image}
                    alt={meal.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold line-clamp-1">
                      {meal.title}
                    </h3>

                    {meal.tag ? (
                      <Badge variant="secondary" className="shrink-0">
                        {meal.tag}
                      </Badge>
                    ) : null}
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    by <span className="font-medium">{meal.provider}</span>
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-bold">৳ {meal.price}</p>

                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{meal.rating}</span>
                    </div>
                  </div>

                  <Button className="mt-5 w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
