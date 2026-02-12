import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string | null;
  category?: {
    name: string;
  };
  provider?: {
    shopName: string;
  };
}

export default function MealCard({ meal }: { meal: Meal }) {
  const PLACEHOLDER =
    "https://i.ibb.co/yFnTH995/juicy-cheeseburger-rustic-wooden-board.jpg";
  return (
    <Card className="group h-full overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-xl">
      {/* IMAGE SECTION */}
      {/* <div className="relative h-56 w-full overflow-hidden">
        {meal.image ? (
          <Image
            src={meal.image}
            alt={meal.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
            No Image
          </div>
        )}
      </div> */}

      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={
            typeof meal.image === "string" &&
            meal.image.trim() !== "" &&
            meal.image.startsWith("http")
              ? meal.image
              : PLACEHOLDER
          }
          alt={meal.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* HEADER */}
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-xl font-bold group-hover:text-primary transition-colors">
          {meal.name}
        </CardTitle>
      </CardHeader>

      {/* CONTENT */}
      <CardContent>
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {meal.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {meal.category?.name && (
            <Badge variant="secondary" className="text-xs">
              {meal.category.name}
            </Badge>
          )}

          {meal.provider?.shopName && (
            <Badge variant="outline" className="text-xs">
              {meal.provider.shopName}
            </Badge>
          )}
        </div>
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="flex items-center justify-between border-t p-4">
        <span className="text-lg font-bold text-primary">৳ {meal.price}</span>

        <Link
          href={`/meals/${meal.id}`}
          className="text-sm font-semibold text-primary hover:underline">
          View Details →
        </Link>
      </CardFooter>
    </Card>
  );
}
