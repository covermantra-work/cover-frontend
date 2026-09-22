import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  image?: string;
  noIndex?: boolean;
}

export function generateSEO({
  title,
  description,
  keywords,
  canonical,
  image,
  noIndex = false,
}: SEOProps): Metadata {
  const defaultUrl = "https://www.covermantra.com";
  const canonicalUrl = canonical || defaultUrl;
  const defaultImage = "https://www.covermantra.com/baseimage.png";
  const ogImage = image || defaultImage;

  const defaultKeywords = [
    "CoverMantra",
    "loans",
    "insurance",
    "personal loans",
    "business loans",
    "health insurance",
    "car insurance",
    "life insurance",
    "travel insurance",
    "two wheeler insurance",
    "home insurance",
    "compare loans",
    "compare insurance",
    "quick loan approval",
  ];

  return {
    title,
    description,
    keywords: keywords || defaultKeywords,
    metadataBase: new URL(defaultUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "CoverMantra",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}
