import { Metadata } from "next";

import Header from "components/Header";
import Footer from "components/Footer";
import GoogleAnalytics from "components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <GoogleAnalytics />
      </head>
      <body className="flex flex-col bg-olive-one">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
