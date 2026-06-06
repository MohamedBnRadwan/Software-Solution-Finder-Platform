import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";

export default function WizardProgress({ currentStep, totalSteps = 9, onStepClick }) {
  const theme = useTheme();
  const percentage = Math.round((currentStep / totalSteps) * 100);

  const stepLabels = [
    "Business Type",
    "Industry",
    "Solution",
    "Platforms",
    "Modules",
    "Integrations",
    "Analytics",
    "Tech Preferences",
    "Staffing"
  ];

  return (
    <Box sx={{ width: "100%", mb: 5 }} className="no-print">
      {/* Step Header info */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontFamily: '"Outfit", sans-serif', 
            fontWeight: 700,
            letterSpacing: ".2px"
          }}
        >
          Step {currentStep} of {totalSteps}: <span style={{ color: theme.palette.primary.light }}>{stepLabels[currentStep - 1]}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
          {percentage}% Complete
        </Typography>
      </Box>

      {/* Progress Bar */}
      <LinearProgress 
        variant="determinate" 
        value={percentage} 
        sx={{
          height: 6,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          "& .MuiLinearProgress-bar": {
            borderRadius: 3,
            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
          }
        }}
      />

      {/* Step Bubbles Grid */}
      <Box 
        sx={{ 
          display: { xs: "none", md: "flex" }, 
          justifyContent: "space-between", 
          alignItems: "center", 
          mt: 3,
          position: "relative"
        }}
      >
        {/* Connecting line */}
        <Box 
          sx={{ 
            position: "absolute", 
            left: "5%", 
            right: "5%", 
            height: "1px", 
            backgroundColor: "rgba(255, 255, 255, 0.08)", 
            zIndex: 1 
          }} 
        />

        {stepLabels.map((label, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <Box 
              key={label} 
              onClick={() => onStepClick && onStepClick(stepNum)}
              sx={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                cursor: isCompleted || isActive ? "pointer" : "default",
                zIndex: 2,
                position: "relative",
                width: "9%"
              }}
            >
              {/* Bubble */}
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  transition: "all 0.3s ease",
                  backgroundColor: isCompleted 
                    ? "secondary.main" 
                    : isActive 
                    ? "primary.main" 
                    : "rgba(17, 24, 39, 0.8)",
                  border: `1px solid ${
                    isCompleted 
                      ? "secondary.main" 
                      : isActive 
                      ? "primary.light" 
                      : "rgba(255, 255, 255, 0.15)"
                  }`,
                  color: isCompleted ? "black" : "white",
                  boxShadow: isActive ? "0 0 10px rgba(99, 102, 241, 0.4)" : "none",
                  "&:hover": (isCompleted || isActive) ? {
                    transform: "scale(1.1)",
                    borderColor: "primary.light"
                  } : {}
                }}
              >
                {isCompleted ? <Check sx={{ fontSize: 16 }} /> : stepNum}
              </Box>

              {/* Label */}
              <Typography
                variant="caption"
                align="center"
                sx={{
                  mt: 1,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "primary.light" : isCompleted ? "text.primary" : "text.secondary",
                  fontSize: "0.7rem",
                  maxWidth: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}
              >
                {label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
