import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HelpIcon from "@mui/icons-material/Help";
import { useWizard } from "../context/WizardContext";

// Config & components
import { questions } from "../data/questions";
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
  const {
    answers,
    currentStep,
    setCurrentStep,
    setAnswer,
    goToNextStep,
    goToPrevStep
  } = useWizard();

  const totalSteps = questions.length;
  const currentQuestion = questions[currentStep - 1];

  // Resolve dynamic options based on references in questions.js
  const getOptions = () => {
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
      goToNextStep();
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
        goToNextStep();
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

  // Render option selections based on type
  const renderSelector = () => {
    const type = currentQuestion.type;

    if (type === "single-choice") {
      const selectedVal = answers[currentQuestion.id];
      return (
        <Grid container spacing={3}>
          {options.map((opt) => (
            <Grid item xs={12} sm={6} key={opt.id}>
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
            <Grid item xs={12} sm={6} key={opt.id}>
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
              <Grid item xs={12} sm={6} key={mod.id}>
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
              <Grid item xs={12} sm={6} key={mod.id}>
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
                  <Grid item xs={12} sm={6} key={item.id}>
                    <SelectionCard
                      title={item.name}
                      description={item.description}
                      selected={selectedIntegrations.includes(item.id)}
                      onClick={() => handleIntegrationToggle(item.id)}
                    />
                  </Grid>
                ))}
              </Grid>
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
                  <Grid item xs={12} sm={6} key={item.id}>
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

    // Team staffing select
    if (type === "team-select") {
      const selectedStaff = answers.teamAugmentation || [];
      return (
        <Grid container spacing={3}>
          {options.map((opt) => (
            <Grid item xs={12} sm={6} key={opt.id}>
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
          totalSteps={totalSteps} 
          onStepClick={(step) => setCurrentStep(step)} 
        />

        {/* Wizard Panel */}
        <Grid container spacing={4} sx={{ mt: 1 }}>
          {/* Main Question Body */}
          <Grid item xs={12} md={8}>
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
                    {currentQuestion.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <HelpIcon color="primary" fontSize="small" /> {currentQuestion.description}
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
                    disabled={currentQuestion.type === "single-choice" && !answers[currentQuestion.id]}
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
          <Grid item xs={12} md={4}>
            <LivePreview />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
