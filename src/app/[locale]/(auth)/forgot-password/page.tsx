import ForgotPasswordLayout from "@/features/auth/components/forgot-password/forgot-password-layout";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Suspense } from "react";

export default function ForgotPasswordPage() {
  return (
    <main className="h-full flex flex-col justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-113 flex flex-col  gap-4 relative">
        {/*forget password Flow Layout */}
        <Suspense fallback={null}>
          <ForgotPasswordLayout />
        </Suspense>
      </div>
    </main>
  );
}
