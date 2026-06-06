import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import SpeedIcon from "@mui/icons-material/Speed";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BuildIcon from "@mui/icons-material/Build";
import LayersIcon from "@mui/icons-material/Layers";
import { useWizard } from "../../context/WizardContext";

export default function LivePreview() {
  const { answers, recommendations } = useWizard();

  // If no basic business type is selected, show an empty state.
  if (!answers.businessType) {
    return (
      <Card className="glass-card" sx={{ height: "100%", position: "sticky", top: 90 }}>
        <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", minHeight: 300 }}>
          <LayersIcon sx={{ fontSize: 48, color: "rgba(255,255,255,0.1)", mb: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 600 }}>
            Live Configuration
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Select a Business Type to initialize the live architecture estimator.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // Map complexity to color
  const complexityColors = {
    Small: "success",
    Medium: "info",
    Large: "warning",
    Enterprise: "error"
  };

  const currentComplexityColor = complexityColors[recommendations.complexity] || "info";

  return (
    <Card className="glass-card" sx={{ position: "sticky", top: 90, maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}>
      <CardContent sx={{ p: 3 }}>
        {/* Title */}
        <Typography variant="h6" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
          <LayersIcon color="primary" /> Live Architecture
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Real-time technical scope analysis.
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Real-time stats */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1, minWidth: "120px" }}>
            <SpeedIcon color={currentComplexityColor} />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Complexity</Typography>
              <Chip label={recommendations.complexity} color={currentComplexityColor} size="small" sx={{ fontWeight: 700 }} />
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1, minWidth: "120px" }}>
            <CalendarMonthIcon color="secondary" />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Timeline</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>{recommendations.timeline}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Active Selections Summary */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">Configuration Target</Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "primary.light" }}>
              {recommendations.solutionTitle}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Platforms</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {answers.platforms.length || "None"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Modules</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {answers.modules.length || "None"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Integrations</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {answers.integrations.length || "None"}
              </Typography>
            </Box>
          </Box>

          {answers.operationsTraffic && (
            <Box sx={{ display: "flex", gap: 3 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">Traffic Tier</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, textTransform: "capitalize" }}>
                  {answers.operationsTraffic.trafficUsage === "enterprise_load" ? "Enterprise" : answers.operationsTraffic.trafficUsage}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">Operations</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {answers.operationsTraffic.teamOperations === "no_team_auto" ? "Automated" : 
                   answers.operationsTraffic.teamOperations === "internal_team" ? "Team Portal" : "Outsource Portal"}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Live Tech Stack Recommendation Preview */}
        <Typography variant="subtitle2" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 600, display: "flex", alignItems: "center", gap: 1 }}>
          <BuildIcon sx={{ fontSize: 18 }} color="secondary" /> Suggested Tech Stack
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 1.5 }}>
          {recommendations.recommendedTech.frontend.length > 0 && (
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Frontend</Typography>
              <Typography variant="body2" sx={{ fontSize: "0.85rem", fontWeight: 500 }}>
                {recommendations.recommendedTech.frontend[0]}
              </Typography>
            </Box>
          )}

          {recommendations.recommendedTech.backend.length > 0 && (
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Backend Server</Typography>
              <Typography variant="body2" sx={{ fontSize: "0.85rem", fontWeight: 500 }}>
                {recommendations.recommendedTech.backend[0]}
              </Typography>
            </Box>
          )}

          {recommendations.recommendedTech.database.length > 0 && (
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Database Layer</Typography>
              <Typography variant="body2" sx={{ fontSize: "0.85rem", fontWeight: 500 }}>
                {recommendations.recommendedTech.database.join(" & ")}
              </Typography>
            </Box>
          )}

          {recommendations.recommendedTech.mobile.length > 0 && (
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Mobile & Desktop</Typography>
              <Typography variant="body2" sx={{ fontSize: "0.85rem", fontWeight: 500 }}>
                {recommendations.recommendedTech.mobile[0]}
              </Typography>
            </Box>
          )}

          {recommendations.recommendedTech.devops.length > 0 && (
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Cloud Host & CI/CD</Typography>
              <Typography variant="body2" sx={{ fontSize: "0.85rem", fontWeight: 500 }}>
                {recommendations.recommendedTech.devops[0]}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
