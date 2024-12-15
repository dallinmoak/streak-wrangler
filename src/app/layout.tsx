import type { Metadata } from "next";
import "./globals.css";

import UserProvider from "@/components/providers/User";
import { getCurrent as getCurrentUser } from "@/models/User";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { vars as globalFontVars } from "@/lib/global-fonts";
//wake  up vercel
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
          <div className="container mx-auto min-h-[100dvh] layout-container h-fit flex flex-col justify-between">
            <Header />
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
