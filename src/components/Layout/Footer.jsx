import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import HubIcon from "@mui/icons-material/Hub";

export default function Footer() {
  return (
    <Box
      component="footer"
      className="no-print"
      sx={{
        py: 6,
        px: 2,
        mt: "auto",
        backgroundColor: "rgba(11, 15, 25, 0.9)",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <HubIcon sx={{ color: "primary.main", mr: 1 }} />
              <Typography variant="h6" sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700 }}>
                Solution<span style={{ color: "#6366F1" }}>Finder</span>
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, mb: 2 }}>
              A dynamic, data-driven software solution configurator helping business leaders and developers define project specs and estimate costs.
            </Typography>
          </Grid>
          
          <Grid item xs={6} md={4}>
            <Typography variant="subtitle2" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>
              Platform
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link component={RouterLink} to="/" color="text.secondary" variant="body2" underline="hover">
                Home Page
              </Link>
              <Link component={RouterLink} to="/wizard" color="text.secondary" variant="body2" underline="hover">
                Launch Configurator
              </Link>
              <Link component={RouterLink} to="/contact" color="text.secondary" variant="body2" underline="hover">
                Contact Support
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={4}>
            <Typography variant="subtitle2" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>
              Technical Specifications
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fully modular architecture powered by React, Material UI, Framer Motion, and a customizable dynamic rules engine.
            </Typography>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 5, pt: 3, borderTop: "1px solid rgba(255, 255, 255, 0.05)", textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            {"Copyright © "}
            <Link color="inherit" component={RouterLink} to="/">
              SolutionFinder Platform
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
