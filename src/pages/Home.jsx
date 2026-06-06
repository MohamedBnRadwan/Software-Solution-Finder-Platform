import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LayersIcon from "@mui/icons-material/Layers";
import SpeedIcon from "@mui/icons-material/Speed";
import HubIcon from "@mui/icons-material/Hub";
import PrintIcon from "@mui/icons-material/Print";

export default function Home() {
  const features = [
    {
      title: "Interactive Wizard",
      desc: "Specify your business scope, platforms, and integrations in an easy-to-use configurator wizard.",
      icon: <LayersIcon fontSize="large" color="primary" />
    },
    {
      title: "Real-time Estimations",
      desc: "Get instant feedback on architecture complexity, estimated project duration, and tech selections.",
      icon: <SpeedIcon fontSize="large" color="secondary" />
    },
    {
      title: "Tech Stack Proposals",
      desc: "Receive customized suggestions for backend servers, frontend libraries, databases, and DevOps configurations.",
      icon: <HubIcon fontSize="large" color="primary" />
    },
    {
      title: "Printable RFP Sheets",
      desc: "Instantly draft a structured PDF proposal document to align teams or share with development agencies.",
      icon: <PrintIcon fontSize="large" color="secondary" />
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, py: { xs: 8, md: 12 }, display: "flex", alignItems: "center" }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Grid container spacing={5} sx={{ alignItems: "center", mb: 8 }}>
          <Grid item xs={12} md={7}>
            <Box 
              component={motion.div}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography 
                variant="h2" 
                gutterBottom 
                sx={{ 
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                  lineHeight: 1.15,
                  mb: 3
                }}
              >
                Find the Perfect <span className="gradient-text">Software Solution</span> for Your Business.
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ 
                  fontWeight: 500, 
                  lineHeight: 1.6, 
                  mb: 4,
                  maxWidth: "540px"
                }}
              >
                A guided solution configurator similar to a car configurator. Define requirements, choose integrations, and generate a printable RFP sheet with real-time estimates.
              </Typography>
              
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Button
                  component={RouterLink}
                  to="/wizard"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  className="glow-btn"
                  sx={{ px: 4, py: 1.8, fontSize: "1rem" }}
                >
                  Configure My Solution
                </Button>
                <Button
                  component={RouterLink}
                  to="/contact"
                  variant="outlined"
                  size="large"
                  sx={{ px: 4, py: 1.8, fontSize: "1rem" }}
                >
                  Talk to a consultant
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={5} sx={{ display: { xs: "none", md: "block" } }}>
            <Box 
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              sx={{
                position: "relative",
                width: "100%",
                height: 400,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {/* Animated glowing decorative element */}
              <Box 
                sx={{
                  position: "absolute",
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)",
                  filter: "blur(20px)",
                  zIndex: 0,
                  animation: "pulse 6s infinite ease-in-out"
                }}
              />
              
              {/* Premium Dashboard preview mock */}
              <Card 
                className="glass-card" 
                sx={{ 
                  zIndex: 1, 
                  width: "90%", 
                  p: 2,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                  borderColor: "rgba(99, 102, 241, 0.2) !important",
                  transform: "perspective(1000px) rotateY(-10deg) rotateX(10deg)"
                }}
              >
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#EF4444" }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#F59E0B" }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#10B981" }} />
                </Box>
                <Box sx={{ p: 2, bgcolor: "rgba(0,0,0,0.2)", borderRadius: 2 }}>
                  <Typography variant="caption" color="text.secondary" display="block">REXP-984 SPECIFICATION</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, mt: 0.5, color: "secondary.light" }}>Enterprise E-Commerce Portal</Typography>
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Chip label="React.js" size="small" color="primary" />
                    <Chip label="Node.js" size="small" variant="outlined" />
                    <Chip label="PostgreSQL" size="small" variant="outlined" />
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="caption" color="text.secondary">Estimated Timeline</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>3 - 5 Months</Typography>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>

        {/* Features Section */}
        <Box sx={{ mt: 10 }}>
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom 
            sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, mb: 5 }}
          >
            How it <span style={{ color: "#6366F1" }}>Works</span>
          </Typography>
          
          <Grid container spacing={3}>
            {features.map((feat, idx) => (
              <Grid item xs={12} sm={6} md={3} key={feat.title}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  sx={{ height: "100%" }}
                >
                  <Card className="glass-card glass-card-hover" sx={{ height: "100%" }}>
                    <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
                      <Box>{feat.icon}</Box>
                      <Typography variant="h6" sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700 }}>
                        {feat.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {feat.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
