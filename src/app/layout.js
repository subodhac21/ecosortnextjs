import { Inter } from "next/font/google";
import "./globals.css";
import Example from "./components/leftbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ecosort App",
  description: "A Waste management App",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Example> */}
        {children}
        {/* </Example> */}
        </body>
    </html>
  );
}
