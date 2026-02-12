import Image from "next/image";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  emoji: string;
  image?: string | null;
}

export default function CategoryCard({ category }: { category: Category }) {
  const imageSrc =
    category.image && category.image.trim() !== ""
      ? category.image
      : "/placeholder-category.png"; // fallback image

  return (
    <Link
      href={`/categories/${category.id}`}
      className="group border rounded-xl p-4 hover:shadow-lg transition">
      <div className="relative w-full h-24 mb-3">
        <Image
          src={imageSrc}
          alt={category.name}
          fill
          className="object-cover rounded-lg group-hover:scale-105 transition"
        />
      </div>

      <div className="text-center">
        <p className="text-xl">{category.emoji}</p>
        <p className="font-medium mt-1 group-hover:text-primary transition">
          {category.name}
        </p>
      </div>
    </Link>
  );
}
