import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Proposte di Tesi",
  description: "Catalogo pubblico di proposte tesi con candidatura via email"
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}