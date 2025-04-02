import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "./header/Header";
import Footer from "./Footer";
import PageTransition from "./animations/PageTransition";
import useAuthStore from "../hooks/useAuthStore";
import useScrollTo from "../hooks/useScrollTo";

export default function RootLayout() {
  const location = useLocation();
  const { scrollToTopSmooth } = useScrollTo();
  const { verifySession } = useAuthStore();

  useEffect(() => {
    verifySession();
  }, []);

  useEffect(() => {
    scrollToTopSmooth();
  }, [location.pathname, location.key]);

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
