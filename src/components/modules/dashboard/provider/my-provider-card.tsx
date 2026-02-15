export default function MyProviderProfileCard({ profile }: { profile: any }) {
  return (
    <div className="border rounded p-4 max-w-xl">
      <h2 className="text-xl font-bold mb-2">My Provider Profile</h2>
      <p><b>Shop:</b> {profile.shopName}</p>
      <p><b>Address:</b> {profile.address}</p>
      <p><b>Phone:</b> {profile.phone}</p>
      <p className="text-sm text-gray-500 mt-2">
        Owner: {profile.user?.name}
      </p>

      <div className="mt-4 text-sm text-green-700 bg-green-50 p-2 rounded">
        ✅ Profile already created. Now you can add menu items.
      </div>
    </div>
  );
}
