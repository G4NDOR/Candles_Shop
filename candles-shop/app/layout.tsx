import type { Metadata } from "next";
import { Providers } from "./components/Providers";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";

export const metadata: Metadata = {
  title: "Candle Shop POS",
  description: "Database Management Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'sans-serif', backgroundColor: '#f0f2f5' }}>
        <Providers>
          <LoadingSpinner />
          <Notification />
          <Header />
          <Navbar />
          <main style={{ flex: 1, padding: '2rem' }}>{children}</main>
        </Providers>
      </body>
    </html>);
}