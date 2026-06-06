export const questions = [
  {
    id: "businessType",
    step: 1,
    title: "Tell Us About Your Business",
    description: "Select the classification that matches your organizational scale.",
    type: "single-choice",
    options: [
      { id: "startup", name: "Startup", description: "Early-stage business focus on fast launch and product-market fit." },
      { id: "small_business", name: "Small Business", description: "Focused on optimizing operations and local digital presence." },
      { id: "medium_business", name: "Medium Business", description: "Requires scaling systems, process integrations, and detailed reporting." },
      { id: "enterprise", name: "Enterprise", description: "High security, complex workflows, compliance, and large user bases." },
      { id: "government", name: "Government Agency", description: "Public portal solutions, high compliance, and localized integrations." },
      { id: "non_profit", name: "Non-Profit / NGO", description: "Donor dashboards, public awareness sites, and low-budget operations." }
    ]
  },
  {
    id: "industry",
    step: 2,
    title: "Select Your Industry",
    description: "Choosing an industry helps us recommend specific pre-integrated modules.",
    type: "single-choice",
    // Options are loaded dynamically from industries.js
    dynamicOptions: "industries"
  },
  {
    id: "solution",
    step: 3,
    title: "Required Solution Type",
    description: "What core software system are you looking to configure?",
    type: "single-choice",
    // Options are loaded dynamically from projectTypes.js
    dynamicOptions: "solutions"
  },
  {
    id: "platforms",
    step: 4,
    title: "Select Target Platforms",
    description: "Where will your clients and team members access the application?",
    type: "multi-choice",
    dynamicOptions: "platforms"
  },
  {
    id: "modules",
    step: 5,
    title: "Select Required Modules",
    description: "Modules represent core features. We pre-selected recommendations based on your industry.",
    type: "modules-select"
  },
  {
    id: "integrations",
    step: 6,
    title: "Select Third-Party Integrations",
    description: "Connect your system to payment gateways, maps, communications, and government APIs.",
    type: "integrations-select"
  },
  {
    id: "analytics",
    step: 7,
    title: "Data & Analytics Preferences",
    description: "How would you like to process and display business performance reports?",
    type: "multi-choice",
    options: [
      { id: "basic_reports", name: "Basic PDF Reports", description: "Simple tabular downloads of logs and records." },
      { id: "advanced_reports", name: "Advanced Report Filtering", description: "Custom date ranges, search queries, and multi-field exports." },
      { id: "bi_dashboard", name: "Business Intelligence (BI) Dashboard", description: "Aggregated chart widgets displaying active analytics." },
      { id: "exec_dashboard", name: "Executive Summary Charts", description: "High-level summary view for board and leadership meetings." },
      { id: "predictive", name: "Predictive Analytics (AI)", description: "Machine learning forecasting of sales and user traffic patterns." },
      { id: "realtime", name: "Real-Time Activity Feed", description: "Live WebSocket updates of ongoing transactions." }
    ]
  },
  {
    id: "techPreferences",
    step: 8,
    title: "Technical Stack Preferences",
    description: "Have specific tech preferences? Leave empty to let our recommendation engine decide.",
    type: "tech-select"
  },
  {
    id: "teamAugmentation",
    step: 9,
    title: "Team Augmentation Requirements",
    description: "Need technical staffing or dedicated developers to support your internal team?",
    type: "team-select",
    options: [
      { id: "backend_dev", name: "Backend Developer", description: "APIs, database design, server maintenance." },
      { id: "frontend_dev", name: "Frontend Developer", description: "Modern React/Vue browser interface development." },
      { id: "react_dev", name: "React Specialist", description: "Focused on optimizing web app frontend codebases." },
      { id: "angular_dev", name: "Angular Specialist", description: "Enterprise dashboard structuring and typing." },
      { id: "flutter_dev", name: "Flutter Specialist", description: "Cross-platform mobile apps for Android & iOS." },
      { id: "android_dev", name: "Android Developer", description: "Native Kotlin mobile code and app publishing." },
      { id: "ios_dev", name: "iOS Developer", description: "Native Swift mobile code and app publishing." },
      { id: "uiux_designer", name: "UI/UX Designer", description: "High-fidelity Figma mockups and user flows." },
      { id: "qa_tester", name: "QA / Test Engineer", description: "Manual bug hunting and automated test scripts." },
      { id: "devops_engineer", name: "Devops Cloud Engineer", description: "Docker setup, CI/CD pipelines, AWS hosting control." },
      { id: "project_manager", name: "Project Manager", description: "Agile sprints, backlog planning, team coordination." }
    ]
  }
];
