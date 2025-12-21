import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-manrope",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Clay & Soul - Handcrafted Pottery",
  description: "Handcrafted pottery for the mindful home. Embracing the soulful asymmetry of wabi-sabi.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${manrope.variable} ${playfair.variable} font-sans bg-charcoal text-rice-paper selection:bg-clay selection:text-white transition-colors duration-500 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
