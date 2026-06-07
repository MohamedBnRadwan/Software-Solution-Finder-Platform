import { industries } from "../data/industries";
import { solutions } from "../data/projectTypes";

/**
 * Evaluates user selections and returns estimated timeline, complexity, recommended features, and tech stack.
 * @param {Object} selections 
 * @returns {Object} Recommendations
 */
export function generateRecommendations(selections) {
  const {
    businessType,
    industry: industryId,
    solution: solutionId,
    platforms: selectedPlatforms = [],
    modules: selectedModuleIds = [],
    integrations: selectedIntegrationIds = [],
    analytics: selectedAnalyticsIds = [],
    techPreferences: selectedTechIds = [],
    operationsTraffic = {},
    serverHosting = {}
  } = selections;

  // 1. Calculate Score for Complexity
  let complexityScore = 0;

  // Business Type Weight
  const businessWeights = {
    startup: 1,
    small_business: 1,
    medium_business: 2,
    enterprise: 4,
    government: 4,
    non_profit: 1
  };
  complexityScore += businessWeights[businessType] || 1;

  // Platforms Weight
  const platformCount = selectedPlatforms.length;
  if (platformCount === 1) complexityScore += 1;
  else if (platformCount >= 2 && platformCount <= 3) complexityScore += 2;
  else if (platformCount > 3) complexityScore += 4;

  // Modules Weight
  const moduleCount = selectedModuleIds.length;
  if (moduleCount <= 4) complexityScore += 1;
  else if (moduleCount > 4 && moduleCount <= 8) complexityScore += 2;
  else complexityScore += 3;

  // Integrations Weight
  const integrationCount = selectedIntegrationIds.length;
  if (integrationCount <= 2) complexityScore += 1;
  else if (integrationCount > 2 && integrationCount <= 5) complexityScore += 2;
  else complexityScore += 4;

  // Analytics Weight
  const analyticsCount = selectedAnalyticsIds.length;
  if (analyticsCount > 3) complexityScore += 2;
  else if (analyticsCount > 0) complexityScore += 1;

  // Traffic Scope Weight
  const trafficUsage = operationsTraffic.trafficUsage || "low";
  if (trafficUsage === "medium") complexityScore += 1;
  else if (trafficUsage === "high") complexityScore += 2;
  else if (trafficUsage === "enterprise_load") complexityScore += 4;

  // User Operations Weight
  const teamOperations = operationsTraffic.teamOperations || "no_team_auto";
  if (teamOperations === "internal_team") complexityScore += 1;
  else if (teamOperations === "external_outsource") complexityScore += 3;

  // Map Score to Complexity Name and Timeline
  let complexity;
  let timeline;
  
  if (solutionId === "static_website") {
    complexity = "Small";
    timeline = "1 - 2 Weeks";
  } else if (solutionId === "doc_website") {
    complexity = "Small";
    timeline = "2 - 3 Weeks";
  } else if (solutionId === "gallery_website") {
    complexity = "Small";
    timeline = "2 - 4 Weeks";
  } else if (solutionId === "shopify_store") {
    complexity = "Small";
    timeline = "3 - 4 Weeks";
    if (complexityScore > 10) {
      complexity = "Medium";
      timeline = "1 - 2 Months";
    }
  } else if (solutionId === "cms_website") {
    complexity = "Small";
    timeline = "2 - 4 Weeks";
    if (complexityScore > 10) {
      complexity = "Medium";
      timeline = "1 - 2 Months";
    }
  } else if (solutionId === "saas") {
    complexity = "Large";
    timeline = "3 - 6 Months";
    if (complexityScore > 16) {
      complexity = "Enterprise";
      timeline = "6 - 12 Months";
    }
  } else if (solutionId === "paas") {
    complexity = "Enterprise";
    timeline = "6 - 12 Months";
  } else {
    if (complexityScore <= 5) {
      complexity = "Small";
      timeline = "2 - 4 Weeks";
    } else if (complexityScore <= 10) {
      complexity = "Medium";
      timeline = "1 - 2 Months";
    } else if (complexityScore <= 16) {
      complexity = "Large";
      timeline = "3 - 5 Months";
    } else {
      complexity = "Enterprise";
      timeline = "6 - 12+ Months";
    }
  }

  // 2. Recommend Industry-Solution Specific Modules (if not manually altered)
  let recommendedFeatures = [];
  
  const selectedIndustries = Array.isArray(industryId) 
    ? industryId 
    : [industryId].filter(Boolean);

  selectedIndustries.forEach(indId => {
    const selectedIndustry = industries.find(ind => ind.id === indId);
    if (selectedIndustry) {
      recommendedFeatures = [...recommendedFeatures, ...selectedIndustry.recommendedFeatures];
    }
  });

  const hasIndustry = (id) => selectedIndustries.includes(id);

  // LMS + Education specific features
  if (hasIndustry("education") && solutionId === "lms") {
    recommendedFeatures = [...recommendedFeatures, "Instructor Portal", "Live Classes", "Quizzes & Grading"];
  }
  
  // E-Commerce + Retail specific features
  if (hasIndustry("retail") && (solutionId === "ecommerce" || solutionId === "shopify_store")) {
    recommendedFeatures = [...recommendedFeatures, "Cart & Checkout", "Product Catalog", "Payment Gateway Integration", "Inventory Control"];
  }

  // Logistics features
  if (hasIndustry("logistics")) {
    recommendedFeatures = [...recommendedFeatures, "GPS Integration", "Route Optimization", "Driver App", "Live Shipping Tracker"];
  }

  // Solution specific features
  if (solutionId === "static_website") {
    recommendedFeatures = [...recommendedFeatures, "Static Landing Pages", "Responsive Design", "SEO Tags Optimization", "Ultra-Fast HTML Loading"];
  }
  if (solutionId === "doc_website") {
    recommendedFeatures = [...recommendedFeatures, "Documentation Pages", "Categorized Sidebar Navigation", "Instant Search Indexing", "API Endpoints Code Copy"];
  }
  if (solutionId === "gallery_website") {
    recommendedFeatures = [...recommendedFeatures, "Product/Service Showcase", "Filterable Media Gallery", "WhatsApp Inquiry Link"];
  }
  if (solutionId === "saas") {
    recommendedFeatures = [...recommendedFeatures, "Multi-Tenant Accounts", "Subscription Tiers Billing", "SaaS KPI Dashboard", "Audit Trails & MFA"];
  }
  if (solutionId === "paas") {
    recommendedFeatures = [...recommendedFeatures, "Container Sandboxing", "Automated Git Deployments", "Cluster Resource Metrics", "Admin SSH Console"];
  }
  if (solutionId === "shopify_store") {
    recommendedFeatures = [...recommendedFeatures, "Shopify Liquid Theme", "Shopify API Sync", "Mada / Apple Pay Gateways"];
  }
  if (solutionId === "cms_website") {
    recommendedFeatures = [...recommendedFeatures, "CMS Visual Page Builder", "Blog Post Category Directories", "Media Library Management"];
  }
  if (solutionId === "custom_software") {
    recommendedFeatures = [...recommendedFeatures, "Bespoke Database Schema", "Bespoke Admin Dashboard", "Custom Integration Webhooks"];
  }
  if (solutionId === "api_development") {
    recommendedFeatures = [...recommendedFeatures, "RESTful / GraphQL APIs", "Client API Keys portal", "Rate Limiting & Gateway Logs"];
  }

  // Make sure features are unique
  recommendedFeatures = Array.from(new Set(recommendedFeatures));

  // 3. Formulate Recommended Tech Stack
  const recommendedTech = {
    frontend: [],
    backend: [],
    database: [],
    mobile: [],
    devops: []
  };

  // Mobile Platforms
  const hasMobile = selectedPlatforms.some(p => ["android", "ios", "huawei"].includes(p));
  const hasIos = selectedPlatforms.includes("ios");
  const hasAndroid = selectedPlatforms.includes("android");
  const hasWeb = selectedPlatforms.includes("web") || selectedPlatforms.includes("pwa") || selectedPlatforms.length === 0;
  const hasDesktop = selectedPlatforms.includes("desktop");

  // Client preferences (map them to categories)
  const userPrefIds = new Set(selectedTechIds);

  // Recommendation logic: Frontend
  if (hasWeb) {
    if (solutionId === "shopify_store") {
      recommendedTech.frontend.push("Shopify Liquid Theme Engine (Custom storefront template)");
    } else if (solutionId === "cms_website") {
      if (userPrefIds.has("wordpress")) recommendedTech.frontend.push("WordPress Block Editor (Gutenberg / Elementor)");
      else if (userPrefIds.has("octobercms")) recommendedTech.frontend.push("OctoberCMS Blade template system");
      else recommendedTech.frontend.push("CMS Theme Engine (WordPress/OctoberCMS/Drupal)");
    } else if (solutionId === "static_website") {
      recommendedTech.frontend.push("HTML5 / Vanilla CSS / JS (Zero-overhead lightning-fast markup)");
    } else if (solutionId === "doc_website") {
      recommendedTech.frontend.push("Docusaurus or Next.js (Optimized markdown static pages)");
    } else {
      if (userPrefIds.has("angular")) recommendedTech.frontend.push("Angular (Enterprise)");
      else if (userPrefIds.has("vue")) recommendedTech.frontend.push("Vue.js (Flexible)");
      else recommendedTech.frontend.push("React.js (Recommended for responsive SPA)");
    }
  }

  // Recommendation logic: Mobile
  if (hasMobile) {
    if (userPrefIds.has("flutter")) {
      recommendedTech.mobile.push("Flutter (Dart) cross-platform");
    } else if (userPrefIds.has("react_native")) {
      recommendedTech.mobile.push("React Native (JS) cross-platform");
    } else {
      // If client is enterprise and wants native
      if (businessType === "enterprise" || businessType === "government") {
        if (hasIos) recommendedTech.mobile.push("Native Swift (iOS)");
        if (hasAndroid) recommendedTech.mobile.push("Native Kotlin (Android)");
      } else {
        recommendedTech.mobile.push("Flutter (Dart) - Recommended for rapid cross-platform deployment");
      }
    }
  }

  // Recommendation logic: Desktop
  if (hasDesktop) {
    recommendedTech.mobile.push("Electron.js (Cross-platform desktop wrap)");
  }

  // Recommendation logic: Backend
  if (solutionId === "shopify_store") {
    recommendedTech.backend.push("Shopify Core SaaS Engine (Fully managed hosted API)");
  } else if (solutionId === "static_website") {
    recommendedTech.backend.push("None Required (Optional Serverless Functions for contact forms)");
  } else if (solutionId === "doc_website") {
    recommendedTech.backend.push("Static Site Generator / None (Markdown files read at compile time)");
  } else if (solutionId === "cms_website") {
    if (userPrefIds.has("octobercms")) recommendedTech.backend.push("PHP Laravel framework (OctoberCMS backend structure)");
    else recommendedTech.backend.push("PHP Engine (WordPress core)");
  } else {
    if (userPrefIds.has("dotnet")) {
      recommendedTech.backend.push(".NET Core Web API (Secure & fast)");
    } else if (userPrefIds.has("java")) {
      recommendedTech.backend.push("Java Spring Boot (Robust enterprise standard)");
    } else if (userPrefIds.has("go")) {
      recommendedTech.backend.push("Go / Golang (Ultra-high concurrency & performance)");
    } else if (userPrefIds.has("python")) {
      recommendedTech.backend.push("Python FastAPI / Django (Excellent for AI integrations)");
    } else if (userPrefIds.has("php")) {
      recommendedTech.backend.push("PHP Laravel (Robust MVC ecosystem and rapid builds)");
    } else if (userPrefIds.has("nodejs")) {
      recommendedTech.backend.push("Node.js with NestJS/Express (High scalable JavaScript runtime)");
    } else {
      // Automatic selection based on Business Type
      if (businessType === "enterprise" || businessType === "government") {
        recommendedTech.backend.push(".NET Core Web API or Java Spring Boot (Best for enterprise security)");
      } else if (selectedIntegrationIds.includes("openai") || selectedAnalyticsIds.includes("predictive")) {
        recommendedTech.backend.push("Python FastAPI (Optimal for AI and predictive models)");
      } else {
        recommendedTech.backend.push("Node.js NestJS (Scalable JavaScript backend)");
      }
    }
  }

  // Recommendation logic: Database
  if (solutionId === "shopify_store") {
    recommendedTech.database.push("Shopify Managed Database (No local database required)");
  } else if (solutionId === "static_website") {
    recommendedTech.database.push("None (Pure static HTML/assets storage)");
  } else if (solutionId === "doc_website") {
    recommendedTech.database.push("None (Markdown filesystem catalog)");
  } else if (solutionId === "cms_website") {
    recommendedTech.database.push("MySQL / MariaDB (Standard database for PHP CMS content)");
  } else {
    const hasDbPref = selectedTechIds.some(id => ["postgresql", "mongodb", "mysql", "mssql", "oracle", "dynamodb", "cassandra", "sqlite", "redis", "elasticsearch"].includes(id));
    if (hasDbPref) {
      if (userPrefIds.has("postgresql")) recommendedTech.database.push("PostgreSQL (Relational SQL)");
      if (userPrefIds.has("mongodb")) recommendedTech.database.push("MongoDB (NoSQL Document Store)");
      if (userPrefIds.has("mysql")) recommendedTech.database.push("MySQL (Relational SQL)");
      if (userPrefIds.has("mssql")) recommendedTech.database.push("Microsoft SQL Server / MS-SQL (Enterprise Relational SQL)");
      if (userPrefIds.has("oracle")) recommendedTech.database.push("Oracle Database (Heavy-duty Enterprise SQL)");
      if (userPrefIds.has("dynamodb")) recommendedTech.database.push("Amazon DynamoDB (Managed NoSQL)");
      if (userPrefIds.has("cassandra")) recommendedTech.database.push("Apache Cassandra (Distributed NoSQL)");
      if (userPrefIds.has("sqlite")) recommendedTech.database.push("SQLite (Embedded Local SQL)");
    } else {
      if (businessType === "enterprise" || businessType === "government" || solutionId === "accounting_system" || solutionId === "erp" || solutionId === "saas" || solutionId === "paas") {
        recommendedTech.database.push("PostgreSQL (ACID compliant, robust relational SQL)");
      } else {
        recommendedTech.database.push("PostgreSQL (Relational SQL for structured records)");
        recommendedTech.database.push("MongoDB (NoSQL document storage for catalogs and configurations)");
      }
    }
  }

  if (userPrefIds.has("elasticsearch") || selectedIntegrationIds.includes("elasticsearch")) {
    recommendedTech.database.push("Elasticsearch (Distributed search indexing)");
  }
  
  if (userPrefIds.has("redis") || selectedAnalyticsIds.includes("realtime") || selectedIntegrationIds.includes("chatbot")) {
    recommendedTech.database.push("Redis (Fast in-memory caching and session store)");
  }

  // Recommendation logic: DevOps (Custom Hosting & Panel Recommendations)
  const chosenServer = serverHosting.customServer;
  const chosenPanel = serverHosting.controlPanel;

  let serverLabel;
  if (solutionId === "shopify_store") {
    serverLabel = "Shopify Cloud Host (Fully managed SaaS)";
  } else if (solutionId === "static_website" || solutionId === "doc_website") {
    serverLabel = "Edge Static Hosting (Vercel / Netlify / CDN)";
  } else if (chosenServer === "shared") {
    serverLabel = "Shared Hosting (Cost-effective)";
  } else if (chosenServer === "vps") {
    serverLabel = "VPS Hosting (Balanced virtual server)";
  } else if (chosenServer === "dedicated") {
    serverLabel = "Dedicated Hosting (Isolated high-power physical server)";
  } else if (chosenServer === "cloud") {
    serverLabel = "Elastic Cloud Clusters (High scaling AWS/Azure/GCP)";
  } else {
    // Default server allocation by traffic usage
    if (trafficUsage === "low") serverLabel = "VPS Hosting (Light instance, e.g., DigitalOcean droplet)";
    else if (trafficUsage === "medium") serverLabel = "VPS Hosting (Medium scale instance)";
    else if (trafficUsage === "high") serverLabel = "Dedicated Physical Server (Bare-metal)";
    else serverLabel = "AWS/Azure Cloud Instance Cluster (Load-balanced)";
  }

  let panelLabel;
  if (solutionId === "shopify_store") {
    panelLabel = "Shopify Admin Dashboard";
  } else if (solutionId === "static_website" || solutionId === "doc_website") {
    panelLabel = "Git-triggered automated deployments (Zero Server Admin)";
  } else if (chosenPanel === "cpanel") {
    panelLabel = "cPanel Web Admin Console";
  } else if (chosenPanel === "plesk") {
    panelLabel = "Plesk Automation Panel";
  } else if (chosenPanel === "none") {
    panelLabel = "CLI Admin (Direct Shell, Docker Orchestration)";
  } else {
    // Default panels based on traffic/business
    if (trafficUsage === "low" || trafficUsage === "medium") {
      panelLabel = "cPanel / Plesk for simple server management";
    } else {
      panelLabel = "CLI Admin / Kubernetes / Docker (No control panel for maximum control)";
    }
  }

  // Add specific selected cloud hosting options if chosen in Step 8
  const cloudProviders = [];
  if (userPrefIds.has("aws")) cloudProviders.push("Amazon Web Services (AWS)");
  if (userPrefIds.has("azure")) cloudProviders.push("Microsoft Azure");
  if (userPrefIds.has("gcp")) cloudProviders.push("Google Cloud Platform (GCP)");
  if (userPrefIds.has("digitalocean")) cloudProviders.push("DigitalOcean");
  if (userPrefIds.has("hetzner")) cloudProviders.push("Hetzner Online");
  if (userPrefIds.has("linode")) cloudProviders.push("Linode / Akamai");
  if (userPrefIds.has("custom_vps")) cloudProviders.push("Self-managed VPS");
  if (userPrefIds.has("dedicated_server")) cloudProviders.push("Bare-metal Dedicated Server");
  if (userPrefIds.has("on_premise")) cloudProviders.push("On-Premise Private Data Center");
  if (userPrefIds.has("vercel")) cloudProviders.push("Vercel / Netlify");

  if (cloudProviders.length > 0) {
    recommendedTech.devops.push(`Cloud Hosting: ${cloudProviders.join(" / ")}`);
  }

  recommendedTech.devops.push(`${serverLabel} + managed via ${panelLabel}`);

  if (businessType === "government") {
    recommendedTech.devops.push("Private Secure Cloud Hosting (On-premise / Local Gov Data Center)");
  }

  recommendedTech.devops.push("Docker Containers with GitHub Actions CI/CD");

  // Get display names of selected solutions
  const solutionObj = solutions.find(s => s.id === solutionId);
  const solutionName = solutionObj ? solutionObj.name : "Custom Solution";
  
  return {
    solutionTitle: `${businessType.charAt(0).toUpperCase() + businessType.slice(1).replace('_', ' ')} ${solutionName}`,
    complexity,
    timeline,
    recommendedFeatures,
    recommendedTech,
    complexityScore
  };
}
