import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  title: "ATO 1 - O Caos | Apresentacao 3 Atos - FIPS",
  description: "Visualize o caos do passado antes da transformacao digital FIPS. 44 modulos, 132 cenarios para aprovacao dos gestores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
