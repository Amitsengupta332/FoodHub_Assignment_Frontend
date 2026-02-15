// import ProviderProfileForm from "@/components/modules/dashboard/provider/providerprofile-form";

// export default function ProviderProfile() {
//   return (
//     <div className="p-6">
//       <ProviderProfileForm />
//     </div>
//   );
// }

import { env } from "@/env";
import userService from "@/services/user.service";
import ProviderProfileForm from "@/components/modules/dashboard/provider/providerprofile-form";
import MyProviderProfileCard from "@/components/modules/dashboard/provider/my-provider-card";

export default async function ProviderProfilePage() {
  const me = await userService.getCurrentUser();

  // all providers
  const res = await fetch(`${env.API_URL}/api/providers`, {
    cache: "no-store",
  });
  const data = await res.json();
  const providers = data?.data || [];

  const myProfile = providers.find((p: any) => p?.user?.id === me?.id) || null;

  return (
    <div className="p-6 space-y-6">
      {/* if profile exists show it */}
      {myProfile ? (
        <MyProviderProfileCard profile={myProfile} />
      ) : (
        <ProviderProfileForm />
      )}
    </div>
  );
}
