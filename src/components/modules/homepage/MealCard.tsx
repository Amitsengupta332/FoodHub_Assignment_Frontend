"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MealCard({ meal }: any) {
  return (
    <Card className="overflow-hidden">
      {/* HEADER */}
      <CardHeader>
        <CardTitle className="line-clamp-1">{meal.name}</CardTitle>
      </CardHeader>

      {/* CONTENT */}
      <CardContent>
        {/* IMAGE */}
        {meal?.image ? (
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full h-40 object-cover rounded"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-40 rounded bg-muted flex items-center justify-center text-sm text-muted-foreground">
            No Image Available
          </div>
        )}

        {/* DESCRIPTION */}
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {meal.description}
        </p>

        {/* PRICE */}
        <p className="mt-2 font-semibold">৳ {meal.price}</p>

        {/* STATUS (Optional) */}
        {typeof meal?.isAvailable === "boolean" && (
          <p className="text-xs mt-1">
            Status:{" "}
            <span
              className={meal.isAvailable ? "text-green-600" : "text-red-600"}>
              {meal.isAvailable ? "Available" : "Unavailable"}
            </span>
          </p>
        )}
      </CardContent>

      {/* FOOTER */}
      <CardFooter>
        <Link href={`/meals/${meal?.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
