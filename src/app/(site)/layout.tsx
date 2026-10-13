import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "./globals.css";
import { themeInitScript } from "@/components/ThemeSwitch";
import { IconSprite } from "@/components/Icon";
import UtilityBar from "@/components/UtilityBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { default: "Sky Holidays · Experience the Exceptional", template: "%s · Sky Holidays" },
  description:
    "Flights, hotels, domestic and international tours, visas, Umrah and car rental, planned end to end by Sky Holidays.",
  metadataBase: new URL("https://skyholidays.pk"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <IconSprite />
        <UtilityBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
