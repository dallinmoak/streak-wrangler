import type { Metadata } from "next";
import "./globals.css";

import UserProvider from "@/components/providers/User";
import { getCurrent } from "@/models/User";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Streak Wrangler app",
  description: "This is the application",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieHeader = cookies().get("token")?.value; // Extract token from cookies
  const user = cookieHeader ? await getCurrent(cookieHeader) : null;

  return (
    <html lang="en">
      <body className="antialiased font-[family-name:var(--font-main-sans)] layout-body">
        <UserProvider user={user}>
          <div className="container mx-auto min-h-[100dvh] layout-container h-fit flex flex-col justify-between">
            <Header />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
