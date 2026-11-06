import DashboardSideLayout from "@/features/dashboard/components/dashboard-side-layout";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen grid-cols-1 grid lg:grid-cols-[362px_1fr] bg-gray-50">
    <DashboardSideLayout />
    {children}
    </div>;
}
