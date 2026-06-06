import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import PrintIcon from "@mui/icons-material/Print";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import HubIcon from "@mui/icons-material/Hub";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useWizard } from "../../context/WizardContext";

// Data files to map IDs to friendly display names
import { solutions, platforms } from "../../data/projectTypes";
import { commonModules, businessModules } from "../../data/modules";
import { integrationCategories } from "../../data/integrations";

export default function RfpDocument({ leadInfo, onRestart }) {
  const { answers, recommendations } = useWizard();
  const documentId = leadInfo?.documentId || "100000";

  // Helper mapping functions
  const getSolutionName = (id) => solutions.find(s => s.id === id)?.name || id;
  const getPlatformNames = (ids) => ids.map(id => platforms.find(p => p.id === id)?.name || id).join(", ");
  
  const getModuleNames = (ids) => {
    const all = [...commonModules, ...businessModules];
    return ids.map(id => all.find(m => m.id === id)?.name || id).join(", ");
  };

  const getIntegrationNames = (ids) => {
    const all = integrationCategories.flatMap(cat => cat.items);
    return ids.map(id => all.find(item => item.id === id)?.name || id).join(", ");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "900px", mx: "auto" }}>
      {/* Actions header (hidden on print) */}
      <Box 
        className="no-print" 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          mb: 3, 
          gap: 2 
        }}
      >
        <Typography variant="body1" color="text.secondary">
          Review your custom system specifications below.
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button 
            variant="outlined" 
            color="inherit" 
            startIcon={<RestartAltIcon />} 
            onClick={onRestart}
          >
            Configure New
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            startIcon={<PrintIcon />} 
            onClick={handlePrint}
            className="glow-btn"
          >
            Print / Save PDF
          </Button>
        </Box>
      </Box>

      {/* Main RFP Printable Area */}
      <Paper 
        className="glass-card" 
        sx={{ 
          p: { xs: 3, sm: 6 }, 
          borderWidth: "1px",
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
        }}
      >
        {/* Document Header */}
        <Grid container spacing={3} sx={{ mb: 4, alignItems: "center" }}>
          <Grid item xs={12} sm={8}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <HubIcon color="primary" sx={{ fontSize: 32 }} />
              <Typography variant="h5" sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800 }}>
                Solution<span style={{ color: "#6366F1" }}>Finder</span> Spec Sheet
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" display="block">
              DOCUMENT ID: RFP-{documentId}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              GENERATED ON: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ textAlign: { sm: "right" } }}>
            <Chip 
              label="Ready for Proposals" 
              color="success" 
              variant="outlined" 
              sx={{ fontWeight: 700, borderRadius: "6px" }} 
            />
          </Grid>
        </Grid>

        <Divider sx={{ mb: 4 }} />

        {/* Lead/Client Information */}
        <Typography variant="h6" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: "primary.light" }}>
          1. Client & Contact Information
        </Typography>
        <TableContainer sx={{ mb: 4, border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "8px" }}>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, width: "30%", color: "text.secondary" }}>Client Name</TableCell>
                <TableCell>{leadInfo?.name || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Company Name</TableCell>
                <TableCell>{leadInfo?.company || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Email Address</TableCell>
                <TableCell>{leadInfo?.email || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Phone Number</TableCell>
                <TableCell>{leadInfo?.phone || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Country</TableCell>
                <TableCell>{leadInfo?.country || "N/A"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Project Overview & Timeline */}
        <Typography variant="h6" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: "primary.light" }}>
          2. Executive Project Estimates
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "8px", textAlign: "center" }}>
              <Typography variant="caption" color="text.secondary" display="block">Solution Profile</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "secondary.light" }}>
                {getSolutionName(answers.solution)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "8px", textAlign: "center" }}>
              <Typography variant="caption" color="text.secondary" display="block">Architecture Complexity</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "primary.light" }}>
                {recommendations.complexity} Class
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "8px", textAlign: "center" }}>
              <Typography variant="caption" color="text.secondary" display="block">Estimated Timeline</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "secondary.light" }}>
                {recommendations.timeline}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* User Story Description */}
        {leadInfo?.description && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 700 }}>
              Project Context & Goals:
            </Typography>
            <Paper sx={{ p: 2.5, bgcolor: "rgba(255, 255, 255, 0.02)", border: "1px dashed rgba(255,255,255,0.08)" }}>
              <Typography variant="body2" sx={{ fontStyle: "italic", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                "{leadInfo.description}"
              </Typography>
            </Paper>
          </Box>
        )}

        {/* Detailed Scope of Features */}
        <Typography variant="h6" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: "primary.light" }}>
          3. Detailed Functional Scope
        </Typography>
        <TableContainer sx={{ mb: 4, border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "8px" }}>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, width: "30%", color: "text.secondary" }}>Business Segment</TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>{answers.businessType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Target Platforms</TableCell>
                <TableCell>{getPlatformNames(answers.platforms)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Selected Modules</TableCell>
                <TableCell>{getModuleNames(answers.modules) || "No custom modules selected"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Third-Party Integrations</TableCell>
                <TableCell>{getIntegrationNames(answers.integrations) || "None requested"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Reporting & Analytics</TableCell>
                <TableCell>
                  {answers.analytics.map(a => a.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")).join(", ") || "None"}
                </TableCell>
              </TableRow>
              {answers.teamAugmentation.length > 0 && (
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Dedicated Staffing</TableCell>
                  <TableCell>
                    {answers.teamAugmentation.map(t => t.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")).join(", ")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Recommended Technology Stack */}
        <Typography variant="h6" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: "primary.light" }}>
          4. Recommended System Architecture
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {Object.entries(recommendations.recommendedTech).map(([layer, items]) => {
            if (items.length === 0) return null;
            return (
              <Grid item xs={12} sm={6} key={layer}>
                <Box 
                  sx={{ 
                    p: 2, 
                    border: "1px solid rgba(255, 255, 255, 0.05)", 
                    borderRadius: "8px", 
                    height: "100%",
                    bgcolor: "rgba(255,255,255,0.01)" 
                  }}
                >
                  <Typography 
                    variant="caption" 
                    color="primary.light" 
                    sx={{ textTransform: "uppercase", fontWeight: 700, letterSpacing: ".5px" }}
                  >
                    {layer} Layer
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {items.map(item => (
                      <Box key={item} sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 0.5 }}>
                        <CheckCircleIcon sx={{ fontSize: 14, color: "secondary.main", mt: 0.4 }} />
                        <Typography variant="body2">{item}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        <Divider sx={{ mb: 4 }} />

        {/* Footer legalities */}
        <Box sx={{ textAlign: "center", color: "text.secondary" }}>
          <Typography variant="caption" display="block" sx={{ fontStyle: "italic" }}>
            Disclaimer: This specification sheets is auto-generated by the SolutionFinder Configuration Engine.
          </Typography>
          <Typography variant="caption">
            Actual developer rates, milestones, and deployment specifications are finalized in subsequent software development agreements.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
