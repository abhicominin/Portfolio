import { Zen_Old_Mincho } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Navbar/page";
{/* <style>
@import url('https://fonts.googleapis.com/css2?family=Zen+Old+Mincho:wght@400;500;600;700;900&display=swap');
</style> */}
const inter = Zen_Old_Mincho({ subsets: ["latin"],weight:'500' });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav/>
        {children}</body>
    </html>
  );
}
