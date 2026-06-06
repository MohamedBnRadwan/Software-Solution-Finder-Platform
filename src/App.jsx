import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { WizardProvider } from "./context/WizardContext";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import Wizard from "./pages/Wizard";
import Results from "./pages/Results";
import Contact from "./pages/Contact";

// Create custom premium dark theme
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6366F1", // Electric Indigo
      light: "#818CF8",
      dark: "#4F46E5",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#10B981", // Emerald Green
      light: "#34D399",
      dark: "#059669",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#0B0F19", // Deep Space Blue
      paper: "#111827", // Charcoal Slate
    },
    text: {
      primary: "#F3F4F6",
      secondary: "#9CA3AF",
    },
    divider: "rgba(255, 255, 255, 0.08)",
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Outfit", -apple-system, sans-serif',
    h1: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 800,
    },
    h2: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 22px",
          fontSize: "0.95rem",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)",
            boxShadow: "0 0 15px rgba(99, 102, 241, 0.4)",
          },
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
            boxShadow: "0 0 15px rgba(16, 185, 129, 0.4)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WizardProvider>
        <Router>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <main style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/wizard" element={<Wizard />} />
                <Route path="/results" element={<Results />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </WizardProvider>
    </ThemeProvider>
  );
}

export default App;
