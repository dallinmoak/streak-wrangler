import type { Metadata } from "next";
import "./globals.css";
import { prismaClient } from "@/lib/prisma";

import UserProvider from "@/components/providers/User";
import { getCurrent as getCurrentUser } from "@/models/User";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { vars as globalFontVars } from "@/lib/global-fonts";

const prisma = prismaClient();

export const metadata: Metadata = {
  title: "Streak Wrangler app",
  description: "This is the application",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body
        className={`
        ${globalFontVars}
        antialiased
        font-[family-name:var(--font-main-sans)]
        layout-body`}
      >
        <UserProvider user={user}>
          <div className="container mx-auto  h-[100dvh] layout-container">
            <Header />
            {children}
            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
