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
  category?: { name: string };
  provider?: { shopName: string };
}

export default function MealCard({ meal }: { meal: Meal }) {
  // ✅ only allow these domains to use next/image
  const ALLOWED_HOSTS = ["i.ibb.co", "res.cloudinary.com"];

  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return "";
    }
  };

  const hasValidImage =
    typeof meal.image === "string" &&
    meal.image.trim() !== "" &&
    meal.image.startsWith("http") &&
    ALLOWED_HOSTS.includes(getHostname(meal.image));

  return (
    <Card className="group h-full overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl rounded-2xl">
      {/* IMAGE */}
      <div className="relative h-56 w-full overflow-hidden bg-muted flex items-center justify-center">
        {hasValidImage ? (
          <Image
            src={meal.image!}
            alt={meal.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="text-sm text-muted-foreground">
            No Image Available
          </span>
        )}
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
          className="text-sm font-semibold text-primary hover:underline"
        >
          View Details →
        </Link>
      </CardFooter>
    </Card>
  );
}
