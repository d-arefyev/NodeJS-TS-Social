// src/app/layout.tsx
import { ReactNode } from "react";
import ProtectedWrapper from "./components/ProtectedWrapper"; 
import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "ICHgram",
  description: "Connecting passions, uniting people",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/favicon.svg" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="">
        <ProtectedWrapper>
          {children}
        </ProtectedWrapper>
      </body>
    </html>
  );
}
