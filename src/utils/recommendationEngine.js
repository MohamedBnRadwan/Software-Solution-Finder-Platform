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
    techPreferences: selectedTechIds = []
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

  // Map Score to Complexity Name and Timeline
  let complexity;
  let timeline;
  
  if (complexityScore <= 4) {
    complexity = "Small";
    timeline = "2 - 4 Weeks";
  } else if (complexityScore <= 8) {
    complexity = "Medium";
    timeline = "1 - 2 Months";
  } else if (complexityScore <= 12) {
    complexity = "Large";
    timeline = "3 - 5 Months";
  } else {
    complexity = "Enterprise";
    timeline = "6 - 12+ Months";
  }

  // 2. Recommend Industry-Solution Specific Modules (if not manually altered)
  let recommendedFeatures = [];
  const selectedIndustry = industries.find(ind => ind.id === industryId);
  
  if (selectedIndustry) {
    recommendedFeatures = [...selectedIndustry.recommendedFeatures];
  }

  // LMS + Education specific features
  if (industryId === "education" && solutionId === "lms") {
    recommendedFeatures = [...recommendedFeatures, "Instructor Portal", "Live Classes", "Quizzes & Grading"];
  }
  
  // E-Commerce + Retail specific features
  if (industryId === "retail" && solutionId === "ecommerce") {
    recommendedFeatures = [...recommendedFeatures, "Cart & Checkout", "Product Catalog", "Payment Gateway Integration", "Inventory Control"];
  }

  // Logistics features
  if (industryId === "logistics") {
    recommendedFeatures = [...recommendedFeatures, "GPS Integration", "Route Optimization", "Driver App", "Live Shipping Tracker"];
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
    if (userPrefIds.has("angular")) recommendedTech.frontend.push("Angular (Enterprise)");
    else if (userPrefIds.has("vue")) recommendedTech.frontend.push("Vue.js (Flexible)");
    else recommendedTech.frontend.push("React.js (Recommended for responsive SPA)");
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

  // Recommendation logic: Database
  if (businessType === "enterprise" || businessType === "government" || solutionId === "accounting_system" || solutionId === "erp") {
    recommendedTech.database.push("PostgreSQL (ACID compliant, robust relational SQL)");
  } else {
    recommendedTech.database.push("PostgreSQL (Relational SQL for structured records)");
    recommendedTech.database.push("MongoDB (NoSQL document storage for catalogs and configurations)");
  }
  
  if (selectedAnalyticsIds.includes("realtime") || selectedIntegrationIds.includes("chatbot")) {
    recommendedTech.database.push("Redis (Fast in-memory caching and message broker)");
  }

  // Recommendation logic: DevOps
  if (businessType === "government") {
    recommendedTech.devops.push("Private Secure Cloud Hosting (On-premise / Local Gov Data Center)");
  } else if (businessType === "enterprise") {
    recommendedTech.devops.push("Amazon Web Services (AWS) or Microsoft Azure");
  } else {
    recommendedTech.devops.push("AWS or Vercel/DigitalOcean (Cost-efficient setups)");
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
