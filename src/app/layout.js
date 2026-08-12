import "./globals.css";

import { Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Proposte di tesi - Gruppo di ricerca",
  description:
    "Proposte di tesi supervisionate dal gruppo di ricerca di Prof. Pavan, Prof. Mirarchi e Dr.-Ing. Cassandro"
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <Suspense fallback={null}>
          <Header />
        </Suspense>

        <main className="mx-auto max-w-6xl px-4 py-10">
          {children}
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}