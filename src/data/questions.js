export const questions = [
  {
    id: "businessType",
    title: "Tell Us About Your Business",
    description: "Select the classification that matches your organizational scale.",
    type: "single-choice",
    mode: "core",
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
    title: "Select Your Industry",
    description: "Choose one or more industries to combine features and recommend integrated modules.",
    type: "multi-choice",
    mode: "core",
    dynamicOptions: "industries"
  },
  {
    id: "solution",
    title: "Required Solution Type",
    description: "What core software system are you looking to configure?",
    type: "single-choice",
    mode: "core",
    dynamicOptions: "solutions"
  },
  {
    id: "platforms",
    title: "Select Target Platforms",
    description: "Where will your clients and team members access the application?",
    type: "multi-choice",
    mode: "core",
    dynamicOptions: "platforms"
  },
  {
    id: "nicheQuestions",
    title: "Dynamic Business Profile",
    description: "Let us know a bit more about your industry context.",
    type: "niche-questions",
    mode: "core"
  },
  {
    id: "operationsTraffic",
    title: "Operations & Traffic Scope",
    description: "Define your expected user volumes and processing workflow.",
    type: "operations-traffic",
    mode: "core"
  },
  {
    id: "modules",
    title: "Select Required Modules",
    description: "Modules represent core features. We pre-selected recommendations based on your industry.",
    type: "modules-select",
    mode: "advanced"
  },
  {
    id: "integrations",
    title: "Select Third-Party Integrations",
    description: "Connect your system to payment gateways, maps, communications, and government APIs.",
    type: "integrations-select",
    mode: "advanced"
  },
  {
    id: "analytics",
    title: "Data & Analytics Preferences",
    description: "How would you like to process and display business performance reports?",
    type: "multi-choice",
    mode: "advanced",
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
    title: "Technical Stack Preferences",
    description: "Have specific tech preferences? Leave empty to let our recommendation engine decide.",
    type: "tech-select",
    mode: "advanced"
  },
  {
    id: "serverHosting",
    title: "Hosting & Control Panels",
    description: "Configure your hosting server environment and administration tool preference.",
    type: "server-hosting",
    mode: "advanced"
  },
  {
    id: "teamAugmentation",
    title: "Team Augmentation Requirements",
    description: "Need technical staffing or dedicated developers to support your internal team?",
    type: "team-select",
    mode: "advanced",
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

// Mappings for Dynamic Niche Questions per Industry
export const nicheQuestionsMap = {
  education: [
    {
      id: "niche_education_audience",
      question: "What is the primary age group of your students?",
      options: [
        { id: "k12", name: "K-12 Students", description: "Requires parental controls, simple gamified UI, and COPPA compliance." },
        { id: "higher_ed", name: "Higher Education / University", description: "Requires grading matrix, academic schedules, and credit units." },
        { id: "corporate", name: "Corporate / Professional Training", description: "Focus on employee certifications, compliance training, and HR sync." }
      ]
    },
    {
      id: "niche_education_delivery",
      question: "How do you plan to deliver learning content?",
      options: [
        { id: "recorded", name: "Pre-recorded Videos & Quizzes", description: "Asynchronous learning, low streaming costs, self-paced progress." },
        { id: "live", name: "Live Interactive Classes", description: "Real-time Zoom/WebRTC lectures with whiteboards and chat." },
        { id: "hybrid", name: "Hybrid Model", description: "Combination of scheduled live classrooms and static recorded catalog." }
      ]
    }
  ],
  healthcare: [
    {
      id: "niche_healthcare_insurance",
      question: "Do you need integration with medical insurance?",
      options: [
        { id: "yes_insurance", name: "Yes, Full Insurance Approval Link", description: "Verify client policies and submit digital claims automatically." },
        { id: "no_insurance", name: "No, Self-Pay Only", description: "Direct credit card payment or cash at the clinic." }
      ]
    },
    {
      id: "niche_healthcare_telehealth",
      question: "Do you require video consultation support?",
      options: [
        { id: "telehealth_enabled", name: "Yes, Telehealth Consultations", description: "Secure, HIPAA-compliant patient-doctor video video calls." },
        { id: "telehealth_disabled", name: "No, In-Person Scheduling Only", description: "Patient bookings occur exclusively at the clinic facility." }
      ]
    }
  ],
  retail: [
    {
      id: "niche_retail_type",
      question: "What products will you distribute?",
      options: [
        { id: "physical", name: "Physical Goods", description: "Requires warehouse management, courier dispatch, and weight calculation." },
        { id: "digital", name: "Digital Files", description: "Instant link downloads, access keys generation, and file hosting security." },
        { id: "subscriptions", name: "Subscription Boxes", description: "Recurring billing cycles, monthly inventory packs, and address updates." }
      ]
    },
    {
      id: "niche_retail_inventory",
      question: "How is product inventory managed?",
      options: [
        { id: "manual", name: "Manual Console Input", description: "Staff update stock counts manually inside our database portal." },
        { id: "api_supplier", name: "Supplier API Sync", description: "Automatically fetch quantities and prices from vendor feeds." },
        { id: "erp_sync", name: "ERP Platform Integration", description: "Bidirectional sync with corporate SAP, Odoo, or Oracle systems." }
      ]
    }
  ],
  logistics: [
    {
      id: "niche_logistics_fleet",
      question: "What is your primary fleet size?",
      options: [
        { id: "small_fleet", name: "Small Local Fleet (1-5 Vehicles)", description: "Simple route listing, manual dispatch, Google Maps routing." },
        { id: "medium_fleet", name: "Regional Fleet (6-25 Vehicles)", description: "Live dispatch dashboard, automated driver assignment." },
        { id: "large_fleet", name: "Enterprise Fleet (25+ Vehicles)", description: "Automated route optimization, fuel tracking, custom driver apps." }
      ]
    },
    {
      id: "niche_logistics_tracking",
      question: "What tracking fidelity is required?",
      options: [
        { id: "milestones", name: "Milestone-Based Status Updates", description: "Manually marked (e.g. 'Shipped', 'At Warehouse', 'Delivered')." },
        { id: "live_gps", name: "Live GPS Vehicle Tracking", description: "Real-time coordinate plotting on maps for customers." }
      ]
    }
  ],
  default: [
    {
      id: "niche_default_language",
      question: "Do you need multilingual support?",
      options: [
        { id: "single_lang", name: "Single Language", description: "Render exclusively in English (or your primary local language)." },
        { id: "dual_lang", name: "Bilingual (English & Arabic)", description: "Support RTL layout toggle, separate dictionaries, regional locales." },
        { id: "multi_lang", name: "Multilingual (3+ Languages)", description: "Dynamic translation packages, localized catalog, regional CDN." }
      ]
    },
    {
      id: "niche_default_market",
      question: "What is your primary target market region?",
      options: [
        { id: "local", name: "Local City / Country", description: "Local currency payments, regional courier mappings, localized SMS." },
        { id: "global", name: "Global Audience", description: "Multi-currency checkout, timezone adjusters, global GDPR compliance." }
      ]
    }
  ]
};

// Mappings for Dynamic Niche Questions per Solution Type
export const solutionNicheQuestionsMap = {
  static_website: [
    {
      id: "niche_static_contact",
      question: "Do you require user contact or form submissions?",
      options: [
        { id: "simple_form", name: "Simple Contact Form", description: "Collect contact info and messages, sent via email triggers (Formspree/Netlify)." },
        { id: "no_form", name: "No Forms / Visual Only", description: "Display visual details and social icons without active inputs." }
      ]
    }
  ],
  doc_website: [
    {
      id: "niche_doc_structure",
      question: "What documentation format or layout fits your needs?",
      options: [
        { id: "wiki", name: "Wiki / Multi-Page Guides", description: "Category-based pages with search index and sidebar navigation." },
        { id: "single_page", name: "Single Page Scrollable", description: "Compact single-page manual with dynamic sidebar table of contents." },
        { id: "api_explorer", name: "Interactive API Portal", description: "Sleek Swagger/Redoc styled documentation for developer integration." }
      ]
    }
  ],
  gallery_website: [
    {
      id: "niche_gallery_action",
      question: "What call-to-action should catalog items have?",
      options: [
        { id: "whatsapp_quote", name: "WhatsApp Inquiry Link", description: "Inquire about a product/service via chat prefilled with details." },
        { id: "email_inquiry", name: "Custom Email Form", description: "Open a contact page to write custom spec requests." },
        { id: "visual_only", name: "Display Only", description: "Clean image portfolio without call-to-action buttons." }
      ]
    }
  ],
  saas: [
    {
      id: "niche_saas_tenancy",
      question: "What database isolation model is required for tenants?",
      options: [
        { id: "logical_db", name: "Logical Multi-Tenancy (Shared DB)", description: "Cost-effective shared database, records isolated via Tenant ID check." },
        { id: "physical_db", name: "Physical Multi-Tenancy (Isolated DBs)", description: "Enterprise-grade security where each tenant gets a clean, separate database." }
      ]
    },
    {
      id: "niche_saas_billing",
      question: "How will you bill SaaS subscription clients?",
      options: [
        { id: "stripe_billing", name: "Stripe Recurring Billing", description: "Automated recurring subscriptions, upgrades/downgrades, and card charges." },
        { id: "manual_invoice", name: "Manual Corporate Invoicing", description: "Generate monthly PDFs; customers pay via bank transfer, marked manually." }
      ]
    }
  ],
  paas: [
    {
      id: "niche_paas_runner",
      question: "How are user applications executed on hosting nodes?",
      options: [
        { id: "docker_containers", name: "Isolated Docker Containers", description: "Deploy client software inside micro-sandboxes programmatically." },
        { id: "vps_ssh", name: "Raw VPS SSH Automation", description: "Execute scripts and configuration setups directly on Linux nodes." }
      ]
    }
  ]
};
