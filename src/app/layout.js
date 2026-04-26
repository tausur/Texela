import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "../../components/NavbarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Image to PDF Converter Online Free – Fast & Secure | Texela",
  description: "Convert images to PDF online for free. Fast, secure, no watermark, no signup. Works perfectly on mobile. Try Texela now.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <NavbarWrapper>
            {children}
          </NavbarWrapper>
      </body>
    </html>
  );
}
