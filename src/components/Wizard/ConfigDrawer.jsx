import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import SaveIcon from "@mui/icons-material/Save";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import InfoIcon from "@mui/icons-material/Info";

import { useWizard } from "../../context/WizardContext";
import {
  getSavedConfigs,
  saveConfig,
  deleteConfig,
  exportConfig,
  validateConfig
} from "../../utils/configStorage";
import { solutions } from "../../data/projectTypes";

export default function ConfigDrawer({ open, onClose }) {
  const navigate = useNavigate();
  const { answers, isAdvancedMode, loadConfiguration } = useWizard();

  const [configs, setConfigs] = useState([]);
  const [configName, setConfigName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const fileInputRef = useRef(null);

  // Load configurations from localStorage when drawer opens
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setConfigs(getSavedConfigs());
        setErrorMsg("");
        setSuccessMsg("");
        
        // Auto-suggest configuration name if possible
        if (answers.businessType && answers.solution) {
          const solutionName = solutions.find(s => s.id === answers.solution)?.name || "Solution";
          const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
          setConfigName(`${solutionName} Project (${dateStr})`);
        } else {
          setConfigName("");
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [open, answers]);

  // Handle saving current configuration
  const handleSave = (e) => {
    e.preventDefault();
    if (!configName.trim()) {
      setErrorMsg("Please enter a name for the configuration.");
      return;
    }

    try {
      saveConfig(configName.trim(), answers, isAdvancedMode);
      setConfigs(getSavedConfigs());
      setSuccessMsg("Configuration saved successfully!");
      setErrorMsg("");
      
      // Clear or reset name after a successful save
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to save configuration.");
    }
  };

  // Handle loading configuration into the active wizard
  const handleLoad = (config) => {
    try {
      loadConfiguration(config.answers, config.isAdvancedMode);
      setSuccessMsg(`Loaded "${config.name}" successfully!`);
      setErrorMsg("");
      
      setTimeout(() => {
        onClose();
        navigate("/wizard");
      }, 500);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to load configuration.");
    }
  };

  // Handle exporting configuration
  const handleExport = (config) => {
    exportConfig(config);
    setSuccessMsg(`Exported "${config.name}" to JSON.`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // Handle exporting current unsaved configuration
  const handleExportCurrent = () => {
    if (!answers.businessType) {
      setErrorMsg("Cannot export an empty configuration. Please configure some steps first.");
      return;
    }
    const tempConfig = {
      name: configName.trim() || "Unsaved Active Configuration",
      answers,
      isAdvancedMode
    };
    exportConfig(tempConfig);
    setSuccessMsg("Current configuration exported to JSON.");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // Handle deleting configuration
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      const updated = deleteConfig(id);
      setConfigs(updated);
      setSuccessMsg("Configuration deleted.");
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  // Handle import via file upload
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (!validateConfig(parsed)) {
          setErrorMsg("Invalid configuration format. Make sure the JSON file contains a valid 'answers' object.");
          return;
        }

        // Save imported configuration
        const name = parsed.name || `Imported Config (${file.name.replace(".json", "")})`;
        const saved = saveConfig(name, parsed.answers, parsed.isAdvancedMode || false);
        
        setConfigs(getSavedConfigs());
        setSuccessMsg(`Imported and saved "${name}"! Loading configuration...`);
        setErrorMsg("");

        // Auto-load it after a small delay
        setTimeout(() => {
          handleLoad(saved);
        }, 1200);

      } catch (err) {
        console.error(err);
        setErrorMsg("Failed to parse JSON file. Please check if the file is corrupted.");
      }
    };
    reader.readAsText(file);
    // Reset file input so same file can be uploaded again
    e.target.value = "";
  };

  const isCurrentEmpty = !answers.businessType;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: "400px" },
          bgcolor: "#0E1322",
          backgroundImage: "none",
          borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "-10px 0 30px rgba(0,0,0,0.5)",
          color: "text.primary",
          display: "flex",
          flexDirection: "column",
        }
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FolderSpecialIcon color="primary" />
          <Typography variant="h6" sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700 }}>
            Config Manager
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "text.secondary" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Messages */}
      {errorMsg && (
        <Alert severity="error" variant="filled" sx={{ m: 2, py: 0.5, borderRadius: "8px" }} onClose={() => setErrorMsg("")}>
          {errorMsg}
        </Alert>
      )}
      {successMsg && (
        <Alert severity="success" variant="filled" sx={{ m: 2, py: 0.5, borderRadius: "8px", bgcolor: "secondary.main" }} onClose={() => setSuccessMsg("")}>
          {successMsg}
        </Alert>
      )}

      {/* Drawer Content */}
      <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3, flexGrow: 1, overflowY: "auto" }}>
        
        {/* Import Action */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700 }}>
            Share & import
          </Typography>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportFile}
            accept=".json"
            style={{ display: "none" }}
          />
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            startIcon={<UploadIcon />}
            onClick={handleImportClick}
            sx={{
              borderColor: "rgba(255, 255, 255, 0.12)",
              color: "text.primary",
              "&:hover": {
                borderColor: "primary.main",
                background: "rgba(99, 102, 241, 0.05)"
              }
            }}
          >
            Import JSON Config
          </Button>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

        {/* Save Current Config */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 700 }}>
            Save Current Specifications
          </Typography>
          {isCurrentEmpty ? (
            <Box sx={{ display: "flex", gap: 1, p: 2, bgcolor: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.08)", borderRadius: "8px" }}>
              <InfoIcon color="disabled" sx={{ fontSize: 20, mt: 0.2 }} />
              <Typography variant="body2" color="text.secondary">
                Begin configuring a solution to save or export your parameters.
              </Typography>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSave} sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <TextField
                label="Save name"
                variant="outlined"
                fullWidth
                size="small"
                value={configName}
                onChange={(e) => setConfigName(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(0,0,0,0.2)",
                  }
                }}
              />
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  startIcon={<SaveIcon />}
                  sx={{ py: 1 }}
                >
                  Save Spec
                </Button>
                <Tooltip title="Export Current Unsaved Config">
                  <Button
                    variant="outlined"
                    onClick={handleExportCurrent}
                    sx={{
                      minWidth: "50px",
                      px: 0,
                      borderColor: "rgba(255,255,255,0.12)",
                      color: "text.primary",
                      "&:hover": {
                        borderColor: "primary.main",
                        background: "rgba(99, 102, 241, 0.05)"
                      }
                    }}
                  >
                    <DownloadIcon />
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          )}
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

        {/* Saved list */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 700 }}>
            Saved Configurations ({configs.length})
          </Typography>
          
          {configs.length === 0 ? (
            <Box sx={{ py: 6, textAlign: "center", border: "1px dashed rgba(255,255,255,0.08)", borderRadius: "12px", bgcolor: "rgba(255,255,255,0.01)" }}>
              <FolderSpecialIcon sx={{ fontSize: 40, color: "rgba(255,255,255,0.1)", mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                No configurations saved in this browser yet.
              </Typography>
            </Box>
          ) : (
            <List sx={{ display: "flex", flexDirection: "column", gap: 1.5, p: 0 }}>
              {configs.map((config) => {
                const solName = solutions.find(s => s.id === config.answers.solution)?.name || "Custom Project";
                const numPlat = config.answers.platforms?.length || 0;
                const numMod = config.answers.modules?.length || 0;
                const date = new Date(config.updatedAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                });

                return (
                  <ListItem
                    key={config.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                      p: 2,
                      bgcolor: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      borderRadius: "12px",
                      gap: 1.5,
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.04)",
                        borderColor: "rgba(99, 102, 241, 0.3)"
                      }
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "primary.light", lineHeight: 1.2 }}>
                          {config.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                          {solName} • {numPlat} plat • {numMod} mod
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                        {date}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, width: "100%" }}>
                      {/* Left: Load Action */}
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        startIcon={<PlayArrowIcon />}
                        onClick={() => handleLoad(config)}
                        sx={{
                          fontSize: "0.75rem",
                          py: 0.4,
                          borderColor: "rgba(16, 185, 129, 0.2)",
                          color: "secondary.light",
                          "&:hover": {
                            borderColor: "secondary.main",
                            background: "rgba(16, 185, 129, 0.05)"
                          }
                        }}
                      >
                        Load
                      </Button>

                      {/* Right: Export & Delete Actions */}
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <Tooltip title="Export to JSON File">
                          <IconButton
                            size="small"
                            onClick={() => handleExport(config)}
                            sx={{
                              color: "text.secondary",
                              border: "1px solid rgba(255,255,255,0.06)",
                              borderRadius: "6px",
                              "&:hover": {
                                color: "primary.light",
                                borderColor: "primary.main",
                                background: "rgba(99, 102, 241, 0.05)"
                              }
                            }}
                          >
                            <DownloadIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(config.id, config.name)}
                            sx={{
                              color: "text.secondary",
                              border: "1px solid rgba(255,255,255,0.06)",
                              borderRadius: "6px",
                              "&:hover": {
                                color: "error.light",
                                borderColor: "error.main",
                                background: "rgba(239, 68, 68, 0.05)"
                              }
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}
