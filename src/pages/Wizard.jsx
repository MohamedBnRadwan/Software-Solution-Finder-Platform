import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HelpIcon from "@mui/icons-material/Help";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import { useWizard } from "../context/WizardContext";
import ConfigDrawer from "../components/Wizard/ConfigDrawer";

// Config & components
import { questions, nicheQuestionsMap } from "../data/questions";
import { industries } from "../data/industries";
import { solutions, platforms } from "../data/projectTypes";
import { commonModules, businessModules } from "../data/modules";
import { integrationCategories } from "../data/integrations";
import { technologies } from "../data/technologies";
import SelectionCard from "../components/Cards/SelectionCard";
import WizardProgress from "../components/Wizard/WizardProgress";
import LivePreview from "../components/Wizard/LivePreview";

export default function Wizard() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    answers,
    currentStep,
    setCurrentStep,
    setAnswer,
    goToNextStep,
    goToPrevStep,
    isAdvancedMode,
    setIsAdvancedMode
  } = useWizard();

  // Filter questions based on whether Advanced Mode is active
  const activeQuestions = useMemo(() => {
    return questions.filter(q => isAdvancedMode || q.mode === "core");
  }, [isAdvancedMode]);

  const totalSteps = activeQuestions.length;
  const currentQuestion = activeQuestions[currentStep - 1] || activeQuestions[0];

  // Auto-clamp step if mode changes and out of bounds
  useEffect(() => {
    if (currentStep > totalSteps) {
      setCurrentStep(totalSteps);
    }
  }, [totalSteps, currentStep, setCurrentStep]);

  // Resolve dynamic options based on references in questions.js
  const getOptions = () => {
    if (!currentQuestion) return [];
    if (currentQuestion.dynamicOptions === "industries") return industries;
    if (currentQuestion.dynamicOptions === "solutions") return solutions;
    if (currentQuestion.dynamicOptions === "platforms") return platforms;
    return currentQuestion.options || [];
  };

  const options = getOptions();

  // Navigation handlers
  const handleNext = () => {
    if (currentStep === totalSteps) {
      navigate("/results");
    } else {
      goToNextStep(totalSteps);
    }
  };

  const handlePrev = () => {
    goToPrevStep();
  };

  // Option toggles
  const handleSingleSelect = (optionId) => {
    setAnswer(currentQuestion.id, optionId);
    // Auto-advance for single selection with 350ms delay
    setTimeout(() => {
      if (currentStep < totalSteps) {
        goToNextStep(totalSteps);
      }
    }, 350);
  };

  const handleMultiSelect = (optionId) => {
    const currentList = answers[currentQuestion.id] || [];
    if (currentList.includes(optionId)) {
      setAnswer(currentQuestion.id, currentList.filter(id => id !== optionId));
    } else {
      setAnswer(currentQuestion.id, [...currentList, optionId]);
    }
  };

  // Custom Selection: Modules checklist
  const handleModuleToggle = (id) => {
    const list = answers.modules || [];
    if (list.includes(id)) {
      setAnswer("modules", list.filter(m => m !== id));
    } else {
      setAnswer("modules", [...list, id]);
    }
  };

  // Custom Selection: Integrations toggle
  const handleIntegrationToggle = (id) => {
    const list = answers.integrations || [];
    if (list.includes(id)) {
      setAnswer("integrations", list.filter(i => i !== id));
    } else {
      setAnswer("integrations", [...list, id]);
    }
  };

  // Custom Selection: Technologies toggle
  const handleTechToggle = (id) => {
    const list = answers.techPreferences || [];
    if (list.includes(id)) {
      setAnswer("techPreferences", list.filter(t => t !== id));
    } else {
      setAnswer("techPreferences", [...list, id]);
    }
  };

  // Render option selectors based on type
  const renderSelector = () => {
    if (!currentQuestion) return null;
    const type = currentQuestion.type;

    if (type === "single-choice") {
      const selectedVal = answers[currentQuestion.id];
      return (
        <Grid container spacing={3}>
          {options.map((opt) => (
            <Grid size={{ xs: 12, sm: 6 }} key={opt.id}>
              <SelectionCard
                title={opt.name}
                description={opt.description}
                iconName={opt.icon || null}
                selected={selectedVal === opt.id}
                onClick={() => handleSingleSelect(opt.id)}
              />
            </Grid>
          ))}
        </Grid>
      );
    }

    if (type === "multi-choice") {
      const selectedVals = answers[currentQuestion.id] || [];
      return (
        <Grid container spacing={3}>
          {options.map((opt) => (
            <Grid size={{ xs: 12, sm: 6 }} key={opt.id}>
              <SelectionCard
                title={opt.name}
                description={opt.description}
                selected={selectedVals.includes(opt.id)}
                onClick={() => handleMultiSelect(opt.id)}
              />
            </Grid>
          ))}
        </Grid>
      );
    }

    // New Selector: Dynamic Niche Business Questions
    if (type === "niche-questions") {
      const selectedIndustries = Array.isArray(answers.industry) 
        ? answers.industry 
        : [answers.industry].filter(Boolean);

      const nicheQs = [];
      selectedIndustries.forEach(ind => {
        if (nicheQuestionsMap[ind]) {
          nicheQs.push(...nicheQuestionsMap[ind]);
        }
      });

      const finalNicheQs = nicheQs.length > 0 ? nicheQs : nicheQuestionsMap.default;

      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {finalNicheQs.map((q) => {
            const selectedVal = answers.nicheQuestions?.[q.id] || "";
            return (
              <Box key={q.id}>
                <Typography 
                  variant="subtitle1" 
                  gutterBottom 
                  sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: "primary.light", mb: 1.5 }}
                >
                  {q.question}
                </Typography>
                <Grid container spacing={2}>
                  {q.options.map((opt) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={opt.id}>
                      <SelectionCard
                        title={opt.name}
                        description={opt.description}
                        selected={selectedVal === opt.id}
                        onClick={() => {
                          const currentNiche = { ...answers.nicheQuestions };
                          currentNiche[q.id] = opt.id;
                          setAnswer("nicheQuestions", currentNiche);
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            );
          })}
        </Box>
      );
    }

    // New Selector: Expected Traffic Usage & Operational Portals
    if (type === "operations-traffic") {
      const trafficOptions = [
        { id: "low", name: "Low Traffic", description: "Up to 1,000 requests/day. Suitable for simple websites and low resource tools." },
        { id: "medium", name: "Medium Traffic", description: "1,000 to 15,000 requests/day. Ideal for growing SaaS apps and e-commerce stores." },
        { id: "high", name: "High Traffic", description: "15,000 to 100,000 requests/day. Needs isolated environments and higher databases." },
        { id: "enterprise_load", name: "Enterprise Scale", description: "100,000+ requests/day. Requires high scalability, load-balancing and security." }
      ];

      const teamOptions = [
        { id: "no_team_auto", name: "Solo Operator / Fully Automated", description: "No administrative operations. Workflows proceed autonomously." },
        { id: "internal_team", name: "Internal Processing Team", description: "Staff process orders. Requires administrative panels and user role structures." },
        { id: "external_outsource", name: "Outsource & Partner Integration", description: "Requires vendor portals, customs broker tools, or shipping dispatch APIs." }
      ];

      const currentTraffic = answers.operationsTraffic?.trafficUsage || "low";
      const currentTeam = answers.operationsTraffic?.teamOperations || "no_team_auto";
      const currentCustomUsage = answers.customUsageCount || "";

      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Traffic scale selection */}
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: "primary.light", mb: 2 }}>
              Expected Daily / Monthly Request Volume
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {trafficOptions.map((opt) => (
                <Grid size={{ xs: 12, sm: 6 }} key={opt.id}>
                  <SelectionCard
                    title={opt.name}
                    description={opt.description}
                    selected={currentTraffic === opt.id}
                    onClick={() => {
                      setAnswer("operationsTraffic", {
                        ...answers.operationsTraffic,
                        trafficUsage: opt.id
                      });
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Custom Usage count input */}
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: "text.secondary" }}>
              Or write estimated daily usage count of clients / requests (optional):
            </Typography>
            <input
              type="text"
              placeholder="e.g. 5,000 requests/day"
              value={currentCustomUsage}
              onChange={(e) => setAnswer("customUsageCount", e.target.value)}
              style={{
                width: "100%",
                maxWidth: "400px",
                padding: "12px 16px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.12)")}
            />
          </Box>

          <Divider sx={{ borderStyle: "dashed" }} />

          {/* Operations user type selection */}
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: "secondary.light", mb: 2 }}>
              Operational Model & User Portals
            </Typography>
            <Grid container spacing={2}>
              {teamOptions.map((opt) => (
                <Grid size={{ xs: 12 }} key={opt.id}>
                  <SelectionCard
                    title={opt.name}
                    description={opt.description}
                    selected={currentTeam === opt.id}
                    onClick={() => {
                      setAnswer("operationsTraffic", {
                        ...answers.operationsTraffic,
                        teamOperations: opt.id
                      });
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      );
    }

    // Custom Module selection categorized by common and business specific
    if (type === "modules-select") {
      const selectedModules = answers.modules || [];
      return (
        <Box>
          {/* Common Modules */}
          <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: "primary.light", mb: 2 }}>
            Common Core Modules
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {commonModules.map((mod) => (
              <Grid size={{ xs: 12, sm: 6 }} key={mod.id}>
                <SelectionCard
                  title={mod.name}
                  description={mod.description}
                  selected={selectedModules.includes(mod.id)}
                  onClick={() => handleModuleToggle(mod.id)}
                />
              </Grid>
            ))}
          </Grid>

          {/* Business Specific Modules */}
          <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: "secondary.light", mb: 2 }}>
            Recommended Business-Specific Modules
          </Typography>
          <Grid container spacing={2}>
            {businessModules.map((mod) => (
              <Grid size={{ xs: 12, sm: 6 }} key={mod.id}>
                <SelectionCard
                  title={mod.name}
                  description={mod.description}
                  selected={selectedModules.includes(mod.id)}
                  onClick={() => handleModuleToggle(mod.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }

    // Custom Integrations select with category titles
    if (type === "integrations-select") {
      const selectedIntegrations = answers.integrations || [];
      return (
        <Box>
          {integrationCategories.map((category) => (
            <Box key={category.id} sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: "primary.light", mb: 2 }}>
                {category.name}
              </Typography>
              <Grid container spacing={2}>
                {category.items.map((item) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={item.id}>
                    <SelectionCard
                      title={item.name}
                      description={item.description}
                      selected={selectedIntegrations.includes(item.id)}
                      onClick={() => handleIntegrationToggle(item.id)}
                    />
                  </Grid>
                ))}
              </Grid>
              {category.id === "payment" && selectedIntegrations.includes("other_payment") && (
                <Box 
                  sx={{ 
                    mt: 3, 
                    p: 3, 
                    bgcolor: "rgba(255, 255, 255, 0.02)", 
                    borderRadius: "12px", 
                    border: "1px dashed rgba(255, 255, 255, 0.12)",
                    animation: "fadeIn 0.3s ease-in-out"
                  }}
                >
                  <Typography 
                    variant="subtitle2" 
                    gutterBottom 
                    sx={{ 
                      fontFamily: '"Outfit", sans-serif', 
                      fontWeight: 700, 
                      color: "primary.light",
                      mb: 1
                    }}
                  >
                    Specify Your Custom Payment Gateway
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Type the name of the custom payment gateway or split fee system you require (e.g. Adyen, Checkout.com, Payfort, etc.).
                  </Typography>
                  <input
                    type="text"
                    placeholder="Enter custom payment gateway name..."
                    value={answers.customPaymentGateway || ""}
                    onChange={(e) => setAnswer("customPaymentGateway", e.target.value)}
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "#FFFFFF",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition: "border-color 0.2s, box-shadow 0.2s"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#6366F1";
                      e.target.style.boxShadow = "0 0 8px rgba(99, 102, 241, 0.3)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.12)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </Box>
              )}
              {category.id === "government" && selectedIntegrations.includes("other_api") && (
                <Box 
                  sx={{ 
                    mt: 3, 
                    p: 3, 
                    bgcolor: "rgba(255, 255, 255, 0.02)", 
                    borderRadius: "12px", 
                    border: "1px dashed rgba(255, 255, 255, 0.12)",
                    animation: "fadeIn 0.3s ease-in-out"
                  }}
                >
                  <Typography 
                    variant="subtitle2" 
                    gutterBottom 
                    sx={{ 
                      fontFamily: '"Outfit", sans-serif', 
                      fontWeight: 700, 
                      color: "primary.light",
                      mb: 1
                    }}
                  >
                    Specify Your Custom API / Integration
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Type the name of the custom APIs or webhooks you require (e.g. Saudi Post SPL, Qiwa, Elm, custom CRM, SMS API, etc.).
                  </Typography>
                  <input
                    type="text"
                    placeholder="Enter custom API/integration names..."
                    value={answers.customApiName || ""}
                    onChange={(e) => setAnswer("customApiName", e.target.value)}
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "#FFFFFF",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition: "border-color 0.2s, box-shadow 0.2s"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#6366F1";
                      e.target.style.boxShadow = "0 0 8px rgba(99, 102, 241, 0.3)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.12)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </Box>
              )}
            </Box>
          ))}
        </Box>
      );
    }

    // Tech select categories
    if (type === "tech-select") {
      const selectedTech = answers.techPreferences || [];
      return (
        <Box>
          {technologies.map((cat) => (
            <Box key={cat.category} sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: "primary.light", mb: 2 }}>
                {cat.title}
              </Typography>
              <Grid container spacing={2}>
                {cat.items.map((item) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={item.id}>
                    <SelectionCard
                      title={item.name}
                      description={item.description}
                      selected={selectedTech.includes(item.id)}
                      onClick={() => handleTechToggle(item.id)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      );
    }

    // New Selector: Custom Servers & Control Panels (Advanced Users)
    if (type === "server-hosting") {
      const serverTypes = [
        { id: "shared", name: "Shared Hosting", description: "Cost-efficient environment where multiple websites share a single server's resources. Best for simple websites." },
        { id: "vps", name: "Virtual Private Server (VPS)", description: "Isolated virtual resources. Great balance between pricing, root access control, and scaling." },
        { id: "dedicated", name: "Dedicated Server", description: "An entire isolated bare-metal server dedicated solely to your business. Ideal for high security and disk load." },
        { id: "cloud", name: "Cloud Cluster / Serverless", description: "Enterprise infrastructure distributed across scalable cloud nodes (AWS/Azure/GCP). Maximum availability." }
      ];

      const panelTypes = [
        { id: "cpanel", name: "cPanel Console", description: "Industry-standard control panel, very popular for PHP/MySQL hosting and automated email setups." },
        { id: "plesk", name: "Plesk Control Panel", description: "Premium panel supporting both Windows & Linux, featuring easy Docker, Node, and security extensions." },
        { id: "none", name: "No Control Panel (Direct CLI)", description: "Raw OS console (Ubuntu/Debian) managed using SSH, Docker, and shell commands. Maximum speed and efficiency." }
      ];

      const currentServer = answers.serverHosting?.customServer || "vps";
      const currentPanel = answers.serverHosting?.controlPanel || "cpanel";

      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: "primary.light", mb: 2 }}>
              Select Server Infrastructure Type
            </Typography>
            <Grid container spacing={2}>
              {serverTypes.map((opt) => (
                <Grid size={{ xs: 12, sm: 6 }} key={opt.id}>
                  <SelectionCard
                    title={opt.name}
                    description={opt.description}
                    selected={currentServer === opt.id}
                    onClick={() => {
                      setAnswer("serverHosting", {
                        ...answers.serverHosting,
                        customServer: opt.id
                      });
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider sx={{ borderStyle: "dashed" }} />

          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: "secondary.light", mb: 2 }}>
              Select Server Control Panel Preference
            </Typography>
            <Grid container spacing={2}>
              {panelTypes.map((opt) => (
                <Grid size={{ xs: 12, sm: 4 }} key={opt.id}>
                  <SelectionCard
                    title={opt.name}
                    description={opt.description}
                    selected={currentPanel === opt.id}
                    onClick={() => {
                      setAnswer("serverHosting", {
                        ...answers.serverHosting,
                        controlPanel: opt.id
                      });
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      );
    }

    // Team staffing select
    if (type === "team-select") {
      const selectedStaff = answers.teamAugmentation || [];
      return (
        <Grid container spacing={3}>
          {options.map((opt) => (
            <Grid size={{ xs: 12, sm: 6 }} key={opt.id}>
              <SelectionCard
                title={opt.name}
                description={opt.description}
                selected={selectedStaff.includes(opt.id)}
                onClick={() => {
                  const list = answers.teamAugmentation || [];
                  if (list.includes(opt.id)) {
                    setAnswer("teamAugmentation", list.filter(t => t !== opt.id));
                  } else {
                    setAnswer("teamAugmentation", [...list, opt.id]);
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>
      );
    }

    return null;
  };

  return (
    <Box sx={{ py: 6, flexGrow: 1 }}>
      <Container maxWidth="lg">
        {/* Progress Bar */}
        <WizardProgress 
          currentStep={currentStep} 
          stepLabels={activeQuestions.map(q => q.title)} 
          onStepClick={(step) => setCurrentStep(step)} 
        />

        {/* Advanced Mode Toggle Banner */}
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            flexWrap: "wrap",
            gap: 2,
            mb: 4,
            bgcolor: "rgba(255, 255, 255, 0.02)",
            p: 1.5,
            px: 3,
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.06)"
          }}
          className="no-print"
        >
          <Button
            variant="text"
            color="primary"
            startIcon={<FolderSpecialIcon />}
            onClick={() => setDrawerOpen(true)}
            sx={{
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 700,
              letterSpacing: "0.5px",
              color: "primary.light",
              "& .MuiButton-startIcon": {
                marginRight: "6px"
              },
              "&:hover": {
                background: "rgba(99, 102, 241, 0.05)"
              }
            }}
          >
            Manage Saved Configurations
          </Button>

          <FormControlLabel
            control={
              <Switch 
                checked={isAdvancedMode} 
                onChange={(e) => setIsAdvancedMode(e.target.checked)} 
                color="secondary"
              />
            }
            label={
              <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: '"Outfit", sans-serif', letterSpacing: "0.5px" }}>
                ADVANCED CONFIGURATION MODE (Developers / PMs)
              </Typography>
            }
          />
        </Box>

        {/* Wizard Panel */}
        <Grid container spacing={4} sx={{ mt: 1 }}>
          {/* Main Question Body */}
          <Grid size={{ xs: 12, md: 8 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="page-transition-wrapper"
              >
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h4" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800 }}>
                    {currentQuestion?.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <HelpIcon color="primary" fontSize="small" /> {currentQuestion?.description}
                  </Typography>
                </Box>

                <Box sx={{ minHeight: "350px", mb: 5 }}>
                  {renderSelector()}
                </Box>

                {/* Footer Controls */}
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    sx={{ px: 3, py: 1.2 }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color={currentStep === totalSteps ? "secondary" : "primary"}
                    endIcon={currentStep === totalSteps ? null : <ArrowForwardIcon />}
                    onClick={handleNext}
                    disabled={currentQuestion?.type === "single-choice" && !answers[currentQuestion.id]}
                    className={currentStep === totalSteps ? "glow-btn" : ""}
                    sx={{ px: 4, py: 1.2 }}
                  >
                    {currentStep === totalSteps ? "Generate Recommendations" : "Next Step"}
                  </Button>
                </Box>
              </motion.div>
            </AnimatePresence>
          </Grid>

          {/* Right Live Preview Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <LivePreview />
          </Grid>
        </Grid>
      </Container>
      <ConfigDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </Box>
  );
}
