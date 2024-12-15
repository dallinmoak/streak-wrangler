import type { Metadata } from "next";
import "./globals.css";

import UserProvider from "@/components/providers/User";
import { getCurrent as getCurrentUser } from "@/models/User";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { vars as globalFontVars } from "@/lib/global-fonts";

export const metadata: Metadata = {
  title: "Streak Wrangler app",
  description: "This is the application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <div className="container mx-auto min-h-[100dvh] layout-container h-fit flex flex-col justify-between">
          <UserProvider user={user}>
            <Header />
          </UserProvider>
          <div className="flex-grow">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
