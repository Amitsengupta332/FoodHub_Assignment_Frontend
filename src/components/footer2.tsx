import { cn } from "@/lib/utils";

import { Logo, LogoImage, LogoText } from "@/components/logo";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({
  logo = {
    src: "/foodhub.png",
    alt: "FoodHub",
    title: "FoodHub",
    url: "/",
  },
  className,
  tagline = "Discover & Order Delicious Meals from Local Providers.",
  menuItems = [
    {
      title: "Explore",
      links: [
        { text: "Browse Meals", url: "/meals" },
        { text: "Categories", url: "/categories" },
        { text: "Providers", url: "/providers" },
      ],
    },
    {
      title: "Customer",
      links: [
        { text: "My Orders", url: "/orders" },
        { text: "Cart", url: "/cart" },
        { text: "Profile", url: "/profile" },
      ],
    },
    {
      title: "Provider",
      links: [
        { text: "Dashboard", url: "/provider/dashboard" },
        { text: "Manage Menu", url: "/provider/menu" },
        { text: "Orders", url: "/provider/orders" },
      ],
    },
    {
      title: "Admin",
      links: [
        { text: "Admin Dashboard", url: "/admin" },
        { text: "Manage Users", url: "/admin/users" },
        { text: "Manage Orders", url: "/admin/orders" },
        { text: "Categories", url: "/admin/categories" },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} FoodHub. All rights reserved.`,
  bottomLinks = [
    { text: "Terms & Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
}: Footer2Props) => {
  return (
    <section className={cn("bg-muted/40 py-16 ", className)}>
      <div className="container mx-auto px-4">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            {/* Brand */}
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Logo url={logo.url}>
                  <LogoImage
                    src={logo.src}
                    alt={logo.alt}
                    className="h-10 w-10 object-contain"
                  />
                  <LogoText className="text-xl">{logo.title}</LogoText>
                </Logo>
              </div>

              <p className="mt-4 max-w-sm text-muted-foreground">{tagline}</p>
            </div>

            {/* Menus */}
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-3 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium transition-colors hover:text-primary"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 flex flex-col justify-between gap-4 border-t pt-6 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright}</p>

            <ul className="flex flex-wrap gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li
                  key={linkIdx}
                  className="underline-offset-4 hover:underline hover:text-primary transition-colors"
                >
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
