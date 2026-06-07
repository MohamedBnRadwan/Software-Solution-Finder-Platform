import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import HubIcon from "@mui/icons-material/Hub";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import ConfigDrawer from "../Wizard/ConfigDrawer";

export default function Navbar() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Configurator", path: "/wizard" },
    { name: "Contact Support", path: "/contact" }
  ];

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      className="no-print"
      sx={{ 
        background: "rgba(11, 15, 25, 0.75)", 
        backdropFilter: "blur(12px)", 
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 70 }}>
          {/* Logo */}
          <HubIcon sx={{ display: "flex", mr: 1, color: "primary.main", fontSize: 28 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 800,
              letterSpacing: ".5px",
              color: "inherit",
              textDecoration: "none",
              alignItems: "center"
            }}
          >
            Solution<span style={{ color: "#6366F1" }}>Finder</span>
          </Typography>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Links */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.name}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    color: isActive ? "primary.main" : "text.secondary",
                    fontSize: "0.9rem",
                    px: 2,
                    py: 1,
                    position: "relative",
                    "&:hover": {
                      color: "primary.light",
                      background: "rgba(99, 102, 241, 0.05)"
                    },
                    "&::after": isActive ? {
                      content: '""',
                      position: "absolute",
                      bottom: 4,
                      left: "15%",
                      width: "70%",
                      height: "2px",
                      background: "#6366F1",
                      borderRadius: "2px",
                      boxShadow: "0 0 8px #6366F1"
                    } : {}
                  }}
                >
                  {item.name}
                </Button>
              );
            })}
            
            <Button
              variant="outlined"
              color="primary"
              startIcon={<FolderSpecialIcon />}
              onClick={() => setDrawerOpen(true)}
              sx={{
                borderColor: "rgba(255,255,255,0.08)",
                color: "text.secondary",
                fontSize: "0.9rem",
                px: 2,
                py: 1,
                "&:hover": {
                  borderColor: "primary.main",
                  color: "primary.light",
                  background: "rgba(99, 102, 241, 0.05)"
                }
              }}
            >
              Saved Configs
            </Button>

            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/wizard"
              className="glow-btn"
              sx={{ ml: 1, display: { xs: "none", sm: "inline-flex" } }}
            >
              Start Configurator
            </Button>
          </Box>
        </Toolbar>
      </Container>
      <ConfigDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </AppBar>
  );
}
