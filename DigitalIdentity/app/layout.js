import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "sonner";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Digital Identity",
  description: "Make Digital Identity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased px-10",
          fontSans.variable
        )}
      >
        <Toaster richColors={true} position="top-right" />
        {children}
      </body>
    </html>
  );
}
