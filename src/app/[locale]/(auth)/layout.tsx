import AuthSideLayout from "@/features/auth/components/auth-side-layout";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
      {/*side section*/}
      <AuthSideLayout />

      {/*content*/}
      {children}
    </div>
  );
}
