
import Navbar from "@/components/Navbar";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "My E-commerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        <CartProvider>
        <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
