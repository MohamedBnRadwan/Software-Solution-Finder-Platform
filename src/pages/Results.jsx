import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import WarningIcon from "@mui/icons-material/Warning";
import SpeedIcon from "@mui/icons-material/Speed";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BuildIcon from "@mui/icons-material/Build";
import HubIcon from "@mui/icons-material/Hub";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useWizard } from "../context/WizardContext";
import RfpDocument from "../components/Summary/RfpDocument";
import { solutions } from "../data/projectTypes";

export default function Results() {
  const navigate = useNavigate();
  const { answers, recommendations, leadDetails, submitLead, resetWizard } = useWizard();
  const [submitting, setSubmitting] = useState(false);

  // Set up react-hook-form
  const defaultDesc = answers.solution 
    ? `Looking to build a ${solutions.find(s => s.id === answers.solution)?.name} solution for our ${answers.industry} operations. Target platforms include: ${answers.platforms.join(", ")}.`
    : "";

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      company: "",
      country: "",
      email: "",
      phone: "",
      description: defaultDesc
    }
  });

  // If wizard is empty, redirect back
  if (!answers.businessType || !answers.solution) {
    return (
      <Container maxWidth="sm" sx={{ py: 12, textAlign: "center" }}>
        <WarningIcon sx={{ fontSize: 60, color: "warning.main", mb: 2 }} />
        <Typography variant="h4" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800 }}>
          No Configuration Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Please complete the step-by-step configurator wizard to generate custom recommendations.
        </Typography>
        <Button variant="contained" component={RouterLink} to="/wizard">
          Launch Configurator
        </Button>
      </Container>
    );
  }

  const onSubmit = (data) => {
    setSubmitting(true);
    // Simulate API request delay
    setTimeout(() => {
      const docId = Math.floor(100000 + Math.random() * 900000);
      submitLead({ ...data, documentId: docId });
      setSubmitting(false);
    }, 1200);
  };

  const handleRestart = () => {
    resetWizard();
    navigate("/wizard");
  };

  // If lead is already submitted, render the printable RFP Document
  if (leadDetails) {
    return (
      <Box sx={{ py: 6, bgcolor: "#0A0E1A" }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800 }}>
            Your RFP <span className="gradient-accent-text">Proposal Sheet</span>
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }} className="no-print">
            Congratulations! Your specifications sheet has been computed successfully.
          </Typography>
          
          <RfpDocument leadInfo={leadDetails} onRestart={handleRestart} />
        </Container>
      </Box>
    );
  }

  const complexityColors = {
    Small: "success",
    Medium: "info",
    Large: "warning",
    Enterprise: "error"
  };
  const currentComplexityColor = complexityColors[recommendations.complexity] || "info";

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        {/* Recommendation Header Summary */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography variant="h3" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800 }}>
            Configuration <span className="gradient-text">Complete</span>
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Below is the analysis of your custom project architecture. Fill out the lead form to unlock the printable proposal document.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Left Side: Summary of recommendations */}
          <Grid item xs={12} md={7}>
            {/* Architecture Overview Card */}
            <Card className="glass-card" sx={{ mb: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: "primary.light" }}>
                  Recommended Architecture
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: '"Outfit", sans-serif', mt: 2, mb: 3 }}>
                  {recommendations.solutionTitle}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={3}>
                  <Grid item xs={6} sm={4}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <SpeedIcon color={currentComplexityColor} sx={{ fontSize: 28 }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">Complexity</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{recommendations.complexity}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <CalendarMonthIcon color="secondary" sx={{ fontSize: 28 }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">Timeline Est.</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{recommendations.timeline}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <ListAltIcon color="primary" sx={{ fontSize: 28 }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">Specs Configured</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {answers.modules.length} modules, {answers.integrations.length} integrations
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Recommended Tech Stack Card */}
            <Card className="glass-card" sx={{ mb: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
                  <BuildIcon color="secondary" /> Dynamic Tech Stack Recommendations
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Our algorithms suggest these modern platforms and languages to ensure reliability and performance.
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 3 }}>
                  {Object.entries(recommendations.recommendedTech).map(([layer, items]) => {
                    if (items.length === 0) return null;
                    return (
                      <Box key={layer}>
                        <Typography 
                          variant="caption" 
                          color="primary.light" 
                          sx={{ textTransform: "uppercase", fontWeight: 700, letterSpacing: ".5px", display: "block", mb: 0.5 }}
                        >
                          {layer} layer
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {items.map(item => (
                            <Chip 
                              key={item} 
                              label={item} 
                              variant="outlined" 
                              sx={{ 
                                bgcolor: "rgba(255,255,255,0.02)", 
                                borderColor: "rgba(255,255,255,0.08)",
                                color: "text.primary",
                                fontWeight: 500
                              }} 
                            />
                          ))}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Side: Lead submission form */}
          <Grid item xs={12} md={5}>
            <Card className="glass-card" sx={{ position: "sticky", top: 90 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
                  <HubIcon color="primary" /> Unlock Complete RFP Document
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Enter your contact details below to finalize configurations and export a styled proposal summary sheet.
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="Your Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    {...register("name", { required: "Name is required" })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />

                  <TextField
                    label="Company Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    {...register("company", { required: "Company is required" })}
                    error={!!errors.company}
                    helperText={errors.company?.message}
                  />

                  <TextField
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    size="small"
                    type="email"
                    {...register("email", { 
                      required: "Email is required", 
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } 
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />

                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    size="small"
                    {...register("phone", { required: "Phone number is required" })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />

                  <TextField
                    label="Country"
                    variant="outlined"
                    fullWidth
                    size="small"
                    {...register("country", { required: "Country is required" })}
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  />

                  <TextField
                    label="Brief Project Scope"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                    {...register("description")}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                    disabled={submitting}
                    className="glow-btn"
                    sx={{ mt: 1, py: 1.5 }}
                  >
                    {submitting ? "Generating Document..." : "Generate Proposal Document"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
