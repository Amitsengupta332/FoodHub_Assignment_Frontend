import { env } from "@/env";

export default async function RestaurantDetails({ params }: { params: { id: string } }) {
  const res = await fetch(`${env.API_URL}/api/providers/${params.id}`, { cache: "no-store" });
  const data = await res.json();
  const p = data?.data;

  if (!p) return <div className="p-6">Provider not found</div>;

  return (
    <div className="p-6 space-y-2">
      <h1 className="text-2xl font-bold">{p.shopName}</h1>
      <p className="text-gray-600">{p.address}</p>
      <p className="text-gray-600">Phone: {p.phone}</p>

      <h2 className="text-xl font-semibold mt-6">Menu</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {(p.meals || []).map((m: any) => (
          <div key={m.id} className="border rounded p-3">
            <div className="font-medium">{m.name}</div>
            <div className="text-sm text-gray-500">{m.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
