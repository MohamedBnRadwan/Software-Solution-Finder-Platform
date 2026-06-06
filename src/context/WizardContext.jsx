/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useMemo } from "react";
import { generateRecommendations } from "../utils/recommendationEngine";

const WizardContext = createContext();

const initialAnswers = {
  businessType: "",
  industry: "",
  solution: "",
  platforms: [],
  modules: [],
  integrations: [],
  analytics: [],
  techPreferences: [],
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
  const [leadDetails, setLeadDetails] = useState(null);

  // Compute live recommendations
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

  const setAnswer = (key, value) => {
    setAnswers(prev => {
      const nextAnswers = {
        ...prev,
        [key]: value
      };

      // Apply default module & integration selections when industry or solution changes
      if (key === "industry" || key === "solution") {
        let defaultModules = [];
        let defaultIntegrations = [];

        // Industry defaults
        if (nextAnswers.industry && industryModuleMapping[nextAnswers.industry]) {
          defaultModules = [...industryModuleMapping[nextAnswers.industry]];
        }

        // Solution defaults
        if (nextAnswers.solution && solutionModuleMapping[nextAnswers.solution]) {
          defaultModules = [...defaultModules, ...solutionModuleMapping[nextAnswers.solution]];
        }

        if (nextAnswers.solution && solutionIntegrationMapping[nextAnswers.solution]) {
          defaultIntegrations = [...defaultIntegrations, ...solutionIntegrationMapping[nextAnswers.solution]];
        }

        // Filter duplicates
        nextAnswers.modules = Array.from(new Set(defaultModules));
        nextAnswers.integrations = Array.from(new Set(defaultIntegrations));
      }

      return nextAnswers;
    });
  };

  const goToNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 9));
  };

  const goToPrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const resetWizard = () => {
    setAnswers(initialAnswers);
    setCurrentStep(1);
    setLeadDetails(null);
  };

  const submitLead = (details) => {
    setLeadDetails(details);
    // In a production app, we would send this data to an API/database.
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
        submitLead
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
