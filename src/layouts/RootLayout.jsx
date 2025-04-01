import React from "react";
import { Outlet } from "react-router";
import Header from "./header/Header";
import Footer from "./Footer";
import PageTransition from "./animations/PageTransition";

export default function RootLayout() {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-slate-900 text-white oveflow-x-hidden">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
