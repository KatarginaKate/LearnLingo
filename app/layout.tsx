import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "../components/Header/Header";
import Providers from "../providers/Providers";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LearnLingo | Find your language tutor",
  description: "Learn a language with highly qualified, experienced tutors.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
