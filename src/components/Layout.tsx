import { ReactNode } from "react";
import Head from "next/head";

import Header from "components/Header";
import Footer from "components/Footer";

import Gtag from "components/Gtag";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col bg-blue-100">
      <Head>
        <Gtag />
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
