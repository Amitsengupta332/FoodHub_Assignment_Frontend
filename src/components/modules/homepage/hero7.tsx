import { Star } from "lucide-react";
import HeroBgImage from "../../../../public/tortilla-wrap-with-falafel-fresh-salad-vegan-tacos-vegetarian-healthy-food-banner-top-view.jpg";
import HeroBgImage1 from "../../../../public/vegetables-with-salt-corn-cob.jpg";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Hero7Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
    className?: string;
  };
  reviews?: {
    count: number;
    rating?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
  className?: string;
}

const Hero7 = ({
  heading = "Discover & Order Delicious Meals from Local Providers 🍱",
  description = "Browse a wide variety of cuisines, filter by your preferences, and enjoy fast ordering with Cash on Delivery. Support local restaurants while enjoying your favorite meals.",
  button = {
    text: "Browse Meals",
    url: "/meals",
  },
  reviews = {
    count: 500,
    rating: 4.9,
    avatars: [
      { src: "/avatars/avatar1.jpg", alt: "Customer 1" },
      { src: "/avatars/avatar2.jpg", alt: "Customer 2" },
      { src: "/avatars/avatar3.jpg", alt: "Customer 3" },
      { src: "/avatars/avatar4.jpg", alt: "Customer 4" },
      { src: "/avatars/avatar5.jpg", alt: "Customer 5" },
    ],
  },
  className,
}: Hero7Props) => {
  return (
    // <section className={cn("py-32", className)}>
    //   <Image
    //     src={HeroBgImage}
    //     alt="Food background"
    //     fill
    //     priority
    //     className="object-cover -z-10 filter brightness-75"
    //   />
    //   <div className="container text-center">
    //     <div className="mx-auto flex max-w-5xl flex-col gap-6">
    //       <h1 className="text-3xl font-semibold lg:text-6xl">{heading}</h1>
    //       <p className="text-balance text-muted-foreground lg:text-lg">
    //         {description}
    //       </p>
    //     </div>
    //     <Button asChild size="lg" className="mt-10">
    //       <a href={button.url}>{button.text}</a>
    //     </Button>
    //     <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
    //       <span className="mx-4 inline-flex items-center -space-x-4">
    //         {reviews.avatars.map((avatar, index) => (
    //           <Avatar key={index} className="size-14 border">
    //             <AvatarImage src={avatar.src} alt={avatar.alt} />
    //           </Avatar>
    //         ))}
    //       </span>
    //       <div>
    //         <div className="flex items-center gap-1">
    //           {[...Array(5)].map((_, index) => (
    //             <Star
    //               key={index}
    //               className="size-5 fill-yellow-400 text-yellow-400"
    //             />
    //           ))}
    //           <span className="mr-1 font-semibold">
    //             {reviews.rating?.toFixed(1)}
    //           </span>
    //         </div>
    //         <p className="text-left font-medium text-muted-foreground">
    //           from {reviews.count}+ reviews
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <section className={cn("relative py-32 overflow-hidden", className)}>
      {/* Background Image */}
      <Image
        src={HeroBgImage}
        alt="Food background"
        fill
        priority
        className="object-cover -z-20"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 -z-10" />

      <div className="container text-center text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-3xl font-semibold lg:text-6xl">{heading}</h1>

          <p className="text-lg text-white/90">{description}</p>
        </div>

        {/* Buttons */}
        {/* <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <a href="/meals">Browse Meals</a>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-black text-black hover:bg-blue-700 hover:text-white">
            <a href="/register?role=provider">Become a Provider</a>
          </Button>
        </div> */}

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Primary Button */}
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 
               text-white font-semibold shadow-lg 
               hover:scale-105 hover:shadow-xl 
               transition-all duration-300">
            <a href="/meals">Browse Meals</a>
          </Button>

          {/* Secondary Button */}
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white 
               backdrop-blur-md bg-white/10 
               hover:bg-white hover:text-black 
               transition-all duration-300">
            <a href="/register?role=provider">Become a Provider</a>
          </Button>
        </div>

        {/* Reviews */}
        <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
          <span className="mx-4 inline-flex items-center -space-x-4">
            {reviews.avatars.map((avatar, index) => (
              <Avatar key={index} className="size-14 border border-white">
                <AvatarImage src={avatar.src} alt={avatar.alt} />
              </Avatar>
            ))}
          </span>

          <div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="size-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="mr-1 font-semibold text-white">
                {reviews.rating?.toFixed(1)}
              </span>
            </div>

            <p className="text-left font-medium text-white/80">
              from {reviews.count}+ reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero7 };
