import { Search, ShoppingCart, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: Search,
    title: "Browse Meals",
    description:
      "Explore a wide variety of cuisines from trusted local providers. Filter by category, price, and dietary preference.",
  },
  {
    icon: ShoppingCart,
    title: "Checkout Easily",
    description:
      "Add your favorite meals to cart and place your order with a smooth and secure Cash on Delivery checkout process.",
  },
  {
    icon: Truck,
    title: "Track Your Order",
    description:
      "Follow your order status in real-time from PLACED to DELIVERED and enjoy your meal without hassle.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-3xl font-bold lg:text-4xl">
          How FoodHub Works
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Ordering your favorite meals has never been easier. Follow these simple steps and enjoy delicious food at your doorstep.
        </p>

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                className="border-none shadow-md hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>

                  <h3 className="text-xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
