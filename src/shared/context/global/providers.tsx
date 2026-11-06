import React from "react";
import ReactQueryProvider from "./providers/react-query.provider";
import { TanStackDevtools } from "@tanstack/react-devtools";
import NextAuthProvider from "./providers/next-auth.provider";
import {NextIntlClientProvider} from 'next-intl';
import { Toaster } from "@/shared/components/ui/sonner";



export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider>
    <ReactQueryProvider>
      <NextAuthProvider>
        {/**React Query Devtools */}
        {/* <TanStackDevtools config={{ defaultOpen: false }} /> */}
        <Toaster/>
        {children}
      </NextAuthProvider>
    </ReactQueryProvider>
    </NextIntlClientProvider>
  );
}
