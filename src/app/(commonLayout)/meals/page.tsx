// import { getMeals } from "@/actions/meal.actions";
// import Image from "next/image";
// import Link from "next/link";

// export default async function MealsPage() {
//   const { data, error } = await getMeals();

//   if (error) {
//     return (
//       <div className="py-20 text-center text-red-500">Failed to load meals</div>
//     );
//   }
//   return (
//     <section className="container mx-auto px-4 py-12">
//       <h1 className="text-3xl font-bold mb-8 text-center">Explore Meals</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {data?.map((meal: any) => (
//           <Link
//             key={meal.id}
//             href={`/meals/${meal.id}`}
//             className="border rounded-xl overflow-hidden hover:shadow-lg transition">
   
//             <div className="relative w-full h-48">
//               <Image
//                 src={meal.image ? meal.image : "/meal-placeholder.jpg"}
//                 alt={meal.name}
//                 fill
//                 className="object-cover"
//               />
//             </div>

        
//             <div className="p-4 space-y-2">
//               <h3 className="font-semibold text-lg">{meal.name}</h3>

//               <p className="text-sm text-muted-foreground line-clamp-2">
//                 {meal.description}
//               </p>

//               <div className="flex justify-between items-center pt-2">
//                 <span className="font-bold text-primary">৳ {meal.price}</span>

//                 <span className="text-xs bg-muted px-2 py-1 rounded">
//                   {meal.category?.name}
//                 </span>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }


import { getMeals } from "@/actions/meal.actions";
import MealCard from "@/components/modules/homepage/MealCard";
 

export default async function MealsPage() {
  const { data } = await getMeals();

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Explore Meals
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((meal: any) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </section>
  );
}
