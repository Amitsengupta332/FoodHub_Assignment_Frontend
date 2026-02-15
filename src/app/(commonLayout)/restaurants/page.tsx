import Link from "next/link";
import { env } from "@/env";

export default async function RestaurantsPage() {
  const res = await fetch(`${env.API_URL}/api/providers`, {
    cache: "no-store",
  });
  const data = await res.json();

  const providers = data?.data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Restaurants</h1>

      {providers.length === 0 ? (
        <p>No providers found</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {providers.map((p: any) => (
            <Link
              key={p.id}
              href={`/restaurants/${p.id}`}
              className="border rounded p-4 hover:bg-muted">
              <h2 className="font-semibold">{p.shopName}</h2>
              <p className="text-sm text-gray-500">{p.address}</p>
              <p className="text-sm text-gray-500">{p.user?.name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
