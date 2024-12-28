import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { dbConnect } from "@/service/momgo";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StaySwift",
  description: "One Place Stop for Hospitability",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
