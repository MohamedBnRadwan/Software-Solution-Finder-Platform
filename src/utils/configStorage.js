/**
 * Utility functions to manage custom configurations in browser localStorage
 * and support exporting/importing JSON files.
 */

const STORAGE_KEY = "solution_finder_configs";

/**
 * Get all saved configurations from localStorage.
 * @returns {Array} List of saved configuration objects.
 */
export const getSavedConfigs = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading saved configurations from localStorage:", error);
    return [];
  }
};

/**
 * Save a configuration. If an ID is provided, updates the existing configuration.
 * Otherwise, creates a new one.
 * @param {string} name - User-friendly name.
 * @param {object} answers - Wizard answers object.
 * @param {boolean} isAdvancedMode - Mode active during save.
 * @param {string} [id] - Existing config ID.
 * @returns {object} The saved configuration object.
 */
export const saveConfig = (name, answers, isAdvancedMode, id = null) => {
  const configs = getSavedConfigs();
  const now = new Date().toISOString();

  let targetConfig;

  if (id) {
    // Update existing
    const index = configs.findIndex(c => c.id === id);
    if (index !== -1) {
      configs[index] = {
        ...configs[index],
        name: name || configs[index].name,
        answers,
        isAdvancedMode,
        updatedAt: now
      };
      targetConfig = configs[index];
    }
  }

  if (!targetConfig) {
    // Create new
    const newConfig = {
      id: id || Date.now().toString(),
      name: name || `Config ${configs.length + 1}`,
      answers,
      isAdvancedMode,
      createdAt: now,
      updatedAt: now
    };
    configs.push(newConfig);
    targetConfig = newConfig;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
  return targetConfig;
};

/**
 * Delete a configuration by ID.
 * @param {string} id - The config ID.
 * @returns {Array} Updated list of configurations.
 */
export const deleteConfig = (id) => {
  const configs = getSavedConfigs();
  const filtered = configs.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return filtered;
};

/**
 * Trigger browser download of a configuration as a JSON file.
 * @param {object} config - Configuration object to export.
 */
export const exportConfig = (config) => {
  if (!config) return;

  const dataStr = JSON.stringify(config, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  const sanitizedName = config.name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  
  link.href = url;
  link.download = `solution_finder_config_${sanitizedName}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Validate imported configuration object schema.
 * @param {object} data - Parsed JSON data.
 * @returns {boolean} True if data matches the schema.
 */
export const validateConfig = (data) => {
  if (!data || typeof data !== "object") return false;
  if (!data.answers || typeof data.answers !== "object") return false;
  
  // Ensure basic fields are present or shape is valid
  // If answers is completely empty, it's not a very useful configuration, but let's allow it if it has key fields.
  // We check if businessType is defined or if answers is a valid object.
  return typeof data.answers === "object";
};
