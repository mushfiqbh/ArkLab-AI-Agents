import { Metadata } from "next";
import { Agent } from "@/types/agent";

interface MetadataParams {
  search?: string;
  status?: string[];
  category?: string[];
  pricingModel?: string;
  totalAgents?: number;
  filteredCount?: number;
}

export function generateDynamicMetadata(params: MetadataParams): Metadata {
  const {
    search,
    status,
    category,
    pricingModel,
    totalAgents = 0,
    filteredCount = 0,
  } = params;

  // Build dynamic title components
  const titleComponents: string[] = [];
  const descriptionComponents: string[] = [];

  // Add search term if present
  if (search) {
    titleComponents.push(`"${search}"`);
    descriptionComponents.push(`searching for "${search}"`);
  }

  // Add status filters
  if (status && status.length > 0) {
    const statusText =
      status.length === 1
        ? status[0]
        : `${status.slice(0, -1).join(", ")} & ${status.slice(-1)}`;
    titleComponents.push(`${statusText} AI Agents`);
    descriptionComponents.push(`${statusText.toLowerCase()} status`);
  }

  // Add category filters
  if (category && category.length > 0) {
    const categoryText =
      category.length === 1
        ? category[0]
        : `${category.slice(0, -1).join(", ")} & ${category.slice(-1)}`;
    titleComponents.push(`${categoryText} Solutions`);
    descriptionComponents.push(`${categoryText.toLowerCase()} category`);
  }

  // Add pricing model filter
  if (pricingModel) {
    titleComponents.push(`${pricingModel} Models`);
    descriptionComponents.push(`${pricingModel.toLowerCase()} pricing`);
  }

  // Generate title
  let title = "AI Agents Catalog - ArkLab";
  if (titleComponents.length > 0) {
    title = `${titleComponents.join(" | ")} - ArkLab AI Agents`;
  }

  // Generate description
  let description =
    "Discover and explore our comprehensive collection of AI agents designed to streamline your business operations. Find AI solutions for customer service, marketing, development, and more.";

  if (descriptionComponents.length > 0) {
    const hasFilters =
      search ||
      (status && status.length > 0) ||
      (category && category.length > 0) ||
      pricingModel;
    if (hasFilters) {
      description = `Found ${filteredCount} AI agents ${descriptionComponents.join(
        ", "
      )} from our catalog of ${totalAgents} solutions. ${description}`;
    }
  }

  // Generate keywords based on filters
  const keywords = [
    "AI agents",
    "artificial intelligence",
    "automation",
    "business solutions",
    "ArkLab",
  ];

  if (search) {
    keywords.push(search);
  }

  if (status && status.length > 0) {
    keywords.push(...status.map((s) => s.toLowerCase()));
  }

  if (category && category.length > 0) {
    keywords.push(...category.map((c) => c.toLowerCase()));
  }

  if (pricingModel) {
    keywords.push(pricingModel.toLowerCase());
  }

  return {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      siteName: "ArkLab AI Agents Catalog",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export function getMetadataFromSearchParams(
  searchParams: URLSearchParams,
  agents: Agent[]
): Metadata {
  const search = searchParams.get("search") || undefined;
  const status = searchParams.get("status")?.split(",").filter(Boolean) || [];
  const category =
    searchParams.get("category")?.split(",").filter(Boolean) || [];
  const pricingModel = searchParams.get("pricing") || undefined;

  // Calculate filtered count based on search params
  const filteredCount = agents.filter((agent) => {
    const matchesSearch =
      !search ||
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status.length === 0 || status.includes(agent.status);
    const matchesCategory =
      category.length === 0 || category.includes(agent.category);
    const matchesPricing = !pricingModel || agent.pricingModel === pricingModel;

    return matchesSearch && matchesStatus && matchesCategory && matchesPricing;
  }).length;

  return generateDynamicMetadata({
    search,
    status,
    category,
    pricingModel,
    totalAgents: agents.length,
    filteredCount,
  });
}
