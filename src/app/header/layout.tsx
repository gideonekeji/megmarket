import type { Metadata } from "next";
import  "./header.module.css"

export const metadata: Metadata = {
  title: "Meg Market Africa - header",
  description: "Meg Market Africa",
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
