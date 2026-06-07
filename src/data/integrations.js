export const integrationCategories = [
  {
    id: "payment",
    name: "Payment Gateways & Split Fees",
    items: [
      { id: "stripe", name: "Stripe", description: "Global card payments, recurring charges, and Apple Pay." },
      { id: "paypal", name: "PayPal", description: "Worldwide digital wallet payments and billing." },
      { id: "moyasar", name: "Moyasar", description: "Saudi-compliant credit card, Mada, and Apple Pay." },
      { id: "hyperpay", name: "HyperPay", description: "Regional MENA online payment gateway." },
      { id: "tabby", name: "Tabby", description: "Buy now, pay later (installment plans)." },
      { id: "tamara", name: "Tamara", description: "Local split-payment installment platform." },
      { id: "other_payment", name: "Other Gateway", description: "Specify a custom payment gateway or service." }
    ]
  },
  {
    id: "ai",
    name: "AI & Intelligence Services",
    items: [
      { id: "openai", name: "OpenAI GPT-4 Integration", description: "Generative AI, summarization, and data translation APIs." },
      { id: "chatbot", name: "Smart AI Chatbot", description: "Auto-respond to customer requests 24/7 on website." },
      { id: "voice", name: "Voice Assistant", description: "Speech-to-text voice controls and reading text aloud." },
      { id: "recommendation", name: "Recommendation Engine", description: "Suggest products or content based on customer behavior." },
      { id: "doc_analysis", name: "AI Document Analysis (OCR)", description: "Scan documents, extract text, and verify invoices." }
    ]
  },
  {
    id: "maps",
    name: "Maps & Geolocation Services",
    items: [
      { id: "google_maps", name: "Google Maps API", description: "High-quality maps, routing, place search, and geocoding." },
      { id: "mapbox", name: "Mapbox", description: "Highly customizable UI map interfaces and vectors." },
      { id: "openstreetmap", name: "OpenStreetMap", description: "Open-source free maps solution without usage pricing." }
    ]
  },
  {
    id: "communication",
    name: "Communications & Alerts",
    items: [
      { id: "whatsapp", name: "WhatsApp Business API", description: "Send order templates and support chats directly on WhatsApp." },
      { id: "sms", name: "SMS Gateways (Twilio, etc.)", description: "Direct mobile verification codes and text alerts." },
      { id: "email", name: "Email Engines (SendGrid/SES)", description: "Transaction receipts, newsletters, and verification emails." },
      { id: "push", name: "Mobile Push Notifications", description: "Real-time badge count updates and mobile banners." }
    ]
  },
  {
    id: "erp",
    name: "ERP Enterprise Connectors",
    items: [
      { id: "sap", name: "SAP ERP", description: "Sync supply lines, products, and clients with corporate SAP." },
      { id: "oracle", name: "Oracle NetSuite", description: "Enterprise-grade database and accounting synchronization." },
      { id: "odoo", name: "Odoo ERP", description: "Open-source ERP sync for manufacturing and inventory." },
      { id: "dynamics", name: "Microsoft Dynamics 365", description: "Cloud business applications data integration." }
    ]
  },
  {
    id: "government",
    name: "Government & Legal APIs (Saudi/Regional)",
    items: [
      { id: "zatca", name: "ZATCA E-Invoicing", description: "Phase 1 & 2 compliant QR code invoice billing for Saudi." },
      { id: "customs", name: "Saudi Customs API", description: "Clearance tracking and custom duty calculations." },
      { id: "muqeem", name: "Muqeem Portal Sync", description: "Resident permit verification for corporate HR." },
      { id: "absher", name: "Absher Portal Verification", description: "Verification portal for citizen profiles." },
      { id: "nafath", name: "Nafath National IAM", description: "Unified Saudi national single-sign-on verification." },
      { id: "other_api", name: "Other API", description: "Specify a custom government, corporate, or third-party API." }
    ]
  },
  {
    id: "ecommerce_platforms",
    name: "E-Commerce Platforms & Headless APIs",
    items: [
      { id: "shopify_api", name: "Shopify Storefront API", description: "Connect custom storefronts to Shopify product inventory and checkout." },
      { id: "woocommerce", name: "WooCommerce REST API", description: "Sync WordPress-based storefront catalogs and orders." }
    ]
  },
  {
    id: "identity_auth",
    name: "Identity & Access Providers",
    items: [
      { id: "okta_sso", name: "Okta Enterprise SSO", description: "Secure, unified authentication for corporate employees." },
      { id: "azure_ad", name: "Microsoft Entra ID (Azure AD)", description: "Enterprise catalog integration and Single Sign-On link." }
    ]
  }
];
