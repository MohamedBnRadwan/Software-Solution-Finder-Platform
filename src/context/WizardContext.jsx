/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useMemo } from "react";
import { generateRecommendations } from "../utils/recommendationEngine";

const WizardContext = createContext();

const initialAnswers = {
  businessType: "",
  industry: [], // Dynamic array supporting multiple selected industries
  solution: "",
  platforms: [],
  nicheQuestions: {}, // e.g. { niche_education_audience: 'higher_ed', ... }
  operationsTraffic: {
    trafficUsage: "low",
    teamOperations: "no_team_auto",
    needOutsourcePortal: "no"
  },
  modules: [],
  integrations: [],
  customPaymentGateway: "",
  customApiName: "",
  analytics: [],
  techPreferences: [],
  serverHosting: {
    customServer: "vps",
    controlPanel: "cpanel"
  },
  teamAugmentation: []
};

// Maps Industry ID to default Module IDs
const industryModuleMapping = {
  education: ["auth", "users", "roles_permissions", "courses", "students", "dashboard"],
  healthcare: ["auth", "users", "roles_permissions", "patients", "appointments", "dashboard"],
  retail: ["auth", "users", "products", "orders", "inventory", "payments", "dashboard"],
  logistics: ["auth", "users", "projects", "tasks", "dashboard"],
  realestate: ["auth", "users", "roles_permissions", "projects", "dashboard"],
  construction: ["auth", "users", "projects", "tasks", "dashboard"],
  manufacturing: ["auth", "users", "inventory", "projects", "dashboard"],
  finance: ["auth", "users", "invoices", "payments", "dashboard"],
  government: ["auth", "users", "roles_permissions", "projects", "tasks", "audit_logs", "dashboard"]
};

// Maps Solution ID to additional Module IDs
const solutionModuleMapping = {
  ecommerce: ["products", "orders", "payments", "inventory"],
  marketplace: ["products", "orders", "payments", "roles_permissions"],
  lms: ["courses", "students"],
  booking_system: ["appointments", "payments"],
  inventory_system: ["inventory"],
  hr_system: ["users", "roles_permissions", "audit_logs"],
  accounting_system: ["invoices", "payments"],
  crm: ["users", "roles_permissions"],
  erp: ["users", "roles_permissions", "inventory", "invoices", "payments", "audit_logs"]
};

// Maps Solution ID to default Integrations
const solutionIntegrationMapping = {
  ecommerce: ["stripe", "email"],
  marketplace: ["stripe", "email"],
  booking_system: ["sms", "email"],
  logistics: ["google_maps", "sms", "push"]
};

export const WizardProvider = ({ children }) => {
  const [answers, setAnswers] = useState(initialAnswers);
  const [currentStep, setCurrentStep] = useState(1);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [leadDetails, setLeadDetails] = useState(null);

  // Compute live recommendations dynamically
  const recommendations = useMemo(() => {
    if (!answers.businessType) {
      return {
        solutionTitle: "Custom Solution",
        complexity: "Medium",
        timeline: "3 Months",
        recommendedFeatures: [],
        recommendedTech: { frontend: [], backend: [], database: [], mobile: [], devops: [] },
        complexityScore: 0
      };
    }
    return generateRecommendations(answers);
  }, [answers]);

  // Set individual answers and compute cascading defaults in core mode
  const setAnswer = (key, value) => {
    setAnswers(prev => {
      const nextAnswers = {
        ...prev,
        [key]: value
      };

      // 1. Industry / Solution defaults
      if (key === "industry" || key === "solution") {
        let defaultModules = [];
        let defaultIntegrations = [];

        // Accumulate defaults from all selected industries
        const selectedIndustries = Array.isArray(nextAnswers.industry) 
          ? nextAnswers.industry 
          : [nextAnswers.industry].filter(Boolean);

        selectedIndustries.forEach(ind => {
          if (industryModuleMapping[ind]) {
            defaultModules = [...defaultModules, ...industryModuleMapping[ind]];
          }
        });

        if (nextAnswers.solution && solutionModuleMapping[nextAnswers.solution]) {
          defaultModules = [...defaultModules, ...solutionModuleMapping[nextAnswers.solution]];
        }

        if (nextAnswers.solution && solutionIntegrationMapping[nextAnswers.solution]) {
          defaultIntegrations = [...defaultIntegrations, ...solutionIntegrationMapping[nextAnswers.solution]];
        }

        nextAnswers.modules = Array.from(new Set(defaultModules));
        nextAnswers.integrations = Array.from(new Set(defaultIntegrations));
      }

      // 2. Traffic & Operational Team defaults
      if (key === "operationsTraffic") {
        const traffic = value.trafficUsage;
        const team = value.teamOperations;

        // Auto-configure server hosting defaults based on traffic range
        let customServer = "vps";
        let controlPanel = "cpanel";

        if (traffic === "low") {
          customServer = "vps";
          controlPanel = "cpanel";
        } else if (traffic === "medium") {
          customServer = "vps";
          controlPanel = "plesk";
        } else if (traffic === "high") {
          customServer = "dedicated";
          controlPanel = "plesk";
        } else if (traffic === "enterprise_load") {
          customServer = "cloud";
          controlPanel = "none";
        }

        nextAnswers.serverHosting = { customServer, controlPanel };

        // Inject modules/integrations based on team outsourcing/portals
        let modules = [...nextAnswers.modules];
        let integrations = [...nextAnswers.integrations];

        if (team === "external_outsource") {
          modules.push("roles_permissions", "audit_logs");
          const selectedIndustries = Array.isArray(nextAnswers.industry) 
            ? nextAnswers.industry 
            : [nextAnswers.industry].filter(Boolean);

          const hasRetail = selectedIndustries.includes("retail");
          const hasLogistics = selectedIndustries.includes("logistics");

          if (hasRetail || hasLogistics) {
            integrations.push("customs", "zatca");
          }
          integrations.push("whatsapp", "push");
        }

        nextAnswers.modules = Array.from(new Set(modules));
        nextAnswers.integrations = Array.from(new Set(integrations));
      }

      return nextAnswers;
    });
  };

  const goToNextStep = (totalSteps) => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const goToPrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const resetWizard = () => {
    setAnswers(initialAnswers);
    setCurrentStep(1);
    setIsAdvancedMode(false);
    setLeadDetails(null);
  };

  const submitLead = (details) => {
    setLeadDetails(details);
    console.log("RFP Submitted:", { selections: answers, recommendations, lead: details });
  };

  return (
    <WizardContext.Provider
      value={{
        answers,
        currentStep,
        setCurrentStep,
        setAnswer,
        goToNextStep,
        goToPrevStep,
        resetWizard,
        recommendations,
        leadDetails,
        submitLead,
        isAdvancedMode,
        setIsAdvancedMode
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
};
