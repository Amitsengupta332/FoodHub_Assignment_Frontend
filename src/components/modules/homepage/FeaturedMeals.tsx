import Link from "next/link";
import { mealService } from "@/services/meal.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function FeaturedMeals() {
  const res = await mealService.getAll(); // returns {data, error}
  const meals = res?.data?.slice(0, 6) || [];

  return (
    <section className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Featured Meals</h2>
        <Link href="/meals">
          <Button variant="outline">View All</Button>
        </Link>
      </div>

      {meals.length === 0 ? (
        <p className="text-muted-foreground">No meals available</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {meals.map((m: any) => (
            <Link key={m.id} href={`/meals/${m.id}`}>
              <Card className="hover:shadow-md transition cursor-pointer overflow-hidden">
                {m.image ? (
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-muted flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{m.name}</CardTitle>
                </CardHeader>

                <CardContent className="flex items-center justify-between">
                  <p className="font-semibold">৳ {m.price}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      m.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {m.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
