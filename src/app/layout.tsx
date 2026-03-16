import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";
import { FeedbackProvider } from "@/components/ui/feedback-provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PIBTV - Primeira Igreja Batista em Teotônio Vilela",
  description:
    "Portal da Primeira Igreja Batista em Teotônio Vilela com avisos, mídias, células, localização e informações para membros e visitantes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.variable} ${bebasNeue.variable} font-sans antialiased`}
      >
        <FeedbackProvider>
          <Header />
          <main className="min-h-screen bg-ink text-white">{children}</main>
          <Footer />
          <SpeedInsights />
        </FeedbackProvider>
      </body>
    </html>
  );
}
