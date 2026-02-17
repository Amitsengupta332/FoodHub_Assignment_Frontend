// import { getMealDetails } from "@/actions/meal.actions";
// import { getCurrentUser } from "@/actions/user.action";
// import OrderNowButton from "@/components/modules/orders/order-now-btn";

// export default async function MealDetailsPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   console.log(id);

//   const mealRes = await getMealDetails(id);

//   const user = await getCurrentUser();

//   const meal = mealRes.data;

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold">{meal?.name}</h1>

//       <p className="text-gray-600 mt-2">{meal?.description}</p>

//       <p className="mt-4 font-semibold text-xl">৳{meal?.price}</p>

//       <div className="mt-6">
//         <OrderNowButton mealId={meal?.id} user={user} />
//       </div>
//     </div>
//   );
// }

import { getMealDetails } from "@/actions/meal.actions";
import { getCurrentUser } from "@/actions/user.action";
import OrderNowButton from "@/components/modules/orders/order-now-btn";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function MealDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const mealRes = await getMealDetails(id);
  const user = await getCurrentUser();

  const meal = mealRes?.data;

  if (!meal) {
    return (
      <div className="p-10 text-center text-red-500 font-medium">
        Meal not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* ✅ Left: Image */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {meal.image ? (
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-[320px] object-cover"
              />
            ) : (
              <div className="w-full h-[320px] flex items-center justify-center bg-muted text-muted-foreground">
                No Image
              </div>
            )}
          </CardContent>
        </Card>

        {/* ✅ Right: Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{meal.name}</CardTitle>

            <CardDescription className="flex items-center justify-between mt-2">
              <span className="text-lg font-semibold text-primary">
                ৳ {meal.price}
              </span>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  meal.isAvailable
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {meal.isAvailable ? "Available" : "Unavailable"}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* ✅ Category + Provider */}
            <div className="text-sm text-muted-foreground space-y-1">
              {meal.category?.name && (
                <p>
                  <span className="font-medium text-foreground">Category:</span>{" "}
                  {meal.category.name}
                </p>
              )}

              {/* if backend gives providerProfile → user name might be inside provider.user */}
              {meal.provider?.user?.name && (
                <p>
                  <span className="font-medium text-foreground">Provider:</span>{" "}
                  {meal.provider.user.name}
                </p>
              )}
            </div>

            {/* ✅ Description */}
            <div>
              <p className="font-semibold mb-1">Description</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {meal.description}
              </p>
            </div>

            {/* ✅ Order Button */}
            <div className="pt-2">
              <OrderNowButton mealId={meal.id} user={user} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

