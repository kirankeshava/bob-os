export type FieldType = "text" | "email" | "url" | "tel" | "number" | "select" | "checkbox-group";

export interface OnboardingField {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  conditionalOn?: { field: string; value: string };
  helpText?: string;
}

export interface OnboardingConfig {
  businessId: number;
  title: string;
  subtitle: string;
  businessNameLabel: string;
  businessNamePlaceholder: string;
  fields: OnboardingField[];
  emailPromptContext: string;
}

export const onboardingConfigs: Record<number, OnboardingConfig> = {
  1: {
    businessId: 1,
    title: "AI Review Autopilot",
    subtitle: "Set up your AI-powered review response system in minutes.",
    businessNameLabel: "Business Name",
    businessNamePlaceholder: "Sunshine Bakery",
    fields: [
      {
        key: "platforms",
        label: "Platforms to Monitor",
        type: "checkbox-group",
        options: ["Google", "Yelp"],
        required: true,
      },
      {
        key: "googleListingUrl",
        label: "Google Business Listing URL",
        type: "url",
        placeholder: "https://maps.google.com/maps?...",
        required: true,
        conditionalOn: { field: "platforms", value: "Google" },
      },
      {
        key: "yelpListingUrl",
        label: "Yelp Business Listing URL",
        type: "url",
        placeholder: "https://www.yelp.com/biz/...",
        required: true,
        conditionalOn: { field: "platforms", value: "Yelp" },
      },
    ],
    emailPromptContext: "AI Review Reply & Reputation Autopilot — we'll monitor their review platforms and draft brand-safe AI responses to every review automatically",
  },

  2: {
    businessId: 2,
    title: "No-Show Reducer",
    subtitle: "Cut appointment no-shows with smart SMS reminders and AI rescheduling.",
    businessNameLabel: "Business / Practice Name",
    businessNamePlaceholder: "Bright Smile Dental",
    fields: [
      {
        key: "industry",
        label: "Industry",
        type: "select",
        options: ["Salon / Spa", "Dental", "Medical / Healthcare", "Fitness / Gym", "Professional Services", "Other"],
        required: true,
      },
      {
        key: "schedulingSoftware",
        label: "Current Scheduling Software",
        type: "select",
        options: ["Calendly", "Acuity Scheduling", "Square Appointments", "Mindbody", "Jane App", "Other", "None"],
        required: true,
      },
      {
        key: "businessPhone",
        label: "Business Phone (for SMS)",
        type: "tel",
        placeholder: "(555) 123-4567",
        required: true,
      },
      {
        key: "monthlyAppointments",
        label: "Average Monthly Appointments",
        type: "number",
        placeholder: "200",
        required: true,
      },
      {
        key: "estimatedNoShowRate",
        label: "Estimated No-Show Rate (%)",
        type: "number",
        placeholder: "15",
        helpText: "Best guess is fine — we'll help you track the real number",
      },
    ],
    emailPromptContext: "Appointment No-Show Reducer — we'll send smart SMS reminders, collect confirmations, auto-reschedule cancellations, and fill gaps from a waitlist to recover lost revenue",
  },

  3: {
    businessId: 3,
    title: "AI Clip Factory",
    subtitle: "Turn your long-form content into viral short-form clips automatically.",
    businessNameLabel: "Brand / Channel Name",
    businessNamePlaceholder: "The Growth Podcast",
    fields: [
      {
        key: "contentType",
        label: "Content Type",
        type: "select",
        options: ["Podcast", "Coaching / Courses", "YouTube / Vlogs", "Webinars", "Other"],
        required: true,
      },
      {
        key: "postingPlatforms",
        label: "Platforms to Post On",
        type: "checkbox-group",
        options: ["TikTok", "Instagram Reels", "YouTube Shorts", "LinkedIn", "X (Twitter)"],
        required: true,
      },
      {
        key: "contentUrl",
        label: "YouTube Channel or Podcast RSS URL",
        type: "url",
        placeholder: "https://youtube.com/@yourchannel",
        helpText: "We'll pull your latest content to create clips",
      },
      {
        key: "avgEpisodeLength",
        label: "Average Episode / Video Length",
        type: "select",
        options: ["Under 15 minutes", "15–30 minutes", "30–60 minutes", "Over 60 minutes"],
        required: true,
      },
      {
        key: "clipsPerWeek",
        label: "Desired Clips Per Week",
        type: "number",
        placeholder: "5",
        required: true,
      },
    ],
    emailPromptContext: "AI Short-Form Clip Factory — we'll convert their long-form videos/podcasts into ready-to-post vertical clips with hooks, captions, and platform-specific formatting",
  },

  4: {
    businessId: 4,
    title: "Lead Response Copilot",
    subtitle: "Respond to every lead instantly with AI-powered SMS qualification.",
    businessNameLabel: "Business Name",
    businessNamePlaceholder: "Ace Plumbing & HVAC",
    fields: [
      {
        key: "industry",
        label: "Industry",
        type: "select",
        options: ["Home Services", "Real Estate", "Legal", "Insurance", "Automotive", "Other"],
        required: true,
      },
      {
        key: "leadSources",
        label: "Lead Sources",
        type: "checkbox-group",
        options: ["Facebook Ads", "Google Ads", "Website Forms", "Referrals", "Other"],
        required: true,
      },
      {
        key: "businessPhone",
        label: "Business Phone (for SMS)",
        type: "tel",
        placeholder: "(555) 123-4567",
        required: true,
      },
      {
        key: "avgDealValue",
        label: "Average Deal Value ($)",
        type: "number",
        placeholder: "2500",
        required: true,
      },
      {
        key: "calendarUrl",
        label: "Booking / Calendar Link",
        type: "url",
        placeholder: "https://calendly.com/your-business",
        helpText: "Optional — we'll auto-book qualified leads if provided",
      },
    ],
    emailPromptContext: "Local Lead Response Copilot — we'll instantly text new leads, qualify them with AI-driven questions, and book calls or appointments automatically to maximize speed-to-lead conversion",
  },

  5: {
    businessId: 5,
    title: "Listing Optimizer",
    subtitle: "Boost your e-commerce listings with AI-powered SEO audits and optimization.",
    businessNameLabel: "Store Name",
    businessNamePlaceholder: "Handmade Haven Shop",
    fields: [
      {
        key: "ecommercePlatform",
        label: "Platform",
        type: "select",
        options: ["Etsy", "Shopify", "Both (Etsy + Shopify)", "Amazon", "Other"],
        required: true,
      },
      {
        key: "storeUrl",
        label: "Store URL",
        type: "url",
        placeholder: "https://www.etsy.com/shop/yourshop",
        required: true,
      },
      {
        key: "activeListings",
        label: "Number of Active Listings",
        type: "select",
        options: ["1–25", "26–100", "101–500", "500+"],
        required: true,
      },
      {
        key: "productCategory",
        label: "Primary Product Category",
        type: "select",
        options: ["Jewelry & Accessories", "Clothing & Apparel", "Home & Garden", "Art & Collectibles", "Digital Products", "Craft Supplies", "Other"],
        required: true,
      },
      {
        key: "monthlyRevenue",
        label: "Current Monthly Revenue Range",
        type: "select",
        options: ["Under $500", "$500–$2,000", "$2,000–$10,000", "$10,000+"],
        required: true,
      },
    ],
    emailPromptContext: "Etsy/Shopify Listing Optimizer & SEO Auditor — we'll audit their product listings (titles, tags, descriptions, images), generate optimized variants, create A/B test plans, and deliver weekly ranking reports",
  },
};

export function getOnboardingConfig(businessId: number): OnboardingConfig | null {
  return onboardingConfigs[businessId] ?? null;
}
