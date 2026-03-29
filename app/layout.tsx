import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Janul Samaranayake | Frontend Developer Portfolio",
  description:
    "Janul Samaranayake | Frontend Developer specializing in React and Next.js, showcasing projects and skills.",
  keywords: ["Janul Samaranayake", "Frontend Developer", "React", "Next.js", "Portfolio", "Web Developer"],
  openGraph: {
    title: "Janul Samaranayake Portfolio",
    description:
      "Frontend Developer portfolio showcasing projects, skills, and experience in modern web development.",
    url: "https://portfolio-janulsamaranayake.vercel.app",
    siteName: "Janul Portfolio",
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
      "Frontend Developer portfolio showcasing projects, skills, and experience in modern web development.",
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
              url: "https://portfolio-janulsamaranayake.vercel.app",
              sameAs: [
                "https://www.linkedin.com/in/janul-samaranayake/",
                "https://github.com/janulsamaranayake",
              ],
              jobTitle: "Frontend Developer",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* H1 for SEO */}
        <h1 className="sr-only">Janul Samaranayake | Frontend Developer</h1>
        {children}
      </body>
    </html>
  );
}