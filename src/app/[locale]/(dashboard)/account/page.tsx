import { getProfile } from "@/features/account/apis/get-profile";
import ProfileForm from "@/features/account/components/profile-form";

export default async function ProfilePage() {
  const { user } = await getProfile();

  return <ProfileForm key={user.email} user={user} />;
}
