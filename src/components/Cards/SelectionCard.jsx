import { motion } from "framer-motion";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Icons imports
import School from "@mui/icons-material/School";
import LocalHospital from "@mui/icons-material/LocalHospital";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import LocalShipping from "@mui/icons-material/LocalShipping";
import HomeWork from "@mui/icons-material/HomeWork";
import Engineering from "@mui/icons-material/Engineering";
import Factory from "@mui/icons-material/Factory";
import AccountBalance from "@mui/icons-material/AccountBalance";
import Gavel from "@mui/icons-material/Gavel";
import Devices from "@mui/icons-material/Devices";

// Map string icon names to Material UI Icons
const iconMap = {
  School,
  LocalHospital,
  ShoppingBag,
  LocalShipping,
  HomeWork,
  Engineering,
  Factory,
  AccountBalance,
  Gavel,
  Devices
};

export default function SelectionCard({ title, description, iconName, selected, onClick }) {
  const IconComponent = iconName ? iconMap[iconName] : null;

  return (
    <Box 
      component={motion.div} 
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      sx={{ height: "100%", cursor: "pointer" }}
      onClick={onClick}
    >
      <Card
        className={`glass-card ${selected ? "selected-card" : "glass-card-hover"}`}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          borderColor: selected ? "primary.main" : "rgba(255, 255, 255, 0.08)",
          boxShadow: selected ? "0 0 20px rgba(99, 102, 241, 0.25)" : "none",
          backgroundColor: selected ? "rgba(99, 102, 241, 0.06) !important" : "rgba(17, 24, 39, 0.7) !important"
        }}
      >
        <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {/* Header row with Icon and Checkmark */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
            {IconComponent ? (
              <Box 
                sx={{ 
                  p: 1.5, 
                  borderRadius: "10px", 
                  backgroundColor: selected ? "primary.main" : "rgba(255, 255, 255, 0.05)",
                  color: selected ? "white" : "text.secondary",
                  display: "inline-flex",
                  transition: "all 0.3s ease"
                }}
              >
                <IconComponent sx={{ fontSize: 24 }} />
              </Box>
            ) : (
              <Box sx={{ minHeight: 48 }} /> // spacer
            )}
            
            {selected && (
              <CheckCircleIcon 
                color="primary" 
                sx={{ 
                  fontSize: 24, 
                  filter: "drop-shadow(0 0 5px rgba(99, 102, 241, 0.5))" 
                }} 
              />
            )}
          </Box>

          {/* Text Content */}
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              fontWeight: 700, 
              fontFamily: '"Outfit", sans-serif',
              color: selected ? "primary.light" : "text.primary",
              transition: "color 0.3s ease"
            }}
          >
            {title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, lineHeight: 1.6 }}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
