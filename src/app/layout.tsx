import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Credenciamentos Performance",
  description: "Sistema de acompanhamento comercial",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
