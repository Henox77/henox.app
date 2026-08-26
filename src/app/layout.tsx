import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { SoundProvider } from "@/context/SoundContext";
import { PWARegister } from "@/components/PWARegister";
import { NavigationDock } from "@/components/NavigationDock";
import {
  SITE_URL,
  SITE_DEFAULT_TITLE,
  SITE_TITLE_TEMPLATE,
  SITE_DEFAULT_DESCRIPTION,
  SITE_NAME,
  AUTHOR_INFO,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_DEFAULT_TITLE,
    template: SITE_TITLE_TEMPLATE,
  },
  description: SITE_DEFAULT_DESCRIPTION,
  authors: [{ name: AUTHOR_INFO.name, url: SITE_URL }],
  creator: AUTHOR_INFO.name,
  keywords: [
    "henox",
    "Henox77",
    "Hypercord",
    "Discord Client",
    "Full-Stack Developer",
    "Software Engineer",
    "Developer Portfolio",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
    "Docker",
  ],
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_DEFAULT_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    creator: "@Henox77",
    images: ["/og-image.png"],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_NAME,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#040208",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {/* Anti-flash theme initialization script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('henox_theme');
                var isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches) || (saved === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                } else {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased bg-page text-ink min-h-screen selection:bg-brand selection:text-page">
        <ThemeProvider>
          <LanguageProvider>
            <SoundProvider>
              <PWARegister />

              {/* Centered Page Shell Container (760px reading anchor) */}
              <div className="max-w-reading mx-auto px-4 sm:px-6 pt-12 pb-32 relative min-h-screen flex flex-col justify-between">
                <main className="w-full">{children}</main>

                {/* Minimalist Tech Footer */}
                <footer className="w-full mt-20 pt-8 border-t border-border-divider text-center">
                  <p className="text-xs font-mono text-purple-300/70">
                    &copy; 2026 henox. Founder of Hypercord. Built with precision & craft.
                  </p>
                </footer>
              </div>

              {/* Bottom Progressive Blur Overlay */}
              <div className="bottom-progressive-blur" aria-hidden="true" />

              {/* Persistent Floating Navigation Dock */}
              <NavigationDock />
            </SoundProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
