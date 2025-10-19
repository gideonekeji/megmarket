import type { Metadata } from "next";
import "./fotter.module.css";

export const metadata: Metadata = {
  title: "Meg Market Africa - footer",
  description: "Meg Market Africa - footer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
