import { ReactNode } from "react";

import Header from "components/Header";
import Footer from "components/Footer";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex h-screen flex-col bg-blue-100">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
