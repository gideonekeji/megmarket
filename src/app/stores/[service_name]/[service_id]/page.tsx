import React from "react";
import StoresDetail from "../../storesDetail";
import { Metadata } from "next";

interface PageProps {
  params: { service_name: string; service_id: string };
}

// Function to decode Base64 values
function decodeBase64(value: string): string {
  try {
    return atob(decodeURIComponent(value));
  } catch (error) {
    console.error("Error decoding Base64:", error);
    return value; // Return original value if decoding fails
  }
}

// Fetch metadata on the server
export async function generateMetadataDetailScreen({
  params,
}: PageProps): Promise<Metadata> {

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";



  const decodedServiceId = decodeBase64(params.service_id);
  const apiUrl = `${baseURL}/get-servicedetail`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service_id: decodedServiceId }),
    });

    const data = await response.json();
    const serviceDetail = data.serviceDetail || {};

    // Default values
    const defaultTitle = `Service - ${decodedServiceId}`;
    const defaultDescription = `Explore the details of ${params.service_name} with ID ${decodedServiceId}.`;
    const defaultImage =
      "https://nlyticalapp.com/wp-content/uploads/2025/02/Primocys_social_og_img.jpg";
    const defaultURL = `https://nlyticalapp.com/service/${decodedServiceId}`;

    // Ensure cover image is properly formatted and absolute
    let imageUrl = defaultImage;
    if (serviceDetail.cover_image) {
      try {
        const url = new URL(serviceDetail.cover_image, defaultImage);
        imageUrl = url.href;
      } catch (error) {
        console.error("Invalid cover image URL:", error);
      }
    }

    const meta_titlevalues = serviceDetail.meta_title
      ? `${serviceDetail.meta_title} | Meg Market Africa`
      : "Service Page | Meg Market Africa";

    console.log(" my  api  respoce from meta data ", meta_titlevalues);

    return {
      title: meta_titlevalues || defaultTitle,
      description: serviceDetail.meta_description || defaultDescription,
      robots: "index, follow",
      alternates: {
        canonical: defaultURL,
      },
      openGraph: {
        locale: "en_US",
        siteName: "Primocys | Expert Mobile App Development Company in the USA",
        type: "website",
        title: meta_titlevalues || defaultTitle,
        description: serviceDetail.meta_description || defaultDescription,
        url: defaultURL,
        images: [
          {
            url: imageUrl,
            secureUrl: imageUrl,
            width: 1200,
            height: 630,
            alt: meta_titlevalues || "Service Image",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@primocys",
        title: meta_titlevalues || defaultTitle,
        description: serviceDetail.meta_description || defaultDescription,
        creator: "@primocys",
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while fetching the service details.",
      robots: "noindex, nofollow",
    };
  }
}

function StoreDetailPagetestDemo({ params }: PageProps) {
  const decodedServiceId = decodeBase64(params.service_id);

  return (
    <div className="w-full h-auto">
      <StoresDetail
        serviceName={params.service_name}
        serviceId={decodedServiceId}
      />
    </div>
  );
}

export default StoreDetailPagetestDemo;
