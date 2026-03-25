import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THRYV — Move. Earn. Belong.",
  description:
    "THRYV is the all-in-one fitness app that rewards your movement. Track workouts, steps, sleep, nutrition, hydration, and mindfulness — all in one place.",
  openGraph: {
    title: "THRYV — Move. Earn. Belong.",
    description:
      "The all-in-one fitness app that rewards your movement.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THRYV — Move. Earn. Belong.",
    description:
      "The all-in-one fitness app that rewards your movement.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
