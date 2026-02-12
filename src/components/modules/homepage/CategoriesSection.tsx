// import { getCategories } from "@/actions/category.actions";
// import Link from "next/link";
// import { Card, CardContent } from "@/components/ui/card";

// const CategoriesSection = async () => {
//   const { data: categories, error } = await getCategories(
//     {},
//     { revalidate: 60 },
//   );

//   if (error) {
//     return (
//       <section className="py-20">
//         <div className="container text-center text-red-500">
//           Failed to load categories.
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-20 bg-muted/30">
//       <div className="container">
//         {/* Section Heading */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold lg:text-4xl">
//             Browse by Categories
//           </h2>
//           <p className="mt-3 text-muted-foreground">
//             Discover meals by your favorite cuisine
//           </p>
//         </div>

//         {/* Grid */}
//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {categories?.map((category: any) => (
//             <Link key={category.id} href={`/meals?category=${category.id}`}>
//               <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
//                 <CardContent className="flex flex-col items-center justify-center p-8 text-center">
//                   {/* Emoji */}
//                   <div className="text-4xl mb-4">{category.emoji || "🍽️"}</div>

//                   {/* Name */}
//                   <h3 className="text-lg font-semibold">{category.name}</h3>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategoriesSection;

// import { getCategories } from "@/actions/category.actions";
// import Link from "next/link";
// import { Card, CardContent } from "@/components/ui/card";

// const CategoriesSection = async () => {
//   const { data, error } = await getCategories({}, { revalidate: 60 });

//   if (error) {
//     return (
//       <section className="py-20">
//         <div className="container text-center text-red-500">
//           Failed to load categories.
//         </div>
//       </section>
//     );
//   }

//   const categories = data || [];

//   return (
//     <section className="py-20 bg-muted/30">
//       <div className="container">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold lg:text-4xl">
//             Browse by Categories
//           </h2>
//           <p className="mt-3 text-muted-foreground">
//             Discover meals by your favorite cuisine
//           </p>
//         </div>

//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {categories?.map((category: any) => (
//             <Link key={category.id} href={`/meals?category=${category.id}`}>
//               <Card className="group hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer">
//                 <CardContent className="flex flex-col items-center justify-center p-8 text-center">
//                   <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
//                     {category.emoji || "🍽️"}
//                   </div>

//                   <h3 className="text-lg font-semibold">{category.name}</h3>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategoriesSection;
