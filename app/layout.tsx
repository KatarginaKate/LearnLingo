import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import AppRouter from "../components/AppRouter";
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

export default function RootLayout() {
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                try {
                  const savedTheme = localStorage.getItem('learnlingo-theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const theme = savedTheme || systemTheme;
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (error) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
        <Providers>
          <AppRouter />
        </Providers>
      </body>
    </html>
  );
}
