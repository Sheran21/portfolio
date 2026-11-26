import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Fonts are self-hosted from Fontsource packages (same Google Fonts, OFL) instead of
// next/font/google, so `next build` never has to download fonts — a failed download
// from fonts.gstatic.com was breaking Vercel builds.

// Display: characterful variable grotesque for headings
const display = localFont({
  variable: "--font-display",
  src: "../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2",
  weight: "200 800",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

// Accent: editorial italic serif for emphasis words
const serif = localFont({
  variable: "--font-serif",
  src: [
    { path: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  display: "swap",
  fallback: ["Georgia", "serif"],
});

// Body: clean geometric sans for long-form readability
const body = localFont({
  variable: "--font-body",
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

// Mono: labels, numbers, code-ish details
const mono = localFont({
  variable: "--font-code",
  src: "../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  // Base for resolving relative OG/Twitter image URLs (e.g. /preview.png)
  metadataBase: new URL("https://www.janul-samaranayake.me"),
  // Single canonical URL so Google consolidates http/non-www/old-domain variants here
  alternates: { canonical: "/" },
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