import { motion } from "framer-motion";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
import RocketLaunch from "@mui/icons-material/RocketLaunch";
import Storefront from "@mui/icons-material/Storefront";
import Apartment from "@mui/icons-material/Apartment";
import CorporateFare from "@mui/icons-material/CorporateFare";
import Favorite from "@mui/icons-material/Favorite";
import Language from "@mui/icons-material/Language";
import Web from "@mui/icons-material/Web";
import MenuBook from "@mui/icons-material/MenuBook";
import PhotoLibrary from "@mui/icons-material/PhotoLibrary";
import Cloud from "@mui/icons-material/Cloud";
import Dns from "@mui/icons-material/Dns";
import Article from "@mui/icons-material/Article";
import PhoneIphone from "@mui/icons-material/PhoneIphone";
import Group from "@mui/icons-material/Group";
import Settings from "@mui/icons-material/Settings";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Inventory from "@mui/icons-material/Inventory";
import Badge from "@mui/icons-material/Badge";
import AccountBalanceWallet from "@mui/icons-material/AccountBalanceWallet";
import Code from "@mui/icons-material/Code";
import Api from "@mui/icons-material/Api";
import SettingsSuggest from "@mui/icons-material/SettingsSuggest";
import Android from "@mui/icons-material/Android";
import Apple from "@mui/icons-material/Apple";
import Laptop from "@mui/icons-material/Laptop";
import PhoneAndroid from "@mui/icons-material/PhoneAndroid";

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
  Devices,
  RocketLaunch,
  Storefront,
  Apartment,
  CorporateFare,
  Favorite,
  Language,
  Web,
  MenuBook,
  PhotoLibrary,
  Cloud,
  Dns,
  Article,
  PhoneIphone,
  Group,
  Settings,
  CalendarMonth,
  Inventory,
  Badge,
  AccountBalanceWallet,
  Code,
  Api,
  SettingsSuggest,
  Android,
  Apple,
  Laptop,
  PhoneAndroid
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
          {(IconComponent || selected) ? (
            <Box sx={{ display: "flex", justifyContent: IconComponent ? "space-between" : "flex-end", alignItems: "center", mb: 2 }}>
              {IconComponent && (
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
          ) : null}

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
