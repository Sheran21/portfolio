import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

// Display: characterful variable grotesque for headings
const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Accent: editorial italic serif for emphasis words
const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

// Body: clean geometric sans for long-form readability
const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Mono: labels, numbers, code-ish details
const mono = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  // Base for resolving relative OG/Twitter image URLs (e.g. /preview.png)
  metadataBase: new URL("https://www.janul-samaranayake.me"),
  title: "Janul Samaranayake | Intern Software Engineer",
  description:
    "Janul Samaranayake | Intern Software Engineer @ itZorix building web, mobile and backend software, cloud services and scalable systems.",
  keywords: ["Janul Samaranayake", "Software Engineer", "Software Development", "Full Stack", "Mobile Apps", "Backend", "Cloud", "React", "Next.js", "Node.js", "Angular", "Flutter", "Java", "Spring Boot", "PostgreSQL", "Python", "Portfolio"],
  openGraph: {
    title: "Janul Samaranayake Portfolio",
    description:
      "Software Engineer portfolio: web, mobile and backend software, cloud services and scalable systems.",
    url: "https://www.janul-samaranayake.me",
    siteName: "Janul Samaranayake Portfolio",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Janul Samaranayake Portfolio",
    description:
      "Software Engineer portfolio: web, mobile and backend software, cloud services and scalable systems.",
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="ZSqlA0A0GIasceOVEfgCCzwx0EkA0G5Ri33abUhU-f4" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Janul Samaranayake",
              url: "https://www.janul-samaranayake.me",
              sameAs: [
                "https://www.linkedin.com/in/janul-samaranayake/",
                "https://github.com/janulsamaranayake",
              ],
              jobTitle: "Intern Software Engineer",
            }),
          }}
        />
      </head>
      <body
        className={`${display.variable} ${serif.variable} ${body.variable} ${mono.variable} antialiased`}
      >
        {/* H1 for SEO */}
        <h1 className="sr-only">Janul Samaranayake | Intern Software Engineer</h1>
        {children}
      </body>
    </html>
  );
}