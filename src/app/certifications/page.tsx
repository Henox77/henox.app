import type { Metadata } from "next";
import { CertificationsClient } from "./CertificationsClient";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Explore the verified professional credentials, development achievements, and technology certifications earned by henox.",
  alternates: {
    canonical: `${SITE_URL}/certifications`,
  },
  openGraph: {
    title: "Certifications | henox",
    description:
      "Explore the verified professional credentials, development achievements, and technology certifications earned by henox.",
    url: `${SITE_URL}/certifications`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Certifications | henox",
    description:
      "Explore the verified professional credentials and certificates earned by henox.",
  },
};

export default function CertificationsPage() {
  return <CertificationsClient />;
}
