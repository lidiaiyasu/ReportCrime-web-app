import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://efp-crs.example.gov.et"),
  title: {
    default: "Ethiopian Federal Police — Criminal Recording System",
    template: "%s | Ethiopian Federal Police",
  },
  description:
    "Report crimes, look up case status, and access the Ethiopian Federal Police's secure criminal recording system.",
  openGraph: {
    title: "Ethiopian Federal Police — Criminal Recording System",
    description:
      "Report crimes, look up case status, and access the Ethiopian Federal Police's secure criminal recording system.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#003366",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
