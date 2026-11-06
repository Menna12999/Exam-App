import CreateAccountLayout from "@/features/auth/components/create-account/create-account-layout";

export default function RegisterPage() {
  return (
    <main className="h-full flex flex-col justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-113 flex flex-col  gap-4 relative">
        {/*create account Flow Layout */}

        <CreateAccountLayout />
      </div>
    </main>
  );
}
