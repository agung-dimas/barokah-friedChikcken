import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Barokah Fried Chicken | Rasa Nikmat, InshaAllah Berkat",
  description: "Ayam goreng renyah bumbu meresap, diolah dengan standar halal dan thayyib. Kualitas premium untuk keluarga Anda.",
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Chivo:wght@400;700;800&family=Plus+Jakarta+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
