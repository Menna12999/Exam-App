import LoginForm from "@/features/auth/components/login/login-form";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  // Translation
  const t = useTranslations("auth");

  return (
    <main className="h-full flex flex-col justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-113 flex flex-col">
        {/* Heading */}
        <h1 className="font-inter text-2xl font-bold text-gray-800 mb-10">
          {t("login-title")}
        </h1>

        {/* Form */}
        <LoginForm />

        {/* Support text */}
        <p className="text-sm text-gray-500 font-medium text-center">
          {t("no-account")}{" "}
          <Link href="/create-account" className="text-blue-500">
            {t("create-account")}
          </Link>
        </p>
      </div>
    </main>
  );
}
